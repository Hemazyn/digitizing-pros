"use client";
import { Suspense } from "react";
import OrdersWrapper from "./componens/OrdersWrapper";

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-sm text-gray-500">Loading Orders...</div>}>
      <OrdersWrapper />
    </Suspense>
  );
}
