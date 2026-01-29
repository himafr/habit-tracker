export interface HabitType {
  created_at: string;
  description: string;
  frequency: string;
  id: string;
  last_completed: string;
  streak_count: number;
  title: string;
  user_id: string;
  updated_at: string;
}

export interface HabitCompletions {
  created_at: string;
  habit_id: string;
  id: string;
  user_id: string;
}

export interface StreakData {
  total: number;
  bestStreak: number;
  streak: number;
}
