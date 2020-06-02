import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView, Dimensions } from 'react-native';
import ExampleBusinessCard from './ExampleBusinessCard';
import { styles } from '../Styles';
import Outlines from '../../assets/Outlines';
import { timeToString } from '../../utils/TextTruncate';
import { getFontSize, getIconSize } from '../../utils/fontsizes';

export const ReservationCard = ({ date, imageURL, population, name, address, distance }) => {
    var timedate = date;
    return (
        <View style={{ height: 180 }}>
            <View style={{ height: 10 }}></View>
            <View style={{ height: 150, width: Dimensions.get('window').width, backgroundColor: 'white' }}>
                <View style={{ height: 35, paddingLeft: 15 }}>
                    <Text style={{ fontFamily: 'Avenir-Light', color: 'black', fontSize: getFontSize(19) }}>{timeToString(timedate)}</Text>
                </View>
                <ExampleBusinessCard imageURL={imageURL} population={population} name={name} distance={distance} address={address}></ExampleBusinessCard>
                <View style={{ height: 10, borderBottomWidth: 0.5, borderBottomColor: 'gainsboro' }}></View>
            </View>
        </View>
    );
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(ReservationCard);