import React from 'react';
import { View, ScrollView } from 'react-native';
import BusinessSquare from './BusinessSquare';
const BusinessSideScroll = () => {
    return (
        <ScrollView
            horizontal={true}
            style={{ height: 200 }}
        >
            <BusinessSquare></BusinessSquare>
            <BusinessSquare></BusinessSquare>
            <BusinessSquare></BusinessSquare>
            <BusinessSquare></BusinessSquare>
            <BusinessSquare></BusinessSquare>
            <BusinessSquare></BusinessSquare>
            <BusinessSquare></BusinessSquare>
            <BusinessSquare></BusinessSquare>
            <BusinessSquare></BusinessSquare>
        </ScrollView>
    );
};

export default BusinessSideScroll;
