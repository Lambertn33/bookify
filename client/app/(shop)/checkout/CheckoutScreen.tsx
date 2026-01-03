import { StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppView, AppHeader } from '@/components/ui';
import { CheckoutItems, CheckoutSummary } from '@/components/checkout';
import { CartContext } from '@/contexts/CartContext';
import { AuthContext } from '@/contexts/AuthContext';
import { Pressable } from 'react-native';

const CheckoutScreen = () => {
  const router = useRouter();
  const { cartItems, getCartTotalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handlePay = async () => {
   
  };

  const amountToPay = getCartTotalPrice();
  const initialBalance = Number(user?.balance) || 0;
  const remainingBalance = initialBalance - amountToPay;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppView style={styles.headerContainer}>
        <AppHeader
          title="Checkout"
          leftIcon={
            <Pressable onPress={handleBack}>
              <FontAwesome5 name="arrow-left" size={24} color="black" />
            </Pressable>
          }
        />
      </AppView>

      <AppView style={styles.content} >
        {/* Books Summary */}
        {cartItems.length > 0 && (
          <CheckoutItems 
            cartItems={cartItems} 
            title="Order Summary" 
          />
        )}
        {/* Payment Summary */}
        <CheckoutSummary
          amountToPay={amountToPay}
          initialBalance={initialBalance}
          remainingBalance={remainingBalance}
          handlePay={handlePay}
          isPlacingOrder={isPlacingOrder}
        />
      </AppView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
});
