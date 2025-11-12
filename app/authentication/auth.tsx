import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import Signup from "./Signup";
import Login from "./Login";
const AuthScreen = () => {
  const [signup,setSignup]=useState<boolean>(true);
  function handleSignupToggle(){
    setSignup(v=>!v);
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {!signup?<Signup toggle={handleSignupToggle}/>:<Login toggle={handleSignupToggle}/>}

    </KeyboardAvoidingView>
  );
};
export default AuthScreen;
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f5f5f5"
    }
})
