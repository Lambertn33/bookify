import { StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { AppView, AppText, AppHeader, AppIconWithBadge } from '@/components/ui'
import { CartItems, CartFooter } from '@/components/cart'
import { CartContext } from '@/contexts/CartContext'
import { AuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'expo-router'

const CartScreen = () => {
  const { cartItems, getCartTotalPrice, getCartItemsCount } = useContext(CartContext);
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const isLoggedIn = user !== null;

  const handleBack = () => {
    router.push('/(shop)/books/bookList');
  };

  const handleCheckout = () => {
    router.push('/(shop)/checkout/CheckoutScreen');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppView style={styles.headerContainer}>
      <AppHeader 
          title="My Shopping Cart" 
          leftIcon={<FontAwesome5 name="arrow-left" size={24} color="black" onPress={handleBack} />}
          rightIcon={
            <AppIconWithBadge 
            icon={<Ionicons name="cart" size={32} color="black" />} 
            cartCount={getCartItemsCount()} 
          />
          }
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
          />
          <CartFooter
            grandTotal={getCartTotalPrice().toFixed(2)}
            onCheckout={handleCheckout}
            isLoggedIn={isLoggedIn}
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
