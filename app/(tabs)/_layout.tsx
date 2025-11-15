import { addIcon, homeIcon, streakIcon } from "@/src/ui/icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
       headerStyle:{
        backgroundColor:"#f5f5f5"
       },
       headerShadowVisible:false,
        headerTitleAlign: "center",
        tabBarStyle:{
          backgroundColor:"#f5f5f5",
          borderTopWidth:0
          ,elevation:0,
          shadowOpacity:0
        },
        tabBarActiveTintColor:"#6200ee",
        tabBarInactiveTintColor:"#666",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Today's habits", tabBarIcon: homeIcon }}
      />
      <Tabs.Screen
        name="streaks"
        options={{ title: "Streaks", tabBarIcon: streakIcon }}
      />
      <Tabs.Screen
        name="add-habit"
        options={{ title: "Add Habit", tabBarIcon: addIcon }}
      />
      
    </Tabs>
  );
}
