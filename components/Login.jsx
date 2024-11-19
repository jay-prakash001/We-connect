import { Text, View, Image, StyleSheet, Animated, Easing } from "react-native";
import { Colors } from './../constants/Colors';
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export default function Index() {
    const router = useRouter();
    const scaleAnim = useRef(new Animated.Value(0)).current; // Initial scale value

    useEffect(() => {
        // Navigate to 'auth/sign-in' after 2 seconds
        const timer = setTimeout(() => {
            router.push('auth/sign-in');
        }, 2000);

        // Start the pop-up animation
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000, // Duration of the animation
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, [router, scaleAnim]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.popup, { transform: [{ scale: scaleAnim }] }]}>
                <Image 
                    source={require('./../assets/images/abdul image.jpg')} 
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


