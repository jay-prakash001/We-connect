import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState,useRef } from 'react';
import { Colors } from '../../../constants/Colors';

import { useNavigation, useRouter, useGlobalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import { BASE_URL } from '../../../constants/utils';

import { default as axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Index() {
  const navigation = useNavigation();
  const { phone } = useGlobalSearchParams();

  const inputRefs = useRef([]);
  console.log(phone)
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const router = useRouter();

  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    
    if (value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const verifyOtp = async (otp, navigate) => {
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


  const testUserCreation = async (navigate) => {
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
        const ac = await AsyncStorage.getItem('accessToken');
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
      testUserCreation(() => {

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
      <Text style={styles.text}>Send on +91 {phone}</Text>
      <Image
        source={require('../../../assets/images/messaging.png')} // Replace with your actual image path
        style={styles.image}
      />


      <View style={styles.otpContainer}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={(el) => (inputRefs.current[index] = el)} // Save reference
          style={[
            styles.input,
            value !== "" ? styles.filledInput : styles.emptyInput,
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
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.dimgray,
    // marginBottom: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: 'thin',
    color: Colors.GRAY,
    marginBottom: 10,
  },
  image: {
    height: 250,
    width: 250
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

    backgroundColor: '#b9cfeb',
    borderColor: '#B9D9EB',
    borderWidth: 1
  },
  filledInput: {
    backgroundColor: '#1877F2',
    // backgroundColor: '#95bff5',
    color: '#fff'

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


