"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import MyAccount from "../components/MyAccount";
import Profile from "../components/Profile";
import Notification from "../components/Notification";
import Billing from "../components/Billing";
import Security from "../components/Security";

const tabs = ["Account", "Profile", "Notifications", "Billing", "Security"];

export default function Settings() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <div className="mx-auto mt-10 flex w-[92%] flex-col space-y-6">
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-primary text-xl font-semibold">Settings</h1>
          <div className="btn-bg flex w-fit cursor-pointer flex-row rounded-lg p-1.5">
            <span className="text-xs font-medium text-white">Save Changes</span>
          </div>
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
        {activeTab === "Account" && <MyAccount />}
        {activeTab === "Profile" && <Profile />}
        {activeTab === "Notifications" && <Notification />}
        {activeTab === "Billing" && <Billing />}
        {activeTab === "Security" && <Security />}
      </div>
    </>
  );
}
