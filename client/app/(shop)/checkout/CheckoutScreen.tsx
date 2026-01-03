import { StyleSheet, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppView, AppText, AppHeader, AppButton } from '@/components/ui';
import { CartContext } from '@/contexts/CartContext';
import { AuthContext } from '@/contexts/AuthContext';
import { Pressable } from 'react-native';

const CheckoutScreen = () => {
  const router = useRouter();
  const { getCartTotalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handlePay = async () => {
    const amountToPay = getCartTotalPrice();
    const userBalance = Number(user?.balance) || 0;

    if (amountToPay > userBalance) {
      Alert.alert(
        'Insufficient Balance',
        `You don't have enough balance. Your balance is $${userBalance.toFixed(2)} but you need $${amountToPay.toFixed(2)}.`
      );
      return;
    }

    setIsPlacingOrder(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsPlacingOrder(false);
      Alert.alert(
        'Payment Successful!',
        'Your order has been placed successfully.',
        [
          {
            text: 'OK',
            onPress: async () => {
              await clearCart();
              router.push('/(shop)/books/bookList');
            },
          },
        ]
      );
    }, 1500);
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

      <AppView style={styles.content}>
        <AppView style={styles.paymentCard}>
          <AppText style={styles.title}>Payment Summary</AppText>
          
          <AppView style={styles.amountRow}>
            <AppText style={styles.label}>Amount to pay</AppText>
            <AppText style={styles.amount}>${amountToPay.toFixed(2)}</AppText>
          </AppView>

          <AppView style={styles.amountRow}>
            <AppText style={styles.label}>Initial balance</AppText>
            <AppText style={styles.amount}>${initialBalance.toFixed(2)}</AppText>
          </AppView>

          <AppView style={styles.divider} />

          <AppView style={styles.amountRow}>
            <AppText style={styles.label}>Remaining balance</AppText>
            <AppText style={[styles.amount, remainingBalance < 0 && styles.negativeAmount]}>
              ${remainingBalance.toFixed(2)}
            </AppText>
          </AppView>

          <AppButton
            onPress={handlePay}
            disabled={isPlacingOrder || amountToPay === 0}
            style={styles.payButton}
          >
            <AppText style={styles.payButtonText}>
              {isPlacingOrder ? 'Processing...' : 'Pay'}
            </AppText>
          </AppButton>
        </AppView>
      </AppView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  },
  paymentCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FAFAFA',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 24,
    textAlign: 'center',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
  amount: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
  },
  negativeAmount: {
    color: '#FF3B30',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 16,
  },
  payButton: {
    marginTop: 24,
  },
  payButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
});
