// // contexts/CartContext.js
// "use client";
// import { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//      // Initialize cart from localStorage if available
//      const [cartItems, setCartItems] = useState(() => {
//           if (typeof window !== 'undefined') { // Check if running in browser
//                const savedCart = localStorage.getItem('shoppingCart');
//                return savedCart ? JSON.parse(savedCart) : [];
//           }
//           return [];
//      });

//      // Save cart to localStorage whenever it changes
//      useEffect(() => {
//           if (typeof window !== 'undefined') {
//                localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
//           }
//      }, [cartItems]);

//      const addToCart = (product) => {
//           setCartItems((prevItems) => {
//                const existingItem = prevItems.find((item) => item.id === product.id);
//                if (existingItem) {
//                     return prevItems.map((item) =>
//                          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//                     );
//                } else {
//                     return [...prevItems, { ...product, quantity: 1 }];
//                }
//           });
//      };

//      const updateQuantity = (id, newQuantity) => {
//           setCartItems((prevItems) =>
//                prevItems
//                     .map((item) =>
//                          item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
//                     )
//                     .filter(item => item.quantity > 0) // Remove if quantity drops to 0
//           );
//      };

//      const removeItem = (id) => {
//           setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
//      };

//      const clearCart = () => {
//           setCartItems([]);
//      };

//      const cartTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//      return (
//           <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart, cartTotalItems }}>
//                {children}
//           </CartContext.Provider>
//      );
// };

// export const useCart = () => {
//      return useContext(CartContext);
// };


"use client";
import { createContext, useContext, useState, useEffect } from "react";

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

     const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

     const cartTotalPrice = cartItems.reduce((total, item) => {
          const itemPrice = parseFloat(item.metadata?.price || 0);
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