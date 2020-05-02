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
import * as Location from 'expo-location';
export const Landing = ({ getRegisteredBusinesses, getAll, navigation, businesses, loadingAll, dbBusinesses }) => {
    const [location, setLocation] = useState(null);
    const [search, updateSearch] = useState("");
    const [sorted, updateSorted] = useState(null);
    const [sorting, updateSorting] = useState(true);
    useEffect(() => {
        async function getLocation() {
            console.log("Asking Location Permissions");
            let response = await Location.requestPermissionsAsync();
            if (response.granted) {
                let location = await Location.getLastKnownPositionAsync();
                setLocation(location);
                getAll({ radius: 2000 }, location.coords);
            } else {
                console.log("Location permissions not granted.");
            }
        }
        getLocation();
    }, []);
    useEffect(() => {
        if (!loadingAll) {
            sort();
        }
    }, [businesses, loadingAll, dbBusinesses]);
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
            let placed = false;
            for (let i = 0; i < businesses[k].types.length; i++) {
                if (s[businesses[k].types[i]]) {
                    placed = true;
                    s[businesses[k].types[i]].push({ business: businesses[k], db: dbBusinesses[k] });
                } else {
                    if (!placed) s.other.push({ business: businesses[k], db: dbBusinesses[k] });
                    placed = true;
                }
            }
        }
        updateSorted(s);
        updateSorting(false);
    };
    const query = function (input) {
        navigation.navigate('Searching', { query: input, location: location });
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
                        containerStyle={{ backgroundColor: "white" }}
                        inputContainerStyle={{ backgroundColor: "white", height: 30 }}
                        cancelButtonTitle={"X       "}
                        cancelButtonProps={{ color: '#bdbdbd' }}
                        returnKeyType="search"
                        onSubmitEditing={(e) => query(e.nativeEvent.text)}
                    />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <BusinessSideScroll businesses={sorted.restaurant} category={'Restaurant'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.cafe} category={'Cafe'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.park} category={'Park'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.tourist_attraction} category={'Attractions'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.place_of_worship} category={'Places of Worship'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.health} category={'Health'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.other} category={'Other'} navigation={navigation}></BusinessSideScroll>
                        <Text style={{ padding: 70 }}></Text>
                    </ScrollView>
                </View>
            }
        </View>
    );
};
const mapStateToProps = state => ({
    dbBusinesses: state.business.dbBusinesses,
    businesses: state.business.businesses,
    loadingAll: state.business.loadingAll
});

export default connect(mapStateToProps, { getRegisteredBusinesses, getAll })(Landing);