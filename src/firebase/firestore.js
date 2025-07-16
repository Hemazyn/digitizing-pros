import { db } from "./firebase";
import { collection, doc, getDoc, setDoc, updateDoc, deleteDoc, query, getDocs, writeBatch, deleteField, addDoc } from "firebase/firestore";

const getUserCartRef = (userId) => collection(db, "users", userId, "cart");
const getUserDocRef = (userId) => doc(db, "users", userId);

export const getCartItemsFromFirestore = async (userId) => {
  if (!userId) return [];
  try {
    const querySnapshot = await getDocs(getUserCartRef(userId));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

export const saveCartItemToFirestore = async (userId, item) => {
  if (!userId || !item) throw new Error("User ID and item object are required.");

  try {
    const { id, ...itemData } = item;

    if (id) {
      await setDoc(doc(getUserCartRef(userId), id), itemData, { merge: true });
      return id;
    } else {
      const docRef = await addDoc(getUserCartRef(userId), itemData);
      return docRef.id;
    }
  } catch (error) {
    console.error("Error saving cart item:", error);
    throw error;
  }
};

export const removeCartItemFromFirestore = async (userId, itemId) => {
  if (!userId || !itemId) throw new Error("User ID and item ID (Firestore doc ID) are required for removal.");
  try {
    await deleteDoc(doc(getUserCartRef(userId), itemId));
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
};

export const clearUserCartInFirestore = async (userId) => {
  if (!userId) throw new Error("User ID is required to clear cart.");
  try {
    const snapshot = await getDocs(query(getUserCartRef(userId)));
    const batch = writeBatch(db);
    snapshot.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
  } catch (error) {
    console.error("Error clearing user cart:", error);
    throw error;
  }
};

export const getUserPreferencesFromFirestore = async (userId) => {
  if (!userId) return null;
  try {
    const docSnap = await getDoc(getUserDocRef(userId));
    return docSnap.exists() ? docSnap.data().itemPreferences || {} : {};
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    throw error;
  }
};

export const updateItemPreferencesInFirestore = async (userId, publicId, prefs) => {
  if (!userId || !publicId || !prefs) throw new Error("User ID, publicId, and preferences are required.");
  const fieldPath = `itemPreferences.${publicId}`;
  try {
    await updateDoc(getUserDocRef(userId), { [fieldPath]: prefs });
  } catch (error) {
    if (error.message.includes("No document to update")) {
      await setDoc(getUserDocRef(userId), { itemPreferences: { [publicId]: prefs } }, { merge: true });
    } else {
      console.error("Error updating preferences:", error);
      throw error;
    }
  }
};

export const removeItemPreferencesFromFirestore = async (userId, publicId) => {
  if (!userId || !publicId) throw new Error("User ID and publicId are required.");
  try {
    await updateDoc(getUserDocRef(userId), { [`itemPreferences.${publicId}`]: deleteField() });
  } catch (error) {
    console.error("Error removing preferences:", error);
    throw error;
  }
};

export const initializeUserSettings = async (userId) => {
  if (!userId) throw new Error("User ID is required to initialize settings");

  try {
    await setDoc(
      doc(db, "users", userId),
      {
        settings: {
          account: { email: "", username: "", fullName: "", phoneNumber: "", marketingEmails: true, newsletter: true },
          profile: {},
          notifications: {},
          billing: {},
          security: {},
        },
      },
      { merge: true },
    );
    console.log("User settings initialized for user:", userId);
  } catch (error) {
    console.error("Error initializing user settings:", error);
    throw error;
  }
};
