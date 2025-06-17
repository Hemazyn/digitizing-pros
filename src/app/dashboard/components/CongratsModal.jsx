"use client";
import React from "react";
import { Trophy } from "lucide-react";
import Image from "next/image";

export default function CongratsModal({ isOpen, onClose, rewardTitle }) {
  if (!isOpen || !rewardTitle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] space-y-5 rounded-xl bg-white bg-linear-to-b from-[#5749E9]/60 via-[#A861EA]/60 to-[#FFFFFF] p-6 text-center shadow-lg md:w-[350px]">
        <div className="flex justify-center">
          <Image src="/trophy.svg" width={200} height={200} alt="trophy" />
        </div>
        <div className="flex flex-col gap-3.5">
          <h3 className="text-primary text-lg font-semibold">Congratulations!</h3>
          <p className="text-primary text-sm font-medium">You have earned {rewardTitle} for your next order</p>
        </div>
        <button onClick={onClose} className="btn-bg w-fit cursor-pointer rounded-md px-8 py-2 text-sm font-medium text-white transition-colors duration-200">
          Continue
        </button>
      </div>
    </div>
  );
}
