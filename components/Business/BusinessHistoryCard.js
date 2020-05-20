import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView, Dimensions } from 'react-native';
import BusinessCard from './BusinessCard';
import { styles } from '../Styles';
import Outlines from '../../assets/Outlines';
import { getFontSize, getIconSize } from '../../utils/fontsizes';

export const BusinessHistoryCard = ({ businesses, navigation, dbBusinesses }) => {
    var timedate = new Date("October 13, 2020 11:13:00");
    let time = timedate.toUTCString();
    time = time.substring(0, time.length-3);
    return (
        <View style={{height: 180}}>
            <View style={{height: 10}}></View>
                <View style={{ height: 150, width: Dimensions.get('window').width, backgroundColor: 'white'}}>
                <View style={{ height: 35, paddingLeft: 15}}>
                    <Text style={{fontFamily: 'Avenir-Light', color: 'black', fontSize: getFontSize(19)}}>{time}</Text>
                </View>
                <Outlines type='BusinessCard'></Outlines>
                <View style={{height: 10, borderBottomWidth: 0.5, borderBottomColor: 'gainsboro'}}></View>
            </View>
        </View>
    );
};
export default BusinessHistoryCard;