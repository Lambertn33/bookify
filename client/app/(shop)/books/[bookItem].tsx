import { Octicons, FontAwesome5 } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'
import { useState } from 'react';
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import {  AppHeader, AppView } from '@/components/ui'
import { BookItemImage, BookItemHeaderContents, BookItemActions, BookItemDescription } from '@/components/books'

const bookItem = () => {
  const router = useRouter()
  const [quantity, setQuantity] = useState(2);

  const handleBack = () => {
    router.back()
  }

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const handleDecreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1))
  }

  const handleAddToCart = () => {
    console.log('Add to cart');
  }

  const mockedBook = {
    id: 2,
    category_id: 1,
    title: "All the Light We Cannot See",
    author: "Anthony Doerr",
    description: "A beautiful, stunningly ambitious novel about a blind French girl and a German boy whose paths collide in occupied France as both try to survive the devastation of World War II.",
    price: "15.99",
    cover_image: "covers/TTW1LKMZYCFTWBG4JERLIKXMT.jpeg",
    published_year: "2014",
    cover_image_url: "https://books-store-storage.s3.us-east-2.amazonaws.com/covers/TTW1LKMZYCFTWBG4JERLIKXMT.jpeg",
    category: {
      id: 1,
      name: "Fiction"
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppView style={styles.headerContainer}>
        <AppHeader 
          title="Books Details" 
          leftIcon={<FontAwesome5 name="arrow-left" size={24} color="black" onPress={handleBack} />}
          rightIcon={<Octicons name="filter" size={24} color="black" />}
        />
      </AppView>

      <BookItemImage imageUrl={mockedBook.cover_image_url} />

      <View style={styles.detailsContainer}>
        <BookItemHeaderContents title={mockedBook.title} author={mockedBook.author} price={mockedBook.price} />

        <BookItemDescription
           description={mockedBook.description}
        />
        <BookItemActions
          quantity={quantity}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          price={mockedBook.price}
          onAddToCart={handleAddToCart}
        />
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
    marginTop: -40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    minHeight: 0,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
})