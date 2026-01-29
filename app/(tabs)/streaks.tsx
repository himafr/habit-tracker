import EmptyState from "@/src/components/EmptyState";
import { useHabits } from "@/src/context/HabitContext";
import { StreakData } from "@/src/types/database.type";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
const streaksScreen = () => {
  const { completedHabits, getPageData, habits } = useHabits();
  useEffect(getPageData, [getPageData]);
  function getStreakData({ habitId }: { habitId: string }): StreakData {
    const habitCompletions = completedHabits
      .filter((c) => habitId === c.habit_id)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    //no habit completions
    if (habitCompletions.length === 0)
      return { total: 0, bestStreak: 0, streak: 0 };
    let bestStreak = 0;
    let streak = 0;
    const total = habitCompletions.length;
    let currentStreak = 0;
    let lastDate: Date | null = null;
    habitCompletions.forEach((completion) => {
      const date = new Date(completion.created_at);
      if (lastDate) {
        const diff = (date.getTime() - lastDate.getTime()) / (1000 * 3600 * 24);
        if (diff <= 1.5) {
          currentStreak += 1;
        } else {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }
      if (currentStreak > bestStreak) bestStreak = currentStreak;
      streak = currentStreak;
      lastDate = date;
    });

    return { total, bestStreak, streak };
  }

  const habitsStreaks = habits.map((habit) => {
    const { bestStreak, streak, total } = getStreakData({ habitId: habit.id });
    return {
      habit,
      bestStreak,
      streak,
      total,
    };
  });

  const rankedHabit = habitsStreaks.sort((a, b) => b.bestStreak - a.bestStreak);
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Habit Streaks{" "}
      </Text>
      {rankedHabit.length > 0 && (
        <View style={styles.rankingContainer}>
          <Text style={styles.rankingTitle}>🥇 Top Streaks</Text>
          {rankedHabit.slice(0, 3).map(({ habit, bestStreak }, key) => (
            <View key={key} style={styles.rankingRow}>
              <View style={[styles.rankingBadge, styles[`rank${key + 1}`]]}>
                <Text style={styles.rankingBadgeText}>{key + 1}</Text>
              </View>
              <Text style={styles.rankingHabit}>{habit.title}</Text>
              <Text style={styles.rankingStreak}>{bestStreak}</Text>
            </View>
          ))}
        </View>
      )}
      {habits.length === 0 ? (
        <EmptyState />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          {rankedHabit.map(({ habit, bestStreak, streak, total }, key) => (
            <Card key={key} style={[styles.card, key == 0 && styles.firstCard]}>
              <Card.Content>
                <Text variant="titleMedium">{habit.title}</Text>
                <Text style={styles.description}>{habit.description}</Text>
                <View style={styles.statsRow}>
                  <View style={styles.statBadge}>
                    <Text style={styles.statBadgeText}>🔥 {streak} </Text>
                    <Text style={styles.statBadgeLabel}>Current</Text>
                  </View>
                  <View style={styles.statBadgeGold}>
                    <Text style={styles.statBadgeText}>🏆 {bestStreak} </Text>
                    <Text style={styles.statBadgeLabel}>Best</Text>
                  </View>
                  <View style={styles.statBadgeGreen}>
                    <Text style={styles.statBadgeText}>✅ {total} </Text>
                    <Text style={styles.statBadgeLabel}>Total</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
export default streaksScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 5,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.88,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  firstCard: {
    borderWidth: 2,
    borderColor: "#7c4dff",
  },
  description: {
    color: "6c6c80",
    marginTop: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 12,
  },
  statBadge: {
    backgroundColor: "#fff3e0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    minWidth: 60,
  },
  statBadgeGold: {
    backgroundColor: "#FFfDe7",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    minWidth: 60,
  },
  statBadgeGreen: {
    backgroundColor: "#e8f5e9",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    minWidth: 60,
  },
  statBadgeText: { color: "#22223b", fontWeight: "bold", fontSize: 15 },
  statBadgeLabel: {
    color: "#888",
    fontSize: 11,
    marginTop: 2,
    fontWeight: "500",
  },
  rankingContainer: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.88,
    shadowRadius: 8,
  },
  rankingTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#7c4dff",
    letterSpacing: 0.5,
  },
  rankingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 8,
  },
  rankingBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#e0e0e0",
  },
  rank1: {
    backgroundColor: "#ffd700",
  },
  rank2: {
    backgroundColor: "#c0c0c0",
  },
  rank3: {
    backgroundColor: "#cd7f32",
  },
  rankingBadgeText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 15,
  },
  rankingHabit: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    fontWeight: "600",
  },
  rankingStreak: {
    fontSize: 14,
    color: "#7c4dff",
    fontWeight: "bold",
  },
});
