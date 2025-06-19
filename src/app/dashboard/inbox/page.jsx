"use client";
import { useEffect, useState } from "react";
import { Pen, Search, Settings2, MessageSquareOff } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import NewMessage from "../components/NewMessage";
import { listenToThreads, listenToMessages, sendMessage } from "@/lib/chatUtils";

export default function Inbox() {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [activeConversation, setActiveConversation] = useState([]);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const activeThread = threads.find((t) => t.id === activeThreadId);
  const displayName = user?.displayName || "Hey Buddy!";
  const photoURL = user?.photoURL || "/photoURL.svg";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = listenToThreads(user.uid, (threadDocs) => {
      const formattedThreads = threadDocs.map((thread) => ({
        id: thread.id,
        subject: thread.subject || "Help",
        category: thread.category || "Support",
        lastMessage: thread.lastMessage || "",
        createdAt: thread.createdAt,
      }));

      setThreads(formattedThreads);

      if (!activeThreadId && formattedThreads.length > 0) {
        setActiveThreadId(formattedThreads[0].id);
      }
    });

    return () => unsubscribe();
  }, [user, activeThreadId]);

  useEffect(() => {
    if (!user || !activeThreadId) return;
    const unsubscribe = listenToMessages(user.uid, activeThreadId, (msgs) => {
      const formatted = msgs.map((msg) => ({
        from: msg.sender === "admin" ? "support" : "customer",
        text: msg.text,
        time: msg.timestamp
          ? new Date(msg.timestamp.toDate()).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
          : "",
      }));
      setActiveConversation(formatted);
    });
    return () => unsubscribe();
  }, [user, activeThreadId]);

  return (
    <div className="mx-auto mt-5 flex w-[92%] flex-col space-y-6">
      {/* Header */}
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
      {/* Main Content */}
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
              {threads.length === 0 ? (
                <div className="text-btext flex h-full flex-col items-center justify-center px-4 py-10 text-center text-sm">
                  <MessageSquareOff size={120} className="mb-4" />
                  <p className="font-medium">Your inbox is empty</p>
                  <p className="text-xs text-gray-500">Start a new conversation by clicking the "Compose" button above.</p>
                </div>
              ) : (
                threads.map((thread) => (
                  <div
                    key={thread.id}
                    onClick={() => {
                      setActiveThreadId(thread.id);
                      if (isMobile) setShowChat(true);
                    }}
                    className={`border-btGray relative flex cursor-pointer flex-row items-start gap-2 border-t px-2 py-2 hover:bg-gray-100 ${activeThreadId === thread.id ? "bg-white" : ""}`}>
                    <Image src={photoURL} alt="Avatar" width={32} height={32} className="rounded-full" />
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-1">
                        <h4 className="text-primary text-sm font-semibold">{thread.subject}</h4>
                        <p className="text-btext text-xs font-medium">{thread.lastMessage}</p>
                      </div>
                      <span className="text-btext text-xs font-medium">
                        {thread.createdAt?.toDate
                          ? new Date(thread.createdAt.toDate()).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })
                          : ""}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {/* Chat Window */}
        {(!isMobile || showChat) && activeConversation && (
          <div className={`${isMobile ? "w-full" : "w-[70%]"} flex flex-col justify-between`}>
            {/* Chat Header */}
            <div className="border-btGray flex flex-row items-start gap-2 border-b p-3">
              <Image src={photoURL} alt="Avatar" width={32} height={32} className="rounded-full" />
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-col gap-1">
                  <h4 className="text-primary text-xs font-semibold">{displayName}</h4>
                  <p className="text-xxs text-btext font-medium">Customer Support</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <h4 className="text-primary text-xxs font-semibold text-ellipsis md:text-xs">{activeThread?.subject || "No Subject"}</h4>
                  <div className="bg-btGray mx-1 hidden h-4 w-px md:block"></div>
                  <p className="border-btGray text-btext text-xxs rounded-md border px-1 py-0.5 font-medium md:text-xs">{activeThread?.category || "Support"}</p>
                </div>
              </div>
            </div>

            {/* Message History */}
            <div className="flex-1 space-y-2 overflow-y-auto p-4">
              {activeConversation.map((msg, i) => (
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
              <form
                className="flex items-end space-x-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!input.trim()) return;
                  await sendMessage({
                    userId: user.uid,
                    threadId: activeThreadId,
                    sender: "user",
                    text: input,
                  });
                  setInput("");
                }}>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} name="message" rows={3} placeholder="Type your message here..." className="flex-1 resize-none rounded-md border border-gray-300 px-4 py-2 text-sm outline-none" />
                <button type="submit" className="btn-bg cursor-pointer rounded-md px-4 py-2 text-sm text-white">
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
              setThreads([newMsg, ...threads]);
              setActiveThreadId(newMsg.id);
              if (isMobile) setShowChat(true);
            }}
          />
        </div>
      )}
    </div>
  );
}
