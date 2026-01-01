import { StyleSheet } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AppView, AppText, AppButton } from '@/components/ui'

interface CartFooterProps {
  grandTotal: string;
  onCheckout?: () => void;
}

const CartFooter = ({ grandTotal, onCheckout }: CartFooterProps) => {
  const insets = useSafeAreaInsets();

  return (
    <AppView style={[styles.footerContainer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
      <AppView style={styles.grandTotalContainer}>
        <AppText style={styles.grandTotalLabel}>Grand Total</AppText>
        <AppText style={styles.grandTotalValue}>${grandTotal}</AppText>
      </AppView>
      <AppButton style={styles.checkoutButton} onPress={onCheckout}>
        <AppText style={styles.checkoutButtonText}>Proceed to Checkout</AppText>
      </AppButton>
    </AppView>
  );
};

export default CartFooter;

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  grandTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  grandTotalLabel: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#000000",
  },
  grandTotalValue: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "#4B5320",
  },
  checkoutButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    textAlign: 'center',
  },
});

