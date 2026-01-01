import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5 } from '@expo/vector-icons'
import { AppView, AppText, AppHeader } from '@/components/ui'
import { CartItems, CartFooter, CartBook } from '@/components/cart'

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartBook[]>([
    {
      id: 1,
      title: "The Covenant of Water",
      author: "Abraham Verghese",
      price: "18.99",
      cover_image_url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1675299980i/61234412.jpg",
    },
    {
      id: 2,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      price: "16.99",
      cover_image_url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1610332163i/32620332.jpg",
    },
    {
      id: 3,
      title: "It Ends with Us",
      author: "Colleen Hoover",
      price: "14.99",
      cover_image_url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1476132982i/27362503.jpg",
    },
  ]);

  // Separate state for quantities, initialized with default quantity of 1
  const [quantities, setQuantities] = useState<Record<number, number>>(() => {
    const initialQuantities: Record<number, number> = {};
    cartItems.forEach(item => {
      initialQuantities[item.id] = 1;
    });
    return initialQuantities;
  });

  const handleIncreaseQuantity = (id: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }));
  };

  const handleDecreaseQuantity = (id: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1)
    }));
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    setQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[id];
      return newQuantities;
    });
  };

  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => {
      const quantity = quantities[item.id] || 1;
      return total + (Number(item.price) * quantity);
    }, 0).toFixed(2);
  };

  const handleCheckout = () => {
    console.log('Proceed to checkout');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppView style={styles.headerContainer}>
      <AppHeader 
          title="My Shopping Cart" 
          leftIcon={<FontAwesome5 name="arrow-left" size={24} color="black" onPress={() => null} />}
          rightIcon={null}
        />
      </AppView>
      
      {cartItems.length === 0 ? (
        <AppView style={styles.emptyContainer}>
          <AppText style={styles.emptyText}>Your cart is empty</AppText>
        </AppView>
      ) : (
        <>
          <CartItems
            cartItems={cartItems}
            quantities={quantities}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            onRemoveItem={handleRemoveItem}
          />
          <CartFooter
            grandTotal={calculateGrandTotal()}
            onCheckout={handleCheckout}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#666666",
  },
});
