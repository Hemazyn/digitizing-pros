"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { Menu, X, ShoppingCart, ChevronDown, ChevronUp, House, Package, Mail, LogOut, Loader } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import Image from "next/image";
import { Notify } from "notiflix";

export default function Header({ className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth();
  const { totalItemsInCart } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events?.on("routeChangeStart", handleStart);
    router.events?.on("routeChangeComplete", handleComplete);
    router.events?.on("routeChangeError", handleComplete);

    return () => {
      router.events?.off("routeChangeStart", handleStart);
      router.events?.off("routeChangeComplete", handleComplete);
      router.events?.off("routeChangeError", handleComplete);
    };
  }, [router]);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      Notify.failure("Error signing out:", error);
    }
  };

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

  const firstName = user?.displayName?.split(" ")[0] || "Guest";

  return (
    <header className={`fixed z-50 w-full transition-colors duration-300 ${scrolled ? "border-btGray border-b bg-white/50 backdrop-blur-sm" : "bg-transparent"} ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 lg:px-20">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          <a href="/#main" onClick={() => setLoading(true)} className="hover:text-btBlue cursor-pointer text-sm font-medium hover:font-semibold">
            Home
          </a>
          <a href="/#how-it-works" className="hover:text-btBlue cursor-pointer text-sm font-medium hover:font-semibold">
            How it Works
          </a>
          <a href="/#pricing" className="hover:text-btBlue cursor-pointer text-sm font-medium hover:font-semibold">
            Pricing
          </a>
          <Link href="/contact" onClick={() => setLoading(true)} className={`hover:text-btBlue cursor-pointer text-sm font-medium hover:font-semibold ${pathname === "/contact" ? "text-btBlue" : "text-black"}`}>
            Contact
          </Link>
          <Link href="/store" onClick={() => setLoading(true)} className={`hover:text-btBlue cursor-pointer text-sm font-medium hover:font-semibold ${pathname === "/store" ? "text-btBlue" : "text-black"}`}>
            Store
          </Link>
          {loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <Loader size={40} className="text-btBlue animate-spin" />
            </div>
          )}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <div className="flex flex-row items-center gap-5">
              <Link href="/store/cart" className="text-primary hover:text-btBlue relative" aria-label="Cart">
                <ShoppingCart size={20} />
                {isClient && totalItemsInCart > 0 && <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">{totalItemsInCart}</span>}
              </Link>
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen((prev) => !prev)} className="flex items-center gap-1.5 p-1">
                  {user.photoURL && <Image src={user.photoURL} alt="Avatar" width={20} height={20} className="rounded-full" />}
                  <span className="cursor-pointer text-sm font-medium">{firstName}</span>
                  {dropdownOpen ? <ChevronUp size={16} className="text-primary hover:text-btBlue cursor-pointer" /> : <ChevronDown size={16} className="text-primary hover:text-btBlue cursor-pointer" />}
                </button>
                {dropdownOpen && (
                  <div className="border-btGray absolute right-0 z-50 mt-2 flex w-30 flex-col rounded-xl border bg-white p-0.5">
                    <Link href="/dashboard" className="text-primary hover:text-btBlue relative flex cursor-pointer flex-row items-center justify-start gap-3 rounded-t-xl px-2 py-2">
                      <House size={16} />
                      <span className="text-xs">Dashboard</span>
                    </Link>
                    <Link href="/store" className="text-primary hover:text-btBlue relative flex cursor-pointer flex-row items-center justify-start gap-3 px-2 py-2">
                      <Package size={16} />
                      <span className="text-sm">Store</span>
                    </Link>
                    <Link href="dashboard?tab=inbox" className="text-primary hover:text-btBlue relative flex cursor-pointer flex-row items-center justify-start gap-3 px-2 py-2">
                      <Mail size={16} />
                      <span className="text-sm">Inbox</span>
                    </Link>
                    <div className="bg-btGray h-px w-full"></div> {/*  divider */}
                    <button onClick={handleLogout} className="text-primary hover:text-btBlue relative flex cursor-pointer flex-row items-center justify-start gap-3 rounded-b-xl px-2 py-2">
                      <LogOut size={16} />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden gap-2.5 md:flex">
              <Link href="/login" className="rounded-lg px-2.5 py-2 text-sm font-medium shadow">
                Login
              </Link>
              <Link href="/store" className="btn-bg rounded-lg px-2.5 py-2 text-sm font-medium text-white">
                Shop Now
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-row items-center gap-4 md:hidden">
          <Link href="/store/cart" className="text-primary hover:text-btBlue relative" aria-label="Cart">
            <ShoppingCart size={20} />
            {isClient && totalItemsInCart > 0 && <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">{totalItemsInCart}</span>}
          </Link>
          <button className="text-primary hover:text-btBlue cursor-pointer md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} className="text-primary hover:text-btBlue" /> : <Menu size={24} className="text-primary hover:text-btBlue" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="border-btGray flex h-70 flex-row items-start justify-between gap-6 rounded-b-lg border-t bg-gradient-to-b from-[#E0E7FF] to-white px-6 py-5 shadow-md md:hidden">
          <nav className="flex flex-col gap-4">
            {["Home", "How it Works", "Pricing"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "")}`} className="hover:text-btBlue text-base font-medium text-gray-800 transition-colors">
                {item}
              </a>
            ))}
            <a href="/contact" className="hover:text-btBlue text-base font-medium text-gray-800 transition-colors">
              Contact
            </a>
            <a href="/store" className="hover:text-btBlue text-base font-medium text-gray-800 transition-colors">
              Store
            </a>
          </nav>
          {user ? (
            <div className="border-btGray flex flex-row items-center gap-3 rounded-lg border px-2">
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen((prev) => !prev)} className="flex items-center gap-1.5 p-1">
                  {user.photoURL && <Image src={user.photoURL} alt="User Avatar" width={20} height={20} className="rounded-full" />}
                  <span className="text-sm font-medium">{firstName}</span>
                  {dropdownOpen ? <ChevronUp size={16} className="text-primary hover:text-btBlue" /> : <ChevronDown size={16} className="text-primary hover:text-btBlue" />}
                </button>
                {dropdownOpen && (
                  <div className="border-btGray absolute right-0 z-50 mt-2 flex w-30 flex-col rounded-xl border bg-white p-0.5">
                    <Link href="/dashboard" className="text-primary hover:text-btBlue relative flex cursor-pointer flex-row items-center justify-start gap-3 rounded-t-xl px-2 py-2">
                      <House size={16} />
                      <span className="text-xs">Dashboard</span>
                    </Link>
                    <Link href="/store" className="text-primary hover:text-btBlue relative flex cursor-pointer flex-row items-center justify-start gap-3 px-2 py-2">
                      <Package size={16} />
                      <span className="text-sm">Store</span>
                    </Link>
                    <Link href="/dashboard?tab=inbox" className="text-primary hover:text-btBlue relative flex cursor-pointer flex-row items-center justify-start gap-3 px-2 py-2">
                      <Mail size={16} />
                      <span className="text-sm">Inbox</span>
                    </Link>
                    <div className="bg-btGray h-px w-full"></div> {/*  divider */}
                    <button onClick={handleLogout} className="text-primary hover:text-btBlue relative flex cursor-pointer flex-row items-center justify-start gap-3 rounded-b-xl px-2 py-2">
                      <LogOut size={16} />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-2.5 md:flex">
              <Link href="/login" className="rounded-lg px-2.5 py-2 text-sm font-medium shadow">
                Login
              </Link>
              <Link href="/store" className="btn-bg rounded-lg px-2.5 py-2 text-sm font-medium text-white">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
