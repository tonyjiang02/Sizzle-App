import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, SafeAreaView, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import Modal from 'react-native-modal';
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
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import BusinessCard from './BusinessCard';
export const Landing = ({ getRegisteredBusinesses, getAll, navigation, businesses, loadingAll, dbBusinesses }) => {
    const [location, setLocation] = useState(null);
    const [search, updateSearch] = useState("");
    const [sorted, updateSorted] = useState(null);
    const [sorting, updateSorting] = useState(true);
    
    let searchRef = React.createRef();
    
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
                    <Header navigation={navigation}></Header>
                    <SearchBar
                        placeholder="Search"
                        onChangeText={(text) => updateSearch(text)} 
                        defaultValue={search}
                        value={search}
                        platform={"ios"}
                        containerStyle={{backgroundColor: 'transparent',
                        paddingVertical: 5, 
                        paddingHorizontal: 5,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3}}
                        inputContainerStyle={{backgroundColor: 'white', borderRadius: 6, height: 50}}
                        returnKeyType="search"
                        onSubmitEditing={(e) => query(e.nativeEvent.text)}
                    />
                    <View style={{borderBottomColor: 'gainsboro', borderBottomWidth: 0.7 }}></View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <BusinessSideScroll businesses={sorted.restaurant} category={'Restaurants'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.cafe} category={'Cafes'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.park} category={'Parks'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.tourist_attraction} category={'Attractions'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.place_of_worship} category={'Places of Worship'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.health} category={'Health'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.other} category={'Other'} navigation={navigation}></BusinessSideScroll>
                        <Text style={{ padding: 85, backgroundColor: '#f2f2f2' }}></Text>
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