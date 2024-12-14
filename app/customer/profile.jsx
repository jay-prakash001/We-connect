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
import uplode from './../customer/(tabs)/profile'
import axios from 'axios';
import {BASE_URL} from '../../constants/utils'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState("");
  const router = useRouter();
  const navigation = useNavigation();

  const [accessToken, setAT] = useState("")

  const getTokens = async () => {
    try {

      const aT = await AsyncStorage.getItem('accessToken')
      console.log(aT)
      if (aT) {
        setAT(aT)
        console.log(accessToken)
      }


    } catch (error) {
      console.log(error)
    }
  }
  const getUserDetails = async () => {
    // https://weconnect-s060q7i6.b4a.run/api/v1/user/get_user_details/

    try {
      const res = await axios.get(BASE_URL + "/api/v1/user/get_user_details/", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      console.log(res.data.data)
      console.log("xxxxxxxxxxxx")
      if (res.data?.data) {
        const { name, profileImg } = res.data.data;
      
        if (name) {
          console.log("User Name:", name);
          setName(name);
        }
      
        if (profileImg) {
          console.log("Profile Image URL:", profileImg);
          setPhoto(profileImg);
          console.log(photo)
        }
      } else {
        console.error("No data found in response:", res.data);
      }
      

    } catch (error) {
      console.log(error)
    }


  }

  const updateUserDetail = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profileImg", {
      uri: photo, // The local file path
      name: "profile.jpg", // Desired filename
      type: "image/jpeg", // MIME type
    });
  
    try {
      const res = await axios.patch(BASE_URL + "/api/v1/user/create_client/", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Update Response:", res.data);
    } catch (error) {
      console.error("Error updating user details:", error.response || error);
    }
  };
  
  useEffect(() => {
    getTokens()
    getUserDetails()
    navigation.setOptions({
      headerShown: false
    })
  }, [])

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
      console.log(result)
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!name  || !photo) {
      Alert.alert('Incomplete Details', 'Please fill all the fields and upload your photo.');
      return;
    }
    updateUserDetail()
    // Navigate to the next route
    router.push('customer/(tabs)/profile');
  };
  // https://weconnect-s060q7i6.b4a.run/api/v1/user/create_client/
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* <View style={styles.profileImageContainer}>
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
      </View> */}
      <View style={styles.profileImageContainer}>
        
          <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: photo }}
            style={styles.image}
          />
          </TouchableOpacity>
        
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


