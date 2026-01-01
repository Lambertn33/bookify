import { StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5 } from '@expo/vector-icons'
import { AppView, AppText, AppHeader } from '@/components/ui'
import { CartItems, CartFooter } from '@/components/cart'
import { CartContext } from '@/contexts/CartContext'
import { useRouter } from 'expo-router'

const CartScreen = () => {
  const { cartItems, removeBookFromCart, updateBookQuantity, getCartTotalPrice } = useContext(CartContext);
  const router = useRouter();

  const handleBack = () => {
    router.push('/(shop)/books/bookList');
  };

  const handleIncreaseQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      updateBookQuantity(id, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateBookQuantity(id, item.quantity - 1);
    }
  };

  const handleCheckout = () => {
    console.log('Proceed to checkout');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppView style={styles.headerContainer}>
      <AppHeader 
          title="My Shopping Cart" 
          leftIcon={<FontAwesome5 name="arrow-left" size={24} color="black" onPress={handleBack} />}
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
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
          />
          <CartFooter
            grandTotal={getCartTotalPrice().toFixed(2)}
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
