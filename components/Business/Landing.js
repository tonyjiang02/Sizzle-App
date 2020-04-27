import React, { useState, useEffect } from 'react';
import { View, TextInput, SafeAreaView, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { styles } from '../Styles';
import { SearchBar } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getRegisteredBusinesses, getNearby, getAll } from '../../actions/business';
import Loading from '../layout/Loading';
import BusinessList from './BusinessList';
import BusinessSideScroll from './BusinessSideScroll';
import Header from '../layout/Header';
import { ScrollView } from 'react-native-gesture-handler';
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
        updateSorting(false);
    };
    const query = function (input) {
        navigation.navigate('Searching', { query: input });
    };
    return (
        <View style={styles.landing}>
            {loadingAll || sorting ? <Loading /> :
                <View> 
                    <Header></Header>
                    <SearchBar
                        placeholder="Search"
                        onChangeText={(text) => updateSearch(text)}
                        defaultValue={search}
                        value={search}
                        platform="ios"
                        containerStyle={{backgroundColor: "white" }}
                        inputContainerStyle={{backgroundColor: "white", height: 30}}
                        cancelButtonTitle={"X       "}
                        cancelButtonProps={{color: '#bdbdbd'}}
                        returnKeyType="search"
                        onSubmitEditing={(e) => query(e.nativeEvent.text)}
                    />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <BusinessSideScroll businesses={sorted.cafe} category={'Featured'}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.cafe} category={'Nearby'}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.cafe} category={'Groceries'}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.cafe} category={'Restaurants'}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.cafe} category={'Home Essentials'}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.cafe} category={'Public'}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.cafe} category={'Shops'}></BusinessSideScroll>
                        <Text style={{padding: 70}}></Text>
                    </ScrollView>
                </View>
            }
        </View>
    );
};
const mapStateToProps = state => ({
    business: state.business
});

export default connect(mapStateToProps, { getRegisteredBusinesses, getAll })(Landing);