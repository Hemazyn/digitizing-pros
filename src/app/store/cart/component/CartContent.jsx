"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import OrderConfirm from "../component/OrderConfirm";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { defaultPrice } from "../../../constants/index";
import Notiflix, { Notify, Loading } from "notiflix";
import { loadStripe } from "@stripe/stripe-js";

export default function CartContent() {
  const { cartItems = [], updateCartItemQuantity, removeFromCart, totalItemsInCart, cartTotalPrice } = useCart() || {};
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("stripe");
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  const shippingCost = 0.0;
  const taxRate = 0.07;

  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const showOrderConfirm = searchParams.get("success") === "true";

  const getItemImage = (item) => {
    return item?.secure_url || item?.image || item?.metadata?.secure_url || item?.metadata?.image || item?.metadata?.url || "/images/placeholder.jpg";
  };

  useEffect(() => {
    if (searchParams?.get("canceled") === "true") {
      Notify.failure("Order not successful", { timeout: 3000 });
      router.replace("/store/cart");
    }
  }, [searchParams]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !authLoading) {
      if (!user) {
        router.push("/login");
      }
    }
  }, [user, authLoading, router, isClient]);

  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = parseFloat(item.metadata?.price || defaultPrice);
    let optionPriceAdjustment = 0;
    return sum + (itemPrice + optionPriceAdjustment) * item.quantity;
  }, 0);

  const tax = cartItems.length * taxRate;
  const total = subtotal + shippingCost + tax;

  const getDisplayTitle = (resource) => {
    if (!resource) return "Untitled Item";
    if (resource.original_filename && resource.original_filename.trim() !== "") {
      const parts = resource.original_filename.split(".");
      if (parts.length > 1) {
        parts.pop();
        return parts.join(".");
      }
      return resource.original_filename;
    }

    if (resource.public_id) {
      const parts = resource.public_id.split("/");
      const filenameWithExtension = parts[parts.length - 1];
      const filenameParts = filenameWithExtension.split(".");
      if (filenameParts.length > 1) {
        filenameParts.pop();
      }
      return filenameParts.join(".").replace(/-/g, " ");
    }
    return "Untitled Item";
  };

  const handlePayButtonClick = async (event) => {
    event.preventDefault();

    const stripe = await stripePromise;

    if (!stripe) {
      Notify.failure("Stripe not loaded. Please refresh and try again.");
      return;
    }
    console.log("Cart Items:", cartItems);
    const validatedItems = cartItems.map((item) => {
      const rawPrice = item.price || item.metadata?.price || defaultPrice;
      const parsedPrice = parseFloat(rawPrice);

      return {
        ...item,
        name: getDisplayTitle(item),
        price: isNaN(parsedPrice) || parsedPrice <= 0 ? parseFloat(defaultPrice) : parsedPrice,
      };
    });

    const invalidItems = validatedItems.filter((item) => !item.price || isNaN(item.price) || item.price <= 0);

    if (invalidItems.length > 0) {
      console.error("Invalid items in cart:", invalidItems);
      Notify.failure("Some items in your cart have invalid prices. Please remove or update them.");
      return;
    }

    if (!email || !address) {
      Notify.failure("Please provide a valid email and shipping address.");
      return;
    }

    try {
      Loading.dots("Processing payment...");

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: validatedItems,
          email: email || user?.email,
          selectedPaymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Payment API error response:", data);
        throw new Error(data?.error || "Payment failed. Please try again.");
      }

      if (!data?.id) {
        console.error("Stripe session ID not returned:", data);
        throw new Error("Could not initiate payment session.");
      }

      if (!cartItems || cartItems.length === 0) {
        Notify.failure("Your cart is empty.");
        return;
      }

      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error("Payment processing error:", error);
      Notify.failure(error.message || "Something went wrong during payment.");
    } finally {
      Loading.remove();
    }
  };

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!authLoading && user?.uid && sessionId) {
      const saveBilling = async () => {
        if (!user) return;

        try {
          const token = await user.getIdToken();

          const res = await fetch("/api/fetch-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          });

          const data = await res.json();

          const billingData = {
            invoice: data?.id || `INV-${Date.now()}`,
            amount: `$${(data?.amount_total / 100).toFixed(2)}`,
            date: new Date().toISOString(),
            actions: "View, Download",
            card: data?.payment_method_details?.card || null,
          };

          const saveRes = await fetch("/api/save-billing-history", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ billing: billingData }),
          });

          const saveData = await saveRes.json();
          console.log("Billing save response:", saveData);

          if (!saveRes.ok) {
            Notiflix.Notify.failure("❌ Failed to save billing history");
          }
        } catch (err) {
          console.error("Error during billing save:", err);
        }
      };

      saveBilling();
    }
  }, [searchParams, user, authLoading]);

  if (!isClient || authLoading || !user) {
    return (
      <>
        <Header />
        <main className="bg-svg p8 pt16 flex h-screen flex-col items-center justify-center">
          <p className="font-bricolage text-primary text-3xl">{isClient && !authLoading && !user ? "Redirecting to login..." : "Loading cart page..."}</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="relative flex flex-col">
        <Header className="border-btGray border-b" />
        {cartItems.length === 0 ? (
          <div className="bg-svg flex h-screen w-full flex-col items-center justify-center text-center">
            <p className="font-bricolage text-primary text-3xl font-semibold">Your cart is empty.</p>
            <Link href="/store" className="text-primary hover:text-btBlue mt-4 flex items-center">
              <Image src="/arrow-left.svg" alt="Continue Shopping" width={16} height={16} className="mr-2 inline-block" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <main className="min-h-screen flex-1">
            <div className="container mx-auto mt-10 p-4 md:mt-16 md:p-8">
              <Link href="/store" className="text-primary hover:text-btBlue mb-4 flex w-fit cursor-pointer items-center">
                <Image src="/arrow-left.svg" alt="Go Back" width={16} height={16} className="mr-1 inline-block" />
                Back to Store
              </Link>
              <div className="flex flex-col gap-8 md:flex-row">
                {/* Left Side: Shopping Cart List */}
                <div className="flex flex-col md:w-3/5">
                  <h2 className="text-primary mb-4 text-2xl font-bold">Shopping Cart ({totalItemsInCart})</h2>
                  <div className="bg-none">
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={`${item.public_id}`} className="flex gap-5 rounded-[16px] p-2 shadow">
                          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                            <Image src={getItemImage(item)} alt={getDisplayTitle(item)} layout="fill" objectFit="cover" className="rounded-lg" />
                          </div>
                          <div className="flex w-full flex-row justify-between space-x-2">
                            <div className="flex flex-col gap-1 md:gap-3">
                              <Link className="cursor-pointer" href={`/store/${item.public_id}`}>
                                <h3 className="text-primary hover:text-btBlue font-bricolage text-lg font-bold md:text-2xl">{getDisplayTitle(item)}</h3>
                              </Link>
                              <p className="text-btext text-sm">Create a stunning art with this complete embroidery design.</p>
                            </div>
                            <div className="flex flex-col items-end justify-between">
                              <button onClick={() => removeFromCart(item.public_id, item.options)} className="w-fit cursor-pointer">
                                <Image src="/delete.svg" alt="Delete item" width={20} height={20} />
                              </button>
                              <div className="flex flex-row justify-end">
                                <p className="text-primary text-xl font-semibold">${((parseFloat(item.metadata?.price || defaultPrice) + (item.options?.selectedThreadType === "Silk (+$5.00)" ? 5 : 0)) * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Right Side: Order Summary & Payment Details */}
                <div className="flex h-fit flex-col md:w-2/5">
                  <h2 className="text-primary mb-4 text-2xl font-bold">Order Summary</h2>
                  <div className="flex flex-col">
                    <div className="border-btGray mb-6 space-y-3 rounded-lg border p-4">
                      <div className="flex flex-row justify-between">
                        <span className="text-btext text-sm font-medium">Subtotal</span>
                        <span className="text-primary text-lg font-semibold">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-btext text-sm font-medium">Shipping</span>
                        <span className="text-primary text-lg font-semibold">${shippingCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-btext text-sm font-medium">Tax</span>
                        <span className="text-primary text-lg font-semibold">${tax.toFixed(2)}</span>
                      </div>
                      <div className="text-primary border-btGray mt-3 flex justify-between border-t pt-3 text-xl font-bold">
                        <span className="text-primary text-base font-medium">Total</span>
                        <span className="text-primary text-lg font-semibold">${total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                      <div className="flex flex-col space-y-0.5">
                        <h3 className="text-primary text-xl font-semibold">Payment Details</h3>
                        <span className="text-btext text-sm font-medium">Complete your purchase by providing your payment details</span>
                      </div>
                      <form className="space-y-4">
                        <div className="flex flex-col space-y-1.5">
                          <label htmlFor="email" className="text-primary text-sm font-medium">
                            Email Address
                          </label>
                          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sidaibruma@gmail.com" className="border-btGray text-primary placeholder:text-btext w-full rounded-md border p-3 text-sm ring-0 outline-0" autoComplete="email" required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label htmlFor="shippingAddress" className="text-primary text-sm font-medium">
                            Shipping Address
                          </label>
                          <input type="text" id="shippingAddress" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main Street" className="border-btGray text-primary placeholder:text-btext w-full rounded-md border p-3 text-sm ring-0 outline-0" required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label htmlFor="paymentMethod" className="text-primary text-sm font-medium">
                            Payment Method
                          </label>
                          <div className="flex w-full items-center justify-between space-x-4">
                            <label className={`flex h-12 w-full cursor-pointer items-center justify-center rounded-lg p-2 transition-all duration-200 ease-in-out ${selectedPaymentMethod === "stripe" ? "border-btBlue border-2" : "border-btGray border"}`} onClick={() => setSelectedPaymentMethod("stripe")}>
                              <Image src="/stripe.svg" alt="Stripe" width={80} height={30} objectFit="contain" />
                            </label>
                            <label className={`flex h-12 w-full cursor-pointer items-center justify-center rounded-lg p-2 transition-all duration-200 ease-in-out ${selectedPaymentMethod === "google_pay" ? "border-btBlue border-2" : "border-btGray border"}`} onClick={() => setSelectedPaymentMethod("google_pay")}>
                              <Image src="/google-pay.svg" alt="Google Pay" width={60} height={30} objectFit="contain" />
                            </label>
                            <label className={`flex h-12 w-full cursor-pointer items-center justify-center rounded-lg p-2 transition-all duration-200 ease-in-out ${selectedPaymentMethod === "apple_pay" ? "border-btBlue border-2" : "border-btGray border"}`} onClick={() => setSelectedPaymentMethod("apple_pay")}>
                              <Image src="/apple-pay.svg" alt="Apple Pay" width={60} height={30} objectFit="contain" />
                            </label>
                          </div>
                        </div>
                        <button type="submit" onClick={handlePayButtonClick} disabled={!email || !address || cartItems.length === 0} className="btn-bg w-full cursor-pointer rounded-lg py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60">
                          Pay ${total.toFixed(2)}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showOrderConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <OrderConfirm cartItems={cartItems} />
              </div>
            )}
          </main>
        )}
        <Footer />
      </div>
    </>
  );
}
