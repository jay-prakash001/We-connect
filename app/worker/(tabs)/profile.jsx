import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router';
import { getWorkerDetails } from '../../../constants/utils';
export default function profile() {
  const [worker, setWorker] = useState({
    name: '',
    photo: '',
    phone: '',
    bio: '',
    location: {
      lat: '',
      long: '',
      city: '',
      state: '',
      pincode: '',
    },
    experience: '',
    createdAt: '',
    updatedAt: '',
  })
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false); // Track if the user is editing
  const getDetails = async () => {
    const workerDetails = await getWorkerDetails()

    // console.log(details) 
    setWorker(workerDetails)

    // if (workerDetails) {
    //   console.log(workerDetails); // Log the fetched details to see the data
    //   setWorker({
    //     name: workerDetails.name || '',
    //     photo: workerDetails.photo || '',
    //     phone: workerDetails.phone || '',
    //     bio: workerDetails.bio || '',
    //     location: {
    //       lat: workerDetails.location?.lat || '',
    //       long: workerDetails.location?.long || '',
    //       city: workerDetails.location?.city || '',
    //       state: workerDetails.location?.state || '',
    //       pincode: workerDetails.location?.pincode || '',
    //     },
    //     experience: workerDetails.experience || '',
    //     createdAt: workerDetails.createdAt || '',
    //     updatedAt: workerDetails.updatedAt || '',
    //   });
    // }
  }
  useEffect
    (() => {
      getDetails()
      console.log('------------------------------')
      console.log(worker)
      navigation.setOptions({
        headerShown: false
      })
    }, [])
  const toggleEditMode = () => {
    setIsEditing(prevState => !prevState); // Toggle editing state
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Profile</Text>
      <Image source={{ uri: worker.photo }} style={styles.avatar} />
      {/* Name input */}
      <Text>Name:</Text>
      <TextInput
        value={worker.name}
        onChangeText={(text) => setWorker({ ...worker, name: text })}
        editable={isEditing}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15 }}
      />

      {/* Bio input */}
      <Text>Bio:</Text>
      <TextInput
        value={worker.bio}
        onChangeText={(text) => setWorker({ ...worker, bio: text })}
        editable={isEditing}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15 }}
      />

      {/* Location input */}
      <Text>Location (City):</Text>
      <TextInput
        value={worker.location.city}
        onChangeText={(text) => setWorker({ ...worker, location: { ...worker.location, city: text } })}
        editable={isEditing}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15 }}
      />

      {/* Experience input */}
      <Text>Experience:</Text>
      <TextInput
        value={worker.experience}
        onChangeText={(text) => setWorker({ ...worker, experience: text })}
        editable={isEditing}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15 }}
      />
      <Text style={styles.text}>Created At: {worker.createdAt}</Text>
      <Text style={styles.text}>Updated At: {worker.updatedAt}</Text>
      {/* Button to toggle edit mode */}
      <TouchableOpacity
        onPress={toggleEditMode}
        style={{
          backgroundColor: isEditing ? 'red' : 'green',
          padding: 15,
          alignItems: 'center',
          marginBottom: 20
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </Text>
      </TouchableOpacity>

      {/* Button to save changes */}
      {isEditing && (
        <Button
          title="Save Changes"
          onPress={() => {
            // Logic to save changes (e.g., API call to update worker details)
            console.log('Changes saved:', worker);
            setIsEditing(false); // Disable edit mode after saving
          }}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
});