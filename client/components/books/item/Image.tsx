import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppView } from '@/components/ui'
import { Image } from 'expo-image'

const BookItemImage = ({ imageUrl }: { imageUrl: string }) => {
  if (!imageUrl) {
    return null;
  }
  return (
  <AppView style={styles.imageContainer}>
    <Image 
      source={{ uri: imageUrl }}  
      style={styles.image}
      contentFit="cover"
    />
  </AppView>
  )
}

export default BookItemImage

const styles = StyleSheet.create({
  imageContainer: {
    height: 250,
    paddingHorizontal: 10,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#e6e6e6',
  },
  image: {
    width: "70%",
    height: "80%",
    borderRadius: 20,
  },
})