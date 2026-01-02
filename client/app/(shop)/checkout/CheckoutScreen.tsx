import { StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppView, AppText, AppHeader, AppTextInput, AppButton } from '@/components/ui';
import { CartContext } from '@/contexts/CartContext';
import { AuthContext } from '@/contexts/AuthContext';
import { Image } from 'expo-image';

const CheckoutScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { cartItems, getCartTotalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.names || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address || 
        !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      Alert.alert('Missing Information', 'Please fill in all shipping address fields');
      return;
    }

    setIsPlacingOrder(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsPlacingOrder(false);
      Alert.alert(
        'Order Placed!',
        'Your order has been placed successfully. You will receive a confirmation email shortly.',
        [
          {
            text: 'OK',
            onPress: async () => {
              await clearCart();
              router.push('/(shop)/books/bookList');
            },
          },
        ]
      );
    }, 1500);
  };

  const subtotal = getCartTotalPrice();
  const shipping = 5.00; // Fixed shipping cost
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppView style={styles.headerContainer}>
        <AppHeader
          title="Checkout"
          leftIcon={
            <Pressable onPress={handleBack}>
              <FontAwesome5 name="arrow-left" size={24} color="black" />
            </Pressable>
          }
        />
      </AppView>

      {cartItems.length === 0 ? (
        <AppView style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={64} color="#CCCCCC" />
          <AppText style={styles.emptyTitle}>Your cart is empty</AppText>
          <AppText style={styles.emptyText}>Add items to your cart to checkout</AppText>
        </AppView>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 200 }]}
            showsVerticalScrollIndicator={false}
          >
            {/* Order Items Summary */}
            <AppView style={styles.section}>
              <AppText style={styles.sectionTitle}>Order Items</AppText>
              <AppView style={styles.itemsCard}>
                {cartItems.map((item) => (
                  <AppView key={item.id} style={styles.checkoutItem}>
                    <Image
                      source={{ uri: item.cover_image_url || 'https://via.placeholder.com/80' }}
                      style={styles.itemImage}
                      contentFit="cover"
                    />
                    <AppView style={styles.itemDetails}>
                      <AppText style={styles.itemTitle} numberOfLines={2}>
                        {item.title}
                      </AppText>
                      <AppText style={styles.itemAuthor}>{item.author}</AppText>
                      <AppView style={styles.itemPriceRow}>
                        <AppText style={styles.itemQuantity}>Qty: {item.quantity}</AppText>
                        <AppText style={styles.itemPrice}>
                          ${(Number(item.price) * item.quantity).toFixed(2)}
                        </AppText>
                      </AppView>
                    </AppView>
                  </AppView>
                ))}
              </AppView>
            </AppView>

            {/* Shipping Address */}
            <AppView style={styles.section}>
              <AppText style={styles.sectionTitle}>Shipping Address</AppText>
              <AppView style={styles.formCard}>
                <AppView style={styles.inputGroup}>
                  <AppTextInput
                    placeholder="Full Name"
                    value={shippingAddress.fullName}
                    handleChangeText={(text) =>
                      setShippingAddress({ ...shippingAddress, fullName: text })
                    }
                    icon={<Ionicons name="person-outline" size={20} color="#666666" />}
                    iconPosition="left"
                    style={styles.input}
                  />
                </AppView>

                <AppView style={styles.inputGroup}>
                  <AppTextInput
                    placeholder="Phone Number"
                    value={shippingAddress.phone}
                    handleChangeText={(text) =>
                      setShippingAddress({ ...shippingAddress, phone: text })
                    }
                    icon={<Ionicons name="call-outline" size={20} color="#666666" />}
                    iconPosition="left"
                    keyboardType="phone-pad"
                    style={styles.input}
                  />
                </AppView>

                <AppView style={styles.inputGroup}>
                  <AppTextInput
                    placeholder="Address"
                    value={shippingAddress.address}
                    handleChangeText={(text) =>
                      setShippingAddress({ ...shippingAddress, address: text })
                    }
                    icon={<Ionicons name="location-outline" size={20} color="#666666" />}
                    iconPosition="left"
                    style={styles.input}
                  />
                </AppView>

                <AppView style={styles.row}>
                  <AppView style={[styles.inputGroup, styles.halfWidth]}>
                    <AppTextInput
                      placeholder="City"
                      value={shippingAddress.city}
                      handleChangeText={(text) =>
                        setShippingAddress({ ...shippingAddress, city: text })
                      }
                      icon={<Ionicons name="business-outline" size={20} color="#666666" />}
                      iconPosition="left"
                      style={styles.input}
                    />
                  </AppView>

                  <AppView style={[styles.inputGroup, styles.halfWidth]}>
                    <AppTextInput
                      placeholder="Postal Code"
                      value={shippingAddress.postalCode}
                      handleChangeText={(text) =>
                        setShippingAddress({ ...shippingAddress, postalCode: text })
                      }
                      icon={<Ionicons name="mail-outline" size={20} color="#666666" />}
                      iconPosition="left"
                      keyboardType="numeric"
                      style={styles.input}
                    />
                  </AppView>
                </AppView>

                <AppView style={styles.inputGroup}>
                  <AppTextInput
                    placeholder="Country"
                    value={shippingAddress.country}
                    handleChangeText={(text) =>
                      setShippingAddress({ ...shippingAddress, country: text })
                    }
                    icon={<Ionicons name="globe-outline" size={20} color="#666666" />}
                    iconPosition="left"
                    style={styles.input}
                  />
                </AppView>
              </AppView>
            </AppView>

            {/* Payment Method */}
            <AppView style={styles.section}>
              <AppText style={styles.sectionTitle}>Payment Method</AppText>
              <AppView style={styles.formCard}>
                <Pressable
                  style={[
                    styles.paymentOption,
                    paymentMethod === 'card' && styles.paymentOptionSelected,
                  ]}
                  onPress={() => setPaymentMethod('card')}
                >
                  <Ionicons
                    name="card-outline"
                    size={24}
                    color={paymentMethod === 'card' ? '#000000' : '#666666'}
                  />
                  <AppText
                    style={[
                      styles.paymentOptionText,
                      paymentMethod === 'card' && styles.paymentOptionTextSelected,
                    ]}
                  >
                    Credit/Debit Card
                  </AppText>
                  {paymentMethod === 'card' && (
                    <Ionicons name="checkmark-circle" size={24} color="#000000" />
                  )}
                </Pressable>

                <Pressable
                  style={[
                    styles.paymentOption,
                    paymentMethod === 'cash' && styles.paymentOptionSelected,
                  ]}
                  onPress={() => setPaymentMethod('cash')}
                >
                  <Ionicons
                    name="cash-outline"
                    size={24}
                    color={paymentMethod === 'cash' ? '#000000' : '#666666'}
                  />
                  <AppText
                    style={[
                      styles.paymentOptionText,
                      paymentMethod === 'cash' && styles.paymentOptionTextSelected,
                    ]}
                  >
                    Cash on Delivery
                  </AppText>
                  {paymentMethod === 'cash' && (
                    <Ionicons name="checkmark-circle" size={24} color="#000000" />
                  )}
                </Pressable>
              </AppView>
            </AppView>

            {/* Order Summary */}
            <AppView style={styles.section}>
              <AppText style={styles.sectionTitle}>Order Summary</AppText>
              <AppView style={styles.summaryCard}>
                <AppView style={styles.summaryRow}>
                  <AppText style={styles.summaryLabel}>Subtotal</AppText>
                  <AppText style={styles.summaryValue}>${subtotal.toFixed(2)}</AppText>
                </AppView>
                <AppView style={styles.summaryRow}>
                  <AppText style={styles.summaryLabel}>Shipping</AppText>
                  <AppText style={styles.summaryValue}>${shipping.toFixed(2)}</AppText>
                </AppView>
                <AppView style={styles.summaryRow}>
                  <AppText style={styles.summaryLabel}>Tax</AppText>
                  <AppText style={styles.summaryValue}>${tax.toFixed(2)}</AppText>
                </AppView>
                <AppView style={[styles.summaryRow, styles.totalRow]}>
                  <AppText style={styles.totalLabel}>Total</AppText>
                  <AppText style={styles.totalValue}>${total.toFixed(2)}</AppText>
                </AppView>
              </AppView>
            </AppView>
          </ScrollView>

          {/* Place Order Button */}
          <AppView
            style={[
              styles.footer,
              { paddingBottom: Math.max(insets.bottom, 20) },
            ]}
          >
            <AppButton
              style={styles.placeOrderButton}
              onPress={handlePlaceOrder}
              disabled={isPlacingOrder}
            >
              <AppText style={styles.placeOrderButtonText}>
                {isPlacingOrder ? 'Placing Order...' : `Place Order - $${total.toFixed(2)}`}
              </AppText>
            </AppButton>
          </AppView>
        </>
      )}
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 12,
  },
  itemsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: 16,
  },
  checkoutItem: {
    flexDirection: 'row',
    gap: 12,
  },
  itemImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 4,
  },
  itemAuthor: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginBottom: 8,
  },
  itemPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemQuantity: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
  itemPrice: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: 12,
  },
  inputGroup: {
    marginBottom: 0,
  },
  input: {
    marginBottom: 0,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    marginBottom: 12,
    gap: 12,
  },
  paymentOptionSelected: {
    borderColor: '#000000',
    backgroundColor: '#F5F5F5',
  },
  paymentOptionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#666666',
  },
  paymentOptionTextSelected: {
    color: '#000000',
    fontFamily: 'Poppins_600SemiBold',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
  summaryValue: {
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
  },
  totalValue: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  placeOrderButton: {
    backgroundColor: '#000000',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
});
