"use client";
import { useState } from "react";
import LOverview from "./components/LOverview";
import LReward from "./components/LReward";
import LHistory from "./components/LHistory";
import LProcess from "./components/LProcess";

const tabs = ["Overview", "Rewards", "Points History", "How it Works"];

export default function Reward() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <div className="mx-auto mt-10 flex w-[92%] flex-col space-y-6">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-primary text-xl font-semibold">Loyality Points</h1>
        </div>
      </div>
      <div className="bg-theadBg mx-auto mt-6 mb-5 flex w-fit gap-1 rounded-lg p-0.5 md:mx-0 md:ml-[4%]">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`cursor-pointer rounded-md px-2 py-1 text-sm font-medium transition-all duration-300 md:px-4 md:py-2 ${activeTab === tab ? "bg-white text-black" : "text-btext"}`}>
            {tab}
          </button>
        ))}
      </div>
      <div className="px-0.5 pb-0.5">
        {activeTab === "Overview" && <LOverview />}
        {activeTab === "Rewards" && <LReward />}
        {activeTab === "Points History" && <LHistory />}
        {activeTab === "How it Works" && <LProcess />}
      </div>
    </>
  );
}
