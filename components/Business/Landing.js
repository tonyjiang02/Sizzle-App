import React, { useState, useEffect } from 'react';
import { View, TextInput, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { styles } from '../Styles';
import { SearchBar } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getRegisteredBusinesses } from '../../actions/business';
import Loading from '../layout/Loading';
import BusinessList from './BusinessList';
import BusinessSideScroll from './BusinessSideScroll';
export const Landing = ({ getRegisteredBusinesses, navigation, business: { businesses, loadingAll } }) => {
    [search, updateSearch] = useState("");
    useEffect(() => {
        getRegisteredBusinesses();
    }, []);
    const query = function (input) {
        navigation.navigate('Searching', { query: input });
    };
    return (
        <View style={styles.landing}>
            {loadingAll ? <Loading /> :
                <View>
                    <SearchBar
                        placeholder="Search"
                        onChangeText={(text) => updateSearch(text)}
                        defaultValue={search}
                        value={search}
                        platform="ios"
                        containerStyle={{ paddingTop: getStatusBarHeight() }}
                        returnKeyType="search"
                        onSubmitEditing={(e) => query(e.nativeEvent.text)}
                    />
                    <BusinessSideScroll></BusinessSideScroll>
                    <BusinessSideScroll></BusinessSideScroll>
                    <BusinessSideScroll></BusinessSideScroll>
                </View>
            }
        </View>
    );
};
const mapStateToProps = state => ({
    business: state.business
});

export default connect(mapStateToProps, { getRegisteredBusinesses })(Landing);