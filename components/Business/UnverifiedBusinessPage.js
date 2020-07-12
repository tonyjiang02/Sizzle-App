/*
1. Business Title w Image background
    Underneath should show business distance, population, Address, Currently Open/Closed, Buttons:
        [Take me there], [Label as Favorite], [Check-in], [Notify me (when population is less than certain number)], 
2. Live updates 
    Scrollview that shows all live updates in reverse chronological order, each live update only shows header, desc. truncated, and images truncated, can expand for more info. 
3. Reserve time-slot (only if business is registered)
    Different time slots with availability for each
    Button to register
4. Business description
    Text desc., hours of operation, goods and services list (shows what is in and out of stock, on sale)
    Contact desc. 
5. Population Graph Display

FUTURE INTEGRATIONS:
    Live posts from restaurant itself or users, like ig stories but for businesses
*/

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Image, Text, ImageBackground, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from '../Styles';
import { Button } from 'react-native-elements';
import { createError } from '../../actions/auth';
import { checkIn, getBusiness, checkInWithName } from '../../actions/business';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import LiveUpdate from '../Business/LiveUpdate';
import ReservationScroll from './ReservationScroll';
import { Linking } from 'expo';
import { straightLineDistance, kmToMi } from '../../utils/businessUtils';
import MapView, { Marker } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import { textTruncateBySpace, textTruncateBySpaceTwo } from '../../utils/TextTruncate';
import { updateUser, updateUserWithoutReturn } from '../../actions/user';
import { updateBusinessReservations, getAdditionalData } from '../../actions/business';
import * as Location from 'expo-location';

const UnverifiedBusinessPage = ({ route: { params: { business, db, navigation } }, checkIn, updateUser, updateUserWithoutReturn, User, updateBusinessReservations, dbBusiness, checkInWithName, createError }) => {
    //destructuring
    let { name, vicinity, geometry, place_id } = business;
    let { _id, googleId, isVerified, population } = dbBusiness;
    let location = geometry.location;
    let user = User.user;
    let updated = false;
    const [addData, setAddData] = useState({
        websiteURL: 'Not available',
        hours: { mon: 'Not available', tue: 'Not available', wed: 'Not available', thu: 'Not available', fri: 'Not available', sat: 'Not available', sun: 'Not available' },
        phoneNumber: 'Not available'
    });

    //modals
    const [livePopulation, setLivePopulation] = useState(population);
    //backend
    const onPressCheckIn = async () => {
        let response = await Location.requestPermissionsAsync();
        if (response.granted) {
            let location = await Location.getLastKnownPositionAsync();
            var mi = kmToMi(straightLineDistance(location.coords, { latitude: parseFloat(business.geometry.location.lat), longitude: parseFloat(business.geometry.location.lng) }));
            if (mi < 0.2) {
                const biz = await checkInWithName(_id, name);
                if (biz) {
                    setLivePopulation(biz.population);
                }
            }
            else {
                createError("Your current location is too far from this location.", "error");
            }
        }
        else {
            createError("You must share your location to check-in through a business page. Otherwise, please check in through QR code", 'warn');
        }
    };
    const refresh = () => {
        getBusiness(business.place_id, db._id);
    };
    useEffect(() => {
        getDistance();
        async function getMoreData() {
            const res = await getAdditionalData(place_id);
            let w = "Unavailable";
            let p = "Unavailable";
            if (typeof res.website !== 'undefined' && typeof res.website !== 'null') {
                w = res.website;
            }
            if (typeof res.formatted_phone_number !== 'undefined' && typeof res.formatted_phone_number !== 'null') {
                p = res.formatted_phone_number;
            }
            setAddData({
                websiteURL: w,
                hours: {
                    mon: res.opening_hours.weekday_text[0],
                    tue: res.opening_hours.weekday_text[1],
                    wed: res.opening_hours.weekday_text[2],
                    thu: res.opening_hours.weekday_text[3],
                    fri: res.opening_hours.weekday_text[4],
                    sat: res.opening_hours.weekday_text[5],
                    sun: res.opening_hours.weekday_text[6],
                },
                phoneNumber: p
            });
        };
        getMoreData();
        return function cleanup() {
            if (updated) {
                console.log("updating user");
                updateUser(user);
            }
        };
    }, []);


    //business verification
    let verified = <View></View>;
    if (isVerified === true) {
        verified = <MaterialIcons name='verified-user' color='lightgreen' size={getIconSize(20)}></MaterialIcons>;
    }
    // const getMoreData = async () => {
    //     const res = await getAdditionalData(place_id);
    //     console.log(res);
    //     console.log(res.opening_hours.weekday_text);
    //     setAddData({
    //         ...addData,
    //         websiteURL: res.website,
    //         hours: res.opening_hours.weekday_text,
    //         phoneNumber: res.formatted_phone_number
    //     });
    //     console.log(addData.hours);
    // };
    //distance 
    let [lineDistance, setLineDistance] = useState(null);
    const getDistance = () => {
        var mi = kmToMi(straightLineDistance(User.location, { latitude: parseFloat(business.geometry.location.lat), longitude: parseFloat(business.geometry.location.lng) }));
        var rounded = Math.round(mi * 10) / 10;
        setLineDistance(rounded + 'mi');
    };

    //phone number
    let phoneNumberURL = 'tel:' + addData.phoneNumber;

    //website
    const createWebAlert = () =>
        Alert.alert(
            'Do you want to open the website for ' + business.name + '?',
            '',
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => Linking.openURL(addData.websiteURL) }
            ],
            { cancelable: false }
        );
    //map
    const openMapToBusiness = () => {
        Alert.alert(
            'Route to ' + name + '?',
            '',
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => openMap({ end: name + " " + vicinity, start: "Current Location", travelType: 'drive' }) }
            ],
            { cancelable: false }
        );
    };

    //population display
    let popDisplay = <Text></Text>;
    if (livePopulation < 10) {
        popDisplay = <Text style={{ paddingLeft: 3, alignSelf: 'center', color: 'green', fontSize: getFontSize(22), fontWeight: 'bold' }}>{livePopulation}</Text>;
    }
    else if (livePopulation >= 10 && livePopulation < 50) {
        popDisplay = <Text style={{ paddingLeft: 3, alignSelf: 'center', color: 'orange', fontSize: getFontSize(22), fontWeight: 'bold' }}>{livePopulation}</Text>;
    }
    else if (livePopulation >= 50) {
        popDisplay = <Text style={{ paddingLeft: 3, alignSelf: 'center', color: 'red', fontSize: getFontSize(22), fontWeight: 'bold' }}>{livePopulation}</Text>;
    }
    else {
        popDisplay = <Text style={{ paddingLeft: 3, alignSelf: 'center', color: 'gray', fontSize: getFontSize(22), fontWeight: 'bold' }}>{livePopulation}</Text>;
    }

    //open display
    let openStatus = 0;
    try {
        if (business.opening_hours.open_now === false) {
            openStatus = 0;
        }
        else if (business.opening_hours.open_now === true) {
            openStatus = 1;
        }
    }
    catch (err) {
        openStatus = 2;
    }
    let openDisplay = <Text></Text>;
    if (openStatus === 1) {
        openDisplay = <Text style={{
            paddingHorizontal: 5, alignSelf: 'center', color: 'white', fontSize: getFontSize(16),
            borderColor: 'green', borderWidth: 1, padding: 2, backgroundColor: 'green'
        }}>Open</Text>;
    }
    else if (openStatus === 0) {
        openDisplay = <Text style={{
            paddingHorizontal: 5, alignSelf: 'center', color: 'white', fontSize: getFontSize(16),
            borderColor: 'red', borderWidth: 1, padding: 2, backgroundColor: 'red'
        }}>Closed</Text>;
    }
    else if (openStatus === 2) {
        openDisplay = <Text style={{
            paddingHorizontal: 5, alignSelf: 'center', color: 'white', fontSize: getFontSize(16),
            borderColor: 'gray', borderWidth: 1, padding: 2, backgroundColor: 'gray'
        }}>Unknown</Text>;
    }

    return (
        <View style={{flex: 1, backgroundColor: 'azure'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    borderBottomColor: 'transparent', borderTopColor: 'transparent',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 7,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 9.51,
                    elevation: 15,
                }}>
                    <View>
                        <LinearGradient
                            colors={['#ff9900', '#ff5f6d']} style={{ height: 240 }}
                        >
                            <View style={{position: 'absolute', top: 50, left: 20, alignItems: 'baseline'}}>
                                <TouchableOpacity onPress={()=> navigation.goBack()}>
                                    <AntDesign name="leftcircle" color='white' size={getIconSize(20)}></AntDesign>
                                </TouchableOpacity>
                            </View>
                            <View style={{ position: 'absolute', bottom: 40, alignItems: 'baseline' }}>
                                <Text style={{ color: 'white', fontSize: getFontSize(30), fontWeight: 'bold', paddingLeft: 20, paddingRight: 10 }}>{business.name.length > 40 ? textTruncateBySpaceTwo(37, business.name) : business.name}</Text>
                                <View style={{ paddingLeft: 20, paddingTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ borderRadius: 5, borderColor: 'white', color: 'white', borderWidth: 1, padding: 3, fontSize: getFontSize(16) }}>
                                        {lineDistance}
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                        <Ionicons name='md-person' color='white' size={getIconSize(19)} />
                                        {popDisplay}
                                    </View>
                                    <View style={{ paddingLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                                        {openDisplay}
                                    </View>
                                    <View style={{ paddingLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                                        {verified}
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>

                    <View style={{
                        flexDirection: 'row', alignItems: 'flex-end', backgroundColor: 'azure',
                        paddingVertical: 6,
                    }}>
                        <TouchableOpacity onPress={openMapToBusiness} style={{ alignItems: 'center', flex: 1 }}>
                            <MaterialCommunityIcons name='directions' color='royalblue' size={getIconSize(21)} />
                            <Text style={{ color: 'black', fontFamily: "Avenir-Light" }}>Directions</Text>
                        </TouchableOpacity>
                        {user.occupying.id !== _id ?
                            <TouchableOpacity onPress={onPressCheckIn} style={{ alignItems: 'center', flex: 1 }}>
                                <MaterialCommunityIcons name='map-marker-check' color='#ff9900' size={getIconSize(22)} />
                                <Text style={{ color: '#ff9900', fontFamily: 'Avenir-Light', fontWeight: 'bold' }}>Check In</Text>
                            </TouchableOpacity>
                            :
                            <View style={{ alignItems: 'center', flex: 1 }}>
                                <MaterialCommunityIcons name='map-marker-check' color='#00c707' size={getIconSize(22)} />
                                <Text style={{ color: '#00c707', fontFamily: 'Avenir-Light', fontWeight: 'bold' }}>Checked In</Text>
                            </View>
                        }
                        <TouchableOpacity onPress={() => { Linking.openURL(phoneNumberURL); }} style={{ alignItems: 'center', flex: 1 }}>
                            <MaterialIcons name='phone' color='royalblue' size={getIconSize(20)} style={{ paddingBottom: 5 }} />
                            <Text style={{ color: 'black', fontFamily: 'Avenir-Light' }}>Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 25, backgroundColor: 'azure' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline' }}>
                        <Text style={{ color: 'royalblue', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingTop: 5, paddingRight: 10, paddingBottom: 10 }}>Information</Text>
                    </View>

                    <View style={styles.infoOuterBlock}>
                        <TouchableOpacity onPress={() => { Linking.openURL(phoneNumberURL); }} style={styles.infoInnerBlock}>
                            <MaterialIcons name='phone' color='royalblue' size={getIconSize(18)} />
                            <Text style={{ paddingLeft: 10, fontFamily: 'Avenir-Light', fontSize: getFontSize(17), fontWeight: 'bold' }}>{addData.phoneNumber}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoOuterBlock}>
                        <TouchableOpacity onPress={createWebAlert} style={styles.infoInnerBlock}>
                            <MaterialIcons name='web' color='royalblue' size={getIconSize(18)} />
                            <Text style={{ paddingLeft: 10, fontFamily: 'Avenir-Light', fontSize: getFontSize(17), fontWeight: 'bold' }}>{addData.websiteURL.length > 30 ? textTruncateBySpaceTwo(30, addData.websiteURL) : addData.websiteURL}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{shadowColor: "#000", shadowOffset: {width: 0,height: 2},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5}}>
                        <View style={styles.mapOuterStyle}>
                            <MapView style={styles.mapStyle} showsUserLocation={true} initialRegion={{
                                latitude: (location.lat + User.location.latitude) / 2,
                                longitude: (location.lng + User.location.longitude) / 2,
                                latitudeDelta: Math.abs(location.lat - User.location.latitude) * 1.75,
                                longitudeDelta: Math.abs(location.lng - User.location.longitude) * 1.75,
                            }}>
                                <Marker
                                    coordinate={{ latitude: parseFloat(location.lat), longitude: parseFloat(location.lng) }}
                                    title={name}
                                />
                            </MapView>
                            <View style={{ paddingHorizontal: 15, alignSelf: 'flex-start' }}>
                                <Text style={{ fontFamily: 'Avenir-Light', fontSize: getFontSize(17), fontWeight: 'bold', paddingTop: 10 }}>Address: {vicinity} </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column', flex: 1, paddingLeft: 15, paddingVertical: 20 }}>
                                    <Text style={{ fontFamily: 'Avenir-Light', fontSize: getFontSize(17), fontWeight: 'bold' }}>Distance: {lineDistance} </Text>
                                </View>
                                <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={openMapToBusiness}>
                                        <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#ff9900', backgroundColor: '#ff9900', paddingVertical: 12, paddingHorizontal: 8 }}>
                                            <Text style={{ fontFamily: 'Avenir-Light', fontSize: getFontSize(17), fontWeight: 'bold', color: 'white' }}>Take Me There</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'flex-start', flex: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 3 }}>
                            <AntDesign name='clockcircle' color='royalblue' size={getIconSize(18)} />
                            <Text style={{ paddingLeft: 5, paddingRight: 15, color: 'royalblue', fontFamily: 'Avenir-Light' }}>Hours </Text>
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 8 }}>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(15), paddingVertical: 3 }}>{addData.hours.mon}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(15), paddingVertical: 3 }}>{addData.hours.tue}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(15), paddingVertical: 3 }}>{addData.hours.wed}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(15), paddingVertical: 3 }}>{addData.hours.thu}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(15), paddingVertical: 3 }}>{addData.hours.fri}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(15), paddingVertical: 3 }}>{addData.hours.sat}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(15), paddingVertical: 3 }}>{addData.hours.sun}</Text>
                        </View>
                    </View>
                </View>
                <View style={{height: 100}}></View>
            </ScrollView>
        </View>
    );
};
const mapStateToProps = state => ({
    dbBusiness: state.business.dbBusiness,
    auth: state.auth,
    User: state.user
});
export default connect(mapStateToProps, { checkIn, updateUser, updateBusinessReservations, updateUserWithoutReturn, checkInWithName, createError })(UnverifiedBusinessPage);
