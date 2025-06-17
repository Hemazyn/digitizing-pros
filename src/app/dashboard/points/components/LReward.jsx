"use client";
import React, { useState } from "react";
import Image from "next/image";
import Notiflix from "notiflix";
import RedeemModal from "../../components/RedeemReward";
import CongratsModal from "../../components/CongratsModal";

const dummyRewards = [
  {
    id: "discount-10",
    image: "/reward1.png",
    title: "$10 Discount",
    description: "Get $10 off your next order",
    cost: 100,
    isPopular: true,
  },
  {
    id: "rush-service",
    image: "/reward2.png",
    title: "Free Rush Service",
    description: "Upgrade to rush service (12-hour turnaround) for free",
    cost: 50,
    isPopular: false,
  },
  {
    id: "discount-25",
    image: "/reward3.png",
    title: "$25 Discount",
    description: "Get $25 off your next order",
    cost: 250,
    isPopular: true,
  },
];

export default function AvailableRewards({ userCurrentPoints = 250 }) {
  const [availablePoints, setAvailablePoints] = useState(userCurrentPoints);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [redeemedRewardIds, setRedeemedRewardIds] = useState([]);

  const handleRedeemClick = (reward) => {
    if (redeemedRewardIds.includes(reward.id)) {
      return Notiflix.Notify.info(`You have already redeemed "${reward.title}".`);
    }
    if (availablePoints < reward.cost) {
      return Notiflix.Notify.warning(`You need ${reward.cost - availablePoints} more points to redeem ${reward.title}.`);
    }
    setSelectedReward(reward);
    setShowRedeemModal(true);
  };

  const handleConfirmRedemption = () => {
    if (!selectedReward) return;

    if (redeemedRewardIds.includes(selectedReward.id)) {
      return Notiflix.Notify.info("You have already redeemed this reward.");
    }

    if (availablePoints < selectedReward.cost) {
      return Notiflix.Notify.warning("Insufficient points.");
    }

    setAvailablePoints((prev) => prev - selectedReward.cost);
    setRedeemedRewardIds((prev) => [...prev, selectedReward.id]);
    Notiflix.Notify.success(`Successfully redeemed ${selectedReward.title}!`);

    setShowRedeemModal(false);
    setShowCongratsModal(true);
  };

  const handleCloseCongratsModal = () => {
    setShowCongratsModal(false);
    setSelectedReward(null);
  };

  return (
    <div className="bg-cardBg3 border-btGray max-h-full w-full rounded-[14px] border">
      <div className="mx-auto flex w-[92%] flex-col space-y-4 py-5">
        <h3 className="text-primary text-sm font-semibold">Available Rewards</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dummyRewards.map((reward) => {
            const isRedeemed = redeemedRewardIds.includes(reward.id);
            const canAfford = availablePoints >= reward.cost;

            return (
              <div key={reward.id} className="border-btGray flex flex-col overflow-hidden rounded-[10px] border bg-white p-1 shadow-sm">
                <div className="relative h-50 w-full overflow-hidden">
                  <Image src={reward.image} alt={reward.title} layout="fill" objectFit="cover" className="rounded-lg" />
                </div>
                <div className="flex flex-grow flex-col space-y-2">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-primary text-xs font-semibold">{reward.title}</h3>
                      <p className="text-btext text-xxs font-medium">{reward.description}</p>
                    </div>
                    {reward.isPopular && <span className="text-xxs bg-btBlue/10 text-btBlue rounded-full px-2 py-1 font-medium">Popular</span>}
                  </div>
                  <div className="border-btGray mt-auto flex items-center justify-between border-t p-2">
                    <span className="text-primary text-xxs font-semibold">{reward.cost} Points</span>
                    <button onClick={() => handleRedeemClick(reward)} disabled={isRedeemed || !canAfford} className={`rounded-md px-4 py-2 text-xs font-medium transition-colors duration-200 ${isRedeemed ? "cursor-not-allowed bg-gray-300 text-gray-600" : canAfford ? "bg-btBlue cursor-pointer text-white" : "btn-bg cursor-pointer text-white"}`}>
                      {isRedeemed ? "Redeemed" : "Redeem"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedReward && <RedeemModal isOpen={showRedeemModal} onClose={() => setShowRedeemModal(false)} reward={selectedReward} availablePoints={availablePoints} onConfirmRedeem={handleConfirmRedemption} />}

      <CongratsModal isOpen={showCongratsModal} onClose={handleCloseCongratsModal} rewardTitle={selectedReward?.title} />
    </div>
  );
}
