import {
  frequencyOptions,
  frequencyType,
  useAddHabit,
} from "@/src/hooks/useAddHabit";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  SegmentedButtons,
  TextInput,
} from "react-native-paper";
export default function addHabitScreen() {
  const {
    description,
    handleSubmit,
    selectedFrequency,
    setDescription,
    setSelectedFrequency,
    setTitle,
    title,
    isLoading,
  } = useAddHabit();
  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        mode="outlined"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        label="Description"
        mode="outlined"
        style={styles.input}
        onChangeText={setDescription}
        value={description}
      />
      <View style={styles.freqContainer}>
        <SegmentedButtons
          value={selectedFrequency}
          onValueChange={(v) => setSelectedFrequency(v as frequencyType)}
          buttons={frequencyOptions.map((option) => ({
            value: option,
            label: option[0].toUpperCase() + option.slice(1),
          }))}
        />
      </View>
      {/* TODO add loading state and error handling */}
      <Button
        mode="contained"
        onPress={handleSubmit}
        disabled={!title || !description || isLoading}
      >
        {isLoading ? <ActivityIndicator color="white" /> : "Add Habit"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  input: {
    marginBottom: 16,
  },
  freqContainer: {
    marginBottom: 24,
  },
});
