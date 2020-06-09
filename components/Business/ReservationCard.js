import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import ExampleBusinessCard from './ExampleBusinessCard';
import { styles } from '../Styles';
import Outlines from '../../assets/Outlines';
import { textTruncateBySpace } from '../../utils/TextTruncate';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import { updateUserWithoutReturn } from '../../actions/user';
import user from '../../reducers/user';

export const ReservationCard = ({ date, time, name, address, key, reservations, updateUserWithoutReturn }) => {
    const cancelReservation = () => {
        let changedReservations = reservations;
        changedReservations.splice(key, 1);
        let user = {
            reservations: changedReservations
        };
        updateUserWithoutReturn(user);
    };
    return (
        <View>
            <View style={{ padding: 10, width: Dimensions.get('window').width, backgroundColor: 'white', flex: 1, flexDirection: "row" }}>
                <View style={{ paddingLeft: 15, flex: 3 }}>
                    <Text style={{ fontFamily: 'Avenir-Light', color: 'black', fontSize: getFontSize(19) }}>{date}</Text>
                    <Text style={{ fontSize: getFontSize(20), paddingTop: 10, flexWrap: 'wrap' }}>{name > 33 ? textTruncateBySpace(33, name) : name}</Text>
                    <Text style={{ fontSize: getFontSize(12), paddingBottom: 5 }}>{textTruncateBySpace(33, address)}</Text>
                    <Text style={{ fontSize: getFontSize(12), paddingBottom: 5 }}>{time}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                    <TouchableOpacity onPress={() => cancelReservation()}><Text>Cancel</Text></TouchableOpacity>
                </View>
                <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'gainsboro' }}></View>
            </View>
        </View>
    );
};

const mapStateToProps = state => ({
    reservations: state.user.user.reservations
});

export default connect(mapStateToProps, { updateUserWithoutReturn })(ReservationCard);