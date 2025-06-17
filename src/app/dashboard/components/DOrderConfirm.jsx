"use client";
import { CheckCircle } from "lucide-react";
import { IoIosTimer } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function DOrderConfirm({ orderId = "ORD-3091", onClose, onTrackOrder }) {
  const router = useRouter();

  const handleTrackOrder = () => {
    onTrackOrder?.();
  };

  const handleGoToDashboard = () => {
    onClose?.();
  };

  return (
    <section className="bg-theadBg w-[90%] space-y-4 rounded-xl py-4 text-center shadow-lg md:w-[450px]">
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-2">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <div className="flex flex-col gap-1">
          <h3 className="text-primary text-sm font-semibold">Order Confirmed</h3>
          <span className="text-xxs text-btext font-medium">Your order has been received and is being processed</span>
        </div>
      </div>
      <div className="border-btGray mx-1 space-y-3 rounded-lg border bg-white p-2">
        {/* Order Summary */}
        <div className="border-btGray flex w-full flex-row items-center justify-between rounded-md border p-2">
          <div className="flex flex-col items-start gap-1">
            <p className="text-primary text-xs font-semibold">Order ORD-3091</p>
            <span className="text-xxs text-btext font-medium">Placed on April 16, 2025</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <IoIosTimer size={12} />
            <span className="text-xxs text-btext font-medium">Estimated delivery: 24 hours</span>
          </div>
        </div>
        {/* Status Progress */}
        <div className="flex flex-col gap-3 text-left">
          <p className="text-primary text-xs font-semibold">Order Status</p>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row items-start space-x-3">
              <span className="text-xxs bg-btBlue flex h-5 w-5 items-center justify-center rounded-full text-white">1</span>
              <div className="flex flex-col gap-1">
                <p className="text-primary text-xxs font-semibold">Order Received</p>
                <span className="text-btext text-xxs font-normal">Your order has been received and confirmed</span>
              </div>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="bg-btBlue absolute h-full w-[10%]"></div>
            </div>
          </div>
        </div>
        {/* Order Details */}
        <div className="border-btGray space-y-3 rounded-md border p-2 text-left">
          <p className="text-primary text-xs font-semibold">Order Details</p>
          <ul className="space-y-2">
            <div className="flex flex-row items-center justify-between">
              <span className="text-btext text-xxs font-normal">Service</span>
              <span className="text-xxs text-primarys font-medium">Embroidery Digitizing (Under 5 Inches)</span>
            </div>
            <div className="flex flex-row items-center justify-between">
              <span className="text-btext text-xxs font-normal">Turnaround</span>
              <span className="text-xxs text-primarys font-medium">24 hours</span>
            </div>
            <div className="flex flex-row items-center justify-between">
              <span className="text-btext text-xxs font-normal">File Format</span>
              <span className="text-xxs text-primarys font-medium">DST</span>
            </div>
            <div className="flex flex-row items-center justify-between">
              <span className="text-btext text-xxs font-normal">Price</span>
              <span className="text-xxs text-primarys font-medium">$7</span>
            </div>
          </ul>
        </div>
        {/* What's Next */}
        <div className="border-btGray flex flex-col space-y-3 rounded-md border p-2 text-left">
          <p className="text-primary text-xs font-semibold">What's Next?</p>
          <ul className="flex flex-col space-y-1.5 text-xs text-gray-600">
            <li>✅ You’ll receive an email confirmation shortly</li>
            <li>✅ We'll update you when your design moves to the next stage</li>
            <li>✅ Your files will be delivered to your email within 24 hours</li>
            <li>✅ You can also track your order status in your account dashboard</li>
          </ul>
        </div>
      </div>
      {/* Buttons */}
      <div className="mx-4 flex flex-col gap-1">
        <button onClick={handleTrackOrder} className="btn-bg cursor-pointer rounded-lg py-2 text-xs font-medium text-white">
          Track Order
        </button>
        <button onClick={handleGoToDashboard} className="text-primary border-btGray hover:text-btBlue cursor-pointer rounded-lg border py-2 text-xs font-medium shadow hover:font-semibold">
          Continue to Dashboard
        </button>
      </div>
    </section>
  );
}
