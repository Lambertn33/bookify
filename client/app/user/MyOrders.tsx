import { StyleSheet, ScrollView, Pressable } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppView, AppText, AppHeader } from '@/components/ui';
import { AuthContext } from '@/contexts/AuthContext';
import { useGetMyOrders } from '@/hooks/useOrders';
import { Empty, Item } from '@/components/orders';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  total: number;
  items: Array<{
    id: number;
    title: string;
    quantity: number;
    price: number;
  }>;
}

const OrdersScreen = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError, error } = useGetMyOrders();
  
  const orders: Order[] = (data?.orders || []).map(order => ({
    ...order,
    status: order.status as Order['status'],
  }));

  const handleBack = () => {
    router.back();
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
       <Empty 
          title="Please log in to view orders" 
          text="Sign in to see your order history" />
      ) : isLoading ? (
        <Empty
          title="Loading orders..." 
          text="Please wait while we load your orders" />
      ) : isError ? (
        <Empty
          title="Error loading orders" 
          text={error?.message || 'Please try again later'}
          />
      ) : orders.length === 0 ? (
         <Empty
          title="No orders yet" 
          text="Your orders will appear here" />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {orders.map((order) => (
            <Item key={order.id} order={order} />
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
});
