import React, { useRef } from 'react';
import { ActivityIndicator, View, Image, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Loading() {

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 5000
              }).start()
    };

    return (
        <LinearGradient
            colors={['#ff9900', '#ff5f6d']}
            style={{flex: 1}}
        >
            <Animated.View onLayout={fadeIn} style={{ opacity: fadeAnim, flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'white'}}>
                <Image source={require( '../../assets/logos/Sizzle_S_Logo_Transparent.png' )} style={{height: 150, width: 150, alignSelf: 'center'}} ></Image>
            </Animated.View>
        </LinearGradient>
    );
}
