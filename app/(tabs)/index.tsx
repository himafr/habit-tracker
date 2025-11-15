import { supabase } from "@/lib/supabase";
import { useAuth } from "@/src/context/AuthContext";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const { logout, user } = useAuth();
   supabase
  .from('habits')
  .select('*').then((res)=>{
    console.log(res.data)
  })

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onPress={logout} icon="logout">press me</Button>
      <Text>{JSON.stringify(user?.user_metadata?.fullName)}</Text>
      <Text>{JSON.stringify(user?.id)}</Text>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
