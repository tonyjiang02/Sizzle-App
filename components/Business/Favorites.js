import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView } from 'react-native';
import BusinessHistoryCard from './BusinessHistoryCard';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import { styles } from '../Styles';
import Header from '../layout/Header';
import { Octicons, Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Outlines from '../../assets/Outlines';

export const Favorites = ({navigation}) => {
        /*const businessList = businesses.map((biz, i) => (
        <BusinessCard key={biz._id ? biz_.id : biz.id} business={biz} navigation={navigation} db={dbBusinesses[i]}></BusinessCard>
    ));*/
    return (
        <View style={{ flex: 20, backgroundColor: 'white'}}>
            <Header navigation={navigation}></Header>
            <View style={{flexDirection: 'row', paddingVertical: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderBottomColor: 'gainsboro', borderBottomWidth: 0.5}}>
                <Ionicons name="md-heart" color='red' size={35} style={{ paddingLeft: 8, paddingRight: 10, paddingLeft: 2 }} />
                <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Favorites</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style-={{backgroundColor: 'white'}}>
                <View style={{height: 5}}></View>
                <Outlines type="BusinessCard"></Outlines>
                <Outlines type="BusinessCard"></Outlines>
                <Outlines type="BusinessCard"></Outlines>
                <Outlines type="BusinessCard"></Outlines>
                <Outlines type="BusinessCard"></Outlines>
                <Outlines type="BusinessCard"></Outlines>
                <Outlines type="BusinessCard"></Outlines>
                <Outlines type="BusinessCard"></Outlines>
                <Outlines type="BusinessCard"></Outlines>
            </ScrollView>
        </View>
    );
};
export default Favorites;