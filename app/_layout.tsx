import { Stack, useRouter } from "expo-router";
import { ReactNode, useEffect } from "react";

export default function RootLayout() {
  function RouteGuard({children}:{children:ReactNode}){
    const router= useRouter();
    const isAuthenticated = false; //TODO Replace with actual authentication logic
    useEffect(()=>{
      //TODO: Add loading state while checking for authentication and remove segments 
        if(!isAuthenticated){
          router.replace("/authentication/auth")
      };
    },[isAuthenticated,router]);
    return <>{children}</>
  }
  return (
    
    <Stack >
    <RouteGuard>
    <Stack.Screen name="(tabs)" options={{headerShown: false}} />
  </RouteGuard>
    <Stack.Screen name="authentication" options={{headerShown: false}} />
  </Stack>
  );
}
