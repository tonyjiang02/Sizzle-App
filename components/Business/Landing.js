import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, SafeAreaView, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { styles, input } from '../Styles';
import { SearchBar } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getRegisteredBusinesses, getNearby, getAll, getGeoLocation, resetLocation, newSearch, getNomatimNearby } from '../../actions/business';
import Loading from '../layout/Loading';
import LandingLoading from '../layout/LandingLoading';
import BusinessList from './BusinessList';
import BusinessSideScroll from './BusinessSideScroll';
import Header from '../layout/Header';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons, EvilIcons } from '@expo/vector-icons';
import BusinessCard from './BusinessCard';
import { Dimensions } from 'react-native';
import { getFontSize, getIconSize } from '../../utils/fontsizes';

export const Landing = ({ getRegisteredBusinesses, getAll, newSearch, navigation, businesses, loadingAll, dbBusinesses, firstTime, User }) => { 
    const [location, setLocation] = useState(null);
    const [locPermission, setLocPermission] = useState(false);
    const [userCoords, setUserCoords] = useState(null);
    const [search, updateSearch] = useState("");
    const [loc, updateLoc] = useState("");
    const [sorted, updateSorted] = useState(null);
    const [sorting, updateSorting] = useState(true);
    const [introModalVisible, setIntroVisible] = useState(firstTime);

    let searchRef = React.createRef();

    useEffect(() => {
        async function getLocation() {
            console.log("Asking Location Permissions");
            let response = await Location.requestPermissionsAsync();
            if (response.granted) {
                setLocPermission(true);
                let location = await Location.getLastKnownPositionAsync();
                let coords = location.coords;
                setUserCoords(coords);
                setLocation(location);
                User.user.location.latitude = coords.latitude;
                User.user.location.longitude = coords.longitude;
                getAll({ radius: 2000 }, location.coords);
            } 
            else {
                console.log("Location permissions not granted.");
                setLocPermission(false);
                getAll({ radius: 2000 }, User.user.location);
            }
        }
        if (!User.loadingUser){
            getLocation();
        }
    }, [User.loadingUser]);
    useEffect(() => {
        if (!loadingAll) {
            sort();
        }
        if (loadingAll===true && User.loadingUser===false){
            getAll({ radius: 2000 }, User.user.location);
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
        newSearch();
        navigation.navigate('Searching', { query: input, location: userCoords });
    };

    return (
        <View style={styles.landing}>
            <Modal
                propagateSwipe={true}
                isVisible={introModalVisible}
                coverScreen={false}
                backdropColor={"white"}
                backdropOpacity={0.8}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                animationInTiming={500}
                swipeDirection={['down']}
                onSwipeComplete={(e) => { if (e.swipingDirection === 'down') setIntroVisible(false); }}
            >
                <View style={styles.introModalView}>
                    <TouchableOpacity onPress={() => { setIntroVisible(false) }}>
                        <View style={{ height: 10, paddingTop: 25 }}></View>
                        <AntDesign name='downcircle' color='#ff9900' size={25} style={{ alignSelf: 'center' }}></AntDesign>
                    </TouchableOpacity>
                    <View style={{ height: Dimensions.get('window').height*0.5}}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <TouchableWithoutFeedback>
                                <View>
                                    <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
                                        <MaterialCommunityIcons name='map-marker-check' color='#ff9900' size={60} style={{ flex: 1 }} />
                                        <View style={{ flexDirection: 'column', flex: 4, paddingLeft: 10 }}>
                                            <Text style={{ fontSize: getFontSize(24), fontFamily: 'AvenirNext-Bold', color: '#ff9900' }}>Check-in</Text>
                                            <View style={{ paddingRight: 20 }}>
                                                <Text style={{ fontFamily: 'Avenir-Light', fontSize: getFontSize(18)}}>Track your travel history and help update our live population counters</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{paddingHorizontal: 15}}>
                                        <View style={{borderBottomColor: 'gainsboro', borderBottomWidth: 0.7}}></View>
                                    </View>
                                    
                                    <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
                                        <View style={{ flexDirection: 'column', flex: 1 }}>
                                            <Ionicons name='md-person' color='black' size={50} style={{ alignSelf: 'center' }} />
                                        </View>
                                        <View style={{ flexDirection: 'column', flex: 4, paddingLeft: 10 }}>
                                            <Text style={{ fontSize: getFontSize(24), fontFamily: 'AvenirNext-Bold', color: 'black' }}>Population</Text>
                                            <View style={{ paddingRight: 20 }}>
                                                <Text style={{ fontFamily: 'Avenir-Light', fontSize: getFontSize(18) }}>View the current number of checked in users at any location</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{paddingHorizontal: 15}}>
                                        <View style={{borderBottomColor: 'gainsboro', borderBottomWidth: 0.7}}></View>
                                    </View>

                                    <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
                                        <View style={{ flexDirection: 'column', flex: 1 }}>
                                            <MaterialIcons name='verified-user' color='lightgreen' size={50} style={{ alignSelf: 'center', paddingTop: 5 }}></MaterialIcons>
                                        </View>
                                        <View style={{ flexDirection: 'column', flex: 4, paddingLeft: 10 }}>
                                            <Text style={{ fontSize: getFontSize(24), fontFamily: 'AvenirNext-Bold', color: 'lightgreen' }}>Verified</Text>
                                            <View style={{ paddingRight: 20 }}>
                                                <Text style={{ fontFamily: 'Avenir-Light', fontSize: getFontSize(18) }}>Check for live updates and make reservations at verified businesses</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{paddingHorizontal: 15}}>
                                        <View style={{borderBottomColor: 'gainsboro', borderBottomWidth: 0.7}}></View>
                                    </View>

                                    <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
                                        <View style={{ flexDirection: 'column', flex: 1 }}>
                                            <MaterialIcons name='people' color='violet' size={50} style={{ alignSelf: 'center', paddingTop: 5 }}></MaterialIcons>
                                        </View>
                                        <View style={{ flexDirection: 'column', flex: 4, paddingLeft: 10 }}>
                                            <Text style={{ fontSize: getFontSize(24), fontFamily: 'AvenirNext-Bold', color: 'violet' }}>Voluntary Contact Tracing</Text>
                                            <View style={{ paddingRight: 20 }}>
                                                <Text style={{ fontFamily: 'Avenir-Light', fontSize: getFontSize(18) }}>Coming early June 2020. Read FAQ for more details.</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            {User.loadingUser ? <View><Outlines type="Header"></Outlines><Outlines type="Search"></Outlines></View> : 
            <View>
                <Header navigation={navigation}></Header>
                <View style={{alignItems: 'center', backgroundColor: '#ff9900'}}>
                    <SearchBar
                        placeholder="Search"
                        searchIcon={<EvilIcons name="search" size={getIconSize(18.5) } color='gray'></EvilIcons>}
                        onChangeText={(text) => updateSearch(text)}
                        defaultValue={search}
                        cancelButtonProps={{disabled: true, buttonStyle: {width: 8}}}
                        value={search}
                        platform={"ios"}
                        containerStyle={{
                            paddingTop: 10,
                            backgroundColor: 'transparent',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 0.5,
                            },
                            shadowOpacity: 0.4,
                            shadowRadius: 1.22,
                            elevation: 1,
                        }}
                        inputContainerStyle={{ backgroundColor: 'white', borderRadius: 5, height: 45 }}
                        returnKeyType="search"
                        onSubmitEditing={(e) => query(e.nativeEvent.text)}
                    />
                </View>
            </View>
            }
            <View style={{ borderBottomColor: 'gainsboro', borderBottomWidth: 0.7 }}></View>
            {loadingAll || sorting ? <LandingLoading /> :
                <View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <BusinessSideScroll businesses={sorted.restaurant} category={'Restaurants'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.cafe} category={'Cafes'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.park} category={'Parks'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.tourist_attraction} category={'Attractions'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.place_of_worship} category={'Places of Worship'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.health} category={'Health'} navigation={navigation}></BusinessSideScroll>
                        <BusinessSideScroll businesses={sorted.other} category={'Other'} navigation={navigation}></BusinessSideScroll>
                        <Text style={{ padding: 85, backgroundColor: '#f2f2f2' }}></Text>
                        <View style={{height: 50}}></View>
                    </ScrollView>
                </View>
            }
        </View>
    );
};
const mapStateToProps = state => ({
    dbBusinesses: state.business.dbBusinesses,
    businesses: state.business.businesses,
    loadingAll: state.business.loadingAll,
    firstTime: state.auth.firstTime,
    User: state.user
});

export default connect(mapStateToProps, { getRegisteredBusinesses, getAll, newSearch, getNomatimNearby })(Landing);