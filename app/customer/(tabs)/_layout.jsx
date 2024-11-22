import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Tabs, useNavigation } from 'expo-router'
import {Colors} from './../../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function  TabLayout() {
  const navigation=useNavigation();
   
  useEffect
  (()=>{
    navigation.setOptions({
      headerShown:false
    })
  },[])
    
  return (
     <Tabs
     screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:Colors.PRIMARY
     }}
     >
        <Tabs.Screen name="profile"
        options={{
          tabBarLabel:'Profile',
          tabBarIcon:({color})=><Ionicons name="person-circle-outline" size={30} color={color} />
        }}/>
       
        <Tabs.Screen name="search"
        options={{
          tabBarLabel:'Search',
          tabBarIcon:({color})=><Ionicons name="search" size={30} color={color} />
        }}/>
          <Tabs.Screen name="uplode"
        options={{
          tabBarLabel:'Upload',
          tabBarIcon:({color})=><Ionicons name="add" size={30} color={color} />
        }}/>
        <Tabs.Screen name="approch"
        options={{
          tabBarLabel:'Approach',
          tabBarIcon:({color})=><Ionicons name="hand-right-sharp" size={30} color={color} />
        }}/>
        <Tabs.Screen name="History"
        options={{
          tabBarIcon:({color})=><Ionicons name="aperture" size={30} color={color} />
        }}/>
     </Tabs>
  )
}