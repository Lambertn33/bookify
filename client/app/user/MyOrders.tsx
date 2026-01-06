import { StyleSheet, ScrollView, Pressable } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppView, AppHeader, AppModal } from '@/components/ui';
import { AuthContext } from '@/contexts/AuthContext';
import { useGetMyOrders, useCancelOrder } from '@/hooks/useOrders';
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { data: ordersData, isLoading: isLoadingOrders, isError: isErrorOrders, error: errorOrders } = useGetMyOrders();
  
  const orders: Order[] = (ordersData?.orders || []).map(order => ({
    ...order,
    status: order.status as Order['status'],
  }));

  const handleBack = () => {
    router.back();
  };

  const cancelOrderMutation = useCancelOrder({
    onSuccess: (message) => {
      setSuccessMessage(message);
      setIsModalVisible(true);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setIsModalVisible(true);
    },
  });

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleCancelOrder = (orderId: string) => {
    cancelOrderMutation.mutate(orderId);
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
      ) : isLoadingOrders ? (
        <Empty
          title="Loading orders..." 
          text="Please wait while we load your orders" />
      ) : isErrorOrders ? (
        <Empty
          title="Error loading orders" 
          text={errorOrders?.message || 'Please try again later'}
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
            <Item 
              key={order.id} 
              order={order} 
              onCancelOrder={handleCancelOrder} 
              isLoadingCancelOrder={cancelOrderMutation.isPending}
            />
          ))}
          {
        isModalVisible && (
          <AppModal
            isVisible={isModalVisible}
            onClose={handleCloseModal}
            message={successMessage || errorMessage}
            success={!errorMessage}
          />
        )
      }
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
