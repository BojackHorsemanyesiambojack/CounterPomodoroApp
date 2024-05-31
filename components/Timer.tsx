import { View, Text,  StyleSheet } from 'react-native'
import React from 'react'
import Button from '@/components/Button'

export default function Timer( {time, isActive} ) {

const formatedTime = `${Math.floor(time / 60).toString()
.padStart(2,"0")
}:${Math.floor(time % 60)
.toString()
.padStart(2,"0")}`

  return (
    <View style = {styles.container}>
      <Text style = {styles.text}>{formatedTime}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:0.2,
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"wheat",
        borderRadius:10,
        padding:40,
        textAlign:"center",
        gap:30
    },

    text:{
        fontSize:50,
        fontWeight:'bold'
    }
})