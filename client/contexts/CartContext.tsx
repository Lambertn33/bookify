import { createContext, useState } from "react";

import { 
    getCartItemsFromLocalStorage, 
    addBookToCartInLocalStorage, 
    removeBookFromCartInLocalStorage, 
    updateBookQuantityInLocalStorage, 
    clearCartInLocalStorage }
 from '@/helpers/cart';

interface CartBook {
    id: number;
    title: string;
    author: string;
    price: string;
    cover_image_url?: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartBook[];
    addBookToCart: (book: CartBook) => Promise<void>;
    removeBookFromCart: (id: number) => Promise<void>;
    updateBookQuantity: (id: number, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    getCartTotal: () => number;
    getCartItemsCount: () => number;
    getCartTotalPrice: () => number;
}

export const CartContext = createContext<CartContextType>({
    cartItems: [],
    addBookToCart: async () => {},
    removeBookFromCart: async () => {},
    updateBookQuantity: async () => {},
    clearCart: async () => {},
    getCartTotal: () => 0,
    getCartItemsCount: () => 0,
    getCartTotalPrice: () => 0,
});

export const CartProvider = ({children, initialCartItems}: {children: React.ReactNode, initialCartItems: CartBook[]}) => {
   const [cartItems, setCartItems] = useState<CartBook[]>(initialCartItems);

  const addBookToCart = async(book: CartBook) => {
    await addBookToCartInLocalStorage(book);
    const items = await getCartItemsFromLocalStorage();
    setCartItems(items);
  }

  const removeBookFromCart = async(id: number) => {
    await removeBookFromCartInLocalStorage(id);
    const items = await getCartItemsFromLocalStorage();
    setCartItems(items);
  }

  const updateBookQuantity = async(id: number, quantity: number) => {
    await updateBookQuantityInLocalStorage(id, quantity);
    const items = await getCartItemsFromLocalStorage();
    setCartItems(items);
  }

  const clearCart = async() => {
    await clearCartInLocalStorage();
    setCartItems([]);
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
  }

  const getCartItemsCount = () => {
    return cartItems.length;
  }

  const getCartTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
  }

  const values = {
    cartItems,
    addBookToCart,
    removeBookFromCart,
    updateBookQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getCartTotalPrice,
  }

   return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}