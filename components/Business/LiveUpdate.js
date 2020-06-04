//business can report a live update

import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, TimePickerAndroid } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';
import { openBusinessPage } from '../../actions/business';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { getFontSize, getIconSize } from '../../utils/fontsizes';

const LiveUpdate = ({ title, content, time }) => {
    const [timeDiff, setTimeDiff] = useState(0);
    useEffect(() => {
        console.log(`Live Update Title: ${title} Content: ${content} Time: ${time}`);
        let currentSeconds = Date.now() / 1000;
        let postTime = Date.parse(time);
        let postSeconds = postTime / 1000;
        let diffSeconds = currentSeconds - postSeconds;
        let diffMin = diffSeconds / 60;
        setTimeDiff(Math.round(diffMin));
    }, [])

    let timeDisplay = '';
    if (timeDiff < 1){
        timeDisplay = "now";
    }
    else if (timeDiff < 60) {
        timeDisplay = timeDiff + 'min.';
    }
    else if (timeDiff < 1440) {
        if ( Math.trunc(timeDiff / 60) === 1){
            timeDisplay = Math.trunc(timeDiff / 60) + ' hr.';
        }
        else{
            timeDisplay = Math.trunc(timeDiff / 60) + ' hrs.';
        }
    }
    else if (timeDiff < 10080) {
        if (Math.trunc(timeDiff / 1440) === 1){
            timeDisplay = Math.trunc(timeDiff / 1440) + ' day';
        }
        else{
            timeDisplay = Math.trunc(timeDiff / 1440) + ' days';
        }
    }
    else if (timeDiff < 40320) {
        if (Math.trunc(timeDiff / 10080) === 1){
            timeDisplay = Math.trunc(timeDiff / 10080) + ' wk.';
        }
        else{
            timeDisplay = Math.trunc(timeDiff / 10080) + ' wks.';
        }
    }
    else if (timeDiff < 483840) {
        if (Math.trunc(timeDiff / 40320) === 1){
            timeDisplay = Math.trunc(timeDiff / 40320) + ' mo.';
        }
        else{
            timeDisplay = Math.trunc(timeDiff / 40320) + ' mos.';
        }
    }
    else {
        if (Math.trunc(timeDiff / 525600) === 1){
            timeDisplay = Math.trunc(timeDiff / 525600) + ' yr.';
        }
        else{
            timeDisplay = Math.trunc(timeDiff / 525600) + ' yrs.';
        }
    }
    return (
        <View>
            <View style={{height: 10}}></View>
                <View style={{width: Dimensions.get('window').width-110, alignSelf: 'center'}}></View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <View style={{flex: 4}}>
                        <Text style={{ fontFamily: 'AvenirNext-Bold', fontSize: getFontSize(20), color: 'darkslategrey', paddingRight: 10 }}>{title}</Text>
                    </View>
                    <View style={{flex: 1.1}}>
                        <Text style={{ fontFamily: 'AvenirNext-Italic', fontSize: getFontSize(14), color: 'darkslategrey' }}>{timeDisplay}</Text>
                    </View>
                </View>
                <View style={{ paddingBottom: 10 }}>
                    <Text style={{ fontFamily: 'DamascusLight', fontSize: getFontSize(16), color: 'black' }}>{content}</Text>
                </View>
                <View style={{borderTopWidth: 0.5, borderTopColor: 'gainsboro'}}></View>
        </View>

    );
};

export default LiveUpdate;
