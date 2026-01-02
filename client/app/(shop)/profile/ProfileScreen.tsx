import { StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppView, AppText, AppButton, AppHeader, AppIconWithBadge } from '@/components/ui';
import { UserInfo, MenuSections, ClientInfo } from '@/components/profile';
import { AuthContext } from '@/contexts/AuthContext';
import { CartContext } from '@/contexts/CartContext';
import { handleLogout as handleLogoutHelper } from '@/helpers';

interface MenuSection {
  title: string;
  icon: React.JSX.Element;
  onPress: () => void;
}


const ProfileScreen = () => {
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const router = useRouter();
  const { user } = authContext;

  const menuSections: MenuSection[] = [
    {
      title: 'My Orders',
      icon: <Ionicons name="receipt-outline" size={24} color="#000000" />,
      onPress: () => {
        router.push('/user/MyOrders');
      },
    },
    {
      title: 'My Favorites',
      icon: <Ionicons name="heart-outline" size={24} color="#000000" />,
      onPress: () => {
        console.log('My Favorites');
      },
    },
  ];

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
      <ScrollView
       style={styles.scrollContent}
       contentContainerStyle={styles.scrollContent}
      >
        <UserInfo
           names={user.names} 
           email={user.email} 
           role={user.role} 
        />
        <ClientInfo
          balance={user.balance}
          address={user.address}
          city={user.city}
          phone={user.phone}
        />
        <MenuSections menuSections={menuSections} />

        <AppView style={styles.logoutSection} paddingTop={20}>
          <AppButton
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" style={styles.logoutIcon} />
            <AppText style={styles.logoutButtonText}>Logout</AppText>
          </AppButton>
        </AppView>
      </ScrollView>
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
