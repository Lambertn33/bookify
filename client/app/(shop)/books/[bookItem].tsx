import {  FontAwesome5, Ionicons } from '@expo/vector-icons'
import { ActivityIndicator, StyleSheet, View, Pressable, Alert } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CartContext } from '@/contexts/CartContext'
import { useContext } from 'react'

import {  AppButton, AppHeader, AppText, AppView, AppIconWithBadge } from '@/components/ui'
import { BookItemImage, BookItemHeaderContents, BookItemDescription } from '@/components/books'
import { useFetchBook } from '@/hooks/useFetchBook'

const bookItem = () => {
  const router = useRouter();
  const { addBookToCart, getCartItemsCount, cartItems } = useContext(CartContext);

  const { bookItem: bookItemId } = useLocalSearchParams();
  const { book, isLoading, isError, error, refetch } = useFetchBook(Number(bookItemId));

  const handleBack = () => {
    router.back()
  }

  const handleCartPress = () => {
    router.push('/(shop)/cart/CartScreen');
  }

  const isBookInCart = cartItems.some(item => item.id === book!.id);

  const handleAddToCart = async () => {
   try {
    await addBookToCart({
      id: book!.id!,
      title: book!.title!,
      author: book!.author!,
      price: book!.price!,
      cover_image_url: book!.cover_image_url!,
      quantity: 1,
    });
    Alert.alert('Book added to cart');
    router.push('/(shop)/books/bookList');
   } catch (error) {
    Alert.alert('Error adding book to cart');
   }
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
      <AppView style={styles.headerContainer} paddingTop={12} paddingBottom={20}>
        <AppHeader 
          title="Books Details" 
          leftIcon={<FontAwesome5 name="arrow-left" size={24} color="black" onPress={handleBack} />}
          rightIcon={
            <Pressable onPress={handleCartPress}>
              <AppIconWithBadge 
                icon={<Ionicons name="cart" size={32} color="black" />} 
                cartCount={getCartItemsCount()} 
              />
            </Pressable>
          }
        />
      </AppView>

      <BookItemImage imageUrl={book!.cover_image_url!} />

      <AppView style={styles.detailsContainer} paddingTop={20}>
        <BookItemHeaderContents title={book!.title!} author={book!.author!} price={book!.price!} />

        <BookItemDescription
           description={book!.description!}
        />
        <AppView style={styles.addToCartContainer} paddingBottom={20}>
          <AppButton
          disabled={isBookInCart}
          onPress={handleAddToCart} style={styles.addToCartButton}>
            <AppText style={styles.addToCartText}>{isBookInCart ? 'Already In Cart' : 'Add to cart'}</AppText>
          </AppButton>
        </AppView>
      </AppView>
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