import { Octicons, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppButton, AppHeader, AppText, AppTitle, AppView } from '@/components/ui'
import { Image } from "expo-image";
import { useState } from 'react';

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

      <AppView style={styles.imageContainer}>
        <Image 
          source={{ uri: mockedBook.cover_image_url }}  
          style={styles.image}
          contentFit="cover"
        />
      </AppView>

      <View style={styles.detailsContainer}>
        <View style={styles.headerContent}>
          <AppTitle style={styles.bookTitle}>{mockedBook.title}</AppTitle>
          <AppText style={styles.bookAuthor}>{mockedBook.author}</AppText>
          <AppView style={styles.bookPriceContainer}>
            <AppText style={styles.bookPriceLabel}>Price</AppText>
            <AppText style={styles.bookPrice}>${mockedBook.price}</AppText>
          </AppView>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={true} 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.bookDescriptionContainer}>
            <AppText style={styles.bookDescription}>{mockedBook.description}</AppText>
          </View>
        </ScrollView>
        <AppView style={styles.actionsContainer}>
          <AppView style={styles.qtyAndTotalContainer}>
            <AppView style={styles.qtyContainer}>
              <AppText style={styles.qtyLabel}>QTY</AppText>
              <AppText style={styles.qtyValue}>{quantity}</AppText>
              <AppView style={styles.qtyButtons}>
                <Pressable onPress={handleIncreaseQuantity} style={styles.qtyButton}>
                  <Ionicons name="add" size={20} color="#000000" />
                </Pressable>
                <Pressable onPress={handleDecreaseQuantity} style={styles.qtyButton}>
                  <Ionicons name="remove" size={20} color="#000000" />
                </Pressable>
              </AppView>
            </AppView>
            <AppView style={styles.totalContainer}>
              <AppText style={styles.totalLabel}>Total</AppText>
              <AppText style={styles.totalValue}>$ {((Number(mockedBook.price) * quantity).toFixed(2))}</AppText>
            </AppView>
          </AppView>
          <AppButton onPress={() => {}} style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to cart</Text>
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
  imageContainer: {
    height: 250,
    paddingHorizontal: 10,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#e6e6e6',
  },
  bookTitle: {
    fontFamily: "Poppins_700Bold",
    color: "#000000",
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
    textAlign: 'center',
    opacity: 0.4,
  },
  bookPriceContainer: {
    alignItems: 'center',
    gap: 2,
    marginVertical: 10,
    justifyContent: 'center',
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: '#FFFFFF',
  },
  bookPriceLabel: {
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    color: "#000000",
    textAlign: 'center',
    opacity: 0.4,
  },
  bookPrice: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#4B5320",
  },
  headerContent: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 200, // Space for fixed actions container
  },
  bookDescriptionContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  bookDescription: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#333333",
    lineHeight: 22,
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
  image: {
    width: "70%",
    height: "80%",
    borderRadius: 20,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  actionsContainer : {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
  },

  qtyContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qtyLabel: {
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    color: "#000000",
  },
  qtyValue: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#000000",
    marginHorizontal: 12,
  },
  qtyButtons: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  qtyButton: {
    padding: 1,
  },

  totalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: "Poppins_700Bold",
    color: "#666666",
  },
  totalValue: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#000000",
  },
  qtyAndTotalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addToCartButton: {
    marginLeft: 12,
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  addToCartText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
})