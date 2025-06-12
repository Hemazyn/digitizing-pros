import React from "react";
import Link from "next/link";

export default function BottomNavigationBar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: "dashboard", name: "Dashboard", icon: "/home.svg", href: "/dashboard" },
    { id: "orders", name: "My Orders", icon: "/orders.svg", href: "/dashboard" },
    { id: "inbox", name: "Inbox", icon: "/inbox.svg", href: "/dashboard" },
    { id: "setting", name: "Settings", icon: "/setting.svg", href: "/dashboard" },
  ];

  return (
    <nav className="border-btGray fixed inset-x-0 bottom-0 z-50 border-t bg-white pt-2 shadow-lg md:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => (
          <Link key={item.id} href={item.href} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center justify-center p-2 text-xs font-medium ${activeTab === item.id ? "text-btBlue font-semibold" : "text-btext font-semibold"}`}>
            <img src={item.icon || "/icons/placeholder.svg"} alt={item.name} className={`mb-1 h-6 w-6 ${activeTab === item.id ? "fill-btBlue" : "fill-btGray"}`} />
            {item.name}
            {item.name === "Inbox" && <span className="absolute top-2 right-5 -mt-0.5 ml-1 h-5 w-5 place-content-center rounded-full bg-red-500 text-center text-xs text-white">4</span>}
          </Link>
        ))}
      </div>
    </nav>
  );
}
