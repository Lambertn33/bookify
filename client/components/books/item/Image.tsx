import { StyleSheet, ImageBackground } from 'react-native'
import { AppView } from '@/components/ui'

const BookItemImage = ({ imageUrl }: { imageUrl: string }) => {
  if (!imageUrl) {
    return null;
  }
  return (
    <AppView style={styles.imageContainer}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
        resizeMode="cover"
      >
      </ImageBackground>
    </AppView>
  )
}

export default BookItemImage

const styles = StyleSheet.create({
  imageContainer: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6e6e6',
    padding: 0
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImageStyle: {
    opacity: 0.7,
  },
})