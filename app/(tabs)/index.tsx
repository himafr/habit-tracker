import { useAuth } from "@/src/context/AuthContext";
import {
  completeHabit,
  deleteHabit,
  getMyHabits,
  updateHabit,
} from "@/src/service/habits";
import { HabitType } from "@/src/types/database.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Button, Surface, Text } from "react-native-paper";

export default function Index() {
  const [habits, setHabits] = useState<HabitType[]>([]);
  const { logout, user } = useAuth();
  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});
  if (!user) return null;

  getMyHabits({ id: user?.id }).then((res) => {
    setHabits(res);
  });

  const renderRightActions = () => (
    <View style={styles.swipeActionRight}>
      <MaterialCommunityIcons name="check-circle" size={32} color={"#fff"} />
    </View>
  );
  const renderLeftActions = () => (
    <View style={styles.swipeActionLeft}>
      <MaterialCommunityIcons name="trash-can-outline" size={32} color="#fff" />
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          Today&apos;s Habits
        </Text>
        <Button onPress={logout}>
          <MaterialCommunityIcons name="logout" size={16} />
        </Button>
      </View>
      <View style={styles.emptyState}>
        {habits.length === 0 && (
          <Text style={styles.emptyText}>
            No habits yet. Add your first habit{" "}
          </Text>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {habits.length > 0 &&
          habits.map((habit, key) => {
            return (
              <Swipeable
                ref={(ref) => {
                  swipeableRefs.current[habit.id] = ref;
                }}
                key={key}
                overshootLeft={false}
                overshootRight={false}
                renderLeftActions={renderLeftActions}
                renderRightActions={renderRightActions}
                onSwipeableOpen={async (dir) => {
                  if (dir === "left") {
                    deleteHabit({ id: habit.id });
                  }
                  if (dir === "right") {
                    if (user.email) {
                      const habitCompleted = await completeHabit({
                        habit_id: habit.id,
                        user_id: user.email,
                      });
                      await updateHabit({
                        id: habit.id,
                        last_completed: habitCompleted.created_at,
                      });
                    }
                  }
                  swipeableRefs.current[habit.id]?.close();
                }}
              >
                <Surface style={styles.card} elevation={0}>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{habit.title}</Text>
                    <Text style={styles.cardDescription}>
                      {habit.description}
                    </Text>
                    <View style={styles.cardFooter}>
                      <View style={styles.streakBadge}>
                        <MaterialCommunityIcons
                          name="fire"
                          size={18}
                          color="#ff9800"
                        />
                        <Text style={styles.streakText}>
                          {habit.streak_count} days in a row
                        </Text>
                      </View>
                      <View style={styles.frequencyBadge}>
                        <Text style={styles.frequencyText}>
                          {" "}
                          {habit.frequency[0].toUpperCase() +
                            habit.frequency.slice(1)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Surface>
              </Swipeable>
            );
          })}
      </ScrollView>
      {/* <Text>{JSON.stringify(user?.user_metadata?.fullName)}</Text>
      <Text>{JSON.stringify(user?.id)}</Text>
      <Text>Edit app/index.tsx to edit this screen.</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontWeight: "bold",
  },
  card: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: "#f7f2fa",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#22223b",
  },
  cardDescription: {
    fontSize: 15,
    marginBottom: 16,
    color: "#6c6c80",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3e0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  streakText: {
    marginLeft: 6,
    color: "#ff9800",
    fontWeight: "bold",
    fontSize: 14,
  },
  frequencyBadge: {
    backgroundColor: "#ede7f6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  frequencyText: {
    color: "#7c4dff",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#666666",
  },
  swipeActionRight: {
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingLeft: 16,
  },
  swipeActionLeft: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    backgroundColor: "#e53935",
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingLeft: 16,
    // maxWidth: 60,
  },
  scrollView: {
    marginBottom: 50,
  },
});
