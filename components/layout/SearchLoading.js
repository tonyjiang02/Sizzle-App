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
                duration: 1500
              }), 
              Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1500
                })
            ]),
            {
              iterations: 10
            }
          ).start()
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        
    };


    return (
        <Animated.View onLayout={fadeIn} style={{opacity: fadeAnim}}>
            <Outlines type='Header'></Outlines>
            <View style={{height: 12}}></View>
            <View style={{alignSelf: 'center'}}>
                <Outlines type="Search"></Outlines>
                <View style={{height: 55, flexDirection: 'row'}}>
                    <View style={{alignSelf: 'center', paddingHorizontal:5}}>
                        <View style={{borderWidth: 0.7, borderRadius: 14, borderColor: 'gainsboro', paddingVertical: 15, paddingHorizontal: 30, backgroundColor: 'gainsboro'}}></View>
                    </View>
                    <View style={{alignSelf: 'center', paddingHorizontal:5}}>
                        <View style={{borderWidth: 0.7, borderRadius: 14, borderColor: 'gainsboro', paddingVertical: 15, paddingHorizontal: 30, backgroundColor: 'gainsboro'}}></View>
                    </View>
                    <View style={{alignSelf: 'center', paddingHorizontal:5}}>
                        <View style={{borderWidth: 0.7, borderRadius: 14, borderColor: 'gainsboro', paddingVertical: 15, paddingHorizontal: 30, backgroundColor: 'gainsboro'}}></View>
                    </View>
                    <View style={{alignSelf: 'center', paddingHorizontal:5}}>
                        <View style={{borderWidth: 0.7, borderRadius: 14, borderColor: 'gainsboro', paddingVertical: 15, paddingHorizontal: 30, backgroundColor: 'gainsboro'}}></View>
                    </View>
                    <View style={{alignSelf: 'center', paddingHorizontal:5}}>
                        <View style={{borderWidth: 0.7, borderRadius: 14, borderColor: 'gainsboro', paddingVertical: 15, paddingHorizontal: 30, backgroundColor: 'gainsboro'}}></View>
                    </View>    
                </View>
                <View style={{borderBottomColor: 'gainsboro', borderBottomWidth: 0.4}}></View>
            </View>
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