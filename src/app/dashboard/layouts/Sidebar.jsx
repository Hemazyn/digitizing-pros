"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "../components/Logo";

export default function Sidebar({ activeTab, setActiveTab, isMobileDrawer = false, userName, userPhoto, onClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const [value, setValue] = useState(70);

  const handleChange = (e) => {
    setValue(Number(e.target.value));
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "/home.svg" },
    { id: "orders", label: "My Orders", icon: "/orders.svg" },
    { id: "inbox", label: "Inbox", icon: "/inbox.svg" },
    { id: "setting", label: "Setting", icon: "/setting.svg" },
  ];

  return (
    <div className={`relative z-20 flex flex-col space-y-6 p-4 transition-all duration-300 ${isMobileDrawer ? "w-full" : collapsed ? "w-20 items-center" : "w-64"}`}>
      <div className={`flex items-center ${collapsed && !isMobileDrawer ? "justify-center" : "justify-between"}`}>
        {!collapsed && !isMobileDrawer && (
          <div className="flex w-fit items-center gap-2 rounded-lg bg-white p-1.5 shadow">
            <div className="bg-btBlue flex h-6 w-6 items-center justify-center rounded-sm">
              <Image src="/vector2.svg" alt="logo" width={12} height={12} />
            </div>
            <span className="text-primary font-bricolage text-xs font-semibold">Digitizing Pros</span>
          </div>
        )}

        {!isMobileDrawer && (
          <div className="cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
            <Image src="/sidebar.svg" width={20} height={20} alt="toggle" className={`${collapsed ? "mt-5" : "mt-0"}`} />
          </div>
        )}

        {isMobileDrawer && (
          <div className="pb4 flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src={userPhoto || "/photoURL.svg"} alt="User Avatar" width={32} height={32} className="rounded-full" />
              <span className="text-primary font-semibold">{userName}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex h-full flex-col">
        {isMobileDrawer && (
          <div className="mb-4 flex w-full items-center justify-between">
            <div className="flex w-fit items-center gap-2 rounded-lg bg-white p-1.5 shadow">
              <div className="bg-btBlue flex h-6 w-6 items-center justify-center rounded-sm">
                <Image src="/vector2.svg" alt="logo" width={12} height={12} />
              </div>
              <span className="text-primary font-bricolage text-xs font-semibold">Digitizing Pros</span>
            </div>
            <button onClick={onClose} className="p-2">
              <Image src="/sidebar.svg" alt="Close menu" width={24} height={24} />
            </button>
          </div>
        )}

        <nav className="mt-4 flex flex-col gap-4">
          {tabs.map((tab) => (
            <div key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex cursor-pointer items-center rounded-lg transition-all ${collapsed && !isMobileDrawer ? "justify-center p-2" : "gap-3 px-3 py-2"} ${activeTab === tab.id ? "bg-tabBg1 text-primary" : "text-btext hover:bg-tabBg1 hover:text-primary"}`}>
              <Image src={tab.icon} width={collapsed && !isMobileDrawer ? 20 : 16} height={collapsed && !isMobileDrawer ? 20 : 16} alt={tab.label} />
              {!(collapsed && !isMobileDrawer) && <span className="text-sm font-medium">{tab.label}</span>}
              {tab.id === "inbox" && isMobileDrawer && <span className="ml-auto rounded-full bg-red-500 px-2 py-1 text-xs text-white">4</span>}
            </div>
          ))}
        </nav>
        {/* Divider */}
        <div className="bg-btGray my-4 h-px w-full" />
        {(!collapsed || isMobileDrawer) && (
          <div className="points border-btGray flex flex-col gap-2.5 rounded-lg border bg-white p-2">
            <div className="flex justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <p className="text-primary text-sm font-medium">Loyalty Points</p>
                <span className="text-primary text-[28px] font-bold">250</span>
                <span className="text-btext text-xs font-medium">50 points until your next reward</span>
              </div>
              <div className="bg-btBlue flex h-5 w-5 cursor-pointer items-center justify-center rounded-full p-1 text-white">
                <Image src="/arrow-right.svg" alt="arrow" width={12} height={12} />
              </div>
            </div>
            {/* range from here */}
            <div className="w-full">
              <div className="bg-btGray relative h-2 w-full rounded-full">
                <div className="bg-btBlue h-2 rounded-full transition-all duration-300" style={{ width: `${value}%` }} />
              </div>
            </div>
          </div>
        )}
        {/* Help Icon */}
        {(!collapsed || isMobileDrawer) && (
          <div className="mt-10 flex w-fit cursor-pointer items-center justify-center rounded-full bg-white p-1.5 shadow">
            <Image src="/question.svg" alt="help" width={16} height={16} />
          </div>
        )}
      </div>
    </div>
  );
}

// import { House, Package, Mail, Settings, PanelRightOpen, PanelRightClose, Bell, CircleUser, LogOut, Calendar } from "lucide-react";
