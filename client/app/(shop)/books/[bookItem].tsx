import { Octicons, FontAwesome5 } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppHeader, AppText, AppView } from '@/components/ui'
import { Image } from "expo-image";

const bookItem = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerContainer}>
        <AppHeader 
          title="Books Details" 
          leftIcon={<FontAwesome5 name="arrow-left" size={24} color="black" onPress={handleBack} />}
          rightIcon={<Octicons name="filter" size={24} color="black" />}
        />
      </View>

      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../assets/images/reading.jpg')}  
          style={styles.image}
          contentFit="cover"
        />
      </View>
      <View style={styles.detailsContainer}>
        <AppText>Book Details</AppText>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6e6e6',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: -10,
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
})