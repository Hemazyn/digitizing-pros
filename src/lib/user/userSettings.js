import { doc, getDoc, setDoc, updateDoc, getFirestore } from "firebase/firestore";
import { getApp } from "firebase/app";
import { db } from "@/firebase/firebase";

export async function initializeUserSettings(uid, userData) {
  const db = getFirestore(getApp());
  const userRef = doc(db, "users", uid);

  await setDoc(
    userRef,
    {
      ...userData,
      createdAt: new Date().toISOString(),
    },
    { merge: true },
  );
}

export const getUserSettingsSection = async (userId, section) => {
  if (!userId) throw new Error("User ID required");
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data()?.settings?.[section] || {};
  }
  return {};
};

export const updateUserSettingsSection = async (userId, section, data) => {
  if (!userId) throw new Error("User ID required");
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, {
      [`settings.${section}`]: data,
    });
  } else {
    await setDoc(ref, {
      settings: {
        [section]: data,
      },
    });
  }
};
