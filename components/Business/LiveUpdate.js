//business can report a live update

import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';
import { openBusinessPage } from '../../actions/business';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
const LiveUpdate = ({ title, content }) => {
    useEffect(() => {
        console.log(`Live Update Title: ${title} Content: ${content}`);
    }, [])
    let testTitle = title;
    let testTime = 300000;
    let testTimeDisplay = '';
    let testDesc = content;

    if (testTime < 60) {
        testTimeDisplay = testTime + 'minutes';
    }
    else if (testTime < 1440) {
        testTimeDisplay = Math.trunc(testTime / 60) + ' hours';
    }
    else if (testTime < 10080) {
        testTimeDisplay = Math.trunc(testTime / 1440) + ' days';
    }
    else if (testTime < 40320) {
        testTimeDisplay = Math.trunc(testTime / 10080) + ' weeks';
    }
    else if (testTime < 483840) {
        testTimeDisplay = Math.trunc(testTime / 40320) + ' months';
    }
    else {
        testTimeDisplay = Math.trunc(testTime / 525600) + ' years';
    }
    return (
        <View style={styles.defaultView}>
            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={{ fontFamily: 'AvenirNext-Bold', fontSize: 20, color: 'darkslategrey', paddingRight: 10 }}>{testTitle}</Text>
                <Text style={{ fontFamily: 'AvenirNext-Italic', fontSize: 14, color: 'darkslategrey' }}>{testTimeDisplay}</Text>
            </View>
            <View style={{ flex: 5, paddingBottom: 10 }}>
                <Text style={{ fontFamily: 'DamascusLight', fontSize: 16, color: 'black' }}>{testDesc}</Text>
            </View>
        </View>

    );
};

export default LiveUpdate;
