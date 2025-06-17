"use client";
import { useEffect, useState } from "react";
import { Pen, Search, Settings2 } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import NewMessage from "../components/NewMessage";

export default function Inbox() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: "ORD-3091",
      title: "Question about my order ORD-3091",
      preview: "Thank you for the clarification. We’ll make sure to implement those changes.",
      timestamp: "Today, 2:45 PM",
      conversation: [
        { from: "customer", text: "Hi, I have a question about my order ORD-3091. Can you tell me when it will be delivered?", time: "10:30 AM" },
        { from: "support", text: "Hello Sidat, thank you for reaching out. I can see that your order is currently being digitized. It should be delivered within the next 24 hours.", time: "11:15 AM" },
        { from: "customer", text: "Great, thank you! Also, I wanted to ask if it’s possible to make a small change to the design. I’d like the text to be slightly larger.", time: "11:30 AM" },
        { from: "support", text: "I'll check with our digitizing team to see if we can make that change. Since your order is already in progress, there might be a small delay. I’ll get back to you shortly.", time: "12:30 PM" },
        { from: "support", text: "Good news! Our team can make the text larger as requested. Could you specify how much larger you’d like it to be? For example, 20%, 30% larger, etc.", time: "2:15 PM" },
        { from: "customer", text: "That’s great! I’d like it to be about 30% larger. Thank you for accommodating this change.", time: "2:30 PM" },
        { from: "support", text: "Thank you for the clarification. We’ll make sure to implement those changes.", time: "2:45 PM" },
      ],
    },
    {
      id: "FILE-102",
      title: "Technical issue with file download",
      preview: "The new pdf download link is ready. Please try again.",
      timestamp: "Yesterday, 4:30 PM",
      conversation: [],
    },
    {
      id: "BULK-555",
      title: "Bulk order inquiry",
      preview: "Hello Sidat, thank you for your interest in our...",
      timestamp: "Today, 2:45 PM",
      conversation: [],
    },
  ]);
  const [activeId, setActiveId] = useState(messages[0].id);
  const activeMessage = messages.find((m) => m.id === activeId);
  const [showNewMessage, setShowNewMessage] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const firstName = user?.displayName?.split(" ")[0] || "Hey Buddy!";
  const photoURL = user?.photoURL || "/photoURL.svg";

  return (
    <div className="mx-auto mt-5 flex w-[92%] flex-col space-y-6">
      {/* Header */}
      {/* Top Header or Back Button (mobile only) */}
      {isMobile && showChat ? (
        <div className="mb-3">
          <button onClick={() => setShowChat(false)} className="text-primary text-md border-btGray rounded-md border px-2 py-0.5 font-medium">
            ← Back
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <h1 className="text-primary text-xl font-semibold">Messages</h1>
          <div className="btn-bg bg-primary flex cursor-pointer flex-row items-center gap-1 rounded-lg px-3 py-2 text-white" onClick={() => setShowNewMessage(true)}>
            <Pen size={12} />
            <span className="text-xs font-medium">Compose</span>
          </div>
        </div>
      )}

      {/* Main Section */}
      <div className="border-btGray bg-cardBg3 flex h-[75vh] flex-row overflow-hidden rounded-lg border shadow-sm">
        {/* Sidebar */}
        {(!isMobile || !showChat) && (
          <div className={`border-btGray relative ${isMobile ? "w-full" : "w-[30%]"} border-r`}>
            <div className="relative flex flex-col gap-2 p-3">
              <h3 className="text-sm font-semibold">Inbox</h3>
              <div className="flex w-full items-center gap-2 px-2">
                <div className="border-tLine bg-theadBg flex flex-1 items-center gap-2 rounded-md border px-2">
                  <Search size={14} className="text-btext" />
                  <input type="text" name="search" placeholder="Search Messages" className="placeholder:text-btext w-full bg-transparent py-1.5 text-xs font-medium text-gray-700 outline-none" />
                </div>
                <div className="border-btGray bg-theadBg flex h-8 w-10 cursor-pointer items-center justify-center rounded-md border">
                  <Settings2 size={20} className="text-btext" />
                </div>
              </div>
            </div>
            <div className="overflow-x-hidden">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setActiveId(msg.id);
                    if (isMobile) setShowChat(true);
                  }}
                  className={`border-btGray relative flex cursor-pointer flex-row items-start gap-2 border-t px-2 py-2 hover:bg-gray-100 ${activeId === msg.id ? "bg-white" : ""}`}>
                  <Image src={photoURL} alt="Avatar" width={32} height={32} className="rounded-full" />
                  <div>
                    <h4 className="text-primary text-sm font-semibold">{msg.title}</h4>
                    <p className="text-xxs text-btext overflow-hidden font-medium text-ellipsis">{msg.preview}</p>
                    <span className="text-xxs text-btext">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat View */}
        {(!isMobile || showChat) && activeMessage && (
          <div className={`${isMobile ? "w-full" : "w-[70%]"} flex flex-col justify-between`}>
            {/* Chat Header */}
            <div className="border-btGray flex flex-row items-start gap-2 border-b p-3">
              <Image src={photoURL} alt="Avatar" width={32} height={32} className="rounded-full" />
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-col gap-1">
                  <h4 className="text-primary text-xs font-semibold">{firstName}</h4>
                  <p className="text-xxs text-btext font-medium">Customer Support</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <h4 className="text-primary text-xxs font-semibold text-ellipsis md:text-xs">{activeMessage.title}</h4>
                  <div className="bg-btGray mx-1 hidden h-4 w-px md:block"></div>
                  <p className="border-btGray text-btext text-xxs rounded-md border px-1 py-0.5 font-medium md:text-xs">Order Support</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-2 overflow-y-auto p-4">
              {activeMessage.conversation.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.from === "support" ? "items-start" : "items-end"}`}>
                  <div className={`flex max-w-xs flex-col gap-1 rounded-md px-4 py-2 text-sm ${msg.from === "support" ? "bg-msgbg1 text-primary text-xs" : "bg-pointBg text-primary text-xs"}`}>
                    <span>{msg.text}</span>
                    <span className="text-xxs text-btext font-normal">
                      {msg.from === "support" ? "Support" : "You"} · {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-btGray border-t p-4">
              <form className="flex items-end space-x-2">
                <textarea name="message" rows={1} placeholder="Type your message here..." className="flex-1 resize-none rounded-md border border-gray-300 px-4 py-2 text-sm outline-none"></textarea>
                <button type="submit" className="btn-bg rounded-md px-4 py-2 text-sm text-white">
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Compose Modal */}
      {showNewMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <NewMessage
            onClose={() => setShowNewMessage(false)}
            onCreateNewMessage={(newMsg) => {
              setMessages([newMsg, ...messages]);
              setActiveId(newMsg.id);
              if (isMobile) setShowChat(true);
            }}
          />
        </div>
      )}
    </div>
  );
}
