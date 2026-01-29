import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useHabits } from "../context/HabitContext";
import { createHabit } from "../service/habits";
export const frequencyOptions = ["daily", "weekly", "monthly"];
export type frequencyType = (typeof frequencyOptions)[number];

export function useAddHabit() {
  const { getPageData } = useHabits();
  const navigation = useNavigation();
  const [selectedFrequency, setSelectedFrequency] =
    useState<frequencyType>("daily");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useAuth();
  async function handleSubmit() {
    //TODO: check info before submitting
    if (!user) {
      throw new Error("User not found");
    }

    try {
      setIsLoading(true);
      await createHabit({
        title,
        description,
        frequency: selectedFrequency,
        user_id: user.id,
      });
      navigation.navigate("index" as never);
      getPageData();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }
  return {
    title,
    setTitle,
    description,
    setDescription,
    selectedFrequency,
    setSelectedFrequency,
    handleSubmit,
    isLoading,
  };
}
