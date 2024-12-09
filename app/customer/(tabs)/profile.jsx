import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router';
import { StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {getUserDetails} from '../../../constants/utils'
export default function profile() {
  const navigation=useNavigation();
   const [name, setName] = useState('')
   const [photo, setPhoto] = useState('')
   const [phone, setPhone] = useState('00')
   const [joinDate, setJoinDate] = useState('')
   const [lastUpdateDate, setlastUpdateDate] = useState('')
   useEffect
   (()=>{
     const getUser = async()=>{

      const res = await getUserDetails()
      setName(res.name)
      setPhoto(res.profileImg)
      setJoinDate(res.createdAt)
      setlastUpdateDate(res.updatedAt)
      setPhone(res.phone)
     }
     getUser()
   
    navigation.setOptions({
      headerShown:false
    })
  },[])
  return (
    <LinearGradient  colors={['#bfd7ed','#d4bbdd']} style = {styles.container}>

    <View style ={styles.heading}>

      <Text style = {styles.headingText}>"Your Identity, Your Story – All in One Place."</Text>
    </View>
   <Image
            source={{ uri: photo }}
            style={styles.image}
          />

    <View style ={styles.input}>

         <TextInput>
          {name}
         </TextInput>
    </View>
    <View style ={styles.input}>

         <TextInput>
          {phone}// recheck 
         </TextInput>
    </View>
    <View style ={styles.input}>

         <TextInput>
          {name}
         </TextInput>
    </View>

    </LinearGradient>
  )
}

const styles = StyleSheet.create({
container:{height:'100%',
  width:'100%',
flex :1,
// justifyContent:'',
alignItems:'center'

}, 
image:{ margin:10,
width:300,
height:300,
borderRadius:50
 
},
heading:{marginTop:5,
  padding:20,
  width:"80%",
  backgroundColor: 'rgba(94, 55, 109, 0.2)',
  borderRadius:20,
},
input:{marginTop:5,
  padding:5,
  width:"80%",
  backgroundColor: 'rgba(75, 55, 82, 0.2)',
  borderRadius:10,
},
headingText:{
  color:'#fff',
  fontSize:14, 
  fontWeight:'bold'
}
})