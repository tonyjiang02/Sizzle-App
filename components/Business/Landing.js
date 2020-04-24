import React, { useState, useEffect } from 'react';
import { View, TextInput, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { styles } from '../Styles';
import { SearchBar } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getRegisteredBusinesses, getNearby, getAll } from '../../actions/business';
import Loading from '../layout/Loading';
import BusinessList from './BusinessList';
import BusinessSideScroll from './BusinessSideScroll';
export const Landing = ({ getRegisteredBusinesses, getAll, navigation, business: { businesses, loadingAll, dbBusinesses } }) => {
    const [search, updateSearch] = useState("");
    const [sorted, updateSorted] = useState(null);
    const [sorting, updateSorting] = useState(true);
    useEffect(() => {
        getAll({ radius: 2000 });
    }, []);
    useEffect(() => {
        if (!loadingAll) {
            sort();
        }
    }, [businesses, loadingAll, dbBusinesses]);
    // useEffect(() => {
    //     console.log('business length ' + businesses.length);
    //     sort();
    // }, [businesses, loadingAll, dbBusinesses]);

    const sort = function () {
        let s = {
            restaurant: [],
            cafe: [],
            park: [],
            tourist_attraction: [],
            place_of_worship: [],
            health: [],
            other: [],
        };
        console.log('sorting');
        for (let k = 0; k < businesses.length; k++) {
            for (let i = 0; i < businesses[k].types.length; i++) {
                if (s[businesses[k].types[i]]) {
                    s[businesses[k].types[i]].push({ business: businesses[k], db: dbBusinesses[k] });
                } else {
                    s.other.push({ business: businesses[k], db: dbBusinesses[k] });
                }
            }
        }
        updateSorted(s);
        console.log(s.cafe);
        updateSorting(false);
    };
    const query = function (input) {
        navigation.navigate('Searching', { query: input });
    };
    return (
        <View style={styles.landing}>
            {loadingAll || sorting ? <Loading /> :
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
                    <BusinessSideScroll businesses={sorted.cafe}></BusinessSideScroll>
                </View>
            }
        </View>
    );
};
const mapStateToProps = state => ({
    business: state.business
});

export default connect(mapStateToProps, { getRegisteredBusinesses, getAll })(Landing);