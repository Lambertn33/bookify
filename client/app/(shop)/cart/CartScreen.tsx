import { StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { AppView, AppText, AppButton, AppHeader } from '@/components/ui'
import { Image } from 'expo-image'

interface CartBook {
  id: number;
  title: string;
  author: string;
  price: string;
  cover_image_url: string;
}

const CartScreen = () => {
  const insets = useSafeAreaInsets();
  const [cartItems, setCartItems] = useState<CartBook[]>([
    {
      id: 1,
      title: "The Covenant of Water",
      author: "Abraham Verghese",
      price: "18.99",
      cover_image_url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1675299980i/61234412.jpg",
    },
    {
      id: 2,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      price: "16.99",
      cover_image_url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1610332163i/32620332.jpg",
    },
    {
      id: 3,
      title: "It Ends with Us",
      author: "Colleen Hoover",
      price: "14.99",
      cover_image_url: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1476132982i/27362503.jpg",
    },
  ]);

  // Separate state for quantities, initialized with default quantity of 1
  const [quantities, setQuantities] = useState<Record<number, number>>(() => {
    const initialQuantities: Record<number, number> = {};
    cartItems.forEach(item => {
      initialQuantities[item.id] = 1;
    });
    return initialQuantities;
  });

  const handleIncreaseQuantity = (id: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }));
  };

  const handleDecreaseQuantity = (id: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1)
    }));
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    setQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[id];
      return newQuantities;
    });
  };

  const calculateItemTotal = (price: string, quantity: number) => {
    return (Number(price) * quantity).toFixed(2);
  };

  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => {
      const quantity = quantities[item.id] || 1;
      return total + (Number(item.price) * quantity);
    }, 0).toFixed(2);
  };

  const renderCartItem = ({ item }: { item: CartBook }) => {
    const quantity = quantities[item.id] || 1;
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
          <AppView style={styles.quantityContainer}>
            <AppView style={styles.quantityControls}>
              <Pressable
                onPress={() => handleDecreaseQuantity(item.id)}
                style={styles.quantityButton}
              >
                <Ionicons name="remove" size={20} color="#000000" />
              </Pressable>
              <AppText style={styles.quantityValue}>{quantity}</AppText>
              <Pressable
                onPress={() => handleIncreaseQuantity(item.id)}
                style={styles.quantityButton}
              >
                <Ionicons name="add" size={20} color="#000000" />
              </Pressable>
            </AppView>
            <Pressable
              onPress={() => handleRemoveItem(item.id)}
              style={styles.removeButton}
            >
              <Ionicons name="trash-outline" size={20} color="#FF0000" />
            </Pressable>
          </AppView>
        </AppView>
      </AppView>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppView style={styles.headerContainer}>
        <AppHeader title="Shopping Cart" />
      </AppView>
      
      {cartItems.length === 0 ? (
        <AppView style={styles.emptyContainer}>
          <AppText style={styles.emptyText}>Your cart is empty</AppText>
        </AppView>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={[styles.listContent, { paddingBottom: 140 + Math.max(insets.bottom, 20) }]}
            showsVerticalScrollIndicator={false}
          />
          <AppView style={[styles.footerContainer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
            <AppView style={styles.grandTotalContainer}>
              <AppText style={styles.grandTotalLabel}>Grand Total</AppText>
              <AppText style={styles.grandTotalValue}>${calculateGrandTotal()}</AppText>
            </AppView>
            <AppButton style={styles.checkoutButton}>
              <AppText style={styles.checkoutButtonText}>Proceed to Checkout</AppText>
            </AppButton>
          </AppView>
        </>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
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
    fontSize: 24,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#666666",
  },
});
