import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function PageLoading() {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator animating={true} size="large" /></View>;
}