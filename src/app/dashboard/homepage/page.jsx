"use client";
import { useEffect, useState } from "react";
import Header from "../components/DHeader";
import ROrders from "../components/ROrders";
import Files from "../components/Files";
import { db } from "@/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

const tabs = ["Recent Orders", "My Files"];

export default function HomePage() {
  const { currentUser, user } = useAuth();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [completedOrders, setCompletedOrders] = useState(0);

  const userEmail = currentUser?.email;

  const fetchCompletedOrders = async () => {
    try {
      const q = query(collection(db, "orders"), where("email", "==", userEmail));
      const snapshot = await getDocs(q);
      setCompletedOrders(snapshot.size);
    } catch (error) {
      console.error("Error fetching completed orders:", error);
    }
  };

  useEffect(() => {
    if (currentUser?.email) {
      const fetchCompletedOrders = async () => {
        try {
          const q = query(collection(db, "orders"), where("email", "==", currentUser.email));
          const snapshot = await getDocs(q);
          setCompletedOrders(snapshot.size);
        } catch (error) {
          console.error("Error fetching completed orders:", error);
        }
      };

      fetchCompletedOrders();
    }
  }, [currentUser]);

  const stats = [
    {
      id: 1,
      text: "Active Orders",
      value: "2", // 🔁 Replace with dynamic value if needed
    },
    {
      id: 2,
      text: "Completed Orders",
      value: completedOrders.toString(),
    },
    {
      id: 3,
      text: "Loyality Points",
      value: "250", // 🔁 Replace with dynamic value if needed
    },
  ];

  const firstName = user?.displayName?.split(" ")[0] || "Buddy!";

  return (
    <>
      <div className="mx-auto mt-5 flex w-[92%] flex-col space-y-6 md:mt-10 md:w-[92%]">
        <div className="flex flex-col gap-1 md:gap-2">
          <h1 className="text-primary text-xl font-semibold">Hi {firstName}!</h1>
          <span className="text-btext text-sm font-medium">Track your orders, download files, and manage your account</span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-theadBg flex h-fit flex-col rounded-[10px]">
              <h4 className="text-primary px-[22px] py-3 text-sm font-semibold">{stat.text}</h4>
              <span className="text-primary m-0.5 flex h-16 items-center rounded-lg bg-white pl-5 text-[32px] font-bold">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-theadBg mt-6 mb-5 ml-[4%] flex w-fit gap-1 rounded-[10px] p-1 md:rounded-lg md:p-0.5">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 ${activeTab === tab ? "shado bg-white text-black" : "text-btext"}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="px-0.5 pb-0.5">
        {activeTab === "Recent Orders" && <ROrders />}
        {activeTab === "My Files" && <Files />}
      </div>
    </>
  );
}

// "use client";
// import { useState } from "react";
// import Header from "../components/DHeader";
// import ROrders from "../components/ROrders";
// import Files from "../components/Files";

// const tabs = ["Recent Orders", "My Files"];

// export default function HomePage() {
//   const [activeTab, setActiveTab] = useState(tabs[0]);
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

//   const toggleMobileSidebar = () => {
//     setMobileSidebarOpen(!mobileSidebarOpen);
//   };

//   const stats = [
//     {
//       id: 1,
//       text: "Active Orders",
//       value: "2",
//     },
//     {
//       id: 2,
//       text: "Completed Orders",
//       value: "12",
//     },
//     {
//       id: 3,
//       text: "Loyality Points",
//       value: "250",
//     },
//   ];

//   return (
//     <>
//       <div className="mx-auto mt-5 flex w-[92%] flex-col space-y-6 md:mt-10 md:w-[92%]">
//         <div className="flex flex-col gap-1 md:gap-2">
//           <h1 className="text-primary text-xl font-semibold">Hi Emmanuel!</h1>
//           <span className="text-btext text-sm font-medium">Track your orders, download files, and manage your account</span>
//         </div>
//         <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
//           {stats.map((stat) => (
//             <div key={stat.id} className="bg-theadBg flex h-fit flex-col rounded-[10px]">
//               <h4 className="text-primary px-[22px] py-3 text-sm font-semibold">{stat.text}</h4>
//               <span className="text-primary m-0.5 flex h-16 items-center rounded-lg bg-white pl-5 text-[32px] font-bold">{stat.value}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="bg-theadBg mt-6 mb-5 ml-[4%] flex w-fit gap-1 rounded-[10px] p-1 md:rounded-lg md:p-0.5">
//         {tabs.map((tab) => (
//           <button key={tab} onClick={() => setActiveTab(tab)} className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 ${activeTab === tab ? "shado bg-white text-black" : "text-btext"}`}>
//             {tab}
//           </button>
//         ))}
//       </div>
//       <div className="px-0.5 pb-0.5">
//         {activeTab === "Recent Orders" && <ROrders />}
//         {activeTab === "My Files" && <Files />}
//       </div>
//     </>
//   );
// }
