import HomePage from "../homepage/page";
import Inbox from "../inbox/page";
import Orders from "../orders/page";
import Reward from "../points/page";
import Settings from "../settings/pages";

export default function TabPanel({ activeTab, setActiveTab }) {
  switch (activeTab) {
    case "dashboard":
      return <HomePage setActiveTab={setActiveTab} />;
    case "orders":
      return <Orders setActiveTab={setActiveTab} />;
    case "inbox":
      return <Inbox setActiveTab={setActiveTab} />;
    case "setting":
      return <Settings setActiveTab={setActiveTab} />;
    case "points":
      return <Reward setActiveTab={setActiveTab} />;
    default:
      return null;
  }
}
