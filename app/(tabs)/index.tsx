import { Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import {Text, View} from 'react-native';
import Header from '@/components/Header';
import Timer from '@/components/Timer';
import {Audio} from 'expo-av'

export default function HomeScreen() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25*60);
  const [currentTime, setCurrentTime] = useState("POMODORO"|"SHORT"|"BREAK");
  const [isActive, setActive] = useState(false);

  function handleStartStop(){
    playSound();
    setActive(!isActive);
  }

  async function playSound (){
    const {sound} = await Audio.Sound.createAsync(
      require('@/assets/Audio/click.mp3')
    )
    await sound.playAsync();
  }

  useEffect(() => {
    let interval = null;

    if(isActive){
      interval = setInterval(() => {
        setTime(time -1);
      },1000)
    }else{
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  if(time === 0){
    setActive(false);
    setIsWorking((prev) => !prev)
    setTime(isWorking? 300 : 1500)
  }

  return (
    <SafeAreaView style ={styles.container}>
      <View style = {{padding:Platform.OS == "android" && 5, flex:1}}>
        <Text style = {styles.textTitle}>Get Focus</Text>
        <Header setCurrentTime = {setCurrentTime}
        currentTime={currentTime}
        setTime = {setTime}
        setActive = {setActive}
        setIsWorking = {setIsWorking}/>

        <Timer time = {time}
        isActive={isActive}
        />
          <TouchableOpacity onPress={handleStartStop}>
            <Text style = {styles.button}>{isActive? "Stop" : "Go"}</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    height:"100%",
    display:'flex'
  },

  textTitle:{
    color:'black',
    fontWeight:'bold',
    fontSize:20
  },
  
  text:{
    color:'black',
    fontWeight:'700'
  },
  
  button:{
    color:'white',
    fontWeight:'600',
    fontSize:20,
    justifyContent: 'center',
    backgroundColor:'black',
    textAlign:'center',
    borderRadius:8,
    padding:10,
    margin:10
  }
});
