import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Animated,
  Button,
} from 'react-native';
import { Colors } from '../../../constants/Colors';
import { useNavigation, useRouter } from 'expo-router'; // Import useRouter
import BASE_URL from '../../../constants/utils';

import { default as axios } from 'axios';
export default function Index() {
  const router = useRouter(); // Initialize the router
  const [warning, setWarning] = useState(''); // Warning message state
  const [number, setNumber] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  // Animated value for the pop-up effect
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: -10, // Move up by 10 pixels
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0, // Move back to the original position
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
  const get_otp = ()=>{
    axios.post(BASE_URL+"api/v1/auth/get_otp",{
      client_phone:number
    }).then(function (res){
      console.log(res)
    }).catch(function (err){
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx")
      console.log(err)
    })

  }




  const handleGetOtp = () => {
    if (number.trim() === '' || number.length != 10) {
      setWarning('Phone number can not be emptly'); // Show warning
      return;
    }
    get_otp()
    setWarning(''); // Clear warning if fields are valid


    console.log('Number:', number);

    // Navigate to the sign-up page
    // router.push('auth/sign-up');
    router.push({pathname:'auth/sign-up',params:{phone:number}});
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Sign In Heading with Animation */}
          <Animated.Text
            style={[
              styles.heading,
              {
                transform: [{ translateY: animatedValue }], // Apply pop-up animation
              },
            ]}
          >
            Sign In
          </Animated.Text>




          {/* Phone Number Input */}

          <View style={styles.card}>

            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#000"
              keyboardType="phone-pad"
              value={number}
              onChangeText={setNumber}
            />

            {/* Warning Message */}
            {warning ? <Text style={styles.warningText}>{warning}</Text> : null}

            {/* Get OTP Button */}
            <TouchableOpacity style={styles.button} onPress={handleGetOtp}>
              <Text style={styles.buttonText}>Get OTP</Text>
            </TouchableOpacity>
            <View>
        </View>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    height: "40%",
    width: "100%",

    borderRadius: 8,
  
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Shadow for Android
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    backgroundColor: "#fff", // Needed for shadows to work on iOS
    padding:10
  },
  
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    position: 'absolute',
    top: 50,
    textAlign: 'center',
    zIndex: 1,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 18,
    fontSize: 16,
    marginBottom: 20,
  },
  warningText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#f8d7da',
    padding: 12,
    width: "100%",
    borderRadius: 8,
  },
  button: {
    // backgroundColor: Colors.AQUA,
    backgroundColor: "#1F75FE",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});






