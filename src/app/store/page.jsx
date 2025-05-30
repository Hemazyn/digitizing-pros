"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import Header from "../components/Header";
import { Search } from "lucide-react";
import Footer from "../components/Footer";
import Aside from "./components/Aside";
import Contents from "./components/Contents";

export default function StorePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (!user) return <h1>Welcome Buddy!</h1>;

  const displayInitial = user.displayName ? user.displayName.charAt(0).toUpperCase() : "?";
  const firstName = user.displayName ? user.displayName.split(" ")[0] : "?";

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-800">
      <Header />
      <div className="flex h-120 w-full flex-col justify-center gap-8 bg-linear-to-b from-white via-[#FFF0E2] to-[#EFEEFF] px-3 text-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold md:text-3xl lg:text-[48px]">Embroidery Design Shop</h1>
          <p className="text-gray-600">
            {" "}
            Browse our collection of pre-digitized designs, patches, <br /> and embroidery tools{" "}
          </p>
        </div>
        <div className="relative mx-auto w-70 rounded-lg bg-white md:w-100 lg:w-150">
          <Search className="text-btext absolute top-1/2 left-3 h-4.5 -translate-y-1/2" />
          <input type="text" placeholder="Search designs, patches, and more..." className="text-btext w-full rounded-lg py-1.5 pr-4 pl-10 outline-0 placeholder:text-xs md:placeholder:text-base" />
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="text-primary flex items-center rounded-full bg-white px-3 py-2 text-sm font-medium">Pre-Digitized Designs</span>
          <span className="text-primary flex items-center rounded-full bg-white px-3 py-2 text-sm font-medium">Embroidery Patches</span>
          <span className="text-primary flex items-center rounded-full bg-white px-3 py-2 text-sm font-medium">Digitizing Packages</span>
        </div>
      </div>
      <div className="w5/6 mx-auto mt-5 mb-5 flex w-full flex-col gap-8 px-4 md:mt-10 md:w-11/12 md:flex-row md:px-0">
        <Aside />
        <Contents />
      </div>
      <Footer />
    </div>
  );
}
