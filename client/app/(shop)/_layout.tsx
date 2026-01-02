import { Tabs, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ComponentProps } from "react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type TabIconConfig = {
  focused: IoniconName;
  unfocused: IoniconName;
};

const createTabBarIcon = (iconConfig: TabIconConfig) => {
  return ({ focused }: { focused: boolean }) => (
    <Ionicons
      name={focused ? iconConfig.focused : iconConfig.unfocused}
      size={focused ? 20 : 24}
      color={focused ? "#FFFFFF" : "#999999"}
      style={{
        backgroundColor: focused ? "#000000" : "transparent",
        borderRadius: 24,
        padding: focused ? 10 : 8,
        width: focused ? 44 : 40,
        height: focused ? 44 : 40,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    />
  );
};

export default function ShopLayout() {
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const authContext = useContext(AuthContext);

  // Check if we're on the bookItem detail page
  const isBookItemPage = segments.some(segment => segment === '[bookItem]' || segment.includes('bookItem'));
  const isAuthPage = segments.some(segment => segment === 'auth');
  const isAuthenticated = authContext.user !== null && authContext.token !== null;
  const isProfilePage = segments.some(segment => segment === 'profile');
  const isCartPage = segments.some(segment => segment === 'cart');
  const isCheckoutPage = segments.some(segment => segment === 'checkout');
  const isOrdersPage = segments.some(segment => segment === 'user');

  const defaultTabBarStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    height: 70,
    paddingTop: 10,
    paddingBottom: Math.max(insets.bottom, 10),
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 25,
    position: "absolute" as const,
    bottom: 15,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderTopWidth: 0,
  };

  const hiddenTabBarStyle = {
    ...defaultTabBarStyle,
    height: 0,
    opacity: 0,
    pointerEvents: 'none' as const,
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#666666",
        tabBarStyle: isBookItemPage || isAuthPage || isProfilePage || isCartPage || isCheckoutPage || isOrdersPage ? hiddenTabBarStyle : defaultTabBarStyle,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="books/bookList"
        options={{
          title: "Books",
          tabBarIcon: createTabBarIcon({ focused: "home", unfocused: "home-outline" }),
        }}
      />
      <Tabs.Screen
        name="cart/CartScreen"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="checkout/CheckoutScreen"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/ProfileScreen"
        options={{
          title: "Profile",
          tabBarIcon: createTabBarIcon({ focused: "person", unfocused: "person-outline" }),
          href: isAuthenticated ? undefined : null,
        }}
      />
      <Tabs.Screen
        name="auth/AuthScreen"
        options={{
          title: "Auth",
          tabBarIcon: createTabBarIcon({ focused: "person", unfocused: "person-outline" }),
          href: !isAuthenticated ? undefined : null,
        }}
      />
      <Tabs.Screen
        name="books/[bookItem]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}