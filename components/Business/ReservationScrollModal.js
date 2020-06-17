//business can report a live update

import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';
import { openBusinessPage } from '../../actions/business';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
const ReservationScrollModal = ({ reservations, reservationLimit, reserve, startingDate, checkReserved }) => {
    //Needs this reservation's date, current time, opening time, closing time, time slot length, #ppl allowed, #ppl currently registered at each time slot
    if (typeof reservations === 'undefined' || reservations.length === 0) {
        return <View></View>;
    }
    let weekMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let startingIndex = weekMap.indexOf(startingDate);
    let weekMapRelative = [];
    let oncePerDay = false;
    let oncePerWeek = false;
    let unlimited = false;
    const checkTime = (now, timeString, day) => {
        const rampm = timeString.substring(timeString.length-2, timeString.length);
        const nowDate = new Date(now);
        const endTime = timeString.split("-")[1];
        const hour = endTime.split(":")[0];
        const min = endTime.split(":")[1].substring(0, 2);
        console.log(hour + ":" + min + " " + rampm);
        if (day === 0){
            if (rampm === 'am' && nowDate.getHours() >= 12){
                return false;
            }
            else if (rampm === 'am' && nowDate.getHours() < 12){
                let hourInt = Number(hour);
                if (hourInt === 12){
                    hourInt  = hourInt - 12;
                }
                if (nowDate.getHours() > hourInt){
                    return false;
                }
                else if (nowDate.getHours()<hourInt){
                    return true;
                }
                else{
                    if (nowDate.getMinutes() > Number(min) ){
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
            else if (rampm === 'pm' && nowDate.getHours() >= 12){
                let nowHour = nowDate.getHours() - 12;
                let rhour = Number(hour);
                if (rhour === 12){
                    rhour = rhour - 12;
                }
                if (nowHour > rhour){
                    return false;
                }
                else if (nowHour < rhour){
                    return true;
                }
                else{
                    if (nowDate.getMinutes() > Number(min) ){
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
        }
        return true;
    }
    for (let i = 0; i < 7; i++) {
        weekMapRelative.push(weekMap[(startingIndex + i) % 7]);
    }
    let list = [];
    for (let i = 0; i < 7; i++) {
        let currentDay = weekMapRelative[i].toLowerCase();
        let reservationDay = reservations[currentDay].map((s, j) => (
            <TouchableWithoutFeedback>
                <View index={j} style={{ paddingRight: 10, flexDirection: 'column' }}>
                    <View style={{ alignItems: 'center', paddingBottom: 5 }}>
                        <Text style={{ fontFamily: 'AvenirNext-Bold' }}>{s.slot}</Text>
                        {reservationLimit > 0 ? <Text>{s.users} / {reservationLimit}</Text> : <Text>{s.users} reserved</Text>}
                    </View>
                    {checkTime(Date.now(), s.slot, i) ? 
                    <View>
                        <View>{!checkReserved(j, weekMapRelative[i]) ?
                            <TouchableOpacity onPress={() => { reserve(j, weekMapRelative[i]); }}>
                                <View style={{ borderRadius: 20, borderColor: 'transparent', borderWidth: 0.5, backgroundColor: (s.users < reservationLimit) ? '#ff9900' : '#B0AFAF', paddingHorizontal: 30 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', padding: 8, fontSize: 12, textAlign: 'center' }}>
                                        {console.log()}
                                        {(s.users < reservationLimit) ? "Reserve" : "Full"}
                                    </Text>
                                </View>
                            </TouchableOpacity> :
                            <View style={{ borderRadius: 20, borderColor: 'transparent', borderWidth: 0.5, backgroundColor: 'green', paddingHorizontal: 30 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', padding: 8, fontSize: 12, textAlign: 'center' }}>
                                    Reserved
                                </Text>
                            </View>
                        }</View>
                    </View> 
                    :
                    <View style={{ borderRadius: 20, borderColor: 'transparent', borderWidth: 0.5, backgroundColor: 'gray', paddingHorizontal: 30 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', padding: 8, fontSize: 12, textAlign: 'center' }}>
                            Past
                        </Text>
                    </View> }
                </View>
            </TouchableWithoutFeedback>
        ));
        list.push(reservationDay);
    }

    return (
        <View>
            {list.map((e, k) => {
                return <View>
                    <Text style={{ fontFamily: 'AvenirNext-Bold', fontSize: 24, color: 'darkslategrey', paddingTop: 5 }}>{(k === 0) ? "Today" : weekMapRelative[k]}</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingTop: 5 }}>
                        {list[k]}
                    </ScrollView>
                </View>;
            })}

        </View>

    );
};

export default ReservationScrollModal;
