import { FlatList, StyleSheet } from 'react-native'
import { AppText, AppView } from '../ui';

interface CartBook {
  id: number;
  title: string;
  author: string;
  price: string;
}

const Items = ({ cartItems, title }: { cartItems: CartBook[], title: string }) => {
  return (
    <AppView style={styles.booksSummary} paddingTop={20} paddingBottom={20}>
        <AppText style={styles.summaryTitle}>{title}</AppText>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const unitPrice = Number(item.price);
                const total = unitPrice;
                return (
                  <AppView style={styles.bookItem}>
                    <AppView style={styles.bookItemLeft}>
                      <AppText style={styles.bookTitle} numberOfLines={2}>
                        {item.title}
                      </AppText>
                      <AppView style={styles.bookDetails}>
                        <AppText style={styles.bookDetailText}>
                          ${unitPrice.toFixed(2)}
                        </AppText>
                      </AppView>
                    </AppView>
                    <AppText style={styles.bookTotal}>
                      ${total.toFixed(2)}
                    </AppText>
                  </AppView>
                );
              }}
              scrollEnabled={true}
              showsVerticalScrollIndicator={true}
              style={styles.booksList}
              contentContainerStyle={styles.booksListContent}
            />
        </AppView>
  )
}

export default Items

const styles = StyleSheet.create({
    booksSummary: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
      summaryTitle: {
        fontSize: 22,
        fontFamily: 'Poppins_600SemiBold',
        color: '#000000',
        marginBottom: 16,
      },
      booksList: {
        maxHeight: 300,
      },
      booksListContent: {
        paddingBottom: 8,
      },
      bookItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
      },
      bookItemLeft: {
        flex: 1,
        marginRight: 12,
      },
      bookTitle: {
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        color: '#000000',
        marginBottom: 4,
      },
      bookDetails: {
        marginTop: 4,
      },
      bookDetailText: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#666666',
      },
      bookTotal: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: '#000000',
      },
})