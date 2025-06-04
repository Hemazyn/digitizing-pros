"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCartItemsFromFirestore, saveCartItemToFirestore, removeCartItemFromFirestore, clearUserCartInFirestore } from "../firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { defaultPrice } from "../app/constants";
import { Notify } from "notiflix";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const totalItemsInCart = cartItems.length;

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          if (typeof window !== "undefined") {
            localStorage.removeItem("cartItems");
          }
          const firestoreItems = await getCartItemsFromFirestore(user.uid);
          setCartItems(firestoreItems);
        } catch (error) {
          console.error("Failed to load cart from Firestore:", error);
        }
      } else {
        setCartItems([]);
        if (typeof window !== "undefined") {
          localStorage.removeItem("cartItems");
        }
      }
    };
    loadCart();
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = async (productResource, quantity, options) => {
    if (!user) {
      Notify.info("Please log in to add items to your cart.");
      return;
    }

    const clientLogicalKey = `${productResource.public_id}-${options?.selectedHoopSize}-${options?.selectedThreadType}`;

    const existingItem = cartItems.find((i) => `${i.public_id}-${i.options?.selectedHoopSize}-${i.options?.selectedThreadType}` === clientLogicalKey);

    try {
      let itemToSaveToFirestore;
      let newFirestoreId = null;

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        itemToSaveToFirestore = { ...existingItem, quantity: newQuantity };
        newFirestoreId = await saveCartItemToFirestore(user.uid, itemToSaveToFirestore);

        setCartItems((prev) => prev.map((item) => (item.id === existingItem.id ? { ...item, quantity: newQuantity } : item)));
      } else {
        const newItem = { ...productResource, quantity: quantity, options: options };
        newFirestoreId = await saveCartItemToFirestore(user.uid, newItem);

        setCartItems((prev) => [...prev, { ...newItem, id: newFirestoreId }]);
      }
    } catch (error) {
      console.error("Error adding/updating cart item:", error);
      Notify.failure("Failed to add item to cart. Please try again.");
    }
  };

  const removeFromCart = async (publicId, options) => {
    if (!user) {
      Notify.info("Please log in to manage your cart.");
      return;
    }

    const itemToRemove = cartItems.some((item) => item.public_id === publicId);

    if (!itemToRemove) {
      console.warn("Attempted to remove item not found in cart state:", publicId, options);
      return;
    }

    try {
      if (itemToRemove.id) {
        await removeCartItemFromFirestore(user.uid, itemToRemove.id);
      }
      setCartItems((prev) => prev.filter((item) => item.id !== itemToRemove.id));
    } catch (error) {
      console.error("Error removing cart item:", error);
      Notify.failure("Failed to remove item from cart. Please try again.");
    }
  };

  const updateCartItemQuantity = async (publicId, options, newQuantity) => {
    if (!user) {
      Notify.info("Please log in to manage your cart.");
      return;
    }

    const clientLogicalKey = `${publicId}-${options?.selectedHoopSize}-${options?.selectedThreadType}`;

    const itemToUpdate = cartItems.find((item) => `${item.public_id}-${item.options?.selectedHoopSize}-${item.options?.selectedThreadType}` === clientLogicalKey);

    if (!itemToUpdate || !itemToUpdate.id) {
      console.warn("Attempted to update quantity for item not found or without Firestore ID:", publicId, options);
      return;
    }

    const quantityToSet = Math.max(0, newQuantity);

    try {
      if (quantityToSet === 0) {
        await removeCartItemFromFirestore(user.uid, itemToUpdate.id);
        setCartItems((prev) => prev.filter((item) => item.id !== itemToUpdate.id));
        Notify.info(`Quantity for ${publicId.split("/").pop()} set to 0. Item removed.`);
      } else {
        await saveCartItemToFirestore(user.uid, { ...itemToUpdate, quantity: quantityToSet });
        setCartItems((prev) => prev.map((item) => (item.id === itemToUpdate.id ? { ...item, quantity: quantityToSet } : item)));
        Notify.success(`Quantity for ${publicId.split("/").pop()} updated to ${quantityToSet}.`);
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      Notify.failure("Failed to update item quantity. Please try again.");
    }
  };

  const clearCart = async () => {
    if (!user) {
      Notify.info("Please log in to clear your cart.");
      return;
    }
    try {
      await clearUserCartInFirestore(user.uid);
      setCartItems([]);
      if (typeof window !== "undefined") {
        localStorage.removeItem("cartItems");
      }
      Notify.success("Your cart has been cleared!");
    } catch (error) {
      console.error("Error clearing cart:", error);
      Notify.failure("Failed to clear cart. Please try again.");
    }
  };

  const cartTotalPrice = cartItems.reduce((acc, item) => {
    const itemPrice = parseFloat(item.metadata?.price || defaultPrice);
    let optionPriceAdjustment = 0;
    if (item.options?.selectedThreadType === "Silk (+$5.00)") {
      optionPriceAdjustment = 5;
    }
    return acc + (itemPrice + optionPriceAdjustment) * item.quantity;
  }, 0);

  return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart, totalItemsInCart, cartTotalPrice }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
