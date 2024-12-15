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
  return ( <LinearGradient
    colors={['#bfd7ed', '#d4bbdd']}
    style={styles.container}
  >
    {/* Heading */}
    <View style={styles.heading}>
      <Text style={styles.headingText}>
        "Your Identity, Your Story – All in One Place."
      </Text>
    </View>

    {/* Profile Image */}
    <Image
      source={{ uri: photo }}
      style={styles.image}
    />

    {/* User Information Section */}
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          value={name}
          style={styles.textInput}
          editable={false}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Phone:</Text>
        <TextInput
          value={phone}
          style={styles.textInput}
          editable={false}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Bio:</Text>
        <TextInput
          value="Sample bio" // Example value
          style={styles.textInput}
          editable={false}
        />
      </View>
    </View>

    {/* Join and Updated Dates */}
    <View style={styles.dateContainer}>
      <Text style={styles.dateText}>Join Date: {joinDate}</Text>
      <Text style={styles.dateText}>Updated Date: {lastUpdateDate}</Text>
    </View>
  </LinearGradient>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headingText: {
    fontSize: 22,
    color: '#333',
    fontStyle: 'italic',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 30,
    
  },
  inputWrapper: {
    marginBottom: 15,
    padding:20,
    borderRadius:12,
    backgroundColor:'#ffffff57',
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
    
    marginTop: 5,
    fontSize: 16,
    backgroundColor: '#efe',
    opacity:0.8
  },
  dateContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
});