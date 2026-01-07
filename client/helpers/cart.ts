import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartBook {
    id: number;
    title: string;
    author: string;
    price: string;
    cover_image_url?: string;
    quantity: number;
}

export const getCartItemsFromLocalStorage = async (): Promise<CartBook[]> => {
    const cartItems = await AsyncStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
}

export const addBookToCartInLocalStorage = async (book: CartBook) => {
    const cartItems = await getCartItemsFromLocalStorage();
    await AsyncStorage.setItem('cartItems', JSON.stringify([...cartItems, book]));
}

export const removeBookFromCartInLocalStorage = async (id: number) => {
    const cartItems = await getCartItemsFromLocalStorage();
    await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems.filter(item => item.id !== id)));
}

export const clearCartInLocalStorage = async () => {
    await AsyncStorage.removeItem('cartItems');
}
