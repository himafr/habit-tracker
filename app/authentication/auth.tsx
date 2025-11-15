import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { Snackbar, useTheme } from "react-native-paper";
import Login from "../../src/components/Login";
import Signup from "../../src/components/Signup";
const AuthScreen = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const [signup, setSignup] = useState<boolean>(true);
  const [snackText, setSnackText] = useState<string>("");
  const theme = useTheme();
  function showSnackbar() {
    setIsVisible(true);
  }
  function handleSignupToggle() {
    setSignup((v) => !v);
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {!signup ? (
        <Signup
          handleSnackText={setSnackText}
          toggle={handleSignupToggle}
          showSnackbar={showSnackbar}
        />
      ) : (
        <Login 
        handleSnackText={setSnackText} 
        showSnackbar={showSnackbar}
        toggle={handleSignupToggle} />
      )}
      <Snackbar
        style={{ backgroundColor: theme.colors.onSecondaryContainer }}
        visible={visible}
        action={{
          label: "close",
          onPress: () => {
            setIsVisible(false);
          },
        }}
        onDismiss={() => {
          setIsVisible(false);
        }}
      >
        {snackText}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};
export default AuthScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
