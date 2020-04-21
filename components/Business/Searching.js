import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { findPlace, getNearby } from '../../actions/business';
import { styles } from '../Styles';
import BusinessList from './BusinessList';
import Loading from '../layout/Loading';
const Searching = ({ getNearby, route: { params: { query } }, navigation, business }) => {
    useEffect(() => {
        //TODO Only add search results to state pressing the search bar again
        if (query) {
            getNearby({ keyword: query });
        } else {
            getNearby();
        }
    }, []);
    return (
        <View style={styles.landing}>
            {business.loadingSearch ? <Loading /> :
                <View style={{ flex: 1 }}>
                    <BusinessList businesses={business.searchBusinesses} navigation={navigation}></BusinessList>
                </View>
            }
        </View>
    );
};
const mapStateToProps = state => ({
    business: state.business
});
export default connect(mapStateToProps, { getNearby })(Searching);
