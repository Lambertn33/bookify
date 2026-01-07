import { createContext, useState } from "react";

import { 
    getCartItemsFromLocalStorage, 
    addBookToCartInLocalStorage, 
    removeBookFromCartInLocalStorage, 
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
    clearCart: () => Promise<void>;
    getCartItemsCount: () => number;
    getCartTotalPrice: () => number;
    getCartItemTotalPrice: (id: number) => number;
}

export const CartContext = createContext<CartContextType>({
    cartItems: [],
    addBookToCart: async () => {},
    removeBookFromCart: async () => {},
    clearCart: async () => {},
    getCartItemsCount: () => 0,
    getCartTotalPrice: () => 0,
    getCartItemTotalPrice: () => 0,
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
    if (items.length === 0) {
        await clearCart();
        return;
    }
    setCartItems(items);
  }

  const getCartItemTotalPrice = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (!item) return 0;
    return Number(item.price) * item.quantity;
  }

  const clearCart = async() => {
    await clearCartInLocalStorage();
    setCartItems([]);
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
    clearCart,
    getCartItemsCount,
    getCartTotalPrice,
    getCartItemTotalPrice,
  }

   return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}