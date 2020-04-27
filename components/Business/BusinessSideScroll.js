import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import BusinessSquare from './BusinessSquare';
import BusinessCard from './BusinessCard';
import CategoryHeader from './CategoryHeader';
import { styles } from '../Styles';

const BusinessSideScroll = ({ businesses, category }) => {
    //businesses : {googleData, ourData}
    //bs = googleData
    //db = ourData
    const [list, updateList] = useState([]);
    useEffect(() => {
        console.log("Side scroll rendered");
        console.log(businesses.length);
        const l = businesses.map((tuple) => {
            <BusinessSquare key={tuple.business.googleId} business={tuple.business} db={tuple.db}></BusinessSquare>;
        });
        updateList(l);
    }, [businesses]);
    return (
        <View style={{ backgroundColor: "white", paddingBottom: 10 }}>
            <View style={{ backgroundColor: '#f2f2f2' }}>
                <CategoryHeader category={category} />
                <ScrollView horizontal={true} style={{ height: 200, paddingLeft: 15, paddingTop: 5 }} showsHorizontalScrollIndicator={false}>
                    <BusinessSquare></BusinessSquare>
                    <BusinessSquare></BusinessSquare>
                    <BusinessSquare></BusinessSquare>
                    <BusinessSquare></BusinessSquare>
                    <BusinessSquare></BusinessSquare>
                    <BusinessSquare></BusinessSquare>
                    <BusinessSquare></BusinessSquare>
                    <Text style={{ padding: 10 }}></Text>
                </ScrollView>
            </View>
        </View>
    );
};

export default BusinessSideScroll;
