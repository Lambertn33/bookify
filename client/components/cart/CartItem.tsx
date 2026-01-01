import { StyleSheet } from 'react-native'
import React from 'react'
import { AppView, AppText } from '@/components/ui'
import { Image } from 'expo-image'
import CartActions from './CartActions'

export interface CartBook {
  id: number;
  title: string;
  author: string;
  price: string;
  cover_image_url: string;
}

interface CartItemProps {
  item: CartBook;
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onRemoveItem: () => void;
}

const CartItem = ({ item, quantity, onIncreaseQuantity, onDecreaseQuantity, onRemoveItem }: CartItemProps) => {
  const calculateItemTotal = (price: string, quantity: number) => {
    return (Number(price) * quantity).toFixed(2);
  };

  return (
    <AppView style={styles.cartItemContainer}>
      <AppView style={styles.cartItemImageContainer}>
        <Image
          source={{ uri: item.cover_image_url }}
          style={styles.cartItemImage}
          contentFit="cover"
        />
      </AppView>
      <AppView style={styles.cartItemInfoContainer}>
        <AppText style={styles.cartItemTitle} numberOfLines={2}>{item.title}</AppText>
        <AppText style={styles.cartItemAuthor}>{item.author}</AppText>
        <AppView style={styles.cartItemPriceContainer}>
          <AppText style={styles.cartItemPrice}>${item.price}</AppText>
          <AppText style={styles.cartItemTotal}>Total: ${calculateItemTotal(item.price, quantity)}</AppText>
        </AppView>
        <CartActions
          quantity={quantity}
          onIncreaseQuantity={onIncreaseQuantity}
          onDecreaseQuantity={onDecreaseQuantity}
          onRemoveItem={onRemoveItem}
        />
      </AppView>
    </AppView>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItemImageContainer: {
    width: 100,
    height: 140,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  cartItemImage: {
    width: '100%',
    height: '100%',
  },
  cartItemInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cartItemTitle: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#000000",
    marginBottom: 4,
  },
  cartItemAuthor: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "#666666",
    marginBottom: 8,
  },
  cartItemPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cartItemPrice: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#666666",
  },
  cartItemTotal: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#4B5320",
  },
});

