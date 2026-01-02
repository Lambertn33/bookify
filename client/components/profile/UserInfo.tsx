import { StyleSheet, Text, View } from 'react-native'
import { AppView, AppText } from '../ui'
import { Ionicons } from '@expo/vector-icons'

interface UserInfoProps {
  names: string
  email: string
  role: string
}

const UserInfo = ({ names, email, role }: UserInfoProps) => {
  return (
    <AppView style={styles.profileSection} paddingBottom={20} paddingTop={20}>
    <AppView style={styles.avatarContainer}>
      <AppView style={styles.avatar}>
        <Ionicons name="person" size={50} color="#FFFFFF" />
      </AppView>
    </AppView>

    <AppView style={styles.userInfoContainer}>
      <AppText style={styles.userName}>{names}</AppText>
      <AppText style={styles.userEmail}>{email}</AppText>
      <AppView style={styles.roleBadge}>
        <AppText style={styles.roleText}>{role}</AppText>
      </AppView>
    </AppView>
  </AppView>
  )
}

export default UserInfo

const styles = StyleSheet.create({
    profileSection: {
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 24,
      },
      avatarContainer: {
        marginBottom: 16,
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
      },
      userInfoContainer: {
        alignItems: 'center',
        gap: 8,
        marginTop: 16,
      },
      userName: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        color: '#000000',
        textAlign: 'center',
      },
      userEmail: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#666666',
        textAlign: 'center',
      },
      roleBadge: {
        backgroundColor: '#000000',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 4,
      },
      roleText: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
        color: '#FFFFFF',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
      },
})