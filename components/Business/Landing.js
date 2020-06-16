import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, SafeAreaView, Text, TouchableWithoutFeedback, Animated, Alert, RefreshControl } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { styles, input } from '../Styles';
import { SearchBar } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getRegisteredBusinesses, getNearby, getAll, getGeoLocation, resetLocation, newSearch, getNomatimNearby, oldLocation, newLocation } from '../../actions/business';
import { updateUserRedux, locPermissionChange, updateReduxUser } from '../../actions/user';
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
import Outlines from '../../assets/Outlines';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import { LinearGradient } from 'expo-linear-gradient';

export const Landing = ({ getRegisteredBusinesses, getAll, business, newSearch, navigation, loadingAll, newLocation, oldLocation, firstTime, User, updateUserRedux, updateReduxUser, locPermissionChange }) => {
    let { dbBusinesses, businesses } = business;
    const [location, setLocation] = useState(null);
    const [locPermission, setLocPermission] = useState(false);
    const [userCoords, setUserCoords] = useState(null);
    const [search, updateSearch] = useState("");
    const [loc, updateLoc] = useState("");
    const [sorted, updateSorted] = useState(null);
    const [sorting, updateSorting] = useState(true);
    const [introModalVisible, setIntroVisible] = useState(firstTime);
    const [noLocation, setNoLocation] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    let searchRef = React.createRef();
    let user = User.user;

    useEffect(() => {
        async function getLocation() {
            console.log("Asking Location Permissions");
            let response = await Location.requestPermissionsAsync();
            if (response.granted) {
                locPermissionChange(true);
                setLocPermission(true);
                let location = await Location.getLastKnownPositionAsync();
                let coords = location.coords;
                setUserCoords(coords);
                setLocation(location);
                newLocation(coords);
            }
            else {
                locPermissionChange(false);
                console.log("Location permissions not granted.");
                setLocPermission(false);
                if (User.location.latitude === 0 && User.location.longitude === 0) {
                    setNoLocation(true);
                    Alert.alert("Please set your location through the Account page or share your location with Sizzle to see nearby locations. ");
                }
                else {
                    console.log('getting all with manual location');
                    getAll({ radius: 5000 }, User.location);
                }
            }
        }
        if (!User.loadingUser) {
            getLocation();
        }
    }, [User.loadingUser]);
    useEffect(() => {
        if (!loadingAll) {
            sort();
        }
    }, [business]);

    useEffect(() => {
        if (User.newLocationSet === true && User.loadingUser === false) {
            setNoLocation(false);
            oldLocation();
            getAll({ radius: 5000 }, User.location);
        }
    }, [User.newLocationSet]);

    //refreshing
    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    const refresh = async function () {
        console.log('refresh called');
        setRefreshing(true);
        console.log("Asking Location Permissions");
        let response = await Location.requestPermissionsAsync();
        if (response.granted) {
            locPermissionChange(true);
            setLocPermission(true);
            let location = await Location.getLastKnownPositionAsync();
            let coords = location.coords;
            setUserCoords(coords);
            setLocation(location);
            newLocation(coords);
        }
        else {
            locPermissionChange(false);
            console.log("Location permissions not granted.");
            setLocPermission(false);
            if (User.location.latitude === 0 && User.location.longitude === 0) {
                setNoLocation(true);
                Alert.alert("Please set your location through the Account page or share your location with Sizzle to see nearby locations. ");
            }
            else {
                console.log('getting all with manual location');
                getAll({ radius: 5000 }, { latitude: User.latitude, longitude: User.longitude });
            }
        }
        wait(2000).then(() => setRefreshing(false));
    };

    const sort = function () {
        let s = {
            food: [],
            grocery: [],
            supply: [],
            store: [],
            services: [],
            public: [],
            attraction: [],
            entertainment: [],
            recreation: [],
            travel: [],
            place_of_worship: [],
            health: [],
            other: [],
        };
        for (let k = 0; k < businesses.length; k++) {
            let placed = false;
            for (let i = 0; i < businesses[k].types.length; i++) {
                if (placed === false && (businesses[k].types[i] === 'restaurant' || businesses[k].types[i] === 'bakery' || businesses[k].types[i] === 'cafe' || businesses[k].types[i] === 'night_club' || businesses[k].types[i] === 'bar')) {
                    s.food.push({ business: businesses[k], db: dbBusinesses[k] });
                    placed = true;
                }
                else if (placed === false && (businesses[k].types[i] === 'supermarket' || businesses[k].types[i] === 'drugstore' || businesses[k].types[i] === 'convenience_store' || businesses[k].types[i] === 'liquor_store')) {
                    s.grocery.push({ business: businesses[k], db: dbBusinesses[k] });
                    placed = true;
                }
                else if (placed === false && (businesses[k].types[i] === 'bicycle_store' || businesses[k].types[i] === 'electronics_store' || businesses[k].types[i] === 'hardware_store' || businesses[k].types[i] === 'furniture_store' || businesses[k].types[i] === 'home_goods_store')) {
                    s.supply.push({ business: businesses[k], db: dbBusinesses[k] });
                    placed = true;
                }
                else if (placed === false && (businesses[k].types[i] === 'book_store' || businesses[k].types[i] === 'clothing_store' || businesses[k].types[i] === 'department_store' || businesses[k].types[i] === 'liquor_store' || businesses[k].types[i] === 'store' || businesses[k].types[i] === 'gas_station')) {
                    s.store.push({ business: businesses[k], db: dbBusinesses[k] });
                    placed = true;
                }
                else if (placed === false && (businesses[k].types[i] === 'car_dealer' || businesses[k].types[i] === 'car_rental' || businesses[k].types[i] === 'car_repair' || businesses[k].types[i] === 'car_wash' || businesses[k].types[i] === 'hair_care' || businesses[k].types[i] === 'lawyer' || businesses[k].types[i] === 'laundry' || businesses[k].types[i] === 'insurance_agency' || businesses[k].types[i] === 'locksmith' || businesses[k].types[i] === 'movie_rental' || businesses[k].types[i] === 'moving_company' || businesses[k].types[i] === 'painter' || businesses[k].types[i] === 'plumber' || businesses[k].types[i] === 'post_office' || businesses[k].types[i] === 'real_estate_agency' || businesses[k].types[i] === 'roofing_contractor' || businesses[k].types[i] === 'storage' || businesses[k].types[i] === 'travel_agency')) {
                    s.services.push({ business: businesses[k], db: dbBusinesses[k] });
                    placed = true;
                }
                else if (placed === false && (businesses[k].types[i] === 'city_hall' || businesses[k].types[i] === 'embassy' || businesses[k].types[i] === 'courthouse' || businesses[k].types[i] === 'fire_station' || businesses[k].types[i] === 'library' || businesses[k].types[i] === 'local_government_office' || businesses[k].types[i] === 'police')) {
                    s.public.push({ business: businesses[k], db: dbBusinesses[k] });
                    placed = true;
                }
                else if (placed === false && (businesses[k].types[i] === 'aquarium' || businesses[k].types[i] === 'art_gallery' || businesses[k].types[i] === 'museum' || businesses[k].types[i] === 'zoo' || businesses[k].types[i] === 'tourist_attraction')) {
                    s.attraction.push({ business: businesses[k], db: dbBusinesses[k] });
                    placed = true;
                }
                else if (placed === false && (businesses[k].types[i] === 'amusement_park' || businesses[k].types[i] === 'bowling_alley' || businesses[k].types[i] === 'casino')) {
                    s.entertainment.push({ business: businesses[k], db: dbBusinesses[k] });
                    placed = true;
                }
                else if (placed === false && (businesses[k].types[i] === 'airport' || businesses[k].types[i] === 'bus_station' || businesses[k].types[i] === 'light_rail_station' || businesses[k].types[i] === 'subway_station' || businesses[k].types[i] === 'taxi_stand' || businesses[k].types[i] === 'transit_station')) {
                    s.travel.push({ business: businesses[k], db: dbBusinesses[k] });
                    placed = true;
                }
                else if (placed === false && (businesses[k].types[i] === 'school' || businesses[k].types[i] === 'park' || businesses[k].types[i] === 'stadium')) {
                    s.recreation.push({ business: businesses[k], db: dbBusinesses[k] });
                    placed = true;
                }
                else if (placed === false && (businesses[k].types[i] === 'mosque' || businesses[k].types[i] === 'church' || businesses[k].types[i] === 'hindu_temple' || businesses[k].types[i] === 'synagogue')) {
                    s.place_of_worship.push({ business: businesses[k], db: dbBusinesses[k] });
                    placed = true;
                }
                else if (placed === false && (businesses[k].types[i] === 'dentist' || businesses[k].types[i] === 'doctor' || businesses[k].types[i] === 'gym' || businesses[k].types[i] === 'spa' || businesses[k].types[i] === 'veterinary_care' || businesses[k].types[i] === 'hospital')) {
                    s.health.push({ business: businesses[k], db: dbBusinesses[k] });
                    placed = true;
                }
                else if (i === businesses[k].types.length - 1 && placed === false) {
                    s.other.push({ business: businesses[k], db: dbBusinesses[k] });
                    placed = true;
                }
            }
        }
        updateSorted(s);
        updateSorting(false);
    };
    const query = function (input) {
        newSearch();
        if (User.location.latitude !== 0 && User.location.longitude !== 0) {
            navigation.navigate('Searching', { query: input, location: User.location });
        }
        else {
            Alert.alert("Please set your location to search.");
        }
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
                    <TouchableOpacity onPress={() => { setIntroVisible(false); }}>
                        <View style={{ height: 10, paddingTop: 25 }}></View>
                        <AntDesign name='downcircle' color='#ff9900' size={25} style={{ alignSelf: 'center' }}></AntDesign>
                    </TouchableOpacity>
                    <View style={{ height: Dimensions.get('window').height * 0.5 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <TouchableWithoutFeedback>
                                <View>
                                    <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
                                        <MaterialCommunityIcons name='map-marker-check' color='#ff9900' size={60} style={{ flex: 1 }} />
                                        <View style={{ flexDirection: 'column', flex: 4, paddingLeft: 10 }}>
                                            <Text style={{ fontSize: getFontSize(24), fontFamily: 'AvenirNext-Bold', color: '#ff9900' }}>Check-in</Text>
                                            <View style={{ paddingRight: 20 }}>
                                                <Text style={{ fontFamily: 'Avenir-Light', fontSize: getFontSize(18) }}>Track your travel history and help update our live population counters</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ paddingHorizontal: 15 }}>
                                        <View style={{ borderBottomColor: 'gainsboro', borderBottomWidth: 0.7 }}></View>
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

                                    <View style={{ paddingHorizontal: 15 }}>
                                        <View style={{ borderBottomColor: 'gainsboro', borderBottomWidth: 0.7 }}></View>
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

                                    <View style={{ paddingHorizontal: 15 }}>
                                        <View style={{ borderBottomColor: 'gainsboro', borderBottomWidth: 0.7 }}></View>
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
            {User.loadingUser ? <View style={{ backgroundColor: '#ff9900' }}><Outlines type="Header"></Outlines><View style={{ height: 12 }}></View><View style={{ alignSelf: 'center' }}><Outlines type="Search"></Outlines></View><View style={{ height: 12 }}></View></View> :
                <View>
                    <Header navigation={navigation}></Header>
                    <View style={{ alignItems: 'center', backgroundColor: '#ff9900' }}>
                        <SearchBar
                            placeholder="Search"
                            searchIcon={<EvilIcons name="search" size={getIconSize(18.5)} color='gray'></EvilIcons>}
                            onChangeText={(text) => updateSearch(text)}
                            defaultValue={search}
                            cancelButtonProps={{ disabled: true, buttonStyle: { width: 8 } }}
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
            <View>
                <LinearGradient
                    colors={['#ff9900', '#ff5f6d', '#ff5f6d']}
                >
                    {noLocation ? <View style={{ height: Dimensions.get('window').height, paddingHorizontal: 10 }}><Text style={{ fontFamily: 'Avenir-Light', paddingTop: 20 }}>No location found. Set your location through
                    the Account page or allow Sizzle to access your location by changing your device's settings.</Text></View> :
                        <View style={{height: Dimensions.get('window').height}}>
                            {loadingAll || sorting ? <LandingLoading/> :
                                <View>
                                    <Animated.ScrollView showsVerticalScrollIndicator={false}>
                                        <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={'white'} />
                                        <BusinessSideScroll key={2} businesses={sorted.grocery} category={'Groceries'} navigation={navigation}></BusinessSideScroll>
                                        <BusinessSideScroll key={3} businesses={sorted.supply} category={'Supplies'} navigation={navigation}></BusinessSideScroll>
                                        <BusinessSideScroll key={4} businesses={sorted.store} category={'Stores'} navigation={navigation}></BusinessSideScroll>
                                        <BusinessSideScroll key={1} businesses={sorted.food} category={'Restaurants, Cafes, and Bars'} navigation={navigation}></BusinessSideScroll>
                                        <BusinessSideScroll key={6} businesses={sorted.public} category={'Public'} navigation={navigation}></BusinessSideScroll>
                                        <BusinessSideScroll key={5} businesses={sorted.services} category={'Services'} navigation={navigation}></BusinessSideScroll>
                                        <BusinessSideScroll key={7} businesses={sorted.attraction} category={'Attractions'} navigation={navigation}></BusinessSideScroll>
                                        <BusinessSideScroll key={8} businesses={sorted.entertainment} category={'Entertainment'} navigation={navigation}></BusinessSideScroll>
                                        <BusinessSideScroll key={9} businesses={sorted.recreation} category={'Recreation'} navigation={navigation}></BusinessSideScroll>
                                        <BusinessSideScroll key={10} businesses={sorted.travel} category={'Travel'} navigation={navigation}></BusinessSideScroll>
                                        <BusinessSideScroll key={11} businesses={sorted.place_of_worship} category={'Places of Worship'} navigation={navigation}></BusinessSideScroll>
                                        <BusinessSideScroll key={12} businesses={sorted.health} category={'Health'} navigation={navigation}></BusinessSideScroll>
                                        <BusinessSideScroll key={13} businesses={sorted.other} category={'Other'} navigation={navigation}></BusinessSideScroll>
                                        <Text style={{ padding: 85, backgroundColor: 'transparent' }}></Text>
                                    </Animated.ScrollView>
                                </View>
                            }
                        </View>}
                </LinearGradient>
            </View>
        </View>
    );
};
const mapStateToProps = state => ({
    business: state.business,
    loadingAll: state.business.loadingAll,
    firstTime: state.auth.firstTime,
    User: state.user
});

export default connect(mapStateToProps, { getRegisteredBusinesses, getAll, newSearch, getNomatimNearby, oldLocation, updateUserRedux, newLocation, locPermissionChange, updateReduxUser })(Landing);