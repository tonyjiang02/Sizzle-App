import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView } from 'react-native';
import ReservationCard from './ReservationCard';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import { styles } from '../Styles';
import Header from '../layout/Header';
import { updateUserWithoutReturn } from '../../actions/user';
import { Octicons, Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export const UserReservations = ({ user, navigation }) => {
    /*const businessList = businesses.map((biz, i) => (
    <BusinessCard key={biz._id ? biz_.id : biz.id} business={biz} navigation={navigation} db={dbBusinesses[i]}></BusinessCard>
));*/
    const [reservationDisplay, updateDisplay] = useState([]);
    console.log(user.reservations);
    useEffect(() => {
        let reservations = [...user.reservations];
        let res = reservations.reverse().map((res, i) =>
            <ReservationCard key={i} index={res.index} id={res.business} timestamp={res.timestamp} date={res.date} name={res.businessName} address={res.address} time={res.time}></ReservationCard>
        );
        updateDisplay(res);
    }, [user]);
    return (
        <View style={{ flex: 20, backgroundColor: '#E1FDE2' }}>
            <Header navigation={navigation}></Header>
            <View style={{ flexDirection: 'row', paddingTop: 10, backgroundColor: '#E1FDE2', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialCommunityIcons name="clock" size={35} color='green' style={{ paddingRight: 5 }}></MaterialCommunityIcons>
                <Text style={{ color: 'green', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Reservations</Text>
            </View>
            <Text style={{ color: 'black', fontFamily: 'Avenir-Light', fontSize: 16, textAlign: 'center' }}>If required, show this screen with your reservation upon entrance.</Text>
            <ScrollView showsVerticalScrollIndicator={false} style-={{ backgroundColor: 'white' }}>
                {reservationDisplay}
                <View style={{ height: 50 }}></View>
            </ScrollView>
        </View>
    );
};
const mapStateToProps = (state) => ({
    user: state.user.user
});
export default connect(mapStateToProps, {})(UserReservations);