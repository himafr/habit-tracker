import { MaterialCommunityIcons } from "@expo/vector-icons";

export function homeIcon({ color, focused,size }: { color: string; focused: boolean,size:number }) {
  return focused ? (
    <MaterialCommunityIcons name="calendar-today" size={size} color={color} />
  ) : (
    <MaterialCommunityIcons name="calendar-today-outline" size={size} color={color} />
  );
}
export function streakIcon({ color, focused,size }: { color: string; focused: boolean,size:number }) {
  return focused ? (
    <MaterialCommunityIcons name="chart-line" size={size} color={color} />
  ) : (
    <MaterialCommunityIcons name="chart-line" size={size} color={color} />
  );
}
export function addIcon({ color, focused,size }: { color: string; focused: boolean,size:number }) {
  return focused ? (
    <MaterialCommunityIcons name="plus-circle" size={size} color={color} />
  ) : (
    <MaterialCommunityIcons name="plus-circle-outline" size={size} color={color} />
  );
}
