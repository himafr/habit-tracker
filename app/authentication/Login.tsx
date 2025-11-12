import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
const Login = ({toggle}:{toggle:()=>void}) => {
 return    <View style={styles.content}>
        <Text style={styles.title}>Welcome Back! </Text>
        <TextInput
        style={styles.input}
          mode="outlined"
          label="Email"
          placeholder="example@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          theme={{roundness:16}}
          secureTextEntry
        />
        <TextInput
        style={styles.input}
          mode="outlined"
          label="Password"
          autoCapitalize="none"
          theme={{roundness:16}}
          secureTextEntry
        />
        <Button style={styles.button} mode="contained">Login</Button>
        <Button mode="text" onPress={toggle}>Don&apos;t have an account? Sign up</Button>
      </View>;
};
export default Login

const styles=StyleSheet.create({
   content:{
    flex:1,
    padding:16,
    justifyContent:"center"
   },
   title:{
    fontSize:24,
    fontWeight:"bold",
    marginBottom:24,
    textAlign:"center"
   },
   input:{
    marginBottom:16,
   },
   button:{
    marginTop:8,
    marginBottom:16
   },

})