"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header"; // Adjust path as needed
import Footer from "../../components/Footer"; // Adjust path as needed
import Image from "next/image"; // For optimized images

// --- DUMMY DATA FOR DEMONSTRATION ---
// In a real app, you'd get this from your global cart state.
const dummyCartItems = [
  {
    id: "floral-embroidery-1",
    name: "Floral Embroidery",
    image: "/images/floral-embroidery.jpg", // Replace with actual path or Cloudinary URL
    hoopSize: '6"',
    threadType: "Cotton",
    price: 49.9,
    quantity: 1,
  },
  // Add more dummy items if you want to test the list
  // {
  //   id: 'sport-team-patches-2',
  //   name: 'Sport Team Patches',
  //   image: '/images/sport-team-patches.jpg',
  //   hoopSize: '4"',
  //   threadType: 'Polyester',
  //   price: 29.99,
  //   quantity: 2,
  // },
];

// Helper function to simulate fetching cart items from a global state
// In a real app, this would come from your Context API or state management
const useCart = () => {
  const [items, setItems] = useState(dummyCartItems);

  // In a real app, you'd have functions like:
  const updateQuantity = (id, newQuantity) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item)));
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return { items, updateQuantity, removeItem };
};

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart(); // Get cart items and actions
  const shippingCost = 4.0;
  const taxRate = 0.07; // 7% tax rate

  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Calculate tax
  const tax = subtotal * taxRate;

  // Calculate total
  const total = subtotal + shippingCost + tax;

  return (
    <>
      <Header className="border-btGray border-b" />
      <main className="min-h-screen flex-1 bg-gray-50 pt-16">
        <div className="container mx-auto p-4 md:p-8">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Left Side: Shopping Cart List */}
            <div className="rounded-lg bg-white p-6 shadow-md md:w-3/5">
              <h2 className="text-primary mb-6 text-2xl font-bold">Shopping Cart</h2>
              <button onClick={() => window.history.back()} className="text-primary mb-4 flex items-center text-sm font-medium hover:underline">
                &larr; Back
              </button>

              <div className="space-y-4">
                {items.length === 0 ? (
                  <p className="py-10 text-center text-gray-600">Your cart is empty.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex items-start border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="relative mr-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" className="rounded-lg" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-primary text-lg font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">Hoop Size: {item.hoopSize}</p>
                        <p className="text-sm text-gray-600">Thread Type: {item.threadType}</p>
                        <p className="text-primary mt-1 text-lg font-medium">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 transition-colors hover:text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <div className="mt-4 flex items-center">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-md bg-gray-200 px-2 py-1 text-gray-700 hover:bg-gray-300">
                            -
                          </button>
                          <span className="mx-3 text-lg font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-md bg-gray-200 px-2 py-1 text-gray-700 hover:bg-gray-300">
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Side: Order Summary & Payment Details */}
            <div className="sticky top-20 h-fit rounded-lg bg-white p-6 shadow-md md:w-2/5">
              <h2 className="text-primary mb-6 text-2xl font-bold">Order Summary</h2>
              <div className="mb-6 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="text-primary mt-3 flex justify-between border-t pt-3 text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <h3 className="text-primary mb-4 text-lg font-semibold">Payment Details</h3>
              <div className="mb-6 space-y-4">
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input type="email" id="email" placeholder="sidaibruma@gmail.com" className="focus:ring-primary focus:border-primary w-full rounded-md border border-gray-300 p-3" />
                </div>
                <div>
                  <label htmlFor="shippingAddress" className="mb-1 block text-sm font-medium text-gray-700">
                    Shipping Address
                  </label>
                  <textarea
                    id="shippingAddress"
                    rows="3"
                    placeholder="123 Queens Road, Suite 101&#10;Neville, CA 90210&#10;United States"
                    className="focus:ring-primary focus:border-primary w-full resize-none rounded-md border border-gray-300 p-3"></textarea>
                </div>
                <div>
                  <label htmlFor="paymentMethod" className="mb-1 block text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <div className="flex items-center rounded-md border border-gray-300 p-3">
                    {/* Placeholder for Stripe logo/integration */}
                    <Image
                      src="/images/stripe-logo.png" // Replace with actual Stripe logo path
                      alt="Stripe"
                      width={80}
                      height={30}
                      objectFit="contain"
                    />
                  </div>
                </div>
              </div>

              <button className="w-full rounded-lg bg-purple-600 py-3 text-lg font-semibold text-white transition-colors hover:bg-purple-700">Pay ${total.toFixed(2)}</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
