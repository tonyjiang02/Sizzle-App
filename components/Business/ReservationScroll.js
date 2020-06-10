//business can report a live update

import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';
import { openBusinessPage } from '../../actions/business';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
const ReservationScroll = ({ reservations, reservationLimit, reserve, day, checkReserved }) => {
    //Needs this reservation's date, current time, opening time, closing time, time slot length, #ppl allowed, #ppl currently registered at each time slot
    if (typeof reservations === 'undefined') {
        return <View></View>;
    }
    let list = reservations.map((s, i) => (
        <View index={i} style={{ paddingRight: 10, flexDirection: 'column' }}>
            <View style={{ alignItems: 'center', paddingBottom: 5 }}>
                <Text style={{ fontFamily: 'AvenirNext-Bold' }}>{s.slot}</Text>
                {reservationLimit > 0 ? <Text>{s.users} / {reservationLimit}</Text> : <Text>{s.users} reserved</Text>}
            </View>
            {!checkReserved(i, day) ?
                <TouchableOpacity onPress={() => reserve(i, day)}>
                    <View style={{ borderRadius: 20, borderColor: 'gray', borderWidth: 0.5, backgroundColor: 'gray', paddingHorizontal: 30 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', padding: 8, fontSize: 12, textAlign: 'center' }}>
                            Reserve
                        </Text>
                    </View>
                </TouchableOpacity>
                :
                <View style={{ borderRadius: 20, borderColor: 'transparent', borderWidth: 0.5, backgroundColor: 'green', paddingHorizontal: 30 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', padding: 8, fontSize: 12 }}>
                        Reserved
                    </Text>
                </View>
            }
        </View>
    ));
    return (
        <View>
            <Text style={{ fontFamily: 'AvenirNext-Bold', fontSize: 24, color: 'darkslategrey', paddingTop: 5 }}>Today</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingTop: 5 }}>
                {list}
                <View style={{ width: 20 }}></View>
            </ScrollView>
        </View>

    );
};

export default ReservationScroll;
