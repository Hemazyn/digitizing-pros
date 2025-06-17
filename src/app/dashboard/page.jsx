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
  const [activeTab, setActiveTab] = useState("inbox");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const firstName = user?.displayName?.split(" ")[0] || "Buddy!";
  const photoURL = user?.photoURL || "/photoURL.svg";

  return (
    <div className="bg-theadBg mb-16 flex h-5/5 flex-col overflow-y-scroll md:mb-0 md:flex-row">
      {mobileSidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileSidebarOpen(false)}></div>}
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isMobileDrawer={false} />
      </div>
      <div className={`fixed inset-y-0 left-0 z-50 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:hidden ${mobileSidebarOpen ? "w-full translate-x-0" : "w-full -translate-x-full"}`}>
        <Sidebar
          activeTab={activeTab}
          isMobileDrawer={true}
          userName={firstName}
          userPhoto={photoURL}
          onClose={toggleMobileSidebar}
          setActiveTab={(id) => {
            setActiveTab(id);
            setMobileSidebarOpen(false);
          }}
        />
      </div>
      <main className="relative flex flex-1 flex-col overflow-y-scroll bg-white md:m-1.5 md:rounded-lg">
        <Header iconSrc="/home.svg" title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace("-", " ")} onMenuToggle={toggleMobileSidebar} />
        <div className="relative flex-1 overflow-y-auto">
          <TabPanel activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </main>
      <div className="block md:hidden">
        <BottomNavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
