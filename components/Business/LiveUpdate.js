//business can report a live update

import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';
import { openBusinessPage } from '../../actions/business';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { getFontSize, getIconSize } from '../../utils/fontsizes';

const LiveUpdate = ({ title, content, time }) => {
    useEffect(() => {
        console.log(`Live Update Title: ${title} Content: ${content}`);
    }, [])
    let testTitle = title;
    let testTime = time;
    let testTimeDisplay = '';
    let testDesc = content;

    if (testTime < 60) {
        testTimeDisplay = testTime + 'min.';
    }
    else if (testTime < 1440) {
        if ( Math.trunc(testTime / 60) === 1){
            testTimeDisplay = Math.trunc(testTime / 60) + ' hr.';
        }
        else{
            testTimeDisplay = Math.trunc(testTime / 60) + ' hrs.';
        }
    }
    else if (testTime < 10080) {
        if (Math.trunc(testTime / 1440) === 1){
            testTimeDisplay = Math.trunc(testTime / 1440) + ' day';
        }
        else{
            testTimeDisplay = Math.trunc(testTime / 1440) + ' days';
        }
    }
    else if (testTime < 40320) {
        if (Math.trunc(testTime / 10080) === 1){
            testTimeDisplay = Math.trunc(testTime / 10080) + ' wk.';
        }
        else{
            testTimeDisplay = Math.trunc(testTime / 10080) + ' wks.';
        }
    }
    else if (testTime < 483840) {
        if (Math.trunc(testTime / 40320) === 1){
            testTimeDisplay = Math.trunc(testTime / 40320) + ' mo.';
        }
        else{
            testTimeDisplay = Math.trunc(testTime / 40320) + ' mos.';
        }
    }
    else {
        if (Math.trunc(testTime / 525600) === 1){
            testTimeDisplay = Math.trunc(testTime / 525600) + ' yr.';
        }
        else{
            testTimeDisplay = Math.trunc(testTime / 525600) + ' yrs.';
        }
    }
    return (
        <View>
            <View style={{height: 10}}></View>
                <View style={{width: Dimensions.get('window').width-90, alignSelf: 'center'}}></View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <View style={{flex: 4}}>
                        <Text style={{ fontFamily: 'AvenirNext-Bold', fontSize: getFontSize(20), color: 'darkslategrey', paddingRight: 10 }}>{testTitle}</Text>
                    </View>
                    <View style={{flex: 1.1}}>
                        <Text style={{ fontFamily: 'AvenirNext-Italic', fontSize: getFontSize(14), color: 'darkslategrey' }}>{testTimeDisplay}</Text>
                    </View>
                </View>
                <View style={{ paddingBottom: 10 }}>
                    <Text style={{ fontFamily: 'DamascusLight', fontSize: getFontSize(16), color: 'black' }}>{testDesc}</Text>
                </View>
                <View style={{borderTopWidth: 0.5, borderTopColor: 'gainsboro'}}></View>
        </View>

    );
};

export default LiveUpdate;
