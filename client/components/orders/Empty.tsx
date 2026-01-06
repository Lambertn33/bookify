import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppText } from '../ui'
import { AppView } from '../ui'
import { Ionicons } from '@expo/vector-icons'

interface EmptyProps {
    title: string;
    text: string;
}

const Empty = ({ title, text }: EmptyProps) => {
  return (
    <AppView style={styles.emptyContainer}>
    <Ionicons name="lock-closed-outline" size={64} color="#CCCCCC" />
    <AppText style={styles.emptyTitle}>{title}</AppText>
    <AppText style={styles.emptyText}>{text}</AppText>
  </AppView>
  )
}

export default Empty

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
      },
      emptyTitle: {
        fontSize: 20,
        fontFamily: 'Poppins_600SemiBold',
        color: '#000000',
        marginTop: 16,
        textAlign: 'center',
      },
      emptyText: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#666666',
        marginTop: 8,
        textAlign: 'center',
      },
})