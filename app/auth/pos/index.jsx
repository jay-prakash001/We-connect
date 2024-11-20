import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Index() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Choose Your Role</Text>
      <View style={styles.optionsContainer}>
        {/* Customer Option */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push('/customer/profile')}
        >
          <Image
            source={require('../../../assets/images/icon.png')} // Replace with your actual image path
            style={styles.image}
          />
          <Text style={styles.optionText}>Customer</Text>
        </TouchableOpacity>

        {/* Worker Option */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push('/worker/profilr')}
        >
          <Image
            source={require('../../../assets/images/favicon.png')} // Replace with your actual image path
            style={styles.image}
          />
          <Text style={styles.optionText}>Worker</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  iconContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  option: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});


