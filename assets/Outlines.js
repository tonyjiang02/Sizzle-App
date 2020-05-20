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
            <View style={{height: 50, width: Dimensions.get('window').width-20, backgroundColor: 'gainsboro', borderRadius: 5}}>
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
            <View style={{height: 190, width: 235, backgroundColor: 'gainsboro'}}>
                <Text>Insert Business BusinessSquare</Text>
            </View>
        )
    }
    return (
        <View></View>
    )
};

export default Outlines;
