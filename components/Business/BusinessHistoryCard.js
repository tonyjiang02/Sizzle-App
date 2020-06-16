import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView, Dimensions } from 'react-native';
import BusinessCard from './BusinessCard';
import { styles } from '../Styles';
import Outlines from '../../assets/Outlines';
import { getFontSize, getIconSize } from '../../utils/fontsizes';

export const BusinessHistoryCard = ({ index, date, id, name, address }) => {
    const [dateString, setDateString] = useState("");
    useEffect(() => {
        let D = new Date(date);
        let ampm = D.getHours() >= 12 ? 'pm' : 'am';
        setDateString(D.getHours() % 12 + ":" + (D.getMinutes() < 10 ? ("0" + D.getMinutes()) : D.getMinutes()) + " " + ampm + " - " + (D.getMonth() + 1) + "/" + D.getDate() + "/" + D.getFullYear());
    }, [null]);
    return (
        <View style={{ paddingTop: 15 }}>
            <View style={{ height: (Dimensions.get('window').width / 4), width: Dimensions.get('window').width - 20, alignSelf: 'center', backgroundColor: 'white', flex: 1, flexDirection: "row", borderRadius: 10 }}>
                <View style={{ paddingLeft: 15, flex: 3.5, alignSelf: 'center' }}>
                    <Text style={{ fontSize: getFontSize(22), flexWrap: 'wrap', fontFamily: 'AvenirNext-Bold', color: 'black' }}>{name > 25 ? textTruncateBySpace(25, name) : name}</Text>
                    <Text style={{ fontSize: getFontSize(12), color: 'black', fontFamily: 'Avenir-Light' }}>{address}</Text>
                    <View style={{ height: 10 }}></View>
                    <Text style={{ fontFamily: 'Avenir-Light', color: 'black', fontSize: getFontSize(19) }}>{dateString}</Text>
                </View>
            </View>
        </View>
    );
};
export default BusinessHistoryCard;
