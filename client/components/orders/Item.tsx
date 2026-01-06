import { StyleSheet } from 'react-native'
import { AppButton, AppText, AppView } from '@/components/ui'

const getStatusColor = (status: 'CONFIRMED' | 'PENDING' | 'CANCELLED') => {
    switch (status) {
      case 'CONFIRMED':
        return '#4CAF50';
      case 'PENDING':
        return '#FF9800';
      case 'CANCELLED':
        return '#F44336';
      default:
        return '#666666';
    }
};

const getStatusText = (status: 'CONFIRMED' | 'PENDING' | 'CANCELLED') => {
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

const Item = ({ order }: { order: Order }) => {
  const normalizedStatus = order.status.toUpperCase() as 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  
  return (
    <AppView style={styles.orderCard} paddingBottom={20} paddingTop={20}>
    <AppView style={styles.orderHeader}>
      <AppView style={styles.orderInfo}>
        <AppText style={styles.orderNumber}>{order.orderNumber}</AppText>
        <AppText style={styles.orderDate}>{formatDate(order.date)}</AppText>
      </AppView>
      <AppView
        style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(normalizedStatus) + '20' },
        ]}
      >
        <AppText
          style={[
            styles.statusText,
            { color: getStatusColor(normalizedStatus) },
          ]}
        >
          {getStatusText(normalizedStatus)}
        </AppText>
      </AppView>
    </AppView>

    <AppView style={styles.itemsContainer}>
      {order.items.map((item) => (
        <AppView key={item.id} style={styles.orderItem} paddingBottom={10} paddingTop={10}>
          <AppView style={styles.itemInfo}>
            <AppText style={styles.itemTitle} numberOfLines={1}>
              {item.title}
            </AppText>
            <AppText style={styles.itemQuantity}>
              Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
            </AppText>
          </AppView>
          <AppText style={styles.itemTotal}>
            ${(item.quantity * Number(item.price)).toFixed(2)}
          </AppText>
        </AppView>
      ))}
    </AppView>

    <AppView style={styles.orderFooter} paddingBottom={10} paddingTop={10}>
      <AppText style={styles.totalLabel}>Total</AppText>
      <AppText style={styles.totalAmount}>${order.total.toFixed(2)}</AppText>
    </AppView>
    {
        normalizedStatus === 'PENDING' && (
            <AppButton style={styles.cancelOrderButton}>
                <AppText style={styles.cancelOrderText}>Cancel Order</AppText>
            </AppButton>
        )
    }
  </AppView>
  )
}

export default Item

const styles = StyleSheet.create({
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
      cancelOrderText: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: '#000000',
      },
      cancelOrderButton: {
        backgroundColor: '#F44336',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
      },
})