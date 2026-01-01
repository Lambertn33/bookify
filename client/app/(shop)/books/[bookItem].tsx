import { Octicons, FontAwesome5 } from '@expo/vector-icons'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import {  AppButton, AppHeader, AppText, AppView } from '@/components/ui'
import { BookItemImage, BookItemHeaderContents, BookItemDescription } from '@/components/books'
import { useFetchBook } from '@/hooks/useFetchBook'

const bookItem = () => {
  const router = useRouter()
  const { bookItem: bookItemId } = useLocalSearchParams()
  const { book, isLoading, isError, error, refetch } = useFetchBook(Number(bookItemId));
  // const [quantity, setQuantity] = useState(2);

  const handleBack = () => {
    router.back()
  }

  // const handleIncreaseQuantity = () => {
  //   setQuantity(prev => prev + 1)
  // }

  // const handleDecreaseQuantity = () => {
  //   setQuantity(prev => Math.max(1, prev - 1))
  // }

  const handleAddToCart = () => {
    console.log('Add to cart');
  }

  if (isLoading) {
    return <AppView style={styles.container}>
      <ActivityIndicator size="small" color="#4B5320" />
    </AppView>
  }

  if (isError) {
    return <AppView style={styles.container}>
      <AppText>{error?.message}</AppText>
      <AppButton onPress={() => refetch()}>Retry</AppButton>
    </AppView>
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppView style={styles.headerContainer}>
        <AppHeader 
          title="Books Details" 
          leftIcon={<FontAwesome5 name="arrow-left" size={24} color="black" onPress={handleBack} />}
          rightIcon={<Octicons name="filter" size={24} color="black" />}
        />
      </AppView>

      <BookItemImage imageUrl={book!.cover_image_url!} />

      <View style={styles.detailsContainer}>
        <BookItemHeaderContents title={book!.title!} author={book!.author!} price={book!.price!} />

        <BookItemDescription
           description={book!.description!}
        />
        {/* <BookItemActions
          quantity={quantity}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          price={book!.price!}
          onAddToCart={handleAddToCart}
        /> */}
        <AppView style={styles.addToCartContainer}>
          <AppButton onPress={handleAddToCart} style={styles.addToCartButton}>
            <AppText style={styles.addToCartText}>Add to cart</AppText>
          </AppButton>
        </AppView>
      </View>
    </SafeAreaView>
  )
}

export default bookItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  headerContent: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },

  detailsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'relative',
    marginTop: -90,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    minHeight: 0,
    overflow: 'hidden',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  addToCartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  addToCartButton: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  addToCartText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
})