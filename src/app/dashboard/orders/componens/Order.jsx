"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/DHeader";
import { ChevronDown, ChevronUp, Download, ChevronRight, Plus, Search, Calendar, Check } from "lucide-react";
import NewOrder from "../../components/NewOrder";
import OrderDetailsModal from "../../components/OrderDetailsModal";
import { dummyOrders } from "@/lib/dummyData";
import Notiflix from "notiflix";

const getPillStyling = (status) => {
  let parentBgColor = "bg-cardBg3";
  let parentTextColor = "text-primary";
  let parentBorderColor = "border-none";

  let pricePillBgColor = "bg-none";
  let pricePillTextColor = "text-primary";
  switch (status) {
    case "Delivered":
      parentBgColor = "bg-primary";
      parentTextColor = "text-white";
      pricePillBgColor = "bg-primary";
      pricePillTextColor = "text-white";
      break;
    case "Final Review":
      parentBgColor = "bg-tabBg2";
      parentTextColor = "text-primary";
      break;
    case "Order Placed":
    case "In Queue":
    case "Being Digitized":
      break;
    default:
      break;
  }
  return { parentBgColor, parentTextColor, parentBorderColor, pricePillBgColor, pricePillTextColor };
};

export default function Orders({ setActiveTab, successFlag, cancelFlag }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newOrderFlag = searchParams.get("newOrder");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Orders");
  const [searchTerm, setSearchTerm] = useState("");

  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    if (newOrderFlag) {
      setShowNewOrder(true);
    }
  }, [newOrderFlag]);

  useEffect(() => {
    if (successFlag) {
      Notiflix.Notify.success("Order successful! 🎉");
      setShowNewOrder(true);
      setShowOrderConfirm(true);
    }

    if (cancelFlag) {
      Notiflix.Notify.failure("Order not successful");
    }
  }, [successFlag, cancelFlag]);

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

  const handleClickItem = (orderId) => {
    setSelectedOrderId(orderId);
    setShowOrderDetailsModal(true);
  };
  const handleCloseOrderDetailsModal = () => {
    setShowOrderDetailsModal(false);
    setSelectedOrderId(null);
  };

  const filteredAndSearchedOrders = dummyOrders.filter((order) => {
    const matchesFilter = selectedFilter === "All Orders" || order.status === selectedFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.productType.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <div className="min-h-screen overflow-y-auto md:h-full">
        <div className="mx-auto mt-10 flex w-[92%] flex-col space-y-6">
          <div className="flex flex-col space-y-5">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-primary text-xl font-semibold">My Orders</h1>
              <div className="btn-bg flex w-fit cursor-pointer flex-row items-center space-x-1.5 rounded-lg p-1.5" onClick={() => setShowNewOrder(true)}>
                <Plus size={12} className="text-white" />
                <span className="text-xs font-medium text-white">New Order</span>
              </div>
            </div>
            <div className="flex w-fit flex-row items-center space-x-3">
              <div className="border-tLine bg-theadBg relative flex items-center rounded-md border">
                <Search size={14} className="text-btext absolute left-2 z-20" />
                <input type="text" name="search" id="search" placeholder="Search Orders" className="placeholder:text-btext relative px-2 py-1.5 pl-8 outline-0 outline-none placeholder:text-xs placeholder:font-medium" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen((prev) => !prev)} className="bg-theadBg border-tLine flex w-[120px] items-center justify-between gap-1.5 rounded-md border p-2.5">
                  <span className="text-btext cursor-pointer text-xs font-medium">{selectedFilter}</span>
                  {dropdownOpen ? <ChevronUp size={16} className="cursor-pointer" /> : <ChevronDown size={16} className="cursor-pointer" />}
                </button>
                {dropdownOpen && (
                  <div className="border-btGray absolute right-0 z-50 mt-2 w-30 rounded-xl border bg-white shadow-md">
                    <div className="divide-btGray flex flex-col divide-y">
                      {/* Filter Options */}
                      {["All Orders", "Delivered", "Final Review", "Being Digitized", "In Queue", "Order Placed"].map((option) => (
                        <span
                          key={option}
                          className="text-primary hover:bg-headBg block cursor-pointer px-3 py-2 text-sm"
                          onClick={() => {
                            setSelectedFilter(option);
                            setDropdownOpen(false);
                          }}>
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="pb0.5 px-0.5">
          <div className="bg-cardBg3 border-btGray mt-3 max-h-full w-full rounded-[10px] border">
            <div className="mx-auto flex w-[92%] flex-col space-y-4 py-5">
              <h3 className="text-primary text-sm font-semibold">Order History</h3>
              {/* ORDERS SECTION - Mapped from dummyOrders */}
              <div className="space-y-3">
                {filteredAndSearchedOrders.length > 0 ? (
                  filteredAndSearchedOrders.map((order) => {
                    const { parentBgColor, parentTextColor, parentBorderColor, pricePillBgColor, pricePillTextColor } = getPillStyling(order.status);
                    return (
                      <div key={order.id} className="border-btGray space-y-3 rounded-lg border px-4 py-2.5">
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex flex-col gap-0.5">
                            <div onClick={() => handleClickItem(order.id)} className="cursor-pointer">
                              <h4 className="text-primary hover:text-btBlue text-xs font-semibold">{order.id}</h4>
                            </div>
                            <div className="flex flex-row gap-1">
                              <Calendar size={12} className="text-btext" />
                              <span className="text-btext text-xxs font-medium">Order date {order.date}</span>
                            </div>
                          </div>
                          <div className="flex flex-row items-center gap-2">
                            <div className={`${parentBgColor} ${parentBorderColor !== "border" ? "border-btGray border" + parentBorderColor : ""} border-btGray hidden flex-row items-center gap-2 rounded-full border px-2 py-0.5 md:flex`}>
                              <span className={`text-xxs font-medium ${parentTextColor}`}>{order.status}</span>
                              <span className="text-primary text-xxs border-btGray rounded-full border bg-white px-2 py-1 font-medium">{order.productType}</span>
                              <span className={`${pricePillBgColor} ${pricePillTextColor} rounded-full px-2 py-0.5 text-xs font-semibold`}>{order.price}</span>
                            </div>
                            {/* Revert Link to button with onClick */}
                            <button onClick={() => handleClickItem(order.id)} className="border-btGray text-primary hidden cursor-pointer rounded-sm border px-1.5 py-1.5 text-xs font-medium md:block">
                              View Details
                            </button>
                            {/* Revert Link to button with onClick */}
                            <button onClick={() => handleClickItem(order.id)} className="border-btGray text-primary block cursor-pointer rounded-sm border p-0.5 md:hidden">
                              <ChevronRight size={16} />
                            </button>
                          </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="flex flex-row items-center justify-between gap-2">
                          <Image src="/ellipse.svg" width={18} height={18} alt="ellipse" />
                          <div className="bg-btGray relative h-2 w-full rounded-full">
                            <div className="bg-btBlue h-full rounded-full transition-all duration-300" style={{ width: `${order.progress}%` }}></div>
                          </div>
                          {order.progress === 100 ? <Image src="/check.svg" width={18} height={18} alt="check" /> : <span className="text-primary text-xxs font-medium">{order.progress}%</span>}
                        </div>
                        {/* Files section - Only show if order is delivered (or has files) */}
                        {(order.status === "Delivered" || order.files.length > 0) && (
                          <div className="flex flex-col gap-2">
                            <h4 className="text-primary text-xs font-medium">Files:</h4>
                            {order.files.map((file, index) => (
                              <a href={file.url} key={index} className="bg-pointBg border-pointStroke flex w-fit cursor-pointer flex-row items-center justify-start gap-1 rounded-sm border p-1.5">
                                <Download size={14} alt="download" />
                                <span className="text-primary text-xs font-medium">{file.name}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-btext py-4 text-center">No orders found matching your criteria.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        {showNewOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <NewOrder onClose={() => setShowNewOrder(false)} showOrderConfirm={showOrderConfirm} onResetConfirm={() => setShowOrderConfirm(false)} setActiveTab={setActiveTab} />
          </div>
        )}
        {showOrderDetailsModal && selectedOrderId && (
          <div className="min-hscreen absolute inset-0 z-20 rounded-b-lg bg-white">
            <OrderDetailsModal orderId={selectedOrderId} onClose={handleCloseOrderDetailsModal} />
          </div>
        )}
      </div>
    </>
  );
}
