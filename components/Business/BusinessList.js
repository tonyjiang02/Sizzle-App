import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView } from 'react-native';
import BusinessCard from './BusinessCard';
import { styles } from '../Styles';
export const BusinessList = ({ type, business, navigation }) => {
    let businessList=null;
    if (type==='search'){
        var searchb = business.searchBusinesses;
        var searchdb = business.dbSearchBusinesses;
        businessList = searchb.map((biz, i) => (
            <BusinessCard key={biz._id ? biz_.id : biz.id} business={biz} navigation={navigation} db={searchdb[i]}></BusinessCard>
        ));
    }
    else if (type==='nearest'){
        var nearestb = business.nearestBusinesses;
        var nearestdb = business.nearestBusinesses;
        businessList = nearestb.map((biz, i) => (
            <BusinessCard key={biz._id ? biz_.id : biz.id} business={biz} navigation={navigation} db={nearestdb[i]}></BusinessCard>
        ));
    }
    else if (type==='filter'){
        //console.log('length of filterbusinesses in businesslist' + business.filterBusinesses.length);
        var filterb = business.filterBusinesses;
        var filterdb = business.dbFilterBusinesses;
        businessList = filterb.map((biz, i) => (
            <BusinessCard key={biz._id ? biz_.id : biz.id} business={biz} navigation={navigation} db={filterdb[i]}></BusinessCard>
        ));
    }

    return (
        <View style={{ flex: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ height: 5 }}></View>
                {(businessList.length != 0) ? businessList : <Text style={{fontSize: 16, textAlign: 'center', paddingTop: 5}}>No Results</Text>}
            </ScrollView>
        </View>
    );
};
const mapStateToProps = state => ({
    business: state.business
});
export default connect(mapStateToProps, {})(BusinessList);