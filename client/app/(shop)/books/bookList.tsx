import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'

const bookList = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text>bookList</Text>
    </SafeAreaView>
  )
}

export default bookList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
})