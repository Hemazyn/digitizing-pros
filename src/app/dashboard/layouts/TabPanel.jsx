import DashboardUI from "./DashboardUI";
import Inbox from "./Inbox";
import Orders from "./Orders";
import Settings from "./Settings";

export default function TabPanel({ activeTab, setActiveTab }) {
  switch (activeTab) {
    case "dashboard":
      return <DashboardUI setActiveTab={setActiveTab} />;
    case "orders":
      return <Orders setActiveTab={setActiveTab} />;
    case "inbox":
      return <Inbox setActiveTab={setActiveTab} />;
    case "setting":
      return <Settings setActiveTab={setActiveTab} />;
    default:
      return null;
  }
}

// import DashboardUI from "./DashboardUI";
// import Inbox from "./Inbox";
// import Orders from "./Orders";
// import Settings from "./Settings";

// export default function TabPanel({ activeTab }) {
//   switch (activeTab) {
//     case "dashboard":
//       return <DashboardUI />;
//     case "orders":
//       return <Orders />;
//     case "inbox":
//       return <Inbox />;
//     case "setting":
//       return <Settings />;
//   }
// }
