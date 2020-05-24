import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView } from 'react-native';
import BusinessCard from './BusinessCard';
import { styles } from '../Styles';
export const BusinessList = ({ business, navigation }) => {
    let businessList = business.searchBusinesses.map((biz, i) => (
        <BusinessCard key={biz._id ? biz_.id : biz.id} business={biz} navigation={navigation} db={business.dbSearchBusinesses[i]}></BusinessCard>
    ));;
    useEffect(() => {
        var businesses = business.searchBusinesses;
        var dbBusinesses = business.dbSearchBusinesses;
        businessList = businesses.map((biz, i) => (
            <BusinessCard key={biz._id ? biz_.id : biz.id} business={biz} navigation={navigation} db={dbBusinesses[i]}></BusinessCard>
        ));
    }, [business]);

    return (
        <View style={{ flex: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ height: 5 }}></View>
                {businessList}
            </ScrollView>
        </View>
    );
};
const mapStateToProps = state => ({
    business: state.business
});
export default connect(mapStateToProps, {})(BusinessList);