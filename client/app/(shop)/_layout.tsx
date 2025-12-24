import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ShopLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#000000",
        tabBarStyle: {
          backgroundColor: "rgba(200, 200, 200, 0.4)",
          height: 60,
          paddingTop: 8,
          marginLeft: 25,
          marginRight: 25,
          borderRadius: 35,
          position: "absolute",
          bottom: 20,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="books/bookList"
        options={{
          title: "Books",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="home"
              size={22}
              color={focused ? "#FFFFFF" : "#000000"}
              style={{
                backgroundColor: focused ? "rgba(192, 192, 192, 0.5)" : "transparent",
                borderRadius: 20,
                padding: 8,
                width: 36,
                height: 36,
                textAlign: "center",
                lineHeight: 20,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart/CartScreen"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="cart"
              size={26}
              color={focused ? "#FFFFFF" : "#000000"}
              style={{
                backgroundColor: focused ? "rgba(200, 200, 200, 0.5)" : "transparent",
                borderRadius: 20,
                padding: 8,
                width: 36,
                height: 36,
                textAlign: "center",
                lineHeight: 20,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="books/[bookItem]"
        options={{
          href: null, // Hide from tab bar - this is a detail screen
        }}
      />
      </Tabs>
  );
}