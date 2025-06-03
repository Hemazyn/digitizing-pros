import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function OrderConfirm() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-4 md:px-0">
      <div className="bg-theadBg w-full max-w-md rounded-[18px] px-2 py-6 shadow-2xl">
        {/* Success Icon */}
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        {/* Header */}
        <div className="mb-4 space-y-1 text-center">
          <h2 className="text-primary text-sm font-semibold">Order Confirmed</h2>
          <p className="text-btext text-[10px] font-medium">Your order has been received and is being processed</p>
        </div>
        <div className="w-full rounded-xl bg-white p-1.5">
          {/* Order Box */}
          <div className="mb-4 rounded-lg border px-4 py-3">
            <div className="mb-1 flex items-center justify-between text-sm font-medium text-gray-700">
              <span>Order ORD-90012354</span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10m-7 4h4m-7 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Estimated: 12–20 May
              </span>
            </div>
            <p className="text-xs text-gray-400">Placed on 2 May, 2025</p>
          </div>

          {/* Order Status */}
          <div className="mb-4">
            <h3 className="mb-1 text-sm font-medium text-gray-700">Order Status</h3>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                Order Received
              </span>
              <span className="text-gray-400">Your order has been received and confirmed.</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
              <div className="h-full w-[10%] rounded-full bg-blue-600"></div>
            </div>
          </div>
          {/* Order Details */}
          <div className="mb-6 rounded-lg border px-4 py-3">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-500">Order Items</span>
              <span className="text-gray-800">Floral Embroidery</span>
            </div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-500">Total Amount</span>
              <span className="text-gray-800">$59.62</span>
            </div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-500">Delivery Method</span>
              <span className="text-gray-800">Door Delivery</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping Service</span>
              <span className="text-gray-800">FedEx Shipping Service</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button className="w-full rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700">Track Order</button>
          <Link href="/store/cart">
            <button className="w-full cursor-pointer rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-100">Continue Shopping</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
