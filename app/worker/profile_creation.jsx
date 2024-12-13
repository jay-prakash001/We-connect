import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRouter } from 'expo-router';
import { getTokens, getUserDetails } from '../../constants/utils';

export default function Profile() {
  const [name, setName] = useState('');
  const [pincode, setPincode] = useState('');
  const [qualification, setQualification] = useState('');
  const [profession, setProfession] = useState('');
  const [experience, setExperience] = useState('');
  const [pastWork, setPastWork] = useState('');
  const [photo, setPhoto] = useState(null);
  const router = useRouter();
  const navigation=useNavigation();
   const [token, setToken] = useState("")

  useEffect(()=>{
    setToken(getTokens())
    console.log("hello")
    console.log(token)
    const user = getUserDetails(token)
     setName(user.name)
     setPhoto(user.profileImg)

    console.log(name)
    console.log(photo)
    navigation.setOptions({
      headerShown:false
    })
  },[])

  // Request permissions for camera and gallery access
  const requestPermissions = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow access to the gallery to upload a photo.');
        return false;
      }
    }
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (!cameraPermission.granted) {
      Alert.alert('Permission Denied', 'Please allow access to the camera to upload a photo.');
      return false;
    }
    return true;
  };

  // Pick an image from the gallery or camera
  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!name || !pincode || !qualification || !profession || !experience || !pastWork || !photo) {
      Alert.alert('Incomplete Details', 'Please fill all the fields and upload your photo.');
      return;
    }

    // Navigate to the next route
    router.push('worker/(tabs)/profile');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.profileImageContainer}>
        {photo ? (
          <Image
            source={{ uri: photo }}
            style={styles.image}
          />
        ) : (
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Upload Photo</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Create Your Profile</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="black"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          placeholderTextColor="black"
          keyboardType="numeric"
          value={pincode}
          onChangeText={setPincode}
        />
        <TextInput
          style={styles.input}
          placeholder="Qualification"
          placeholderTextColor="black"
          value={qualification}
          onChangeText={setQualification}
        />
        <TextInput
          style={styles.input}
          placeholder="Profession"
          placeholderTextColor="black"
          value={profession}
          onChangeText={setProfession}
        />
        <TextInput
          style={styles.input}
          placeholder="Experience"
          placeholderTextColor="black"
          value={experience}
          onChangeText={setExperience}
        />
        <TextInput
          style={styles.input}
          placeholder="Past Work Details"
          placeholderTextColor="black"
          value={pastWork}
          onChangeText={setPastWork}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    color: 'black',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'black',
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
  },
  placeholderText: {
    color: 'gray',
  },
  submitButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
  },
});


