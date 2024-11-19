import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../../constants/Colors';
import { useRouter } from 'expo-router'; // Correct import
import profile from '../../auth/profile' // Import Profile if it’s just a component

export default function Index() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const router = useRouter();

  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };

  const handleSubmit = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      console.log('OTP Submitted:', otpCode);
      // Navigate to Profile page
      router.push('/auth/profile');  // Ensure that Profile is a page in the pages directory
    } else {
      console.log('Please enter a valid 6-digit OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter OTP</Text>

      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            style={styles.input}
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  input: {
    width: 50,
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


