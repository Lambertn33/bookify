import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { AppView, AppText } from '@/components/ui'
import { Ionicons } from '@expo/vector-icons'

interface CartActionsProps {
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onRemoveItem: () => void;
}

const CartActions = ({ quantity, onIncreaseQuantity, onDecreaseQuantity, onRemoveItem }: CartActionsProps) => {
  return (
    <AppView style={styles.quantityContainer}>
      <AppView style={styles.quantityControls}>
        <Pressable
          onPress={onDecreaseQuantity}
          style={styles.quantityButton}
        >
          <Ionicons name="remove" size={20} color="#000000" />
        </Pressable>
        <AppText style={styles.quantityValue}>{quantity}</AppText>
        <Pressable
          onPress={onIncreaseQuantity}
          style={styles.quantityButton}
        >
          <Ionicons name="add" size={20} color="#000000" />
        </Pressable>
      </AppView>
      <Pressable
        onPress={onRemoveItem}
        style={styles.removeButton}
      >
        <Ionicons name="trash-outline" size={20} color="#FF0000" />
      </Pressable>
    </AppView>
  );
};

export default CartActions;

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 12,
  },
  quantityButton: {
    padding: 4,
  },
  quantityValue: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#000000",
    minWidth: 30,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
});

