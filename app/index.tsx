 import { View, Text } from 'react-native'
 import React, { useEffect } from 'react'
 import Login from './../components/Login'
import { useNavigation } from 'expo-router'
 
 export default function index() {
  const navigation=useNavigation();
  useEffect(()=>{
    navigation.setOptions({
      headerShown:false
    })
  })
   return (
     <View>
       <Login/>
     </View>
   )
 }




