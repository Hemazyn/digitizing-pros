"use client";
import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function RedeemModal({ isOpen, onClose, reward, availablePoints, onConfirmRedeem }) {
  if (!isOpen || !reward) return null;

  const remainingPoints = availablePoints - reward.cost;
  const canRedeem = availablePoints >= reward.cost;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-cardBg relative w-[90%] space-y-5 rounded-xl py-3 shadow-lg md:w-[450px]">
        <div className="mx-auto flex w-[92%] flex-row items-start justify-between">
          <div className="border-btGray flex flex-col items-start gap-1 text-start">
            <h3 className="text-primary text-sm font-semibold">Redeem Reward</h3>
            <p className="text-btext text-xxs font-medium">Confirm that you want to redeem this reward using your loyalty points</p>
          </div>
          <button onClick={onClose} className="absolute top-2 right-2 cursor-pointer rounded-full bg-black p-1 text-white">
            <X size={14} />
          </button>
        </div>
        <div className="mx-1 flex flex-col space-y-4 rounded-lg bg-white p-3">
          <div className="flex flex-row gap-2">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
              <Image src={reward.image} alt={reward.title} layout="fill" objectFit="cover" className="rounded-md" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-primary text-xs font-semibold">{reward.title}</h4>
              <p className="text-btext text-xxs font-medium">{reward.description}</p>
              <span className="text-btext text-xxs font-medium">
                <strong>{reward.cost}</strong> points
              </span>
            </div>
          </div>
          <div className="border-btGray bg-cardBg3 flex flex-col items-start justify-between rounded-lg border p-2 md:flex-row md:items-center">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-primary text-xs font-semibold">Your current balance</span>
                <span className="text-btext text-xxs font-medium">Available points to redeem</span>
              </div>
            </div>
            <div className="itemsend flex flex-col gap-1">
              <span className="text-primary text-sm font-semibold">{availablePoints} points</span>
              <div className="flow-row text-xxs flex items-center font-medium">
                <span className="text-btext">Remaining after redemption:</span>
                <span className={`${canRedeem ? "text-primary" : "text-red-500"}`}>{remainingPoints} points</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-btGray mx-auto flex w-[92%] justify-end gap-3">
          <button onClick={onClose} className="border-btGray text-primary cursor-pointer rounded-md border px-6 py-2 text-sm font-medium shadow hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={() => onConfirmRedeem(reward.id, reward.cost)} className={`cursor-pointer rounded-md px-6 py-2 text-sm font-medium transition-colors duration-200 ${canRedeem ? "btn-bg text-white" : "cursor-not-allowed bg-gray-200 text-gray-500"}`} disabled={!canRedeem}>
            Confirm Redemption
          </button>
        </div>
      </div>
    </div>
  );
}
