import { Text, View, Image, StyleSheet, Animated, Easing, ToastAndroid } from "react-native";
import { Colors } from './../constants/Colors';
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {getScreen, setScreen} from '../constants/utils'

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
    const router = useRouter();
    const scaleAnim = useRef(new Animated.Value(0)).current; // Initial scale value
    const [accessToken, setAT] = useState("")
    const [screen, setS] = useState('')
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
const getStartingScreen = async()=>{
    try {

        const scr = await getScreen()
            
        return scr

    } catch (error) {
        console.log(error)
    }
    return null
}

    useEffect(() => {
        // Navigate to 'auth/sign-in' after 2 seconds
        getTokens()
        const timer = setTimeout(async() => {
            if (accessToken) {
                   const a = await getStartingScreen()

                    router.replace(a)


                // router.replace('customer/(tabs)/profile');
            } else {

                router.replace('auth/sign-in');
            }
        }, 2000);




        // Start the pop-up animation
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1500, // Duration of the animation
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();


        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, [router, scaleAnim, accessToken]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.popup, { transform: [{ scale: scaleAnim }] }]}>
                <Image
                    source={require('./../assets/images/app.png')}
                    style={styles.image}
                />
                <Text style={styles.welcomeText}>Welcome</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        flex: 1, // Image takes up the available space
        width: 500, // Optional: Adjust width
        height: 2000, // Optional: Adjust height
        resizeMode: 'contain', // Adjust image to fit within the given size

    },
    welcomeText: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'outfit-bold',
        color: Colors.dimgray,
        marginTop: 20,
    },
});


