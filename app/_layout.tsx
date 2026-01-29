import { AuthProvider, useAuth } from "@/src/context/AuthContext";
import { HabitProvider } from "@/src/context/HabitContext";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
function RootLayoutInner() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="authentication" options={{ headerShown: false }} />
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="authentication" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <HabitProvider>
          {/* <PaperProvider> */}
          <SafeAreaProvider>
            <RootLayoutInner />
          </SafeAreaProvider>
          {/* </PaperProvider> */}
        </HabitProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
