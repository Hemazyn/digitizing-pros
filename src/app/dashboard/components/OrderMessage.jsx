// src/app/dashboard/components/OrderCommunication.jsx
"use client";
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react"; // For the send icon

export default function OrderCommunication({ order }) {
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null); // Ref to scroll to the latest message

  const dummyMessages = order?.messages || [
    {
      id: 1,
      sender: "Website",
      text: "Your order has been received. We'll notify you when it's being processed.",
      dateTime: "April 16, 2025 - 10:23 AM",
      isUser: false,
    },
    {
      id: 2,
      sender: "Website",
      text: "Your design is now being digitized by one of our experts.",
      dateTime: "April 16, 2025 - 2:45 PM",
      isUser: false,
    },
    {
      id: 3,
      sender: "User",
      text: "Can you make sure the edges are very clean? This will be used on a premium product.",
      dateTime: "April 16, 2025 - 3:30 PM",
      isUser: true,
    },
    {
      id: 4,
      sender: "Website",
      text: "We'll ensure the edges are clean and smooth. Thanks for the additional information.",
      dateTime: "April 16, 2025 - 4:15 PM",
      isUser: false,
    },
    {
      id: 5,
      sender: "Website",
      text: "Your digitized files are now ready and have been delivered to your email.",
      dateTime: "April 17, 2025 - 11:30 AM",
      isUser: false,
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [dummyMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      console.log("Sending message:", messageInput);
      setMessageInput("");
      scrollToBottom();
    }
  };

  return (
    <div className="border-btGray bg-cardBg3 flex h-[500px] flex-col rounded-lg border p-4">
      <h4 className="text-primary text-md px-4 pt-4 font-semibold">Messages</h4>
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {dummyMessages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] gap-1.5 rounded-lg p-3 shadow-sm md:max-w-[60%] ${message.isUser ? "bg-pointBg text-primary" : "text-primary bg-msgbg1"}`}>
              <p className="text-sm font-normal">{message.text}</p>
              <p className={`mt-1 text-xs ${message.isUser ? "text-btext" : "text-btext"}`}>{message.dateTime}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex items-end gap-3">
        <textarea name="messaging" id="messaging" cols="3" placeholder="Type your message here..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-xs placeholder:font-medium"></textarea>
        <button type="submit" className="btn-bg flex items-center justify-center rounded-lg px-5 py-2.5 text-xs text-white" disabled={!messageInput.trim()}>
          send
        </button>
      </form>
    </div>
  );
}
