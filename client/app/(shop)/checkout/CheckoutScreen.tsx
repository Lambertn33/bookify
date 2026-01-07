import { StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppView, AppHeader, AppModal } from '@/components/ui';
import { CheckoutItems, CheckoutSummary } from '@/components/checkout';
import { CartContext } from '@/contexts/CartContext';
import { AuthContext } from '@/contexts/AuthContext';
import { Pressable } from 'react-native';
import { useCreateOrder } from '@/hooks/useOrders';

const CheckoutScreen = () => {
  const router = useRouter();
  const { cartItems, getCartTotalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleBack = () => {
    router.back();
  };

  const  createOrderMutation = useCreateOrder({
    onSuccess: (message) => {
      setSuccessMessage(message);
      setIsModalVisible(true);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setIsModalVisible(true);
    },
    onSuccessCallback: (message) => {
      setSuccessMessage(message);
    },
  });

  const handlePlaceOrder = () => {
    createOrderMutation.mutate({ items: cartItems.map(item => ({ book_id: item.id })) });
  }

  const handleCloseModal = async() => {
    await clearCart();
    setIsModalVisible(false);
    router.push('/user/MyOrders');
  }

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
          handlePlaceOrder={handlePlaceOrder}
          isPlacingOrder={createOrderMutation.isPending}
        />
      </AppView>
      {
        isModalVisible && (
          <AppModal
            isVisible={isModalVisible}
            onClose={handleCloseModal}
            message={successMessage || errorMessage}
            success={!errorMessage}
          />
        )
      }
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
