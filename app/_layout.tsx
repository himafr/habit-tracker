import { AuthProvider, useAuth } from "@/src/context/AuthContext";
import { Stack } from "expo-router";
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
    <AuthProvider>
      {/* <PaperProvider> */}
        <SafeAreaProvider>
      <RootLayoutInner />
        </SafeAreaProvider>
      {/* </PaperProvider> */}
    </AuthProvider>
  );
}
