"use client";
import Image from "next/image";
import { Pen } from "lucide-react";

export default function OrderInfo({ order }) {
  if (!order) {
    return <p className="text-red-500">Order data not available.</p>;
  }

  return (
    <div className="relative grid grid-cols-1 gap-5 overflow-scroll min-hscreen md:grid-cols-2">
      {/* one */}
      <div className="p-3 space-y-4 rounded-lg bg-cardBg3 h-fit">
        <h4 className="text-sm font-semibold text-primary">Order Information</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <p className="font-medium text-btext text-xxs">Order ID</p>
            <span className="text-xs font-medium text-primary">{order.id}</span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium text-btext text-xxs">Order ID</p>
            <span className="text-xs font-medium text-primary">{order.date}</span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium text-btext text-xxs">Order ID</p>
            <span className="text-xs font-medium text-primary">{order.productType}</span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium text-btext text-xxs">Order ID</p>
            <span className="text-xs font-medium text-primary">{order.status}</span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium text-btext text-xxs">Order ID</p>
            <span className="text-xs font-medium text-primary">{order.price}</span>
          </div>
        </div>
        <div className="w-full h-px bg-btGray"></div> {/*  divider */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-medium text-primary">Technical Details</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <p className="font-medium text-btext text-xxs">Format</p>
              <span className="text-xs font-medium text-primary">JPEG, DST, PES</span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-medium text-btext text-xxs">Dimensions</p>
              <span className="text-xs font-medium text-primary">4.5 x 3.2 inches</span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-medium text-btext text-xxs">Stitch Count:</p>
              <span className="text-xs font-medium text-primary">8,542 stitches</span>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-medium text-btext text-xxs">Colors</p>
              <span className="text-xs font-medium text-primary">5 colors</span>
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-btGray"></div> {/*  divider */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-primary">Special Instructions</p>
            <span className="font-medium text-xxs text-primary">Please ensure clean edges and smooth transitions between colors.</span>
          </div>
          <div className="flex flex-row items-center gap-1 p-1 text-white rounded-sm btn-bg w-fit">
            <Pen size={16} />
            <span className="text-xs font-medium text-white">Request Changes</span>
          </div>
        </div>
      </div>
      {/* // two */}
      <div className="grid grid-cols-1 space-y-3 h-fit">
        <div className="p-3 space-y-4 rounded-lg bg-cardBg3 h-fit">
          <h4 className="text-sm font-semibold text-primary">Final Design</h4>
          <Image src="/fDesign.svg" alt="final design" width={200} height={200} className="flex mx-auto" />
        </div>
        <div className="p-3 space-y-4 rounded-lg bg-cardBg3 h-fit">
          <h4 className="text-sm font-semibold text-primary">Original Artwork</h4>
          <Image src="/oArt.svg" alt="original artwork" width={200} height={200} className="flex mx-auto" />
        </div>
      </div>
    </div>
  );
}
