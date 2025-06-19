import { collection, doc, setDoc, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/firebase/firebase";

//   Send a message to a specific thread.
export const sendMessage = async ({ userId, threadId, sender, text }) => {
  if (typeof userId !== "string" || typeof threadId !== "string") {
    console.error("Invalid userId or threadId", { userId, threadId });
    return;
  }
  const messagesRef = collection(db, "chats", userId, "threads", threadId, "messages");
  await addDoc(messagesRef, {
    sender,
    text,
    timestamp: serverTimestamp(),
  });

  // Update the thread’s last message
  const threadDocRef = doc(db, "chats", userId, "threads", threadId);
  await setDoc(threadDocRef, { lastMessage: text }, { merge: true });
};

//   Listen to messages for a specific thread.
export const listenToMessages = (userId, threadId, callback) => {
  if (typeof userId !== "string" || typeof threadId !== "string") {
    //     console.error("Invalid userId or threadId for listenToMessages", { userId, threadId });
    return () => {};
  }
  const q = query(collection(db, "chats", userId, "threads", threadId, "messages"), orderBy("timestamp", "asc"));
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(messages);
  });
};

//   Create a new thread and send the first message.
export const createThread = async ({ userId, subject, category, firstMessage }) => {
  const threadId = uuidv4();
  const threadRef = doc(db, "chats", userId, "threads", threadId);
  await setDoc(threadRef, {
    subject,
    category,
    createdAt: serverTimestamp(),
    lastMessage: firstMessage,
  });

  await sendMessage({
    userId,
    threadId,
    sender: "user",
    text: firstMessage,
  });

  return threadId;
};

//  Listen to all threads for a user.
export const listenToThreads = (userId, callback) => {
  if (typeof userId !== "string") {
    console.error("Invalid userId for listenToThreads", { userId });
    return () => {};
  }

  const threadsRef = collection(db, "chats", userId, "threads");

  return onSnapshot(threadsRef, (snapshot) => {
    const threads = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(threads);
  });
};

//  Optional: Typing indicator logic
export const sendTypingIndicator = async ({ userId, sender, isTyping }) => {
  const typingRef = collection(db, "chats", userId, "typing");
  await addDoc(typingRef, {
    sender,
    isTyping,
    timestamp: serverTimestamp(),
  });
};

export const listenToTypingIndicator = (userId, callback) => {
  const q = query(collection(db, "chats", userId, "typing"), orderBy("timestamp", "desc"));

  return onSnapshot(q, (snapshot) => {
    const typingIndicators = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(typingIndicators);
  });
};
