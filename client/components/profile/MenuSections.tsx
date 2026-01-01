import { Pressable, StyleSheet} from 'react-native'
import React from 'react'
import { AppText, AppView } from '../ui'
import { Ionicons } from '@expo/vector-icons'

interface MenuSection {
    title: string;
    icon: React.ReactNode;
    onPress: () => void;
  }

interface MenuSectionsProps {
    menuSections: MenuSection[];
}

const MenuSections = ({ menuSections }: MenuSectionsProps) => {
  return (
    <AppView style={styles.menuSection}>
      {menuSections.map((menuSection) => (
        <Pressable style={styles.menuItem} key={menuSection.title} onPress={menuSection.onPress}>
          <AppView style={styles.menuItemContent}>
            {menuSection.icon}
            <AppText style={styles.menuItemText}>{menuSection.title}</AppText>
          </AppView>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </Pressable>
      ))}
    </AppView>  
  )
}

export default MenuSections

const styles = StyleSheet.create({
    menuSection: {
        paddingHorizontal: 24,
        marginTop: 8,
        gap: 16,
      },
      menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
      },
      menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
      },
      menuItemText: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: '#000000',
      },
})