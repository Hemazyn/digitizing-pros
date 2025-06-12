import DashboardUI from "./DashboardUI";
import Inbox from "./Inbox";
import Orders from "./Orders";
import Settings from "./Settings";

export default function TabPanel({ activeTab }) {
  switch (activeTab) {
    case "dashboard":
      return <DashboardUI />;
    case "orders":
      return <Orders />;
    case "inbox":
      return <Inbox />;
    case "setting":
      return <Settings />;
  }
}
