"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserPreferencesFromFirestore, updateItemPreferencesInFirestore } from "../firebase/firestore";

const UserPreferencesContext = createContext();

export function UserPreferencesProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [allItemPreferences, setAllItemPreferences] = useState({});
  const [preferencesLoading, setPreferencesLoading] = useState(true);
  const [preferencesError, setPreferencesError] = useState(null);

  useEffect(() => {
    if (authLoading) {
      setPreferencesLoading(true);
      return;
    }

    if (user) {
      setPreferencesLoading(true);
      setPreferencesError(null);
      const fetchPrefs = async () => {
        try {
          const fetchedPrefs = await getUserPreferencesFromFirestore(user.uid);
          setAllItemPreferences(fetchedPrefs || {});
        } catch (err) {
          console.error("Error fetching user preferences:", err);
          setPreferencesError("Failed to load user preferences.");
        } finally {
          setPreferencesLoading(false);
        }
      };
      fetchPrefs();
    } else {
      setAllItemPreferences({});
      setPreferencesLoading(false);
      setPreferencesError(null);
    }
  }, [user, authLoading]);

  const updateItemPreferences = useCallback(
    async (publicId, newPrefs) => {
      if (!user) {
        console.warn("Cannot update item preferences: User not authenticated.");
        return;
      }

      setAllItemPreferences((prevPrefs) => ({
        ...prevPrefs,
        [publicId]: { ...prevPrefs[publicId], ...newPrefs },
      }));

      try {
        await updateItemPreferencesInFirestore(user.uid, publicId, newPrefs);
      } catch (err) {
        console.error("Failed to save item preferences to Firestore:", err);
        setPreferencesError("Failed to save preferences. Please try again.");
      }
    },
    [user],
  );

  const getItemPreferences = useCallback(
    (publicId) => {
      return allItemPreferences[publicId] || {};
    },
    [allItemPreferences],
  );

  const value = React.useMemo(() => ({ preferencesLoading, preferencesError, updateItemPreferences, getItemPreferences }), [preferencesLoading, preferencesError, updateItemPreferences, getItemPreferences]);

  return <UserPreferencesContext.Provider value={value}>{children}</UserPreferencesContext.Provider>;
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error("useUserPreferences must be used within a UserPreferencesProvider");
  }
  return context;
}
