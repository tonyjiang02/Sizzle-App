import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView, Dimensions } from 'react-native';
import BusinessCard from './BusinessCard';
import { styles } from '../Styles';
import Outlines from '../../assets/Outlines';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import {textTruncateBySpaceTwo} from '../../utils/TextTruncate';

export const BusinessHistoryCard = ({ index, date, id, name, address }) => {
    const [dateString, setDateString] = useState("");
    useEffect(() => {
        let D = new Date(date);
        let ampm = D.getHours() >= 12 ? 'pm' : 'am';
        setDateString(D.getHours() % 12 + ":" + (D.getMinutes() < 10 ? ("0" + D.getMinutes()) : D.getMinutes()) + " " + ampm + " - " + (D.getMonth() + 1) + "/" + D.getDate() + "/" + D.getFullYear());
    }, [null]);
    return (
        <View style={styles.businessCardOuter}>
            <View style={ styles.businessCardInner }>
                <View style={{ padding: 15, flex: 3.5, alignSelf: 'center' }}>
                    <Text style={{ fontSize: getFontSize(20), flexWrap: 'wrap', fontFamily: 'AvenirNext-Bold', color: 'black', flex: 2 }}>{name.length > 54 ? textTruncateBySpaceTwo(54, name) : name}</Text>
                    <Text style={{ fontFamily: 'Avenir-Light', color: 'black', fontSize: getFontSize(19), flex: 1 }}>{dateString}</Text>
                </View>
            </View>
        </View>
    );
};
export default BusinessHistoryCard;
