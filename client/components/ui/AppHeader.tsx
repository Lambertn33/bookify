import { StyleSheet } from 'react-native'
import { AppText, AppView } from '@/components/ui'

interface HeaderProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const AppHeader = ({ title, leftIcon, rightIcon }: HeaderProps) => {
  return (
    <AppView style={styles.headerContainer}>
        {leftIcon && leftIcon}
        <AppText style={styles.headerTitle}>{title}</AppText>
        {rightIcon && rightIcon}
  </AppView>
  )
}

export default AppHeader

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    
      headerTitle: {
        fontSize: 24,
        fontFamily: "Poppins_600SemiBold",
        color: "#000000",
        textAlign: "center",
        lineHeight: 32,
        fontWeight: "600",
      },
})