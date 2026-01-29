import { createContext, useContext, useState } from "react";
import {
    getMyHabits,
    getTodayCompletedHabits,
    getTodayCompletedHabitsId,
} from "../service/habits";
import { HabitCompletions, HabitType } from "../types/database.type";
import { useAuth } from "./AuthContext";

interface HabitContextType {
  habits: HabitType[];
  completedHabitsId: HabitType["id"][];
  completedHabits: HabitCompletions[];
  getPageData: () => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<HabitType[]>([]);
  const [completedHabitsId, setCompletedHabitsId] = useState<HabitType["id"][]>(
    [],
  );
  const [completedHabits, setCompletedHabits] = useState<HabitCompletions[]>(
    [],
  );

  const { user } = useAuth();
  function getPageData() {
    if (!user) return;
    getTodayCompletedHabitsId({ id: user?.id }).then(({ habitsId }) => {
      setCompletedHabitsId(habitsId);
    });

    getMyHabits({ id: user?.id }).then((res) => {
      setHabits(res);
    });
    getTodayCompletedHabits({ id: user?.id }).then(({ habitsCompleted }) => {
      setCompletedHabits(habitsCompleted);
    });
  }

  return (
    <HabitContext.Provider
      value={{
        habits,
        completedHabitsId,
        completedHabits,
        getPageData,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}
export function useHabits() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error("you are out of Habit context ");
  }
  return context;
}
