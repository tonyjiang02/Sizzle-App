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
import { updateBusinessReservations, getAdditionalData } from '../../actions/business';
import * as Location from 'expo-location';

const UnverifiedBusinessPage = ({ route: { params: { business, db } }, checkIn, updateUser, User, updateBusinessReservations, dbBusiness }) => {
    //destructuring
    let { name, vicinity, geometry, place_id } = business;
    let { _id, googleId, isVerified, population } = dbBusiness;
    let location = geometry.location;
    let user = User.user;
    let updated = false;
    //modals
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
        getDistance();
        getMoreData();
        return function cleanup() {
            if (updated) {
                console.log("updating user");
                updateUser(user);
            }
        };
    }, [null]);
    //business verification
    let verified = <View></View>;
    if (isVerified === true) {
        verified = <MaterialIcons name='verified-user' color='lightgreen' size={getIconSize(20)}></MaterialIcons>;
    }
    let [addData, setAddData] = useState({
        websiteURL: 'Not available',
        hours: 'Not available',
        phoneNumber: 'Not available'
    });
    const getMoreData = async () => {
        const res = await getAdditionalData(place_id);
        console.log(res);
        setAddData({
            websiteURL: res.website,
            hours: res.weekday_text,
            phoneNumber: res.formatted_phone_number
        });
    };
    let [lineDistance, setLineDistance] = useState(null);
    const getDistance = async () => {
        const currentLocation = await Location.getLastKnownPositionAsync();
        var mi = kmToMi(straightLineDistance(currentLocation.coords, { latitude: parseFloat(location.lat), longitude: parseFloat(location.lng) }));
        var rounded = Math.round(mi * 100) / 100;
        setLineDistance(rounded);
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

    //This changes the favorite color; once you have the actual favorite parameter change the color based on the true/false of favorite
    function inFavorites() {
        return user.favorites.includes(_id);
    };
    const toggleFavorite = () => {
        console.log(user.favorites);
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
    return (
        <View style={styles.landing}>
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
                    <ImageBackground source={{ uri: 'https://picsum.photos/400/300' }} style={{ width: '100%', height: 250 }}>
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
                    {/* <TouchableOpacity>
                        <View style={{ paddingHorizontal: 15, height: 140, backgroundColor: '#FDDFDF', borderLeftWidth: 5, borderLeftColor: 'red' }}>
                            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                                <Ionicons name='md-warning' color='red' size={getIconSize(21)} style={{ paddingRight: 10, paddingLeft: 10 }} />
                                <Text style={{ color: 'red', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingVertical: 5, paddingRight: 10 }}>COVID-19</Text>
                                <AntDesign name='rightcircle' color='red' size={getIconSize(18)} style={{ paddingTop: 11 }}></AntDesign>
                            </View>
                            <Text style={{ fontFamily: 'AvenirNext-Bold', fontSize: getFontSize(17), paddingVertical: 3 }}>
                                This business may have certain guidelines for its customers. Press on this card for more details.
                            </Text>
                        </View>
                    </TouchableOpacity> */}
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
                            <Text style={{ paddingLeft: 10, fontFamily: 'Avenir-Light', fontSize: getFontSize(17), fontWeight: 'bold' }}>{addData.websiteURL}</Text>
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
                            <Text style={{ fontFamily: 'Avenir-Light', fontWeight: 'bold', fontSize: getFontSize(17), paddingVertical: 3 }}>{addData.hours}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
const mapStateToProps = state => ({
    dbBusiness: state.business.dbBusiness,
    auth: state.auth,
    User: state.user
});
export default connect(mapStateToProps, { checkIn, updateUser, updateBusinessReservations })(UnverifiedBusinessPage);
