"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../components/DHeader";
import { ChevronDown, ChevronUp, Download, ChevronRight } from "lucide-react";
import NewOrder from "../components/NewOrder";

const dummyOrders = [
  {
    id: "ORD-3091",
    date: "April 16, 2025",
    status: "Delivered",
    productType: "Embroidery Digitizing",
    price: "$8",
    progress: 100,
    files: [{ name: "Logo.png", url: "#" }],
  },
  {
    id: "ORD-3092",
    date: "April 15, 2025",
    status: "Final Review",
    productType: "Embroidery Digitizing",
    price: "$8",
    progress: 90,
    files: [{ name: "Design_v2.ai", url: "#" }],
  },
  {
    id: "ORD-3093",
    date: "April 14, 2025",
    status: "Being Digitized",
    productType: "Vector Services",
    price: "$12",
    progress: 50,
    files: [],
  },
  {
    id: "ORD-3094",
    date: "April 13, 2025",
    status: "In Queue",
    productType: "Embroidery Patches",
    price: "$10",
    progress: 25,
    files: [],
  },
  {
    id: "ORD-3095",
    date: "April 12, 2025",
    status: "Order Placed",
    productType: "Embroidery Digitizing",
    price: "$7",
    progress: 10,
    files: [],
  },
];

const getPillStyling = (status) => {
  let parentBgColor = "bg-cardBg3"; // Default light gray background for most statuses
  let parentTextColor = "text-primary";
  let parentBorderColor = "border-none"; // Most pills in screenshot don't seem to have a border

  let pricePillBgColor = "bg-none"; // Default background for price pill
  let pricePillTextColor = "text-primary"; // Default text color for price pill

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

export default function Orders() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const router = useRouter();
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Orders");
  const [searchTerm, setSearchTerm] = useState("");

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
    router.push(`/dashboard/orders/${orderId}`);
  };

  const filteredAndSearchedOrders = dummyOrders.filter((order) => {
    const matchesFilter = selectedFilter === "All Orders" || order.status === selectedFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.productType.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <div className="mx-auto mt-10 flex w-[92%] flex-col space-y-6">
        <div className="flex flex-col space-y-5">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-primary text-xl font-semibold">My Orders</h1>
            <div className="btn-bg flex w-fit cursor-pointer flex-row space-x-1.5 rounded-lg p-1.5" onClick={() => setShowNewOrder(true)}>
              <Image src="/new.svg" width={12} height={12} alt="new order" />
              <span className="text-xs font-medium text-white">New Order</span>
            </div>
          </div>
          <div className="flex w-fit flex-row items-center space-x-3">
            <div className="relative flex">
              <Image src="/search.svg" width={14} height={14} alt="search" className="absolute top-3.5 left-2.5 z-20" />
              <input type="search" name="search" id="search" placeholder="Search Orders" className="bg-theadBg border-tLine placeholder:text-btext relative rounded-md border px-2 py-1.5 pl-8 outline-0 placeholder:text-xs placeholder:font-medium" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
      <div className="px-0.5 pb-0.5">
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
                            <Image src="/calendar.svg" width={12} height={12} alt="calendar" />
                            <span className="text-btext text-xxs font-medium">Order date {order.date}</span>
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          {/* Main pill container with dynamic background/text - Now hidden on mobile */}
                          <div className={`${parentBgColor} ${parentBorderColor !== "border" ? "border-btGray border" + parentBorderColor : ""} border-btGray hidden flex-row items-center gap-2 rounded-full border px-2 py-0.5 md:flex`}>
                            {/* Status Text (color inherited from parent) */}
                            <span className={`text-xxs font-medium ${parentTextColor}`}>{order.status}</span>
                            {/* Product Type Pill (hidden on mobile, fixed white background) */}
                            <span className="text-primary text-xxs border-btGray rounded-full border bg-white px-2 py-1 font-medium">{order.productType}</span>
                            {/* Price Pill (dynamic background/text) */}
                            <span className={`${pricePillBgColor} ${pricePillTextColor} rounded-full px-2 py-0.5 text-xs font-semibold`}>{order.price}</span>
                          </div>
                          {/* View Details Button (hidden on mobile) */}
                          <button onClick={() => handleClickItem(order.id)} className="border-btGray text-primary hidden cursor-pointer rounded-sm border px-1.5 py-1.5 text-xs font-medium md:block">
                            View Details
                          </button>
                          {/* Arrow Right Icon (visible on mobile only) */}
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
      {showNewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <NewOrder onClose={() => setShowNewOrder(false)} />
        </div>
      )}
    </>
  );
}

// "use client";
// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Header from "../components/DHeader";
// import { ChevronDown, ChevronUp, Download, ChevronRight } from "lucide-react";
// import NewOrder from "../components/NewOrder";

// const dummyOrders = [
//   {
//     id: "ORD-3091",
//     date: "April 16, 2025",
//     status: "Delivered",
//     productType: "Embroidery Digitizing",
//     price: "$8",
//     progress: 100,
//     files: [{ name: "Logo.png", url: "#" }],
//   },
//   {
//     id: "ORD-3092",
//     date: "April 15, 2025",
//     status: "Final Review",
//     productType: "Embroidery Digitizing",
//     price: "$8",
//     progress: 90,
//     files: [{ name: "Design_v2.ai", url: "#" }],
//   },
//   {
//     id: "ORD-3093",
//     date: "April 14, 2025",
//     status: "Being Digitized",
//     productType: "Vector Services",
//     price: "$12",
//     progress: 50,
//     files: [],
//   },
//   {
//     id: "ORD-3094",
//     date: "April 13, 2025",
//     status: "In Queue",
//     productType: "Embroidery Patches",
//     price: "$10",
//     progress: 25,
//     files: [],
//   },
//   {
//     id: "ORD-3095",
//     date: "April 12, 2025",
//     status: "Order Placed",
//     productType: "Embroidery Digitizing",
//     price: "$7",
//     progress: 10,
//     files: [],
//   },
// ];

// const getPillStyling = (status) => {
//   let parentBgColor = "bg-cardBg3";
//   let parentTextColor = "bg-cardBg3";
//   let parentBorderColor = "border-none";
//   let pricePillBgColor = "bg-none";
//   let pricePillTextColor = "text-primary";

//   switch (status) {
//     case "Delivered":
//       parentBgColor = "bg-primary";
//       parentTextColor = "text-white";
//       pricePillBgColor = "bg-primary";
//       pricePillTextColor = "text-white";
//       break;
//     case "Final Review":
//       parentBgColor = "bg-tabBg2";
//       parentTextColor = "text-primary";

//       break;
//     case "Order Placed":
//     case "In Queue":
//     case "Being Digitized":
//       break;
//     default:
//       break;
//   }
//   return { parentBgColor, parentTextColor, parentBorderColor, pricePillBgColor, pricePillTextColor };
// };

// export default function Orders() {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef();
//   const router = useRouter();
//   const [showNewOrder, setShowNewOrder] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState("All Orders");
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleClickItem = (orderId) => {
//     router.push(`/dashboard/orders/${orderId}`);
//   };

//   const filteredAndSearchedOrders = dummyOrders.filter((order) => {
//     const matchesFilter = selectedFilter === "All Orders" || order.status === selectedFilter;
//     const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.productType.toLowerCase().includes(searchTerm.toLowerCase());

//     return matchesFilter && matchesSearch;
//   });

//   return (
//     <>
//       <div className="mx-auto mt-10 flex w-[92%] flex-col space-y-6">
//         <div className="flex flex-col space-y-5">
//           <div className="flex flex-row items-center justify-between">
//             <h1 className="text-xl font-semibold text-primary">My Orders</h1>
//             <div className="btn-bg flex w-fit cursor-pointer flex-row space-x-1.5 rounded-lg p-1.5" onClick={() => setShowNewOrder(true)}>
//               <Image src="/new.svg" width={12} height={12} alt="new order" />
//               <span className="text-xs font-medium text-white">New Order</span>
//             </div>
//           </div>
//           <div className="flex flex-row items-center space-x-3 w-fit">
//             <div className="relative flex">
//               <Image src="/search.svg" width={14} height={14} alt="search" className="absolute top-3.5 left-2.5 z-20" />
//               <input type="search" name="search" id="search" placeholder="Search Orders" className="bg-theadBg border-tLine placeholder:text-btext relative rounded-md border px-2 py-1.5 pl-8 outline-0 placeholder:text-xs placeholder:font-medium" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//             </div>
//             <div className="relative" ref={dropdownRef}>
//               <button onClick={() => setDropdownOpen((prev) => !prev)} className="bg-theadBg border-tLine flex w-[120px] items-center justify-between gap-1.5 rounded-md border p-2.5">
//                 <span className="text-xs font-medium cursor-pointer text-btext">{selectedFilter}</span>
//                 {dropdownOpen ? <ChevronUp size={16} className="cursor-pointer" /> : <ChevronDown size={16} className="cursor-pointer" />}
//               </button>
//               {dropdownOpen && (
//                 <div className="absolute right-0 z-50 mt-2 bg-white border shadow-md border-btGray w-30 rounded-xl">
//                   <div className="flex flex-col divide-y divide-btGray">
//                     {/* Filter Options */}
//                     {["All Orders", "Delivered", "Final Review", "Being Digitized", "In Queue", "Order Placed"].map((option) => (
//                       <span
//                         key={option}
//                         className="block px-3 py-2 text-sm cursor-pointer text-primary hover:bg-headBg"
//                         onClick={() => {
//                           setSelectedFilter(option);
//                           setDropdownOpen(false);
//                         }}>
//                         {option}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="px-0.5 pb-0.5">
//         <div className="bg-cardBg3 border-btGray mt-3 max-h-full w-full rounded-[10px] border">
//           <div className="mx-auto flex w-[92%] flex-col space-y-4 py-5">
//             <h3 className="text-sm font-semibold text-primary">Order History</h3>
//             <div className="space-y-3">
//               {filteredAndSearchedOrders.length > 0 ? (
//                 filteredAndSearchedOrders.map((order) => {
//                   const { parentBgColor, parentTextColor, parentBorderColor, pricePillBgColor, pricePillTextColor } = getPillStyling(order.status);
//                   return (
//                     <div key={order.id} className="border-btGray space-y-3 rounded-lg border px-4 py-2.5">
//                       <div className="flex flex-row items-center justify-between">
//                         <div className="flex flex-col gap-0.5">
//                           <div onClick={() => handleClickItem(order.id)} className="cursor-pointer">
//                             <h4 className="text-xs font-semibold text-primary hover:text-btBlue">{order.id}</h4>
//                           </div>
//                           <div className="flex flex-row gap-1">
//                             <Image src="/calendar.svg" width={12} height={12} alt="calendar" />
//                             <span className="font-medium text-btext text-xxs">Order date {order.date}</span>
//                           </div>
//                         </div>
//                         <div className="flex flex-row items-center gap-2">
//                           {/* Main pill container with dynamic background/text */}
//                           <div className={`${parentBgColor} ${parentBorderColor !== "border" ? "border" + parentBorderColor : ""} border-btGray flex flex-row items-center gap-2 rounded-full border bg-none px-2 py-0.5`}>
//                             {/* Status Text (color inherited from parent) */}
//                             <span className={`text-xxs hidden font-medium md:block ${parentTextColor}`}>{order.status}</span>
//                             {/* Product Type Pill (hidden on mobile, fixed white background) */}
//                             <span className="hidden px-2 py-1 font-medium bg-white rounded-full text-primary text-xxs md:block">{order.productType}</span>
//                             {/* Price Pill (dynamic background/text) */}
//                             <span className={`${pricePillBgColor} ${pricePillTextColor} hidden rounded-full px-2 py-0.5 text-xs font-semibold md:block`}>{order.price}</span>
//                           </div>
//                           <button onClick={() => handleClickItem(order.id)} className="border-btGray text-primary hidden cursor-pointer rounded-sm border px-1.5 py-1.5 text-xs font-medium md:block">
//                             View Details
//                           </button>
//                           <button onClick={() => handleClickItem(order.id)} className="border-btGray text-primary block cursor-pointer rounded-sm border p-0.5 md:hidden">
//                             <ChevronRight size={16} />
//                           </button>
//                         </div>
//                       </div>
//                       {/* Progress Bar */}
//                       <div className="flex flex-row items-center justify-between gap-2">
//                         <Image src="/ellipse.svg" width={18} height={18} alt="ellipse" />
//                         <div className="relative w-full h-2 rounded-full bg-btGray">
//                           <div className="h-full transition-all duration-300 rounded-full bg-btBlue" style={{ width: `${order.progress}%` }}></div>
//                         </div>
//                         {order.progress === 100 ? <Image src="/check.svg" width={18} height={18} alt="check" /> : <span className="font-medium text-primary text-xxs">{order.progress}%</span>}
//                       </div>
//                       {/* Files section - Only show if order is delivered (or has files) */}
//                       {(order.status === "Delivered" || order.files.length > 0) && (
//                         <div className="flex flex-col gap-2">
//                           <h4 className="text-xs font-medium text-primary">Files:</h4>
//                           {order.files.map((file, index) => (
//                             <a href={file.url} key={index} className="bg-pointBg border-pointStroke flex w-fit cursor-pointer flex-row items-center justify-start gap-1 rounded-sm border p-1.5">
//                               <Download size={14} alt="download" />
//                               <span className="text-xs font-medium text-primary">{file.name}</span>
//                             </a>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p className="py-4 text-center text-btext">No orders found matching your criteria.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       {showNewOrder && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <NewOrder onClose={() => setShowNewOrder(false)} />
//         </div>
//       )}
//     </>
//   );
// }
