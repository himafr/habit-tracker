import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
const Login = ({ toggle,handleSnackText,showSnackbar }: { toggle: () => void ,showSnackbar:()=>void,handleSnackText:(v:string)=>void}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, isLoading } = useAuth();
  const [secure,setSecure]=useState(true);
 async function handleLogin() {
    try{
    await  login({ email, password });
    }catch(e){
      if(e instanceof Error){
        handleSnackText(e.message)
      }else{
        handleSnackText("Something went wrong")
      }
      showSnackbar()
    }
  }
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Welcome Back! </Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        placeholder="example@gmail.com"
        keyboardType="email-address"
        autoCapitalize="none"
        theme={{ roundness: 16 }}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        autoCapitalize="none"
        theme={{ roundness: 16 }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secure}
        right={<TextInput.Icon icon="eye" onPress={()=>setSecure(v=>!v)} />}
      />
      <Button style={styles.button} mode="contained" onPress={handleLogin}>
        {isLoading ? <ActivityIndicator color="white" /> : "Login"}
      </Button>
      <Button mode="text" onPress={toggle}>
        Don&apos;t have an account? Sign up
      </Button>
    </View>
  );
};
export default Login;

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
