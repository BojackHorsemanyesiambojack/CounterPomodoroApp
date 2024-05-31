import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({ currentTime, setCurrentTime, setTime, setActive, setIsWorking }) {

    function handlePress(index){
        const newTime = index === 0? 25 : index === 1? 5 : 15;
        setCurrentTime(index);
        setTime(newTime*60);
        setActive(false);
        setIsWorking(false);
    }

  return (
    <View style = {{flexDirection: 'row'}}>
        {options.map((item, index) => (
            <TouchableOpacity key = {index} style = {styles.item} onPress={() => handlePress(index)}>
                <Text style = {styles.text, currentTime !== index && {color:'gray'}}>{item}</Text>
            </TouchableOpacity>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
    text:{
        color:'black',
        fontWeight:'bold'
    },

    item:{
        padding:5,
        width:"33%",
        alignItems:'center',
        marginVertical:20,
    }
});