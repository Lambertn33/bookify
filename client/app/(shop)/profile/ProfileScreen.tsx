import { StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppView, AppText, AppButton, AppHeader, AppIconWithBadge } from '@/components/ui';
import { AuthContext } from '@/contexts/AuthContext';
import { CartContext } from '@/contexts/CartContext';
import { handleLogout as handleLogoutHelper } from '@/helpers';

const ProfileScreen = () => {
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const router = useRouter();
  const { user } = authContext;

  const handleHomePress = () => {
    router.push('/(shop)/books/bookList');
  };

  const handleCartPress = () => {
    router.push('/(shop)/cart/CartScreen');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            const response = await handleLogoutHelper();
            if (response.status === 200) {
              await authContext.logout();
              router.replace('/(shop)/books/bookList');
            } else {
              Alert.alert('Error', response.message);
            }
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <AppView style={styles.scrollContent}>
          <AppText>No user data available</AppText>
        </AppView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppView style={styles.headerSection}>
          <AppHeader 
            title="Profile" 
            leftIcon={
              <Pressable onPress={handleHomePress}>
                <Ionicons name="home" size={32} color="black" />
              </Pressable>
            }
            rightIcon={
              <Pressable onPress={handleCartPress}>
                <AppIconWithBadge 
                  icon={<Ionicons name="cart" size={32} color="black" />} 
                  cartCount={cartContext.getCartItemsCount()} 
                />
              </Pressable>
            }
          />
      </AppView>
      <AppView style={styles.scrollContent}>
        <AppView style={styles.profileSection} paddingBottom={100} paddingTop={100}>
          <AppView style={styles.avatarContainer}>
            <AppView style={styles.avatar}>
              <Ionicons name="person" size={50} color="#FFFFFF" />
            </AppView>
          </AppView>

          <AppView style={styles.userInfoContainer}>
            <AppText style={styles.userName}>{user.names}</AppText>
            <AppText style={styles.userEmail}>{user.email}</AppText>
            <AppView style={styles.roleBadge}>
              <AppText style={styles.roleText}>{user.role}</AppText>
            </AppView>
          </AppView>
        </AppView>

        <AppView style={styles.menuSection}>
          <Pressable style={styles.menuItem}>
            <AppView style={styles.menuItemContent}>
              <Ionicons name="receipt-outline" size={24} color="#000000" />
              <AppText style={styles.menuItemText}>My Orders</AppText>
            </AppView>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </Pressable>
          <Pressable style={styles.menuItem}>
            <AppView style={styles.menuItemContent}>
              <Ionicons name="heart-outline" size={24} color="#000000" />
              <AppText style={styles.menuItemText}>My Favorites</AppText>
            </AppView>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </Pressable>
        </AppView>

        <AppView style={styles.logoutSection} paddingTop={20}>
          <AppButton
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" style={styles.logoutIcon} />
            <AppText style={styles.logoutButtonText}>Logout</AppText>
          </AppButton>
        </AppView>
      </AppView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
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
  logoutSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutIcon: {
    marginRight: 4,
  },
  logoutButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
