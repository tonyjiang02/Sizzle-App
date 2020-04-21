import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView } from 'react-native';
import BusinessCard from './BusinessCard';
import { styles } from '../Styles';
export const BusinessList = ({ businesses, navigation }) => {
    const businessList = businesses.map((biz) => (
        <BusinessCard key={biz._id ? biz_.id : biz.id} business={biz} navigation={navigation}></BusinessCard>
    ));
    return (
        <View style={styles.defaultView}>
            <ScrollView>
                {businessList}
            </ScrollView>
        </View>
    );
};
export default BusinessList;