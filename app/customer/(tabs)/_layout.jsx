import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Tabs, useNavigation } from 'expo-router'

export default function  TabLayout() {
   const navigation=useNavigation();
   
  useEffect
  (()=>{
    navigation.setOptions({
      headerShown:false
    })
  },[])
  return (
     <Tabs>
        <Tabs.Screen name="profile"/>
        <Tabs.Screen name="uplode"/>
        <Tabs.Screen name="search"/>
        <Tabs.Screen name="transiction"/>
        <Tabs.Screen name="approch"/>
     </Tabs>
  )
}