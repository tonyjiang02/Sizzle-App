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
import { checkIn, getBusiness } from '../../actions/business';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import LiveUpdate from '../Business/LiveUpdate';
import ReservationScroll from './ReservationScroll';
import { Linking } from 'expo';
import { straightLineDistance, kmToMi } from '../../utils/businessUtils';
import MapView, { Marker } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import { updateUser } from '../../actions/user';
import { updateBusinessReservations } from '../../actions/business';
import * as Location from 'expo-location';

const BusinessPage = ({ route: { params: { business, db } }, checkIn, auth, updateUser, User, updateBusinessReservations, dbBusiness }) => {
    //destructuring
    let { vicinity, geometry } = business;
    const [data, setData] = useState(dbBusiness);
    let { _id, name, owner, googleId, publicId, isVerified, images, coverImageUrl, website, phone, address, openStatus, hours, description, population, reservations, announcements, reservationLimit } = data;
    let location = geometry.location;
    let user = User.user;
    let updated = false;
    let businessUpdated = false;
    //modals
    const [liveUpdatesModalVisible, setLiveUpdatesVisible] = useState(false);
    const [reservationsModalVisible, setReservationsVisible] = useState(false);
    const [livePopulation, setLivePopulation] = useState(population);
    //backend
    const onPressCheckIn = async () => {
        const newPopulation = await checkIn(business.place_id);
        setLivePopulation(newPopulation);
    };
    const refresh = () => {
        getBusiness(business.place_id, db._id);
    };
    useEffect(() => {
        console.log("rerender");
        setData(dbBusiness);
    }, [dbBusiness]);
    useEffect(() => {
        getDistance();
        return function cleanup() {
            if (updated) {
                console.log("updating user");
                updateUser(user);
            }
            if (businessUpdated) {
                console.log("updating Business");
                updateBusinessReservations(db._id, reservations);
            }
        };
    });
    //business verification
    let verified = <View></View>;
    if (isVerified === true) {
        verified = <MaterialIcons name='verified-user' color='lightgreen' size={getIconSize(20)}></MaterialIcons>;
    }

    //business hours
    const hoursToString = (day) => {
        let open = `${day.open.hour}:${day.open.minutes === '0' ? '00' : day.open.minutes}${day.open.am ? 'am' : 'pm'}`;
        open += "-";
        let close = `${day.close.hour}:${day.close.minutes === '0' ? '00' : day.close.minutes}${day.close.am ? 'am' : 'pm'}`;
        return open + close;
    };
    //make page specifically for unverified
    const monBusinessHours = hoursToString(hours.monday);
    const tueBusinessHours = hoursToString(hours.tuesday);
    const wedBusinessHours = hoursToString(hours.wednesday);
    const thuBusinessHours = hoursToString(hours.thursday);
    const friBusinessHours = hoursToString(hours.friday);
    const satBusinessHours = hoursToString(hours.saturday);
    const sunBusinessHours = hoursToString(hours.sunday);
    //distance 
    let [lineDistance, setLineDistance] = useState(null);
    const getDistance = () => {
        var mi = kmToMi(straightLineDistance(User.user.location, { latitude: parseFloat(business.geometry.location.lat), longitude: parseFloat(business.geometry.location.lng) }));
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
    let weekMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let currentDate = new Date();
    const [currentDay, setDay] = useState(weekMap[currentDate.getDay()]);
    const [currentReservations, setReservations] = useState({ ...reservations });
    const reserveSpot = (i, day) => {
        reservations[day][i].users.push(user._id);
        businessUpdated = true;
        setReservations({ ...reservations });
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
                { text: "OK", onPress: () => openMap({ end: name + " " + address, start: "Current Location", travelType: 'drive' }) }
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
        return User.user.favorites.includes(_id);
    };
    const toggleFavorite = () => {
        if (!isFavorite) {
            user.favorites.push(_id);
        } else {
            user.favorites.splice(user.favorites.indexOf(_id));
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
    //Live updates display
    announcements = announcements.reverse();
    const updates = announcements.map((a, i) => (
        <LiveUpdate title={a.title} content={a.content} key={i}></LiveUpdate>
    ));
    return (
        <View style={styles.landing}>
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
                                <ReservationScroll day={currentDay.toLowerCase()} reserve={reserveSpot} reservations={currentReservations[currentDay.toLowerCase()]}></ReservationScroll>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
            </Modal>

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
                    <ImageBackground source={coverImageUrl ? { uri: coverImageUrl } : { uri: 'https://picsum.photos/400/300' }} style={{ width: '100%', height: 250 }}>
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
                        <View style={{ position: 'absolute', bottom: 40, alignItems: 'baseline' }}>
                            <Text style={{ color: 'white', fontSize: getFontSize(30), fontWeight: 'bold', paddingLeft: 20 }}>{business.name}</Text>
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
                        flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#EEFBFC',
                        paddingVertical: 6,
                    }}>
                        <TouchableOpacity onPress={openMapToBusiness} style={{ alignItems: 'center', flex: 1 }}>
                            <MaterialCommunityIcons name='directions' color='royalblue' size={getIconSize(21)} />
                            <Text style={{ color: 'black', fontFamily: "Avenir-Light" }}>Directions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressCheckIn} style={{ alignItems: 'center', flex: 1 }}>
                            <MaterialCommunityIcons name='map-marker-check' color='#ff9900' size={getIconSize(22)} />
                            <Text style={{ color: '#ff9900', fontFamily: 'Avenir-Light', fontWeight: 'bold' }}>Check In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { Linking.openURL(phoneNumberURL); }} style={{ alignItems: 'center', flex: 1 }}>
                            <MaterialIcons name='phone' color='royalblue' size={getIconSize(20)} style={{ paddingBottom: 5 }} />
                            <Text style={{ color: 'black', fontFamily: 'Avenir-Light' }}>Call</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <View style={{ paddingHorizontal: 15, height: 140, backgroundColor: '#FDDFDF', borderLeftWidth: 5, borderLeftColor: 'red' }}>
                            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                                <Ionicons name='md-warning' color='red' size={getIconSize(21)} style={{ paddingRight: 10, paddingLeft: 10 }} />
                                <Text style={{ color: 'red', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingVertical: 5, paddingRight: 10 }}>COVID-19</Text>
                                <AntDesign name='rightcircle' color='red' size={getIconSize(18)} style={{ paddingTop: 11 }}></AntDesign>
                            </View>
                            <Text style={{ fontFamily: 'AvenirNext-Bold', fontSize: getFontSize(17), paddingVertical: 3 }}>
                                This business has certain guidelines for its customers. Press on this card for more details.
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingTop: 15, paddingBottom: 12, paddingHorizontal: 8 }}>
                    <View style={styles.businessSquareInner}>
                        <TouchableOpacity onPress={() => { setLiveUpdatesVisible(true); }} style={{ paddingHorizontal: 15, backgroundColor: '#fdeedc', height: 150 }}>
                            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline' }}>
                                <Text style={{ color: '#ff9900', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingTop: 5, paddingRight: 10 }}>Live Updates</Text>
                                <AntDesign name='rightcircle' color='#ff9900' size={getIconSize(18)} style={{ paddingTop: 12 }}></AntDesign>
                            </View>
                            <View style={{ flex: 5 }}>
                                {(announcements[0]) && <LiveUpdate title={announcements[0].title ? announcements[0].title : ""} content={announcements[0].content ? announcements[0].content : ""}></LiveUpdate>}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ paddingBottom: 12, paddingHorizontal: 8 }}>
                    <View style={styles.businessSquareInner}>
                        <View style={{ paddingHorizontal: 15, backgroundColor: '#E1FDE2', height: 165 }}>
                            <TouchableOpacity onPress={() => { setReservationsVisible(true); }} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={{ color: 'green', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingTop: 5, paddingRight: 10 }}>Reservations</Text>
                                <AntDesign name='rightcircle' color='green' size={getIconSize(18)} style={{ paddingTop: 11 }}></AntDesign>
                            </TouchableOpacity>
                            <View style={{ flex: 4 }}>
                                <View>
                                    <ReservationScroll day={currentDay.toLowerCase()} reserve={reserveSpot} reservations={currentReservations[currentDay.toLowerCase()]} style={{ alignItems: 'flex-start' }}></ReservationScroll>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ borderBottomWidth: 0.8, borderBottomColor: 'azure' }}></View>

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

                    <View style={styles.mapOuterStyle}>
                        <MapView style={styles.mapStyle} showsUserLocation={true} initialRegion={{
                            latitude: location.lat,
                            longitude: location.lng,
                            latitudeDelta: 0.002,
                            longitudeDelta: 0.001,
                        }}>
                            <Marker
                                coordinate={{ latitude: parseFloat(location.lat), longitude: parseFloat(location.lng) }}
                                title={name}
                            />
                        </MapView>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column', flex: 1, paddingLeft: 15, paddingVertical: 20 }}>
                                <Text style={{ fontFamily: 'Avenir-Light', fontSize: getFontSize(17), fontWeight: 'bold' }}>Distance: {lineDistance}mi </Text>
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

                    <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'flex-start', flex: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 3 }}>
                            <AntDesign name='clockcircle' color='royalblue' size={getIconSize(18)} />
                            <Text style={{ paddingLeft: 5, paddingRight: 15, color: 'royalblue', fontFamily: 'Avenir-Light' }}>Hours </Text>
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 8 }}>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(17), paddingVertical: 3 }}>Mon: {monBusinessHours}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(17), paddingVertical: 3 }}>Tue: {tueBusinessHours}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(17), paddingVertical: 3 }}>Wed: {wedBusinessHours}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(17), paddingVertical: 3 }}>Thu: {thuBusinessHours}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(17), paddingVertical: 3 }}>Fri: {friBusinessHours}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(17), paddingVertical: 3 }}>Sat: {satBusinessHours}</Text>
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(17), paddingVertical: 3 }}>Sun: {sunBusinessHours}</Text>
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
export default connect(mapStateToProps, { checkIn, updateUser, updateBusinessReservations })(BusinessPage);
