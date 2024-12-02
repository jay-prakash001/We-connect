import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../../constants/Colors';
// <<<<<<< HEAD
// import { useRouter } from 'expo-router'; // Correct import
// import profile from '../../auth/profile' // Import Profile if it’s just a component
import { phone } from '../sign-in';
// =======
import { useNavigation, useRouter } from 'expo-router'; // Correct import
import Ionicons from '@expo/vector-icons/Ionicons';
// >>>>>>> 540c4f6ebea40ef65ad217df0b879e3060871b7a

export default function Index() {
  const navigation=useNavigation();
   
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
  const verifyOtp = async (otp) => {
    const url = "http://192.168.43.132:3000/verifyotp"; // Update with your API endpoint
    const payload = { client_phone:phone,otp:otp };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage("OTP sent successfully!");
      } else {
        setResponseMessage(result.error || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Failed to send OTP.");
    }
  };

  const handleSubmit = () => {
    const otpCode = otp.join('');
    console.log(otpCode)
    if (otpCode.length === 6) {
      console.log('OTP Submitted:', otpCode);
      // Navigate to Profile page
// <<<<<<< HEAD
      // router.push('/auth/profile');
      verifyOtp(otpCode)
      // Ensure that Profile is a page in the pages directory
// =======
      router.push('/auth/pos');  // Ensure that Profile is a page in the pages directory
// >>>>>>> 540c4f6ebea40ef65ad217df0b879e3060871b7a
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


