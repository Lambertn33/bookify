import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  Poppins_500Medium,
  Poppins_300Light,
  Poppins_200ExtraLight,
  Poppins_100Thin,
} from "@expo-google-fonts/poppins";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { getCartItemsFromLocalStorage, getDataFromLocalStorage } from "@/helpers";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
    Poppins_500Medium,
    Poppins_300Light,
    Poppins_200ExtraLight,
    Poppins_100Thin,
  });

  const [initialAuthData, setInitialAuthData] = useState<{
    user: any;
    token: string | null;
  } | null>(null);
  const [initialCartItems, setInitialCartItems] = useState<any[]>([]);
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const { user, token } = await getDataFromLocalStorage();
        const cartItems = await getCartItemsFromLocalStorage();
        setInitialAuthData({ user, token });
        setInitialCartItems(cartItems);

      } catch (error) {
        setInitialAuthData({ user: null, token: null });
        setInitialCartItems([]);
      } finally {
        setIsLoadingInitialData(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (fontsLoaded && !isLoadingInitialData) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoadingInitialData]);

  if (!fontsLoaded || isLoadingInitialData) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider initialCartItems={initialCartItems}>
          <AuthProvider
            initialUser={initialAuthData?.user || null}
            initialToken={initialAuthData?.token || null}
          >
            <Stack screenOptions={{ headerShown: false }} />
          </AuthProvider>
        </CartProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
