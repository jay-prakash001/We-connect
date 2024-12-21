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
import { Ionicons } from '@expo/vector-icons'; // Expo Icons library
import { getWorkerDetails, setWorkerDetails, getLocation, setScreen } from '../../constants/utils';



export default function Profile() {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState('');
  const [isExists, setIsExists] = useState(false);
  const [location, setLocation] = useState({ lat: 0, long: 0, city: "", state: "", pincode: "" });

  const [experience, setExperience] = useState('');
  const title = "Create Your Profile"
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {

    const fetchWorkerDetails = async () => {
      const data = await getWorkerDetails();
      console.log(data.bio)
      if (data) {
        setName(data?.name || ''); // Fallback to an empty string if name is null or undefined
        setPhoto(data?.photo || ''); // Fallback to an empty string if photo is null or undefined
        setBio(data?.bio || ''); // Fallback to an empty string if bio is null or undefined
        setLocation(data?.location || {}); // Fallback to an empty object if location is null or undefined
        setExperience(data?.experience || ''); // Fallback to an empty string if experience is null or undefined

        if (data?.experience) {
          setIsExists(true);
        } else {
          setIsExists(false);
        }
      }
    };

    fetchWorkerDetails();




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
      setPhoto(result.assets[0].uri);
    }
  };
  const handleLocationChange = (field, value) => {
    setLocation((prev) => ({
      ...prev,
      [field]: field === "lat" || field === "long" || field === "pincode" ? parseFloat(value) || 0 : value,
    }));

  };

  const updateDetails = async (callback) => {
    console.log('update user called')
    const res = await setWorkerDetails(name, photo, location.lat, location.long, location.city, location.pincode, location.state, bio, experience)

    console.log(res.data)

    if (res.data) {
      callback()
    }

  }

  const navigate = () => {
    router.replace('worker/(tabs)/profile');
    setScreen('worker/(tabs)/profile')

  }
  const handleSubmit = () => {
    if (!name || !bio || !location.lat || !location.long || !location.state || !location.city || !location.pincode || !experience || !photo) {
      Alert.alert('Incomplete Details', 'Please fill all the fields and upload your photo.');
      return;
    }



    updateDetails(() => {
      navigate()
    })
  };

  const handleSkip = () => {
    if (!name || !bio || !location.lat || !location.long || !location.state || !location.city || !location.pincode || !experience || !photo) {
      Alert.alert('Incomplete Details', 'Please fill all the fields and upload your photo.');
      return;
    }
    navigate()
  }


  const useCurrentLocation = async () => {
    const a = await getLocation()

    if (!a) {
      return
    }

    setLocation(a)

  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.profileImageContainer}>
        {/* {photo ? (
          <Image
            source={{ uri: photo }}
            style={styles.image}
          />
        ) : ( */}
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: photo }}
            style={styles.image}
          />
          {/* <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Upload Photo</Text> */}
          {/* </View> */}
        </TouchableOpacity>
        {/* // )} */}
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>{title}</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="black"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Bio"
          placeholderTextColor="black"
          value={bio}
          onChangeText={setBio}
        />
        <TextInput
          style={styles.input}
          value={experience}
          onChangeText={setExperience}
          placeholder="Enter experience"
        />
        {/* Latitude and Longitude Row */}

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
              onChangeText={(value) => handleLocationChange("pincode", value)}
              placeholder="Enter pincode"
            />
          </View>
        </View>

        <TextInput
          style={styles.input}
          value={location.state}
          onChangeText={(value) => handleLocationChange("state", value)}
          placeholder="Enter state"
        />


        {/* 
        setLocation(data.location);
        setExperience(data.experience); */}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>

        {isExists && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}

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
    marginBottom: 10,
    textAlign: 'center',
  },
  locationButton: {
    flexDirection: 'row', // Align icon and text in a row
    alignItems: 'center', // Center vertically
    // Rounded corners
    margin: 5, // Margin around the button
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    marginVertical: 2,
    color: 'black',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'black',
  },

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
  skipButton: {
    borderColor: '#1877F2',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  skipText: {
    color: '#1877F2',
    fontSize: 18,

  },
});


