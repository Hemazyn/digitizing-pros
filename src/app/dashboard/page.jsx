"use client";
import { useState } from "react";
import Sidebar from "./layouts/Sidebar";
import TabPanel from "./layouts/TabPanel";
import BottomNavigationBar from "./components/BottomNavigationBar";
import Header from "./components/DHeader";
import DashboardUI from "./layouts/DashboardUI";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const firstName = user?.displayName?.split(" ")[0] || "Buddy!";
  const photoURL = user?.photoURL || "/photoURL.svg";

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 md:flex-row">
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isMobileDrawer={false} />
      </div>

      <div className={`fixed inset-y-0 left-0 z-50 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:hidden ${mobileSidebarOpen ? "w-full translate-x-0" : "w-full -translate-x-full"}`}>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(id) => {
            setActiveTab(id);
            setMobileSidebarOpen(false);
          }}
          isMobileDrawer={true}
          userName={firstName}
          userPhoto={photoURL}
          onClose={toggleMobileSidebar}
        />
      </div>
      {mobileSidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileSidebarOpen(false)}></div>}
      <main className="relative flex min-h-screen flex-1 flex-col bg-white pb-16 md:m-1.5 md:rounded-lg md:shadow-lg">
        <Header iconSrc="/home.svg" title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace("-", " ")} onMenuToggle={toggleMobileSidebar} />
        <div className="p4 flex-1 md:p-0">
          <TabPanel activeTab={activeTab} />
        </div>
        <div className="md:hidden">
          <BottomNavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </main>
    </div>
  );
}
