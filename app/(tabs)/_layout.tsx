import { Entypo, Feather } from '@expo/vector-icons';
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return <Tabs screenOptions={{tabBarActiveTintColor:"green",headerTitleAlign:"center"}}>
<Tabs.Screen name="index" options={{title:"Home",tabBarIcon:homeIcon}} />
<Tabs.Screen name="login" options={{title:"Login",tabBarIcon:({color})=><Feather name="log-in" size={24} color={color} />}} />
  </Tabs>;
}

function homeIcon({color,focused}:{color:string,focused:boolean}) {
  return focused?<Entypo name="home" size={24} color={color} />:<Feather name="home" size={24} color={color} />
}