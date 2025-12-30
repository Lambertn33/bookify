import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppText } from '@/components/ui'

const Description = ({ description }: { description: string }) => {
  return (
    <ScrollView 
    showsVerticalScrollIndicator={true} 
    style={styles.scrollView}
    contentContainerStyle={styles.scrollContent}
  >
    <View style={styles.descriptionContainer}>
      <AppText style={styles.description}>{description}</AppText>
    </View>
  </ScrollView>
  )
}

export default Description

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
      },
    scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 200, // Space for fixed actions container
    },
    descriptionContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
    },
    description: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#333333",
    lineHeight: 22,
    },
})