import { StyleSheet, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CartItem, { CartBook } from './CartItem'
import { CartContext } from '@/contexts/CartContext'

interface CartItemsProps {
  cartItems: CartBook[];
  onIncreaseQuantity: (id: number) => void;
  onDecreaseQuantity: (id: number) => void;
}

const CartItems = ({ 
  cartItems, 
  onIncreaseQuantity, 
  onDecreaseQuantity, 
}: CartItemsProps) => {
  const insets = useSafeAreaInsets();

  const renderCartItem = ({ item }: { item: CartBook }) => {
    return (
      <CartItem
        item={item}
        quantity={item.quantity}
        onIncreaseQuantity={() => onIncreaseQuantity(item.id)}
        onDecreaseQuantity={() => onDecreaseQuantity(item.id)}
      />
    );
  };

  return (
    <FlatList
      data={cartItems}
      renderItem={renderCartItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={[styles.listContent, { paddingBottom: 140 + Math.max(insets.bottom, 20) }]}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CartItems;

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
