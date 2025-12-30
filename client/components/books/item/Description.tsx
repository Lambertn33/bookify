import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { AppText } from '@/components/ui'

const Description = ({ description }: { description: string }) => {
  if (!description) {
    return null;
  }
  
  return (
    <ScrollView 
      showsVerticalScrollIndicator={true} 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      nestedScrollEnabled={true}
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
        paddingTop: 10,
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