import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
export default function Signup({ toggle }: { toggle: () => void }) {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Create An Account </Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Name"
        placeholder="Hema Sallem"
        keyboardType="default"
        theme={{ roundness: 16 }}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        placeholder="example@gmail.com"
        keyboardType="email-address"
        autoCapitalize="none"
        theme={{ roundness: 16 }}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        autoCapitalize="none"
        theme={{ roundness: 16 }}
        secureTextEntry
      />
      <Button style={styles.button} mode="contained">
        Create Account{" "}
      </Button>
      <Button mode="text" onPress={toggle}>
        Already have an account? Sign in
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
});
