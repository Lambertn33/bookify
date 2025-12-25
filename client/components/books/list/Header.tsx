import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppText, AppView } from '@/components/ui'
import { Octicons } from '@expo/vector-icons'

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <AppView style={styles.headerContainer}>
    <Octicons name="bell-fill" size={24} color="black" />
    <AppText style={styles.headerTitle}>{title}</AppText>
    <Octicons name="filter" size={24} color="black" />
  </AppView>
  )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    
      headerTitle: {
        fontSize: 18,
        fontFamily: "Poppins_600SemiBold",
        color: "#000000",
        textAlign: "center",
        lineHeight: 32,
        fontWeight: "600",
      },
})