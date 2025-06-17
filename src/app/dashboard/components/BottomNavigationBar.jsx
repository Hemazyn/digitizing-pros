import React from "react";
import Link from "next/link";
import { House, Package, Mail, Settings } from "lucide-react";

export default function BottomNavigationBar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: "dashboard", name: "Dashboard", icon: House, href: "/dashboard" },
    { id: "orders", name: "My Orders", icon: Package, href: "/dashboard" },
    { id: "inbox", name: "Inbox", icon: Mail, href: "/dashboard" },
    { id: "setting", name: "Settings", icon: Settings, href: "/dashboard" },
  ];

  return (
    <nav className="border-btGray z50 fixed inset-x-0 bottom-0 border-t bg-white shadow-lg md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link key={item.id} href={item.href} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center justify-center pt-2.5 text-xs font-medium ${activeTab === item.id ? "text-btBlue border-b-2 font-semibold" : "text-btext font-semibold"}`}>
              <IconComponent size={20} className="mb-1" />
              {item.name}
              {item.name === "Inbox" && <span className="bg-btBlue/30 text-btBlue absolute top-2 right-5 -mt-1.5 ml-1 flex h-4 w-4 items-center justify-center rounded-md text-center text-xs">4</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
