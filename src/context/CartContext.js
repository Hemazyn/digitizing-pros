"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { defaultPrice } from "../app/constants";

const CartContext = createContext();

export function CartProvider({ children }) {
     const [cartItems, setCartItems] = useState(() => {
          if (typeof window !== 'undefined') {
               const savedCart = localStorage.getItem('cartItems');
               return savedCart ? JSON.parse(savedCart) : [];
          }
          return [];
     });

     useEffect(() => {
          if (typeof window !== 'undefined') {
               localStorage.setItem('cartItems', JSON.stringify(cartItems));
          }
     }, [cartItems]);

     const addToCart = (product, quantity, options) => {
          setCartItems((prevItems) => {
               const existingItemIndex = prevItems.findIndex(
                    (item) =>
                         item.public_id === product.public_id &&
                         JSON.stringify(item.options) === JSON.stringify(options)
               );

               if (existingItemIndex > -1) {
                    const updatedItems = [...prevItems];
                    updatedItems[existingItemIndex].quantity += quantity;
                    return updatedItems;
               } else {
                    return [...prevItems, { ...product, quantity, options }];
               }
          });
     };

     const removeFromCart = (publicId, options) => {
          setCartItems((prevItems) =>
               prevItems.filter(
                    (item) =>
                         !(item.public_id === publicId && JSON.stringify(item.options) === JSON.stringify(options))
               )
          );
     };

     const updateCartItemQuantity = (publicId, options, newQuantity) => {
          setCartItems((prevItems) =>
               prevItems.map((item) =>
                    item.public_id === publicId && JSON.stringify(item.options) === JSON.stringify(options)
                         ? { ...item, quantity: Math.max(1, newQuantity) }
                         : item
               )
          );
     };

     const clearCart = () => {
          setCartItems([]);
     };

     const totalItemsInCart = cartItems.length;

     const cartTotalPrice = cartItems.reduce((total, item) => {
          const itemPrice = parseFloat(item.metadata?.price || defaultPrice);
          let optionPriceAdjustment = 0;
          if (item.options?.selectedThreadType === "Silk (+$5.00)") {
               optionPriceAdjustment = 5;
          }
          return total + (itemPrice + optionPriceAdjustment) * item.quantity;
     }, 0);


     const value = { cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart, totalItemsInCart, cartTotalPrice };

     return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
     const context = useContext(CartContext);
     if (context === undefined) {
          throw new Error("useCart must be used within a CartProvider");
     }
     return context;
}