import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface AppIconWithBadgeProps {
  icon: React.ReactNode;
  cartCount: number;
}

const AppIconWithBadge = ({ icon, cartCount }: AppIconWithBadgeProps) => {
  return (
    <View style={styles.container}>
      {icon}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{cartCount}</Text>
      </View>
    </View>
  )
}

export default AppIconWithBadge

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },  
    badge: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: '#FF0000',
        borderRadius: 12,
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
})