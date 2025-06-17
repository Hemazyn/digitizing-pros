"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import Notiflix from "notiflix";
import DOrderConfirm from "./DOrderConfirm";

export default function NewOrder({ onClose, onLogout, setActiveTab }) {
  const router = useRouter();
  const [complexityDropdownOpen, setComplexityDropdownOpen] = useState(false);
  const [formatDropdownOpen, setFormatDropdownOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedComplexity, setSelectedComplexity] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const complexityRef = useRef();
  const formatRef = useRef();
  const dropdownRef = useRef();
  const [showDOrderConfirm, setShowDOrderConfirm] = useState(false);

  const complexities = ["Simple", "Medium", "Complex"];
  const fileFormats = ["DST", "EMB", "PSE", "PXF", "JEF", "CND", "HUS", "NGS", "EXP"];

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    if (success === "true") {
      setShowDOrderConfirm(true);
    }

    if (canceled === "true") {
      Notiflix.Notify.failure("Order not successful");
      router.replace("/dashboard", { scroll: false });
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setComplexityDropdownOpen(false);
        setFormatDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    if (onClose) {
      onClose();
    }
  };
  const handleButtonClick = (buttonName) => {
    console.log(`${buttonName} clicked`);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      console.log("Selected file:", file);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCheckout = async () => {
    const instructions = document.getElementById("bio")?.value || "";
    const email = document.querySelector('input[type="email"]')?.value || "";
    if (!selectedPlan || !selectedSize || !selectedComplexity || !selectedFormat || !email) {
      Notiflix.Notify.failure("Please fill out all required fields before checking out.");
      return;
    }
    const payload = { selectedPlan, selectedSize, selectedComplexity, selectedFormat, email, instructions };
    try {
      Notiflix.Loading.standard("Redirecting to payment...");
      const res = await fetch("/api/payment/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      Notiflix.Loading.remove();
      if (res.ok && data?.url) {
        Notiflix.Notify.success("Redirecting to Stripe checkout...");
        window.location.href = data.url;
      } else {
        Notiflix.Notify.failure("Failed to initiate payment. Please try again.");
        console.error("Stripe checkout session creation failed:", data);
      }
    } catch (err) {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure("Something went wrong. Please try again.");
      console.error("Error starting checkout:", err);
    }
  };

  if (showDOrderConfirm) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <DOrderConfirm
          onClose={() => {
            setShowDOrderConfirm(false);
            onClose?.();
            setActiveTab?.("dashboard");
            router.push("/dashboard");
          }}
          onTrackOrder={() => {
            setShowDOrderConfirm(false);
            onClose?.();
            setActiveTab?.("orders");
            router.push("/dashboard");
          }}
        />
      </div>
    );
  }

  return (
    <section className="border-btGray bg-theadBg relative flex h-4/5 w-full flex-col items-center space-y-3 overflow-y-auto scroll-smooth rounded-[18px] border p-0.5 md:mb-0 md:h-[80%] md:w-2/5 lg:h-[70%]">
      <div className="mx-auto mt-2 flex w-[92%] flex-row items-start justify-between gap-1">
        <div className="flex flex-col">
          <h3 className="text-primary text-sm font-semibold">Upload Your Design</h3>
          <p className="text-btext text-xxs font-medium">Upload your artwork and we'll digitize it for embroidery within 24 hours</p>
        </div>
        <Image src="/cancel.svg" width={20} height={20} alt="close new order" className="absolute right-2.5 cursor-pointer" onClick={onClose} />
      </div>
      <section className="border-btGray relative h-fit w-full rounded-[10px] border bg-white">
        <div className="mx-auto flex w-[92%] flex-col space-y-5 py-5">
          {/* info */}
          <div className="flex flex-col gap-3">
            <div className="flex w-full flex-col space-y-2">
              <p className="text-primary text-xs font-semibold">Select Your Plan</p>
              <div className="flex flex-row items-center justify-between">
                {["Embroidery Digitizing", "Vector Services", "Embroidery Patches"].map((plan) => (
                  <button key={plan} onClick={() => setSelectedPlan(plan)} className={`text-xxs w-40 cursor-pointer rounded-md border px-0 py-2.5 font-semibold shadow md:px-3 ${selectedPlan === plan ? "border-btBlue text-btBlue" : "border-btGray text-primary hover:border-btBlue hover:text-btBlue"}`}>
                    {plan}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col space-y-2">
              <p className="text-primary text-xs font-semibold">Upload Your Artwork</p>
              <div onClick={handleUploadClick} className="border-btGray flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dotted p-4">
                <Image src="/file2.svg" width={28} height={28} alt="file upload" />
                <p className="text-xxs text-btext text-center font-medium">
                  <span className="text-primary hover:text-btBlue cursor-pointer font-semibold">Upload a file</span> or drag and drop <br /> JPG, PNG, GIF, SVG, AI, PDF up to 10MB
                </p>
                <input type="file" accept=".jpg,.jpeg,.png,.gif,.svg,.ai,.pdf" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
              </div>
              {uploadedFile && <p className="text-btBlue mt-1 text-xs font-medium">Selected file: {uploadedFile.name}</p>}
            </div>

            <div className="flex w-full flex-col space-y-2">
              <p className="text-primary text-xs font-semibold">Design Size</p>
              <div className="flex flex-row items-center gap-3">
                {[
                  { label: "Under 5 Inches", description: "For chest logos, hat fronts, shirt sleeves, small patches" },
                  { label: "Over 5 Inches", description: "For back of jackets, large tote bags, big patches" },
                ].map(({ label, description }) => (
                  <div key={label} onClick={() => setSelectedSize(label)} className={`flex cursor-pointer flex-col gap-1 rounded-md border px-3.5 py-2.5 ${selectedSize === label ? "border-btBlue" : "border-btGray hover:border-btBlue"}`}>
                    <p className="text-primary text-xs font-medium">{label}</p>
                    <span className="text-xxs text-btext font-medium">{description}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col space-y-2">
              <p className="text-primary text-xs font-semibold">Design Complexity</p>
              <div className="relative" ref={complexityRef}>
                <button
                  onClick={() => {
                    setComplexityDropdownOpen((prev) => !prev);
                    setFormatDropdownOpen(false);
                  }}
                  className="border-sLine text-primary flex w-full items-center justify-between gap-1.5 rounded-md border bg-white px-3 py-3 text-sm font-semibold">
                  <span className="text-xxs text-btext font-semibold">{selectedComplexity}</span>
                  {complexityDropdownOpen ? <ChevronUp size={16} className="text-primary hover:text-btBlue cursor-pointer" /> : <ChevronDown size={16} className="text-primary hover:text-btBlue cursor-pointer" />}
                </button>
                {complexityDropdownOpen && (
                  <div className="border-btGray absolute right-0 z-50 mt-2 w-30 rounded-xl border bg-white">
                    <div className="divide-btGray flex flex-col divide-y">
                      {complexities.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedComplexity(item);
                            setComplexityDropdownOpen(false);
                          }}
                          className="text-primary hover:bg-headBg hover:text-btBlue w-full px-4 py-2 text-left text-xs font-medium">
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-full flex-col space-y-2">
              <p className="text-primary text-xs font-semibold">Preferred File Format</p>
              <div className="relative" ref={formatRef}>
                <button
                  onClick={() => {
                    setFormatDropdownOpen((prev) => !prev);
                    setComplexityDropdownOpen(false);
                  }}
                  className="border-sLine text-primary flex w-full items-center justify-between gap-1.5 rounded-md border bg-white px-3 py-3 text-sm font-semibold">
                  <span className="text-xxs text-btext">{selectedFormat}</span>
                  {formatDropdownOpen ? <ChevronUp size={16} className="text-primary hover:text-btBlue cursor-pointer" /> : <ChevronDown size={16} className="text-primary hover:text-btBlue cursor-pointer" />}
                </button>
                {formatDropdownOpen && (
                  <div className="border-btGray absolute right-0 z-50 mt-2 w-30 rounded-xl border bg-white">
                    <div className="divide-btGray flex flex-col divide-y">
                      {fileFormats.map((format, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedFormat(format);
                            setFormatDropdownOpen(false);
                          }}
                          className="text-primary hover:text-btBlue w-full cursor-pointer px-4 py-2 text-left text-xs font-medium focus:outline-none">
                          {format}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary block text-xs font-medium">Special Instructions</label>
              <textarea name="bio" id="bio" cols="3" placeholder="Enter any special instructions or requirements for your design.." className="border-sLine w-full rounded-lg border px-4 py-2 text-xs font-medium outline-0 placeholder:text-xs placeholder:font-medium"></textarea>
              <span className="text-btext text-xxs">This is the name that will be displayed to other users.</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary block text-xs font-medium">Email Address</label>
              <input type="email" placeholder="Sidiatbruma@gmail.com" className="border-sLine text-primary w-full rounded-lg border px-4 py-2 text-xs font-medium outline-0 placeholder:text-xs placeholder:font-medium" />
              <span className="text-btext text-xxs font-thin">We'll send your completed files to this email address</span>
            </div>
          </div>
          <div className="bg-btGray h-px w-full"></div> {/* divider */}
          <div className="bg-theadBg flex flex-row items-start justify-between rounded-md p-2">
            <div className="flex flex-col gap-1">
              <p className="text-xxs text-primary font-semibold">Estimated Price</p>
              <span className="text-btext text-[8px] font-normal">Final price may vary based on actual design complexity</span>
            </div>
            <span className="text-primary text-xs font-semibold">$7</span>
          </div>
          {/* price */}
        </div>
      </section>
      <button onClick={handleCheckout} className="btn-bg mb-3 w-5/6 cursor-pointer rounded-lg py-2 text-sm font-medium text-white">
        Continue to Payment
      </button>
    </section>
  );
}

// use a library to handle select File upload for nice UI.
