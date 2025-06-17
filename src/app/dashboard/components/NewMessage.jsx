import { useState, useRef } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import Notiflix from "notiflix";

export default function NewMessage({ onClose, onCreateNewMessage }) {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Order Support");
  const [message, setMessage] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !message) return;

    Notiflix.Loading.circle("Sending...");

    const newMsg = {
      id: `${Math.floor(Math.random() * 100000)}`,
      title: subject,
      preview: message,
      timestamp: "Just now",
      conversation: [
        {
          from: "customer",
          text: message,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ],
    };

    setTimeout(() => {
      onCreateNewMessage(newMsg);
      Notiflix.Loading.remove();
      onClose();
    }, 800);
  };

  return (
    <div className="bg-cardBg mx-2 w-full max-w-md rounded-xl border border-gray-200 shadow-xl sm:mx-auto sm:max-w-lg md:max-w-xl lg:max-w-md">
      {/* Header */}
      <div className="relative flex flex-col gap-1 px-4 py-4">
        <h2 className="text-primary text-xs font-semibold sm:text-sm">New Conversation</h2>
        <p className="text-xxs text-btext font-medium sm:text-xs">Start a new conversation with our support team.</p>
        <button onClick={onClose} className="bg-primary hover:bg-btBlue absolute top-4 right-4 flex h-5 w-5 items-center justify-center rounded-full text-white">
          <X size={16} />
        </button>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="m-1 flex flex-col gap-4 rounded-lg bg-white p-3 sm:p-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-primary text-xs font-medium">Subject</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Enter subject..." className="focus:ring-primary border-btGray w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring" />
        </div>
        {/* dropdown start */}
        <div className="relative flex flex-col gap-1.5" ref={dropdownRef}>
          <label className="text-primary text-xs font-medium">Category</label>
          <button type="button" onClick={() => setDropdownOpen((prev) => !prev)} className="border-tLine flex w-full items-center justify-between gap-1.5 rounded-md border p-2.5">
            <span className="text-btext cursor-pointer text-xs font-medium">{category}</span>
            {dropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {dropdownOpen && (
            <div className="border-btGray absolute z-50 mt-2 w-full rounded-xl border bg-white shadow-md">
              <div className="divide-btGray flex flex-col divide-y">
                {["All Orders", "Order Support", "Technical Support", "Billing", "Sales", "General Inquiry"].map((option) => (
                  <span
                    key={option}
                    className="text-primary hover:text-btBlue block cursor-pointer px-3 py-2 text-sm"
                    onClick={() => {
                      setCategory(option);
                      setDropdownOpen(false);
                    }}>
                    {option}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* dropdown ends */}
        <div className="flex flex-col gap-1.5">
          <label className="text-primary text-xs font-medium">Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type message here..." rows={4} className="border-btGray w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none" />
        </div>
      </form>
      {/* Footer */}
      <div className="flex flex-col justify-end gap-2 rounded-b-xl bg-gray-50 px-6 py-4 sm:flex-row sm:justify-between">
        <button type="button" onClick={onClose} className="text-primary border-btGray cursor-pointer rounded-md border px-4 py-2 text-sm shadow">
          Cancel
        </button>
        <button type="submit" onClick={handleSubmit} className="btn-bg cursor-pointer rounded-md px-4 py-2 text-sm text-white">
          Start Conversation
        </button>
      </div>
    </div>
  );
}
