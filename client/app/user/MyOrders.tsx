import { StyleSheet, ScrollView, Pressable } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppView, AppText, AppHeader } from '@/components/ui';
import { AuthContext } from '@/contexts/AuthContext';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: Array<{
    id: number;
    title: string;
    quantity: number;
    price: number;
  }>;
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'completed',
    total: 45.99,
    items: [
      { id: 1, title: 'The Great Gatsby', quantity: 2, price: 12.99 },
      { id: 2, title: 'To Kill a Mockingbird', quantity: 1, price: 20.01 },
    ],
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'processing',
    total: 89.50,
    items: [
      { id: 3, title: '1984', quantity: 3, price: 15.50 },
      { id: 4, title: 'Pride and Prejudice', quantity: 1, price: 43.00 },
    ],
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-25',
    status: 'pending',
    total: 32.99,
    items: [
      { id: 5, title: 'The Catcher in the Rye', quantity: 1, price: 32.99 },
    ],
  },
];

const OrdersScreen = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const handleBack = () => {
    router.push('/(shop)/books/bookList');
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'processing':
        return '#FF9800';
      case 'pending':
        return '#2196F3';
      case 'cancelled':
        return '#F44336';
      default:
        return '#666666';
    }
  };

  const getStatusText = (status: Order['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppView style={styles.headerContainer}>
        <AppHeader
          title="My Orders"
          leftIcon={
            <Pressable onPress={handleBack}>
              <FontAwesome5 name="arrow-left" size={24} color="black" />
            </Pressable>
          }
        />
      </AppView>

      {!user ? (
        <AppView style={styles.emptyContainer}>
          <Ionicons name="lock-closed-outline" size={64} color="#CCCCCC" />
          <AppText style={styles.emptyTitle}>Please log in to view orders</AppText>
          <AppText style={styles.emptyText}>Sign in to see your order history</AppText>
        </AppView>
      ) : mockOrders.length === 0 ? (
        <AppView style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={64} color="#CCCCCC" />
          <AppText style={styles.emptyTitle}>No orders yet</AppText>
          <AppText style={styles.emptyText}>Your order history will appear here</AppText>
        </AppView>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {mockOrders.map((order) => (
            <AppView key={order.id} style={styles.orderCard}>
              <AppView style={styles.orderHeader}>
                <AppView style={styles.orderInfo}>
                  <AppText style={styles.orderNumber}>{order.orderNumber}</AppText>
                  <AppText style={styles.orderDate}>{formatDate(order.date)}</AppText>
                </AppView>
                <AppView
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(order.status) + '20' },
                  ]}
                >
                  <AppText
                    style={[
                      styles.statusText,
                      { color: getStatusColor(order.status) },
                    ]}
                  >
                    {getStatusText(order.status)}
                  </AppText>
                </AppView>
              </AppView>

              <AppView style={styles.itemsContainer}>
                {order.items.map((item) => (
                  <AppView key={item.id} style={styles.orderItem}>
                    <AppView style={styles.itemInfo}>
                      <AppText style={styles.itemTitle} numberOfLines={1}>
                        {item.title}
                      </AppText>
                      <AppText style={styles.itemQuantity}>
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </AppText>
                    </AppView>
                    <AppText style={styles.itemTotal}>
                      ${(item.quantity * item.price).toFixed(2)}
                    </AppText>
                  </AppView>
                ))}
              </AppView>

              <AppView style={styles.orderFooter}>
                <AppText style={styles.totalLabel}>Total</AppText>
                <AppText style={styles.totalAmount}>${order.total.toFixed(2)}</AppText>
              </AppView>
            </AppView>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default OrdersScreen;

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
    gap: 16,
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
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemsContainer: {
    marginBottom: 16,
    gap: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
  },
  itemTotal: {
    fontSize: 15,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
  },
  totalAmount: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#000000',
  },
});
