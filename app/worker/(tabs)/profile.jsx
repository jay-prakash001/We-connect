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

    setWorker(workerDetails)

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
      <View style={styles.row}>

        <Text style={styles.text}>Join Date: {worker.createdAt}</Text>
        <Text style={styles.text}>Last Updated : {worker.updatedAt}</Text>
      </View>
      {/* Button to toggle edit mode */}
      <TouchableOpacity
        onPress={toggleEditMode}
        style={[styles.button, {
          backgroundColor: isEditing ? '#c44' : 'green',
          padding: 15,
          alignItems: 'center',
          marginBottom: 20
        }]}
      >
        <Text style={styles.buttonText}>
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </Text>
      </TouchableOpacity>

      {/* Button to save changes */}
      {isEditing && (
        <TouchableOpacity style={styles.button}

          onPress={() => {
            // Logic to save changes (e.g., API call to update worker details)
            console.log('Changes saved:', worker);
            setIsEditing(false); // Disable edit mode after saving
          }}
        >
          <Text style={styles.buttonText}>
            Save Changes
          </Text>

        </TouchableOpacity>
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
    // fontSize: 16,
    // marginVertical: 5,
    margin:10,
    backgroundColor:'#cdf',
    borderRadius:10,
    // borderWidth:1,
    padding:5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#1877F2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,

  },
});