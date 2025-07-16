"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Notiflix from "notiflix";
import { useAuth } from "@/context/AuthContext";

export default function Billing() {
  const { user } = useAuth();
  const customerId = user?.stripeCustomerId;
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [billingHistory, setBillingHistory] = useState([]);

  const fetchCards = async () => {
    try {
      const res = await fetch("/api/payment-methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId }),
      });
      const data = await res.json();
      setCards(data.paymentMethods || []);
    } catch (error) {
      console.error("Failed to fetch cards:", error);
    }
  };

  const fetchBillingHistory = async () => {
    try {
      const res = await fetch("/api/get-billing-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid }),
      });
      const data = await res.json();
      setBillingHistory(data.history || []);
    } catch (err) {
      console.error("Failed to load billing history", err);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchCards();
      fetchBillingHistory();
    }
  }, [user?.uid]);

  useEffect(() => {
    if (customerId) fetchCards();
  }, [customerId]);

  const handleRemove = async (id) => {
    setLoading(true);
    try {
      const res = await fetch("/api/remove-payment-method", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId: id }),
      });
      const data = await res.json();
      if (data.success) {
        Notiflix.Notify.success("Card removed");
        fetchCards();
      } else {
        Notiflix.Notify.failure("Failed to remove card");
      }
    } catch (error) {
      console.error("Remove error:", error);
      Notiflix.Notify.failure("Something went wrong");
    }
    setLoading(false);
  };

  const handleAddCard = async () => {
    try {
      const res = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        Notiflix.Notify.failure("Unable to open Stripe portal.");
      }
    } catch (err) {
      console.error("Portal redirect error:", err);
      Notiflix.Notify.failure("Something went wrong");
    }
  };

  const getCardLogo = (brand) => {
    switch (brand?.toLowerCase()) {
      case "visa":
        return "/cardLogo/visa.svg";
      case "mastercard":
        return "/cardLogo/mastercard.svg";
      case "amex":
      case "american express":
        return "/cardLogo/amex.svg";
      case "discover":
        return "/cardLogo/discover.svg";
      case "google":
        return "/cardLogo/google.svg";
      case "apple":
        return "/cardLogo/apple.svg";
      default:
        return "/cardLogo/discover.svg";
    }
  };

  return (
    <section className="bg-cardBg3 border-btGray max-h-full w-full rounded-[10px] border">
      <div className="mx-auto flex w-[92%] flex-col space-y-5 py-5">
        <h3 className="text-primary text-sm font-semibold">Billing & Payment Methods</h3>
        <div className="space-y-3.5">
          <p className="text-primary text-xs font-semibold">Payment Methods</p>
          <div className="space-y-3">
            {billingHistory.length === 0 ? (
              <p className="text-btext text-xs">No cards found in history.</p>
            ) : (
              billingHistory
                .filter((item) => item.card)
                .map((item, index) => (
                  <div key={index} className="border-btGray flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="flow-row flex items-center gap-2">
                      <div className="bg-pointBg flex w-fit cursor-pointer items-center justify-center rounded-lg p-1.5 shadow">
                        <Image src={getCardLogo(item.card.brand)} alt={item.card.brand} width={24} height={24} />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-primary text-xs font-semibold">
                          {item.card.brand?.toUpperCase()} ending in {item.card.last4}
                        </p>
                        <span className="text-btext text-xxs font-medium">
                          Expires {item.card.exp_month}/{item.card.exp_year}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
          <div onClick={handleAddCard} className="border-btGray hover:border-btBlue flex w-fit cursor-pointer flex-row items-center gap-1.5 rounded-lg border bg-white p-1.5">
            <Image src="/credit-card.svg" alt="logo" width={16} height={16} />
            <span className="text-primary text-xs font-medium">Add New Card</span>
          </div>
        </div>
        <div className="bg-btGray h-px w-full" />
        <div className="flex flex-col space-y-3.5">
          <p className="text-primary text-xs font-semibold">Billing History</p>
          <div className="border-btGray min-w-full rounded-lg border shadow-sm">
            <table className="min-w-[600px] bg-white text-left text-sm md:min-w-full">
              <thead className="text-btext bg-theadBg">
                <tr className="text-primary text-xs font-medium">
                  <th className="px-4 py-3">Invoice</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.length > 0 ? (
                  billingHistory.map((item, index) => (
                    <tr key={index} className="text-primary border-t border-gray-100 text-xs font-medium">
                      <td className="px-4 py-3">{item.invoice || "N/A"}</td>
                      <td className="px-4 py-3">{item.amount || "N/A"}</td>
                      <td className="px-4 py-3"> {typeof item.date === "string" ? new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : (item.date?.toDate?.().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) ?? "N/A")}</td>
                      <td className="flex flex-row gap-1 px-4 py-3">
                        {item.actions?.split(",").map((action, i) => (
                          <span key={i} className="text-primary hover:text-btBlue cursor-pointer hover:font-semibold">
                            {action.trim()}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-btext px-4 py-6 text-center text-xs">
                      No billing history available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <button type="button" className="btn-bg flex w-fit cursor-pointer flex-row rounded-lg p-1.5 text-xs font-medium text-white">
          Save Changes
        </button>
      </div>
    </section>
  );
}
