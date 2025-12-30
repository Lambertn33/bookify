import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AppView, AppText, AppButton } from '@/components/ui'
import { Ionicons } from '@expo/vector-icons'

interface ActionsProps {
    quantity: number;
    handleIncreaseQuantity: () => void;
    handleDecreaseQuantity: () => void;
    onAddToCart: () => void;
    price: string;
}

const Actions = ({ quantity, handleIncreaseQuantity, handleDecreaseQuantity, price, onAddToCart }: ActionsProps) => {
  return (
    <AppView style={styles.actionsContainer}>
    <AppView style={styles.qtyAndTotalContainer}>
      <AppView style={styles.qtyContainer}>
        <AppText style={styles.qtyLabel}>QTY</AppText>
        <AppText style={styles.qtyValue}>{quantity}</AppText>
        <AppView style={styles.qtyButtons}>
          <Pressable onPress={handleIncreaseQuantity} style={styles.qtyButton}>
            <Ionicons name="add" size={20} color="#000000" />
          </Pressable>
          <Pressable onPress={handleDecreaseQuantity} style={styles.qtyButton}>
            <Ionicons name="remove" size={20} color="#000000" />
          </Pressable>
        </AppView>
      </AppView>
      <AppView style={styles.totalContainer}>
        <AppText style={styles.totalLabel}>Total</AppText>
        <AppText style={styles.totalValue}>$ {((Number(price) * quantity).toFixed(2))}</AppText>
      </AppView>
    </AppView>
    <AppButton onPress={onAddToCart} style={styles.addToCartButton}>
      <AppText style={styles.addToCartText}>Add to cart</AppText>
    </AppButton>
  </AppView>
  )
}

export default Actions

const styles = StyleSheet.create({
    actionsContainer : {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: "#000",
      },
    
      qtyContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        borderRadius: 16,
        paddingHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      qtyLabel: {
        fontSize: 14,
        fontFamily: "Poppins_700Bold",
        color: "#000000",
      },
      qtyValue: {
        fontSize: 16,
        fontFamily: "Poppins_700Bold",
        color: "#000000",
        marginHorizontal: 12,
      },
      qtyButtons: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      },
      qtyButton: {
        padding: 1,
      },
    
      totalContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 16,
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginLeft: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      totalLabel: {
        fontSize: 12,
        fontFamily: "Poppins_700Bold",
        color: "#666666",
      },
      totalValue: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
        color: "#000000",
      },
      qtyAndTotalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
      },
      addToCartButton: {
        marginLeft: 12,
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 24,
      },
      addToCartText: {
        fontSize: 16,
        fontFamily: "Poppins_600SemiBold",
        color: "#FFFFFF",
      },
});