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
    // const reservationAllowed = (users, limit, dayCounter, time) => {
    //     /*
    //     Dont allow if:
    //     1. Time has already passed
    //     2. Reservation limit reached
    //     3. Can't reserve same time twice
    //     4. Can't reserve on same day twice (if oncePerDay === true)
    //     5. Can't reserve on same week twice (if oncePerWeek === true)
    //     */
    //     //check user limit
    //     if (users >= limit) {
    //         return false;
    //     }
    // };
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
                    <View>
                        {!checkReserved(j, weekMapRelative[i]) ?
                            <TouchableOpacity onPress={() => { reserve(j, weekMapRelative[i]); }}>
                                <View style={{ borderRadius: 20, borderColor: 'transparent', borderWidth: 0.5, backgroundColor: (s.users < reservationLimit) ? '#ff9900' : '#B0AFAF', paddingHorizontal: 30 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', padding: 8, fontSize: 12, textAlign: 'center' }}>
                                        {console.log()}
                                        {(s.users < reservationLimit) ? "Reserve" : "Full"}
                                    </Text>
                                </View>
                            </TouchableOpacity> :
                            <View style={{ borderRadius: 20, borderColor: 'transparent', borderWidth: 0.5, backgroundColor: 'green', paddingHorizontal: 30 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', padding: 8, fontSize: 12 }}>
                                    Reserved
                                </Text>
                            </View>
                        }
                    </View>
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
