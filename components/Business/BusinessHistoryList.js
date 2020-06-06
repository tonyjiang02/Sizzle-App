import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView } from 'react-native';
import BusinessHistoryCard from './BusinessHistoryCard';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import { styles } from '../Styles';
import Header from '../layout/Header';
import { Octicons, Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export const BusinessHistoryList = ({navigation, User}) => {
        /*const businessList = businesses.map((biz, i) => (
        <BusinessCard key={biz._id ? biz_.id : biz.id} business={biz} navigation={navigation} db={dbBusinesses[i]}></BusinessCard>
    ));*/
    console.log(User.user);
    return (
        <View style={{ flex: 20, backgroundColor: 'white'}}>
            <Header navigation={navigation}></Header>
            <View style={{flexDirection: 'row', paddingVertical: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderBottomColor: 'gainsboro', borderBottomWidth: 0.5}}>
                    <MaterialCommunityIcons name='map-marker-check' color='#ff9900' size={35} />
                    <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Check-in History</Text>
            </View> 
            <ScrollView showsVerticalScrollIndicator={false} style-={{backgroundColor: 'white'}}>
                <BusinessHistoryCard/>
                <BusinessHistoryCard/>
                <BusinessHistoryCard/>
                <BusinessHistoryCard/>
                <BusinessHistoryCard/>
                <BusinessHistoryCard/>
                <BusinessHistoryCard/>
                <BusinessHistoryCard/>
                <BusinessHistoryCard/>
            </ScrollView>
        </View>
    );
};
const mapStateToProps = state => ({
    User: state.user
});
export default connect(mapStateToProps, {})(BusinessHistoryList);