import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router';

export default function uplode() {
  const navigation=useNavigation();
   
  useEffect
  (()=>{
    navigation.setOptions({
      headerShown:false
    })
  },[])
  return (
    <View>
       
    </View>
  )
}