"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { House, Package, Mail, Settings, PanelRightOpen, PanelRightClose, ChevronRight } from "lucide-react";
import Notiflix from "notiflix";

export default function Sidebar({ activeTab, setActiveTab, isMobileDrawer = false, userName, userPhoto, onClose }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [value, setValue] = useState(70);

  const handleChange = (e) => {
    setValue(Number(e.target.value));
  };

  const goToPoints = () => {
    Notiflix.Loading.circle();
    router.push("/dashboard/points");
    setTimeout(() => {
      Notiflix.Loading.remove();
    }, 1000);
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: House },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "inbox", label: "Inbox", icon: Mail },
    { id: "setting", label: "Setting", icon: Settings },
  ];
  const iconSize = collapsed && !isMobileDrawer ? 20 : 16;

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
            {collapsed ? <PanelRightClose size={20} className="text-primary hover:text-btBlue mt-5" /> : <PanelRightOpen size={20} className="text-primary hover:text-btBlue mt-0" />}
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
            <button onClick={onClose} className="text-primary hover:text-btBlue">
              <PanelRightClose size={24} />
            </button>
          </div>
        )}

        <nav className="mt-4 flex flex-col gap-4">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <div key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex cursor-pointer items-center rounded-lg transition-all ${collapsed && !isMobileDrawer ? "justify-center p-2" : "gap-3 px-3 py-2"} ${activeTab === tab.id ? "bg-tabBg1 text-btBlue" : "text-btext hover:bg-tabBg1 hover:text-primary"}`}>
                <IconComponent size={iconSize} />
                {!(collapsed && !isMobileDrawer) && <span className="text-sm font-medium">{tab.label}</span>}
                {tab.id === "inbox" && isMobileDrawer && <span className="bg-btBlue ml-auto rounded-md px-2 py-1 text-xs text-white">4</span>}
              </div>
            );
          })}
        </nav>
        {/* Divider */}
        <div className="bg-btGray my-4 h-px w-full" />
        {(!collapsed || isMobileDrawer) && (
          <div onClick={goToPoints} className="no-underline">
            <div className="points border-btGray flex cursor-pointer flex-col gap-2.5 rounded-lg border bg-white p-2 transition-all duration-200 hover:shadow-md">
              <div className="flex justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <p className="text-primary text-sm font-medium">Loyalty Points</p>
                  <span className="text-primary text-[28px] font-bold">250</span>
                  <span className="text-btext text-xs font-medium">50 points until your next reward</span>
                </div>
                <div className="bg-btBlue flex h-5 w-5 items-center justify-center rounded-full p-1 text-white">
                  <ChevronRight size={16} />
                </div>
              </div>
              <div className="w-full">
                <div className="bg-btGray relative h-2 w-full rounded-full">
                  <div className="bg-btBlue h-2 rounded-full transition-all duration-300" style={{ width: `${value}%` }} />
                </div>
              </div>
            </div>
          </div>
        )}
        {(!collapsed || isMobileDrawer) && (
          <div className="mt-10 flex w-fit cursor-pointer items-center justify-center rounded-full bg-white p-1.5 shadow">
            <Image src="/question.svg" alt="help" width={16} height={16} />
          </div>
        )}
      </div>
    </div>
  );
}
