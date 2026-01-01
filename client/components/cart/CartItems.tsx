import { StyleSheet, FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CartItem, { CartBook } from './CartItem'

interface CartItemsProps {
  cartItems: CartBook[];
}

const CartItems = ({ 
  cartItems, 
}: CartItemsProps) => {
  const insets = useSafeAreaInsets();

  const renderCartItem = ({ item }: { item: CartBook }) => {
    return (
      <CartItem
        item={item}
        quantity={item.quantity}
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
