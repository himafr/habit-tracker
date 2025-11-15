import { useAuth } from "@/src/context/AuthContext";
import { createHabit } from "@/src/service/habits";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";
const frequencyOptions = ["daily", "weekly", "monthly"];
export default function addHabitScreen() {
    type frequencyType = (typeof frequencyOptions)[number];
    const [selectedFrequency, setSelectedFrequency] = useState<frequencyType>("daily");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const {user}=useAuth()
   async function handleSubmit(){
        //TODO: check info before submitting
        if(!user){
            throw new Error("User not found")
        }
       
        try{
            await createHabit({title,description,frequency:selectedFrequency,user_id:user.id})
        }catch(e){console.log(e)}
    }
  return (
    <View style={styles.container}>
      <TextInput label="Title" mode="outlined" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput label="Description" mode="outlined" style={styles.input}  onChangeText={setDescription} value={description}/>
      <View style={styles.freqContainer}>
        <SegmentedButtons
        value={selectedFrequency}
        onValueChange={(v)=>setSelectedFrequency(v as frequencyType)}
          buttons={frequencyOptions.map((option) => ({
            value: option,
            label: option[0].toUpperCase()+option.slice(1),
          }))}
        />
      </View>
      {/* TODO add loading state and error handling */}
      <Button mode="contained" onPress={handleSubmit} disabled={!title||!description} >Add Habit</Button>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:16,
        backgroundColor:"#f5f5f5"
    },
    input:{
        marginBottom:16
    },
    freqContainer:{
        marginBottom:24
    }

});