import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import {styles} from '../components/Styles'
import { getFontSize, getIconSize } from '../utils/fontsizes';

const Outlines = ({ type }) => {
    if (type==='BusinessCard'){
        return (
            <View style={styles.businessCardOuter}>
                <View style={{height: 115, width: Dimensions.get('window').width-20, backgroundColor: 'gainsboro'}}></View>
            </View>
        )
    }
    if (type==='Header'){
        return (
            <View style={{height: 85, backgroundColor: 'gainsboro'}}></View>
        )
    }
    if (type==='Search'){
        return (
            <View style={{height: 45, width: Dimensions.get('window').width-15, backgroundColor: 'gainsboro', borderRadius: 5}}>
            </View>
        )
    }
    if (type==='BusinessSideScroll'){
        return (
            <View style={{height: 200, width: Dimensions.get('window').width, backgroundColor: 'gainsboro', borderRadius: 6}}>
            </View>
        )
    }
    if (type==='BusinessSquare'){
        return (
            <View style={{paddingRight: 15, paddingBottom: 10,}}>
                <View style={{height: 175, width: 235, backgroundColor: 'gainsboro'}}></View>
            </View>
        )
    }
    if (type==='CategoryHeader'){
        return (
            <View style={{height: 35, width: 170, backgroundColor: 'gainsboro'}}></View>
        )
    }
    return (
        <View></View>
    )
};

export default Outlines;
