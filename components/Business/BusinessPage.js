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
import { View, ScrollView, Image, Text, ImageBackground, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Alert, RefreshControl, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from '../Styles';
import { Button } from 'react-native-elements';
import { checkIn, getBusiness } from '../../actions/business';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import LiveUpdate from '../Business/LiveUpdate';
import ReservationScroll from './ReservationScroll';
import ReservationScrollModal from './ReservationScrollModal';
import { Linking } from 'expo';
import { straightLineDistance, kmToMi } from '../../utils/businessUtils';
import MapView, { Marker } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import { createError } from '../../actions/auth';
import { updateUser, updateUserWithoutReturn } from '../../actions/user';
import { updateBusinessReservations } from '../../actions/business';
import {textTruncateBySpaceTwo} from '../../utils/TextTruncate';
import * as Location from 'expo-location';
import MenuItem from './Pickup/MenuItem';

const BusinessPage = ({ route: { params: { business, db, navigation } }, checkIn, auth, updateUser, User, getBusiness, updateBusinessReservations, dbBusiness, updateUserWithoutReturn, createError }) => {
    //destructuring
    let { vicinity, geometry } = business;
    const [data, setData] = useState(dbBusiness);
    let { _id, name, owner, googleId, publicId, isVerified, images, coverImageUrl, website, phone, address, openStatus, hours, description, population, reservations, announcements, reservationLimit, covid19Information } = data;
    let location = geometry.location;
    let user = User.user;
    let updated = false;
    let businessUpdated = false;
    //modals
    const [liveUpdatesModalVisible, setLiveUpdatesVisible] = useState(false);
    const [reservationsModalVisible, setReservationsVisible] = useState(false);
    const [covidModalVisible, setCovidModalVisible] = useState(false);
    const [livePopulation, setLivePopulation] = useState(population);
    const [updates, setUpdates] = useState(null);
    //const [refreshing, setRefreshing] = useState(false);
    //const [startRefresh, setStartRefresh] = useState(false);
    //backend
    const onPressCheckIn = async () => {
        let response = await Location.requestPermissionsAsync();
        if (response.granted) {
            let location = await Location.getLastKnownPositionAsync();
            var mi = kmToMi(straightLineDistance(location.coords, { latitude: parseFloat(business.geometry.location.lat), longitude: parseFloat(business.geometry.location.lng) }));
            if (mi < 0.2) {
                const biz = await checkIn(_id);
                if (biz) {
                    //console.log(biz);
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
    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }
    /*const refresh = async function () {
        setRefreshing(true);
        await getBusiness(business.place_id, db._id);
        wait(2000).then(() => { setRefreshing(false); setStartRefresh(true); });
    };*/
    useEffect(() => {
        console.log("dbBusiness changed");
        console.log(reservations);
        setData(dbBusiness);
    }, [dbBusiness]);
    useEffect(() => {
        getDistance();
        return function cleanup() {
            if (updated) {
                updateUserWithoutReturn({ reservations: user.reservations, favorites: user.favorites });
            }
            if (businessUpdated) {
                updateBusinessReservations(db._id, reservations);
            }
        };
    });
    /*useEffect(() => {
        if (startRefresh === true) {
            setData(dbBusiness);
            setStartRefresh(false);
        }
    }, [startRefresh]);*/

    useEffect(() => {
        let thisAnnouncements = [...announcements];
        thisAnnouncements.reverse();
        setUpdates(thisAnnouncements.map((a, i) => (
            <LiveUpdate title={a.title} content={a.content} time={a.date} key={i}></LiveUpdate>
        )));
    }, []);

    //business verification
    let verified = <View></View>;
    if (isVerified === true) {
        verified = <MaterialIcons name='verified-user' color='lightgreen' size={getIconSize(20)}></MaterialIcons>;
    }

    //business hours
    const hoursToString = (day) => {
        if (!day.open.hour) {
            return "Not available";
        }
        let open = `${day.open.hour}:${day.open.minutes === '0' ? '00' : day.open.minutes}${day.open.am ? ' A.M' : ' P.M'}`;
        open += " - ";
        let close = `${day.close.hour}:${day.close.minutes === '0' ? '00' : day.close.minutes}${day.close.am ? ' A.M' : ' P.M'}`;
        return open + close;
    };
    //make page specifically for unverified
    let monBusinessHours = "Not available";
    let tueBusinessHours = "Not available";
    let wedBusinessHours = "Not available";
    let thuBusinessHours = "Not available";
    let friBusinessHours = "Not available";
    let satBusinessHours = "Not available";
    let sunBusinessHours = "Not available";
    if (hours) {
        monBusinessHours = hoursToString(hours.monday);
        tueBusinessHours = hoursToString(hours.tuesday);
        wedBusinessHours = hoursToString(hours.wednesday);
        thuBusinessHours = hoursToString(hours.thursday);
        friBusinessHours = hoursToString(hours.friday);
        satBusinessHours = hoursToString(hours.saturday);
        sunBusinessHours = hoursToString(hours.sunday);
    }
    //distance 
    let [lineDistance, setLineDistance] = useState(null);
    const getDistance = () => {
        var mi = kmToMi(straightLineDistance(User.location, { latitude: parseFloat(business.geometry.location.lat), longitude: parseFloat(business.geometry.location.lng) }));
        var rounded = Math.round(mi * 10) / 10;
        setLineDistance(rounded + 'mi');
    };

    //phone number
    let phoneNumber = phone;
    let phoneNumberURL = 'tel:' + phoneNumber;

    //website
    let websiteURL = website;
    const createWebAlert = () =>
        Alert.alert(
            'Do you want to open the website for ' + business.name + '?',
            '',
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => Linking.openURL(websiteURL) }
            ],
            { cancelable: false }
        );
    //reservations
    var alreadyReserved = [];
    for (let i = 0; i < 7; i++) {
        alreadyReserved[i] = [];
        for (let k = 0; k < 20; k++) {
            alreadyReserved[i].push(false);
        }
    }
    let now = new Date();
    const beginning = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    for (let i = 0; i < user.reservations.length; i++) {
        let newDate = new Date(user.reservations[i].timestamp);
        if (user.reservations[i].business === _id && newDate > beginning) {
            alreadyReserved[user.reservations[i].index.day][user.reservations[i].index.index] = true;
        }
    }
    //console.log(alreadyReserved);
    let weekMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let currentDate = new Date();
    const [currentDay, setDay] = useState(weekMap[currentDate.getDay()]);
    const [currentReservations, setReservations] = useState({ ...reservations });
    const checkReserved = (i, day) => {
        let indexDay = weekMap.indexOf(day);
        return alreadyReserved[indexDay][i];
    };
    const validReservation = (day) => {
        let indexDay = weekMap.indexOf(day);
        for (let j = 0; j < alreadyReserved[indexDay].length; j++) {
            if (alreadyReserved[indexDay][j]) {
                return false;
            }
        }
        return true;
    };
    const reserveSpot = (i, day) => {
        if (validReservation(day)) {
            let date = new Date();
            let indexDay = weekMap.indexOf(day);
            date.setDate(date.getDate() + (7 + indexDay - date.getDay()) % 7);
            user.reservations.push({
                business: _id,
                businessName: name,
                address: address,
                time: reservations[day.toLowerCase()][i].slot,
                index: { day: indexDay, index: i },
                date: date.toDateString(),
                timestamp: date
            });
            //console.log(alreadyReserved);
            alreadyReserved[indexDay][i] = true;
            //TODO : add reservation to users array 
            reservations[day.toLowerCase()][i].users += 1;
            businessUpdated = true;
            updated = true;
            setReservations({ ...reservations });
        } else {
            createError('Cannot reserve more than once per day', 'warn');
        }
    };
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

    //open during current time display
    let openDisplay = <Text></Text>;
    if (openStatus === true) {
        openDisplay = <Text style={{
            paddingHorizontal: 10, alignSelf: 'center', color: 'white',
            borderColor: 'green', borderWidth: 1, padding: 2, fontSize: getFontSize(16), backgroundColor: 'green'
        }}>Open</Text>;
    }
    else {
        openDisplay = <Text style={{
            paddingHorizontal: 10, alignSelf: 'center', color: 'white',
            borderColor: 'red', borderWidth: 1, padding: 2, fontSize: getFontSize(16), backgroundColor: 'red'
        }}>Closed</Text>;
    }

    //This changes the favorite color; once you have the actual favorite parameter change the color based on the true/false of favorite
    function inFavorites() {
        return User.user.favorites.includes(publicId);
    };
    const toggleFavorite = () => {
        if (!isFavorite) {
            user.favorites.push(publicId);
        } else {
            user.favorites.splice(user.favorites.indexOf(publicId), 1);
        }
        updated = true;
        setFavorite(!isFavorite);

    };
    const [isFavorite, setFavorite] = useState(inFavorites());
    let favoriteDisplay = <Ionicons name="md-heart-empty" color='white' size={getIconSize(21)} />;
    if (isFavorite === true) {
        favoriteDisplay = <Ionicons name="md-heart" color='red' size={getIconSize(21)} />;
    }
    else if (isFavorite === false) {
        favoriteDisplay = <Ionicons name="md-heart-empty" color='white' size={getIconSize(21)} />;
    }

    return (
        <View style={{flex: 1, backgroundColor: 'azure'}}>
            <Modal
                propagateSwipe={true}
                isVisible={liveUpdatesModalVisible}
                coverScreen={false}
                backdropColor={"white"}
                backdropOpacity={0.8}
                animationIn={'slideInLeft'}
                animationOut={'slideOutLeft'}
                animationInTiming={500}
                swipeDirection={['left']}
                onSwipeComplete={(e) => { if (e.swipingDirection === 'left') setLiveUpdatesVisible(false); }}
            >
                <View style={styles.liveUpdatesModalView}>
                    <TouchableOpacity onPress={() => { setLiveUpdatesVisible(false); }}>
                        <View style={{ height: 10 }}></View>
                        <AntDesign name='leftcircle' color='#ff9900' size={getIconSize(19)} style={{ alignSelf: 'center' }}></AntDesign>
                        <Text style={{ color: '#ff9900', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingBottom: 10 }}>Live Updates</Text>
                    </TouchableOpacity>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <TouchableWithoutFeedback>
                            <View>
                                {updates}
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
            </Modal>
            <Modal
                propagateSwipe={true}
                isVisible={covidModalVisible}
                coverScreen={false}
                backdropColor={"white"}
                backdropOpacity={0.8}
                animationIn={'slideInLeft'}
                animationOut={'slideOutLeft'}
                animationInTiming={500}
                swipeDirection={['left']}
                onSwipeComplete={(e) => { if (e.swipingDirection === 'left') setCovidModalVisible(false); }}
            >
                <View style={styles.covid19ModalView}>
                    <TouchableOpacity onPress={() => { setCovidModalVisible(false); }}>
                        <View style={{ height: 10 }}></View>
                        <AntDesign name='leftcircle' color='red' size={getIconSize(19)} style={{ alignSelf: 'center' }}></AntDesign>
                        <Text style={{ color: 'red', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingBottom: 10 }}>Guidelines</Text>
                    </TouchableOpacity>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <TouchableWithoutFeedback>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(16) }}>
                                {covid19Information}
                            </Text>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
            </Modal>
            <Modal
                propagateSwipe={true}
                isVisible={reservationsModalVisible}
                coverScreen={false}
                backdropColor={"white"}
                backdropOpacity={0.8}
                animationIn={'slideInLeft'}
                animationOut={'slideOutLeft'}
                animationInTiming={500}
                swipeDirection={['left']}
                onSwipeComplete={(e) => { if (e.swipingDirection === 'left') setReservationsVisible(false); }}
            >
                <View style={styles.reservationsModalView}>
                    <TouchableOpacity onPress={() => { setReservationsVisible(false); }}>
                        <View style={{ height: 10 }}></View>
                        <AntDesign name='leftcircle' color='green' size={getIconSize(19)} style={{ alignSelf: 'center' }}></AntDesign>
                        <Text style={{ color: 'green', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingBottom: 10 }}>Reservations</Text>
                    </TouchableOpacity>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <TouchableWithoutFeedback>
                            <View>
                                {(typeof reservations === 'undefined') ? <View></View> : <ReservationScrollModal reservations={reservations} reservationLimit={reservationLimit} reserve={reserveSpot} startingDate={currentDay} checkReserved={checkReserved}></ReservationScrollModal>}
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
            </Modal>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/*<RefreshControl refreshing={refreshing} onRefresh={refresh} />*/}
                <View style={{
                    borderBottomColor: 'transparent', borderTopColor: 'transparent'
                }}>
                    <ImageBackground source={coverImageUrl ? { uri: coverImageUrl } : require('../../assets/backgroundhue.png')} style={{ width: '100%', height: Dimensions.get('window').height / 3.3 }}>
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.8)']}
                            style={{
                                flex: 3,
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                height: 250,
                            }}
                        />
                        <View style={{position: 'absolute', top: 50, left: 20, alignItems: 'baseline'}}>
                            <TouchableOpacity onPress={()=> navigation.goBack()}>
                                <AntDesign name="leftcircle" color='#ff9900' size={getIconSize(20)}></AntDesign>
                            </TouchableOpacity>
                        </View>
                        <View style={{ position: 'absolute', bottom: 40, alignItems: 'baseline' }}>
                            <Text style={{ color: 'white', fontSize: getFontSize(30), fontWeight: 'bold', paddingLeft: 20 }}>{(business.name.length <= 40) ? business.name : textTruncateBySpaceTwo(37, business.name)}</Text>
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
                        <TouchableOpacity style={{ position: 'absolute', right: 15, bottom: 5 }} onPress={() => toggleFavorite()}>
                            {favoriteDisplay}
                        </TouchableOpacity>
                    </ImageBackground>

                    <View style={{
                        flexDirection: 'row', alignItems: 'flex-end', backgroundColor: 'transparent',
                        paddingTop: 6,
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

                {(covid19Information != '') && 
                <View style={{ paddingVertical: 15, paddingHorizontal: 8 }}>
                    <View style={styles.businessSquareInner}>
                        <TouchableOpacity onPress={() => setCovidModalVisible(true)}>
                            <View style={{ paddingHorizontal: 15, height: 140, backgroundColor: '#FDDFDF', borderRadius: 10 }}>
                                <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                                    <Text style={{ color: 'red', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingVertical: 5, paddingRight: 10 }}>Guidelines</Text>
                                    <AntDesign name='rightcircle' color='red' size={getIconSize(18)} style={{ paddingTop: 11 }}></AntDesign>
                                </View>
                                <Text style={{ fontFamily: 'AvenirNext-Bold', fontSize: getFontSize(17), paddingVertical: 3 }}>
                                    This business has certain guidelines for its customers. Press on this card for more details.
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>}

                {(announcements.length !== 0) ? <View style={{ paddingBottom: 15, paddingHorizontal: 8 }}>
                    <View style={styles.businessSquareInner}>
                        <TouchableOpacity onPress={() => { setLiveUpdatesVisible(true); }} style={{ paddingHorizontal: 15, backgroundColor: '#fdeedc', borderRadius: 10 }}>
                            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline' }}>
                                <Text style={{ color: '#ff9900', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingTop: 5, paddingRight: 10 }}>Live Updates</Text>
                                <AntDesign name='rightcircle' color='#ff9900' size={getIconSize(18)} style={{ paddingTop: 12 }}></AntDesign>
                            </View>
                            <View style={{ flex: 5 }}>
                                {(announcements[announcements.length - 1]) && <LiveUpdate title={announcements[announcements.length - 1].title ? textTruncateBySpaceTwo(23, announcements[announcements.length - 1].title) : ""} content={announcements[announcements.length - 1].content ? textTruncateBySpaceTwo(130, announcements[announcements.length - 1].content) : ""} time={announcements[announcements.length - 1].date ? announcements[announcements.length - 1].date : 0}></LiveUpdate>}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> : 
                <View></View>}

                {((typeof reservations !== 'undefined') && (reservations.length !== 0)) ? <View style={{ paddingBottom: 15, paddingHorizontal: 8 }}>
                    <View style={styles.businessSquareInner}>
                        <View style={{ paddingHorizontal: 15, backgroundColor: '#E1FDE2', borderRadius: 10 }}>
                            <TouchableOpacity onPress={() => { setReservationsVisible(true); }} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={{ color: 'green', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingTop: 5, paddingRight: 10 }}>Reservations</Text>
                                <AntDesign name='rightcircle' color='green' size={getIconSize(18)} style={{ paddingTop: 11 }}></AntDesign>
                            </TouchableOpacity>
                            <View style={{ flex: 4 }}>
                                <View style={{paddingBottom: 10}}>
                                    <ReservationScroll day={currentDay} reserve={reserveSpot} reservations={reservations[currentDay.toLowerCase()]} checkReserved={checkReserved} reservationLimit={reservationLimit} style={{ alignItems: 'flex-start' }}></ReservationScroll>
                                </View>
                            </View>
                        </View>
                    </View>
                </View> :
                <View></View>}
                
                <View style={{ paddingBottom: 15, paddingHorizontal: 8 }}>
                    <View style={styles.businessSquareInner}>
                        <TouchableOpacity onPress={() => { navigation.navigate('MenuPage', {navigation: navigation, bizimage: coverImageUrl}) }} style={{ paddingHorizontal: 15, backgroundColor: 'lavender', borderRadius: 10, paddingBottom: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={{ color: 'purple', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingTop: 5, paddingRight: 10 }}>Pickup</Text>
                                <AntDesign name='rightcircle' color='purple' size={getIconSize(18)} style={{ paddingTop: 11 }}></AntDesign>
                            </View>
                            <Text style={{ fontFamily: 'AvenirNext-Bold', fontSize: getFontSize(17), paddingVertical: 3 }}>
                                Currently In Queue: 5
                            </Text>
                        </TouchableOpacity>
                    </View> 
                </View>

                <View style={{ borderBottomColor: 'azure' }}></View>

                <View style={{ paddingHorizontal: 25, backgroundColor: 'azure' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline' }}>
                        <Text style={{ color: 'royalblue', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingTop: 5, paddingRight: 10, paddingBottom: 10 }}>Information</Text>
                    </View>

                    <View style={styles.infoOuterBlock}>
                        <TouchableOpacity onPress={() => { Linking.openURL(phoneNumberURL); }} style={styles.infoInnerBlock}>
                            <MaterialIcons name='phone' color='royalblue' size={getIconSize(18)} />
                            <Text style={{ paddingLeft: 10, fontFamily: 'Avenir-Light', fontSize: getFontSize(17), fontWeight: 'bold' }}>{phoneNumber}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoOuterBlock}>
                        <TouchableOpacity onPress={createWebAlert} style={styles.infoInnerBlock}>
                            <MaterialIcons name='web' color='royalblue' size={getIconSize(18)} />
                            <Text style={{ paddingLeft: 10, fontFamily: 'Avenir-Light', fontSize: getFontSize(17), fontWeight: 'bold' }}>{website}</Text>
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
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(15), paddingVertical: 3 }}>Monday: {monBusinessHours}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(15), paddingVertical: 3 }}>Tuesday: {tueBusinessHours}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(15), paddingVertical: 3 }}>Wednesday: {wedBusinessHours}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(15), paddingVertical: 3 }}>Thursday: {thuBusinessHours}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(15), paddingVertical: 3 }}>Friday: {friBusinessHours}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(15), paddingVertical: 3 }}>Saturday: {satBusinessHours}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(15), paddingVertical: 3 }}>Sunday: {sunBusinessHours}</Text>
                        </View>
                    </View>

                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'gainsboro' }}></View>
                    <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'flex-start', flex: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 3 }}>
                            <Ionicons name='md-information-circle' color='royalblue' size={getIconSize(18.6)} />
                            <Text style={{ paddingLeft: 5, paddingRight: 15, color: 'royalblue', fontFamily: 'Avenir-Light' }}>About </Text>
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 8 }}>
                            <Text style={{ fontFamily: 'Avenir-Light', fontSize: getFontSize(17), paddingVertical: 3 }}>{description}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    );
};
const mapStateToProps = state => ({
    dbBusiness: state.business.dbBusiness,
    auth: state.auth,
    User: state.user
});
export default connect(mapStateToProps, { createError, checkIn, updateUser, updateBusinessReservations, getBusiness, updateUserWithoutReturn })(BusinessPage);