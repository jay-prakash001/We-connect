import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Image , Button} from 'react-native'; import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'; // Expo Icons library

import { create_post ,getLocation} from '../../../constants/utils';
export default function uplode() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
    const [location, setLocation] = useState({ lat: 0, long: 0, city: "", state: "", pincode: "" });
  
    const [photo, setPhoto] = useState('');
    const [photos, setPhotos] = useState([]);
  useEffect
    (() => {
      navigation.setOptions({
        headerShown: false
      })
    }, [])

  // Request permissions for camera and gallery access
  const requestPermissions = async () => {
    // if (Platform.OS === 'ios') {
      // For iOS, request gallery permission only
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('iOS Gallery Permission Status:', status);
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow access to the gallery to upload a photo.');
        return false;
      }
    // } else {
      // For Android, request both gallery and camera permissions
      console.log('Requesting permissions for Android');
      const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
  
      if (mediaLibraryPermission.status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow access to the gallery to upload a photo.');
        return false;
      }
  
      if (!cameraPermission.granted) {
        Alert.alert('Permission Denied', 'Please allow access to the camera to upload a photo.');
        return false;
      }
    // }
  
    return true;
  };
  
  const handleLocationChange = (field, value) => {
    setLocation((prev) => ({
      ...prev,
      [field]: field === "lat" || field === "long" || field === "pincode" ? parseFloat(value) || 0 : value,
    }));

  };

  const useCurrentLocation = async () => {
    const a = await getLocation()

    if (!a) {
      return
    }

    setLocation(a)

  };

  // Pick an image from the gallery or camera
  const pickImage = async () => {
    console.log('pickImage')
    const hasPermission = await requestPermissions();
    console.log(hasPermission)
    // if (!hasPermission) return;

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


  const createPost = async () => {
    
    if (!title || !description || !location.lat || !location.long || !location.city || !location.state || !location.pincode ) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }


    // Validate image limit
    if (photos.length > 5 || photos.length < 1) {
      Alert.alert('Error', 'You can upload a maximum of 5 images.');
      return;
    }

    try {
      const response = await create_post(
        title,
        description,
        location.lat,
        location.long,
        location.city,
        location.state,
        location.pincode,
        photos
      );
      console.log('Post Created:', response);
      Alert.alert('Success', 'Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post.');
    }
  };

  const pickImage0 = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Pick an image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // Add the image to the array if the user didn't cancel
    if (!result.canceled) {
      setPhotos((prevPhotos) => [...prevPhotos, result.assets[0].uri]);
    }
    console.log(photos)
  };
  return (
      <ScrollView contentContainerStyle={styles.container}>


    <View>


      <Text style={styles.header}>Create a New Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />


<TouchableOpacity onPress={useCurrentLocation} style={styles.locationButton}>
          <Ionicons name="location" size={20} color="gray" style={styles.icon} />
          <Text style={styles.text}>Use current location</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={location.lat.toString()}
              onChangeText={(value) => handleLocationChange("lat", value)}
              placeholder="Enter latitude"

            />
          </View>
          <View style={styles.spacer} />
          <View style={styles.rowItem}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={location.long.toString()}
              onChangeText={(value) => handleLocationChange("long", value)}
              placeholder="Enter longitude"
            />
          </View>
        </View>

        {/* City and Pincode Row */}
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <TextInput
              style={styles.input}
              value={location.city}
              onChangeText={(value) => handleLocationChange("city", value)}
              placeholder="Enter city"
            />
          </View>
          <View style={styles.spacer} />
          <View style={styles.rowItem}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={location.pincode.toString()}
              multiline
              onChangeText={(value) => handleLocationChange("pincode", value)}
              placeholder="Enter pincode"
            />
          </View>
        </View>

        

        
      <TextInput
        style={styles.input}
        placeholder="Enter Local Address"
        value={location.state}
        onChangeText={(value) => handleLocationChange("state", value)}
        multiline
      />



<View   >
      {/* <Button style = {styles.imgPicText} title="Pick an Image" onPress={} /> */}
      <TouchableOpacity style={styles.imgPic} onPress={pickImage0}>
        <Text style={styles.imgPicText}>Pick Images</Text>
      </TouchableOpacity>
      <ScrollView horizontal style={{ marginVertical: 10 }} >
        {photos.map((photo, index) => (
          <Image
            key={index}
            source={{ uri: photo }}
            style={{ width: 100, height: 100, margin: 5 }}
          />
        ))}
      </ScrollView>
    </View>

      <TouchableOpacity style={styles.submitButton} onPress={createPost}>
        <Text style={styles.submitText}>Create Post</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  
  // container: {
  //   flexGrow: 1,
  //   padding: 20,
  //   backgroundColor: '#f8f9fa',
  // },
 
  
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  rowItem: {
    flex: 1,

  },
  spacer: {
    height: 2,
    width: 2
  },
  locationButton:{
    flexDirection: 'row', // Align icon and text in a row
    alignItems: 'center', // Center vertically
  // Rounded corners
    margin: 5, // Margin around the button
  },


  
  submitButton: {
    backgroundColor: '#1877F2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
  },
  imgPic: {
    borderColor: '#1877F2',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  imgPicText: {
    color: '#1877F2',
    fontSize: 18,

  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    fontSize: 16,
  },
 
});