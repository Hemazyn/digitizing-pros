import React from "react";
import Image from "next/image";
import { Star, Users, Calendar, Package, CreditCard, CheckCircle } from "lucide-react";

const dummyPointsData = {
  availablePoints: 250,
  lifetimePoints: 450,
  progressToNextReward: {
    current: 250,
    target: 300,
    nextTier: "Gold",
    pointsNeeded: 50,
  },
  currentTier: {
    name: "Silver Member",
    icon: "/award.svg",
    pointsToNext: 50,
    nextTier: "Gold Tier",
  },
  recentActivity: [
    { type: "Order", id: "ORD-3091", points: 25, date: "April 16, 2025", status: "completed" },
    { type: "Referral", id: "Larry Scott", points: 30, date: "April 12, 2025" },
    { type: "Order", id: "ORD-3091", points: 25, date: "April 3, 2025", status: "completed" },
  ],
};

export default function LOverview() {
  const { availablePoints, lifetimePoints, progressToNextReward, currentTier, recentActivity } = dummyPointsData;

  const progressPercentage = (progressToNextReward.current / progressToNextReward.target) * 100;

  return (
    <div className="bg-cardBg3 border-btGray max-h-full w-full rounded-[10px] border">
      <div className="mx-auto flex w-[92%] flex-col space-y-4 py-5">
        <h3 className="text-primary text-sm font-semibold">Your Point Summary</h3>
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left Section: Loyalty Points & Recent Activity */}
          <div className="flex w-full flex-col space-y-6 lg:w-1/2">
            {/* Loyalty Points Card */}
            <div className="border-btGray flex flex-col space-y-5 rounded-lg border bg-white p-4">
              <div className="flex flex-col space-y-3">
                <h3 className="text-primary text-xs font-semibold">Loyalty Points</h3>
                <div className="text-primary flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-btext text-xxs font-medium">Available Points</span>
                    <span className="text-primary text-sm font-semibold">{availablePoints}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-btext text-xxs font-medium">Lifetime Points</span>
                    <span className="text-primary text-sm font-semibold">{lifetimePoints}</span>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="flex flex-col space-y-1.5">
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-primary text-xxs font-semibold">Progress to Next Reward</p>
                    <span className="text-xxs text-primary font-medium">
                      {progressToNextReward.current} / {progressToNextReward.target}
                    </span>
                  </div>
                  <div className="bg-pointBg h-2 rounded-full">
                    <div className="bg-btBlue h-2 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                  <div className="text-xxs text-btext flex justify-between font-medium">
                    <span>{progressToNextReward.pointsNeeded} more points needed for next reward</span>
                  </div>
                </div>

                {/* Current Tier */}
                <div className="border-btGray flex flex-col space-y-3 rounded-lg border p-2.5">
                  <div className="flex items-center space-x-3">
                    {currentTier.icon && <Image src={currentTier.icon} alt={currentTier.name} width={24} height={24} />}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <p className="text-primary text-sm font-semibold">{currentTier.name}</p>
                        {currentTier.name.includes("Silver") && <span className="text-xxs rounded-full bg-black px-2 py-0.5 font-medium text-white">Silver</span>}
                      </div>
                      <span className="text-xxs text-btext">
                        {currentTier.pointsToNext} points until {currentTier.nextTier}
                      </span>
                    </div>
                  </div>
                  <div className="bg-pointBg h-2 w-full rounded-full">
                    <div className="bg-btBlue h-2 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="bg-btGray h-px w-full"></div> {/*  divider */}
              {/* Recent Activity Card */}
              <div className="flex flex-col space-y-4 bg-white">
                <h3 className="text-primary text-xs font-semibold">Recent Activity</h3>
                {/* <div className=""> */}
                {recentActivity.map((activity, index) => (
                  <div key={index} className="py2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {activity.type === "Order" && (
                        <span className="text-green-500">
                          <CheckCircle size={16} />
                        </span>
                      )}
                      <span className="text-primary text-xs font-medium">{activity.type === "Order" ? `Order ${activity.id} ${activity.status}` : `Referral Bonus - ${activity.id}`}</span>
                    </div>
                    <span className="text-btext text-xxs font-medium">
                      +{activity.points} April {activity.date.split(" ")[1]}, {activity.date.split(" ")[2]}
                    </span>
                  </div>
                ))}
                {/* </div> */}
              </div>
            </div>
          </div>
          {/* Right Section: Ways to Earn Points */}
          <div className="flex w-full flex-col space-y-6 lg:w-1/2">
            <div className="border-btGray flex flex-col space-y-4 rounded-[10px] border bg-white p-4">
              <h3 className="text-primary text-sm font-semibold">Ways to Earn Points</h3>
              <div className="flex flex-col space-y-3">
                {/* Point Earning Rules */}
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-2">
                  <div className="flex flex-grow items-start gap-1.5">
                    <div className="shrink-0 rounded-full bg-purple-100 p-2">
                      <Package size={14} className="text-btBlue" />
                    </div>
                    <div className="flex min-w-0 flex-col gap-1">
                      <p className="text-primary text-xs font-semibold break-words whitespace-normal">Place an order</p>
                      <span className="text-btext text-xxs font-medium break-words whitespace-normal">Earn 25 points for every standard order you place with a very long description that might wrap.</span>
                    </div>
                  </div>
                  <span className="text-primary border-pointStroke bg-pointBg text-xxs ml-auto shrink-0 rounded-full border px-1.5 py-0.5 font-medium">+25 pts</span>
                </div>

                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-2">
                  <div className="flex flex-grow items-start gap-1.5">
                    <div className="shrink-0 rounded-full bg-purple-100 p-2">
                      <CreditCard size={14} className="text-btBlue" />
                    </div>
                    <div className="flex min-w-0 flex-col gap-1">
                      <p className="text-primary text-xs font-semibold break-words whitespace-normal">Rush Orders</p>
                      <span className="text-btext text-xxs font-medium break-words whitespace-normal">Earn bonus points when you choose rush service</span>
                    </div>
                  </div>
                  <span className="text-primary border-pointStroke bg-pointBg text-xxs ml-auto shrink-0 rounded-full border px-1.5 py-0.5 font-medium">+10 pts</span>
                </div>

                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-2">
                  <div className="flex flex-grow items-start gap-1.5">
                    <div className="shrink-0 rounded-full bg-purple-100 p-2">
                      <Users size={14} className="text-btBlue" />
                    </div>
                    <div className="flex min-w-0 flex-col gap-1">
                      <p className="text-primary text-xs font-semibold break-words whitespace-normal">Refer a Friend</p>
                      <span className="text-btext text-xxs font-medium break-words whitespace-normal">Earn points when your referral places their first order</span>
                    </div>
                  </div>
                  <span className="text-primary border-pointStroke bg-pointBg text-xxs ml-auto shrink-0 rounded-full border px-1.5 py-0.5 font-medium">+50 pts</span>
                </div>

                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-2">
                  <div className="flex flex-grow items-start gap-1.5">
                    <div className="shrink-0 rounded-full bg-purple-100 p-2">
                      <Calendar size={14} className="text-btBlue" /> {/* Assuming same icon for now */}
                    </div>
                    <div className="flex min-w-0 flex-col gap-1">
                      <p className="text-primary text-xs font-semibold break-words whitespace-normal">Birthday Bonus</p>
                      <span className="text-btext text-xxs font-medium break-words whitespace-normal">Receive bonus points during your birthday month</span>
                    </div>
                  </div>
                  <span className="text-primary border-pointStroke bg-pointBg text-xxs ml-auto shrink-0 rounded-full border px-1.5 py-0.5 font-medium">+100 pts</span>
                </div>

                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-2">
                  <div className="flex flex-grow items-start gap-1.5">
                    <div className="shrink-0 rounded-full bg-purple-100 p-2">
                      <Star size={14} className="text-btBlue" />
                    </div>
                    <div className="flex min-w-0 flex-col gap-1">
                      <p className="text-primary text-xs font-semibold break-words whitespace-normal">Leave a Review</p>
                      <span className="text-btext text-xxs font-medium break-words whitespace-normal">Share your experience and earn bonus points</span>
                    </div>
                  </div>
                  <span className="text-primary border-pointStroke bg-pointBg text-xxs ml-auto shrink-0 rounded-full border px-1.5 py-0.5 font-medium">+15 pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
