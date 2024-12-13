import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../../constants/Colors';

import { useNavigation, useRouter, useGlobalSearchParams } from 'expo-router'; 
import Ionicons from '@expo/vector-icons/Ionicons';

import {BASE_URL} from '../../../constants/utils';

import { default as axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Index() {
  const navigation=useNavigation();
  const { phone } = useGlobalSearchParams();
   console.log(phone)
  useEffect(()=>{
    navigation.setOptions({
      headerShown:false
    })
  },[])
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const router = useRouter();

  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };
  const verifyOtp = async (otp,navigate) => {
    const payload = { client_phone: phone, otp };
    console.log("Payload:", payload);
  
    try {
      const res = await axios.post(`${BASE_URL}api/v1/auth/verify_otp`, payload);
      console.log("Response Data:", res.data);
  
      if (res.data && res.data.data) {
        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;
  
        // Store tokens in AsyncStorage
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
  
        console.log("Tokens stored successfully.");
        navigate()
      }
    } catch (err) {
      console.error("Error during OTP verification:", err);
    }
  };


  const testUserCreation = async( navigate)=>{
    const payload = { client_phone: phone };
    console.log("Payload:", payload);
  
    try {
      const res = await axios.post(`${BASE_URL}api/v1/auth/user_create_test`, payload);
      console.log("Response Data:", res.data);
  
      if (res.data && res.data.data) {
        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;
  
        // Store tokens in AsyncStorage
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
      const ac =   await AsyncStorage.getItem('accessToken');
      console.log(ac)
  
        console.log("Tokens stored successfully.");
        navigate()
      }
    } catch (err) {
      console.error("Error during OTP verification:", err);
    }
  }
  const handleSubmit = () => {
    const otpCode = otp.join('');
    console.log(otpCode)
    if (otpCode.length === 6) {
      console.log('OTP Submitted:', otpCode);
   

      //uncomment if need to verify otp
      // verifyOtp(otpCode,()=>{

      //   router.push('/auth/pos');  
      // })
      testUserCreation(()=>{

        router.push('/auth/pos');  
      })
 
    } else {
      console.log('Please enter a valid 6-digit OTP');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.heading}>Enter OTP</Text>

      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            style={[
              styles.input,
              value !== "" ? styles.filledInput : styles.emptyInput // Conditional style
            ]}
            keyboardType="numeric"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleOtpChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity 
        onPress={handleSubmit} 
        style={styles.button}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    padding: 20,
  },
  iconContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: 50,
    height: 50,
    
    borderRadius: 8,
    textAlign: 'center',

    fontSize: 24,
  },
  emptyInput: {
    
    backgroundColor: '#fff',
    borderColor:'#B9D9EB',
    borderWidth:1
  },
  filledInput:{
    backgroundColor: '#1877F2',
    color:'#fff'

  },
  button: {
    backgroundColor: '#1877F2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


