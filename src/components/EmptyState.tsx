import { StyleSheet, Text, View } from "react-native";

export default function EmptyState() {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>No habits yet. Add your first habit </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#666666",
  },
});
