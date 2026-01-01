import { StyleSheet, Alert } from 'react-native'
import React, { useContext } from 'react'
import { AppView, AppText } from '@/components/ui'
import { Image } from 'expo-image'
import CartActions from './CartActions'
import { CartContext } from '@/contexts/CartContext'



export interface CartBook {
  id: number;
  title: string;
  author: string;
  price: string;
  cover_image_url?: string;
  quantity: number;
}

interface CartItemProps {
  item: CartBook;
  quantity: number;
}

const CartItem = ({ item, quantity }: CartItemProps) => {
  
  const { removeBookFromCart, updateBookQuantity, getCartItemTotalPrice } = useContext(CartContext);

  const handleRemoveItem = () => {
    removeBookFromCart(item.id);
    Alert.alert('Item removed from cart', 'Item has been removed from your cart');
  };

  const handleIncreaseQuantity = () => {
    updateBookQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
        updateBookQuantity(item.id, item.quantity - 1);
      }
  };

  return (
    <AppView style={styles.cartItemContainer}>
      <AppView style={styles.cartItemImageContainer}>
        {item.cover_image_url && (
          <Image
            source={{ uri: item.cover_image_url }}
            style={styles.cartItemImage}
            contentFit="cover"
          />
        )}
      </AppView>
      <AppView style={styles.cartItemInfoContainer} paddingTop={12} paddingBottom={12}>
        <AppText style={styles.cartItemTitle} numberOfLines={2}>{item.title}</AppText>
        <AppText style={styles.cartItemAuthor}>by {item.author}</AppText>
        <AppView style={styles.cartItemPriceContainer}>
          <AppText style={styles.cartItemPrice}>${item.price}</AppText>
          <AppText style={styles.cartItemTotal}>Total: ${getCartItemTotalPrice(item.id)}</AppText>
        </AppView>
        <CartActions
          quantity={quantity}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
          onRemoveItem={handleRemoveItem}
        />
      </AppView>
    </AppView>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    // padding: 12,
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
    height: '100%',
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
    padding: 12,
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

