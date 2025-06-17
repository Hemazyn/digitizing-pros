"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ArrowLeft, Download, Check, Calendar } from "lucide-react";
import { dummyOrders } from "@/lib/dummyData";
import OrderInfo from "./OrderInfo";
import OrderFiles from "./OrderFiles";
import OrderProgress from "./OrderProgress";
import OrderMessage from "./OrderMessage";

export default function OrderDetailsModal({ orderId, onClose }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePill, setActivePill] = useState("Details");

  useEffect(() => {
    if (orderId) {
      const foundOrder = dummyOrders.find((o) => o.id === orderId);
      setOrder(foundOrder);
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="mxeaut- f exuht48fy-center to shadorounded-lg bg-wwite w-full rounded-lg bg-white p-6 shadow-xl">
        <p className="text-primary">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mxeaut- f exuht48fy-center to shadorounded-lg bg-wwite w-full rounded-lg bg-white p-6 shadow-xl">
        <p className="text-red-500">Order not found.</p>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
    );
  }

  const renderPillContent = () => {
    switch (activePill) {
      case "Details":
        return <OrderInfo order={order} />;
      case "Timeline":
        return <OrderProgress order={order} />;
      case "Files":
        return <OrderFiles order={order} />;
      case "Messages":
        return <OrderMessage order={order} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-y-auto rounded-b-lg bg-white py-2">
      <div className="mx-auto flex w-[92%] flex-col space-y-8 py-4 sm:w-[92%]">
        <div className="">
          <button onClick={onClose} className="text-primary hover:text-btBlue flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-1 shadow">
            <ArrowLeft size={14} />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
        <div className="flex flex-col justify-between space-y-2">
          <div className="flex flex-row items-center gap-2 md:gap-1">
            <h2 className="text-primary text-xl font-semibold">{order.id}</h2>
            <div className="bg-btGray mx-3 hidden h-4 w-px md:block"></div> {/*  divider */}
            <div className="flex flex-row items-center gap-1">
              <Calendar size={14} className="text-btext" />
              <span className="text-btext text-xs font-medium">Ordered on {order.date}</span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div className="border-btGray flex flex-row items-center gap-2">
              <div className="border-Green py0.5 flex flex-row items-center gap-1 rounded-full border px-0.5 py-px">
                <Image src="/check.svg" width={16} height={16} alt="checked" />
                <span className="text-xxs text-Green mr-1 font-medium">{order.status}</span>
              </div>
              <span className="tent-medium text-primary text-xxs border-btGray rounded-full border bg-white px-1 py-0.5">{order.productType}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-theadBg flex w-fit flex-wrap justify-center gap-1 rounded-lg p-1 md:justify-start">
            {["Details", "Timeline", "Files", "Messages"].map((pill) => (
              <button key={pill} onClick={() => setActivePill(pill)} className={`cursor-pointer rounded-md px-2.5 py-2 text-sm font-medium transition-all duration-300 ${activePill === pill ? "text-primary bg-white shadow" : "text-btext hover:bg-white/50"}`}>
                {pill}
              </button>
            ))}
          </div>
          <div className="border-btGray flex-1">{renderPillContent()}</div>
        </div>
      </div>
    </div>
  );
}
