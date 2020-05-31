import React, { useEffect, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, Animated } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Outlines from '../../assets/Outlines';

export const SearchLoading = ({}) => {

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.loop(
            Animated.sequence([
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800
              }), 
              Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 800
                })
            ]),
          ).start()
    };


    return (
        <Animated.View onLayout={fadeIn} style={{opacity: fadeAnim}}>
            <View style={{height: 5}}></View>
            <Outlines type='BusinessCard'></Outlines>
            <Outlines type='BusinessCard'></Outlines>
            <Outlines type='BusinessCard'></Outlines>
            <Outlines type='BusinessCard'></Outlines>
            <Outlines type='BusinessCard'></Outlines>
        </Animated.View>
    );
};


export default SearchLoading;