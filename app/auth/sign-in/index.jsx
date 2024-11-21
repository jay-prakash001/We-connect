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
  ToastAndroid,
} from 'react-native';
import { Colors } from '../../../constants/Colors';
import { useNavigation, useRouter } from 'expo-router'; // Import useRouter

export default function Index() {
  const router = useRouter(); // Initialize the router
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [Username, setUsername] = useState('');
  const [warning, setWarning] = useState(''); // Warning message state
  const navigation=useNavigation();
   
  useEffect(()=>{
    navigation.setOptions({
      headerShown:false
    })
  },[])

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

  const handleGetOtp = () => {
    if (name.trim() === '' || number.trim() === '' || name.length < 3 || number.length != 10) {
      showToast()
      setWarning('Please fill in all the details'); // Show warning
      return;
    }
   
    setWarning(''); // Clear warning if fields are valid

    console.log('Name:', name);
    console.log('Number:', number);
    console.log('Username:', Username);

    // Navigate to the sign-up page
    router.replace('auth/sign-up');
  };
  const showToast = ()=>{
    ToastAndroid.show(
        "Please fill in the correct information.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
    )
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

          {/* Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#000"
            value={name}
            onChangeText={setName}
          /> 
          {/* Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your Username"
            placeholderTextColor="#000"
            value={Username}
            onChangeText={setUsername}
          />

          {/* Phone Number Input */}
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
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
    padding: 12,
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
    padding: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});






