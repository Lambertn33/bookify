import { StyleSheet} from 'react-native'
import { AppButton, AppText, AppView } from '../ui'

interface SummaryProps {
  amountToPay: number;
  initialBalance: number;
  remainingBalance: number;
  handlePlaceOrder: () => void;
  isPlacingOrder: boolean;
}

const Summary = ({ amountToPay, initialBalance, remainingBalance, handlePlaceOrder, isPlacingOrder }: SummaryProps) => {
  return (
    <AppView style={styles.paymentCard} paddingTop={40} paddingBottom={40}>
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
      onPress={handlePlaceOrder}
      disabled={isPlacingOrder || amountToPay === 0}
      style={styles.payButton}
    >
      <AppText style={styles.payButtonText}>
        {isPlacingOrder ? 'Processing...' : 'Place Order'}
      </AppText>
    </AppButton>
  </AppView>
  )
}

export default Summary

const styles = StyleSheet.create({
    paymentCard: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
      title: {
        fontSize: 22,
        fontFamily: 'Poppins_600SemiBold',
        color: '#000000',
        marginBottom: 24,
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
})