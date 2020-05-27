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

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        
    };


    return (
        <Animated.View onLayout={fadeIn} style={{opacity: fadeAnim}}>
            <View style={{height: 5}}></View>
            <View style={{paddingLeft: 15, paddingTop: 5, borderBottomWidth: 0.5, borderBottomColor: 'gainsboro'}}>
                <Outlines type='CategoryHeader'></Outlines>
                <View style={{height: 10}}></View>
                <View style={{flexDirection: 'row'}}>
                    <Outlines type='BusinessSquare'></Outlines>
                    <Outlines type='BusinessSquare'></Outlines>
                    <Outlines type='BusinessSquare'></Outlines>
                </View>
            </View>
            <View style={{height: 5}}></View>
            <View style={{paddingLeft: 15, paddingTop: 5, borderBottomWidth: 0.5, borderBottomColor: 'gainsboro'}}>
                <Outlines type='CategoryHeader'></Outlines>
                <View style={{height: 10}}></View>
                <View style={{flexDirection: 'row'}}>
                    <Outlines type='BusinessSquare'></Outlines>
                    <Outlines type='BusinessSquare'></Outlines>
                    <Outlines type='BusinessSquare'></Outlines>
                </View>
            </View>
            <View style={{height: 5}}></View>
            <View style={{paddingLeft: 15, paddingTop: 5, borderBottomWidth: 0.5, borderBottomColor: 'gainsboro'}}>
                <Outlines type='CategoryHeader'></Outlines>
                <View style={{height: 10}}></View>
                <View style={{flexDirection: 'row'}}>
                    <Outlines type='BusinessSquare'></Outlines>
                    <Outlines type='BusinessSquare'></Outlines>
                    <Outlines type='BusinessSquare'></Outlines>
                </View>
            </View>
            <View style={{height: 5}}></View>
        </Animated.View>
    );
};


export default SearchLoading;