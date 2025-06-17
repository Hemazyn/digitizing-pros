"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, CircleUser, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import { Notify } from "notiflix";

export default function Header({ iconSrc = "/home.svg", title = "Dashboard", onMenuToggle }) {
  const { user } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      Notify.failure(`Error signing out: ${error.message}`);
      console.error("Error signing out:", error);
    }
  };

  const firstName = user?.displayName?.split(" ")[0] || "Buddy!";
  const photoURL = user?.photoURL || "/photoURL.svg";

  return (
    <div className="border-btGray flex items-center justify-between rounded-t-lg border-b bg-white px-3 py-3 md:px-6">
      <div className="flex items-center gap-1.5">
        <button onClick={onMenuToggle} className="p-1 md:hidden">
          <Image src="/menu.svg" alt="Menu" width={24} height={24} />
        </button>
        <div className="hidden items-center gap-1.5 md:flex">
          <Image src={iconSrc} width={16} height={16} alt="dashboard" />
          <span className="text-primary text-sm font-medium">{title}</span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="bg-pointBg flex gap-1.5 rounded-md px-2 py-1.5">
          <Image src="/award.svg" width={14} height={14} alt="award" />
          <span className="text-primary text-xs font-medium md:text-sm">Points earned [250] out of [300]</span>
        </div>
        <div className="bg-btGray mx-3 hidden h-4 w-px md:block"></div>
        <button className="relative p-1">
          <Image src="/notification.svg" width={18} height={18} alt="notification" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
        <div className="bg-btGray mx-3 hidden h-4 w-px md:block"></div> {/*  divider */}
        <div className="relative hidden md:block" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen((prev) => !prev)} className="flex items-center gap-1.5 p-1">
            <Image src={photoURL} alt="Avatar" width={20} height={20} className="rounded-full" />
            <span className="cursor-pointer text-sm font-medium">{firstName}</span>
            {dropdownOpen ? <ChevronUp size={16} className="cursor-pointer" /> : <ChevronDown size={16} className="cursor-pointer" />}
          </button>
          {dropdownOpen && (
            <div className="border-btGray absolute right-0 z-50 mt-3.5 flex w-30 flex-col rounded-xl border bg-white p-0.5">
              <Link href="#" className="text-primary hover:text-btBlue relative flex cursor-pointer items-center justify-start gap-3 rounded-t-xl px-3 py-2">
                <CircleUser size={16} />
                <span className="text-sm">Profile</span>
              </Link>
              <Link href="#" className="text-primary hover:text-btBlue relative flex cursor-pointer items-center justify-start gap-3 px-3 py-2">
                <Settings size={16} />
                <span className="text-sm">Setting</span>
              </Link>
              <div className="bg-btGray h-px w-full"></div> {/*  divider */}
              <button onClick={handleLogout} className="text-primary hover:text-btBlue relative flex cursor-pointer items-center justify-start gap-3 rounded-b-xl px-3 py-2">
                <LogOut size={16} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
