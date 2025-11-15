import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
export default function Signup({ toggle,showSnackbar,handleSnackText }: { toggle: () => void ,showSnackbar:()=>void,handleSnackText:(v:string)=>void}) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [fullName,setFullName]=useState<string>("");
  const {signup,isLoading}=useAuth();
  function handleSignup(){

    signup({fullName,email,password})
    .then(()=>{
      console.log("called")
      handleSnackText("you will receive an email to verify your account.")
      showSnackbar()
      setPassword("");
      setEmail("");
      setFullName("");
    }).catch((e)=>{
      if(e instanceof Error){
        handleSnackText(e.message);
      }else{
        handleSnackText("something went wrong");
      }
      showSnackbar();
    })
    }
  
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Create An Account </Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Name"
        placeholder="Hema Sallem"
        keyboardType="default"
        value={fullName}
        onChangeText={setFullName}
        theme={{ roundness: 16 }}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        placeholder="example@gmail.com"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        theme={{ roundness: 16 }}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Password"
        autoCapitalize="none"
        theme={{ roundness: 16 }}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button style={styles.button} mode="contained" onPress={handleSignup}>
{isLoading?<ActivityIndicator color="white" />: "Create Account"}
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
