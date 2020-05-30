//business can report a live update

import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';
import { openBusinessPage } from '../../actions/business';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
const ReservationScroll = ({ reservations, reservationLimit, reserve, startingDate }) => {
    //Needs this reservation's date, current time, opening time, closing time, time slot length, #ppl allowed, #ppl currently registered at each time slot
    let weekMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let startingIndex = weekMap.indexOf(startingDate);
    console.log(startingIndex);
    let weekMapRelative = [];
    for (let i = 0; i < 7; i++) {
        weekMapRelative.push(weekMap[(startingIndex + i) % 7]);
    }
    console.log(weekMapRelative);
    let list = [];
    for (let i = 0; i < 7; i++) {
        let currentDay = weekMapRelative[i].toLowerCase();
        let reservationDay = reservations[currentDay].map((s, j) => (
            <View index={j} style={{ paddingRight: 10, flexDirection: 'column' }}>
                <View style={{ alignItems: 'center', paddingBottom: 5 }}>
                    <Text style={{ fontFamily: 'AvenirNext-Bold' }}>{s.slot}</Text>
                    {reservationLimit > 0 ? <Text>{s.users.length} / {reservationLimit}</Text> : <Text>{s.users} reserved</Text>}
                </View>
                <TouchableOpacity onPress={() => reserve(j, currentDay)}>
                    <View style={{ borderRadius: 20, borderColor: 'gray', borderWidth: 0.5, backgroundColor: 'gray', paddingHorizontal: 30 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', padding: 8, fontSize: 12 }}>
                            Reserve
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        ));
        list.push(reservationDay);
    }

    return (
        <View>
            {list.map((e, k) => {
                return <View>
                    <Text style={{ fontFamily: 'AvenirNext-Bold', fontSize: 24, color: 'darkslategrey', paddingTop: 5 }}>{weekMapRelative[k]}</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingTop: 5 }}>
                        {list[k]}
                    </ScrollView>
                </View>;
            })}

        </View>

    );
};

export default ReservationScroll;
