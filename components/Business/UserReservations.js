import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView } from 'react-native';
import ReservationCard from './ReservationCard';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import { styles } from '../Styles';
import Header from '../layout/Header';
import { Octicons, Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export const BusinessHistoryList = ({navigation}) => {
        /*const businessList = businesses.map((biz, i) => (
        <BusinessCard key={biz._id ? biz_.id : biz.id} business={biz} navigation={navigation} db={dbBusinesses[i]}></BusinessCard>
    ));*/
    let date1 = new Date(2020, 4, 29, 9, 0, 0, 0);
    let date2 = new Date(2020, 5, 1, 16, 0, 0, 0);
    let date3 = new Date(2020, 5, 5, 13, 0, 0, 0);
    let date4 = new Date(2020, 5, 10, 14, 0, 0, 0);
    let date5 = new Date(2020, 5, 12, 16, 0, 0, 0);

    return (
        <View style={{ flex: 20, backgroundColor: 'white'}}>
            <Header navigation={navigation}></Header>
            <View style={{flexDirection: 'row', paddingTop: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
                <MaterialCommunityIcons name="clock" size={35} color='green' style={{ paddingRight: 5 }}></MaterialCommunityIcons>
                <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Reservations</Text>
            </View> 
            <Text style={{ color: '#323131', fontFamily: 'Avenir-Light', fontSize: 16, textAlign: 'center'}}>If required, show this screen with your reservation upon entrance.</Text>
            <View style={{height: 10, borderBottomColor: 'gainsboro', borderBottomWidth: 0.5}}></View>
            <ScrollView showsVerticalScrollIndicator={false} style-={{backgroundColor: 'white'}}>
                <ReservationCard date={date1} imageURL="https://picsum.photos/id/1060/300/300" address='3560 Jim Rosa Lane, Cupertino, CA 95014' name="Joe's Cafe" distance={0.8} population={18}></ReservationCard>
                <ReservationCard date={date2} imageURL="https://picsum.photos/id/109/300/300" address='2671  Silverman Avenue, Cupertino, CA 95014' name="Silverman Park " distance={0.5} population={33}></ReservationCard>
                <ReservationCard date={date3} imageURL="https://picsum.photos/id/292/300/300" address='1867 Passaic Street, Cupertino, CA 95014' name="The Great Market" distance={1.0} population={50}></ReservationCard>
                <ReservationCard date={date4} imageURL="https://picsum.photos/id/460/300/300" address='3560 Jim Rosa Lane, Cupertino, CA 95014' name="Flame Sushi" distance={2.4} population={12}></ReservationCard>
                <View style={{height: 50}}></View>
            </ScrollView>
        </View>
    );
};
export default BusinessHistoryList;