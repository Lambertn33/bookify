import { StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CartItem, { CartBook } from './CartItem'

interface CartItemsProps {
  cartItems: CartBook[];
  onIncreaseQuantity: (id: number) => void;
  onDecreaseQuantity: (id: number) => void;
  onRemoveItem: (id: number) => void;
}

const CartItems = ({ 
  cartItems, 
  onIncreaseQuantity, 
  onDecreaseQuantity, 
  onRemoveItem 
}: CartItemsProps) => {
  const insets = useSafeAreaInsets();

  const renderCartItem = ({ item }: { item: CartBook }) => {
    return (
      <CartItem
        item={item}
        quantity={item.quantity}
        onIncreaseQuantity={() => onIncreaseQuantity(item.id)}
        onDecreaseQuantity={() => onDecreaseQuantity(item.id)}
        onRemoveItem={() => onRemoveItem(item.id)}
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
