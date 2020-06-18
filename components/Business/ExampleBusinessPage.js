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
import MapView from 'react-native-maps';
import openMap from 'react-native-open-maps';
import { getFontSize, getIconSize } from '../../utils/fontsizes';

const ExampleBusinessPage = () => {

    let openStatus = true;
    let livePopulation = 36;
    let isFavorite = true;
    let isVerified = true;
    //modals
    const [liveUpdatesModalVisible, setLiveUpdatesVisible] = useState(false);
    const [reservationsModalVisible, setReservationsVisible] = useState(false);

    //business verification
    let verified = <View></View>;
    if (isVerified === true) {
        verified = <MaterialIcons name='verified-user' color='lightgreen' size={getIconSize(20)}></MaterialIcons>;
    }

    //make page specifically for unverified
    const monBusinessHours = '8:00am-8:00pm';
    const tueBusinessHours = '8:00am-8:00pm';
    const wedBusinessHours = '8:00am-8:00pm';
    const thuBusinessHours = '8:00am-8:00pm';
    const friBusinessHours = '8:00am-8:00pm';
    const satBusinessHours = '9:00am-5:00pm';
    const sunBusinessHours = '9:00am-5:00pm';

    //phone number
    let phoneNumber = '+1 (202) 555-0157';
    let phoneNumberURL = 'tel:' + phoneNumber;

    //website
    let websiteURL = 'www.thegreat.market';
    const createWebAlert = () =>
        Alert.alert(
            'Do you want to open the website?',
            '',
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => Linking.openURL(websiteURL) }
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
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => openMap({ end: address, start: "Current Location", travelType: 'drive' }) }
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

    let favoriteDisplay = <Ionicons name="md-heart-empty" color='white' size={getIconSize(21)} />;
    if (isFavorite === true) {
        favoriteDisplay = <Ionicons name="md-heart" color='red' size={getIconSize(21)} />;
    }
    else if (isFavorite === false) {
        favoriteDisplay = <Ionicons name="md-heart-empty" color='white' size={getIconSize(21)} />;
    }

    //Live updates display

    const updates = <View>
            <LiveUpdate title={'Out of Stock'} content={'Eggplants, Organic Cherries, Grade AAA Eggs'} time={30} key={1}></LiveUpdate>
            <LiveUpdate title={'Closed on Monday'} content={'Memorial Day'} time={200} key={1}></LiveUpdate>
            <LiveUpdate title={'Deals'} content={'All dairy products are half off.'} time={200} key={1}></LiveUpdate>
            <LiveUpdate title={'Out of Stock'} content={'Paper towels'} time={1000} key={1}></LiveUpdate>
            <LiveUpdate title={'FLASH SALE'} content={'Storewide 20% off today (some exclusions apply).'} time={8000} key={1}></LiveUpdate>
            <LiveUpdate title={'Out of Stock'} content={'Eggplants, Organic Cherries, Grade AAA Eggs'} time={14000} key={1}></LiveUpdate>
            <LiveUpdate title={'Out of Stock'} content={'Eggplants, Organic Cherries, Grade AAA Eggs'} key={1}></LiveUpdate>
        </View>

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

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{
                    borderBottomColor: 'transparent', borderTopColor: 'transparent'
                }}>
                    <ImageBackground source={require('../../assets/exampleBPImage.jpg')} style={{ width: '100%', height: 250 }}>
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
                            <Text style={{ color: 'white', fontSize: getFontSize(30), fontWeight: 'bold', paddingLeft: 20 }}>The Great Market</Text>
                            <View style={{ paddingLeft: 20, paddingTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ borderRadius: 5, borderColor: 'white', color: 'white', borderWidth: 1, padding: 3, fontSize: getFontSize(16) }}>
                                    1.2mi
                                </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                    <Ionicons name='md-person' color='white' size={getIconSize(19)}/>
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
                        <TouchableOpacity style={{ position: 'absolute', right: 15, bottom: 5}}>
                            {favoriteDisplay}
                        </TouchableOpacity>
                    </ImageBackground>

                    <View style={{
                        flexDirection: 'row', alignItems: 'flex-end', backgroundColor: 'azure',
                        paddingTop: 6,
                    }}>
                        <TouchableOpacity onPress={openMapToBusiness} style={{ alignItems: 'center', flex: 1 }}>
                            <MaterialCommunityIcons name='directions' color='royalblue' size={getIconSize(21)} />
                            <Text style={{ color: 'black', fontFamily: "Avenir-Light" }}>Directions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center', flex: 1 }}>
                            <MaterialCommunityIcons name='map-marker-check' color='#ff9900' size={getIconSize(22)} />
                            <Text style={{ color: '#ff9900', fontFamily: 'Avenir-Light', fontWeight: 'bold' }}>Check In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { Linking.openURL(phoneNumberURL); }} style={{ alignItems: 'center', flex: 1 }}>
                            <MaterialIcons name='phone' color='royalblue' size={getIconSize(20)} style={{paddingBottom: 5}} />
                            <Text style={{ color: 'black', fontFamily: 'Avenir-Light' }}>Call</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ paddingTop: 15, paddingHorizontal: 8 }}>
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
                </View>

                <View style={{ paddingTop: 15, paddingHorizontal: 8 }}>
                    <View style={styles.businessSquareInner}>
                        <TouchableOpacity onPress={() => { setLiveUpdatesVisible(true); }} style={{ paddingHorizontal: 15, backgroundColor: '#fdeedc', borderRadius: 10 }}>
                            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline' }}>
                                <Text style={{ color: '#ff9900', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingTop: 5, paddingRight: 10 }}>Live Updates</Text>
                                <AntDesign name='rightcircle' color='#ff9900' size={getIconSize(18)} style={{ paddingTop: 12 }}></AntDesign>
                            </View>
                            <View style={{ flex: 5 }}>
                                <LiveUpdate title={'Out of Stock'} content={'Eggplants, Organic Cherries, Grade AAA Eggs'} time={new Date(2020, 5, 17, 21, 25, 44, 2)} key={1}></LiveUpdate>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ paddingVertical: 15, paddingHorizontal: 8 }}>
                    <View style={styles.businessSquareInner}>
                        <View style={{ paddingHorizontal: 15, backgroundColor: '#E1FDE2', borderRadius: 10 }}>
                            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Text style={{ color: 'green', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingTop: 5, paddingRight: 10 }}>Reservations</Text>
                                <AntDesign name='rightcircle' color='green' size={getIconSize(18)} style={{ paddingTop: 11 }}></AntDesign>
                            </TouchableOpacity>
                            <View style={{ flex: 4 }}>
                                <View style={{paddingBottom: 10}}>
                                <View>
                                    <Text style={{ fontFamily: 'AvenirNext-Bold', fontSize: 24, color: 'darkslategrey', paddingTop: 5 }}>Today</Text>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingTop: 5 }}>
                                        <View index={1} style={{ paddingRight: 10, flexDirection: 'column' }}>
                                            <View style={{ alignItems: 'center', paddingBottom: 5 }}>
                                                <Text style={{ fontFamily: 'AvenirNext-Bold' }}>8:00 am-10:00 am</Text>
                                                <Text>35/50</Text>
                                            </View>
                                            <TouchableOpacity>
                                                <View style={{ borderRadius: 20, borderColor: 'transparent', borderWidth: 0.5, backgroundColor: '#ff9900', paddingHorizontal: 30 }}>
                                                    <Text style={{ color: 'white', fontWeight: 'bold', padding: 8, fontSize: 12, textAlign: 'center' }}>
                                                        Reserve
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View index={1} style={{ paddingRight: 10, flexDirection: 'column' }}>
                                            <View style={{ alignItems: 'center', paddingBottom: 5 }}>
                                                <Text style={{ fontFamily: 'AvenirNext-Bold' }}>10:00 am-12:00 pm</Text>
                                                <Text>16/50</Text>
                                            </View>
                                            <TouchableOpacity>
                                                <View style={{ borderRadius: 20, borderColor: 'transparent', borderWidth: 0.5, backgroundColor: '#ff9900', paddingHorizontal: 30 }}>
                                                    <Text style={{ color: 'white', fontWeight: 'bold', padding: 8, fontSize: 12, textAlign: 'center' }}>
                                                        Reserve
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View index={1} style={{ paddingRight: 10, flexDirection: 'column' }}>
                                            <View style={{ alignItems: 'center', paddingBottom: 5 }}>
                                                <Text style={{ fontFamily: 'AvenirNext-Bold' }}>12:00 pm-2:00 pm</Text>
                                                <Text>49/50</Text>
                                            </View>
                                            <TouchableOpacity>
                                                <View style={{ borderRadius: 20, borderColor: 'transparent', borderWidth: 0.5, backgroundColor: '#ff9900', paddingHorizontal: 30 }}>
                                                    <Text style={{ color: 'white', fontWeight: 'bold', padding: 8, fontSize: 12, textAlign: 'center' }}>
                                                        Reserve
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </ScrollView>
                                </View>
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
                            <Text style={{ paddingLeft: 10, fontFamily: 'Avenir-Light', fontSize: getFontSize(17), fontWeight: 'bold' }}>{websiteURL}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.mapOuterStyle}>
                        <MapView style={styles.mapStyle}>
                        </MapView>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column', flex: 1, paddingLeft: 15, paddingVertical: 20 }}>
                                <Text style={{ fontFamily: 'Avenir-Light', fontSize: getFontSize(17), fontWeight: 'bold' }}>Distance: 1.2mi </Text>
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

                    <View style={{borderBottomWidth: 0.5, borderBottomColor: 'gainsboro'}}></View>
                    <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'flex-start', flex: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 3 }}>
                            <Ionicons name='md-information-circle' color='royalblue' size={getIconSize(18.6)} />
                            <Text style={{ paddingLeft: 5, paddingRight: 15, color: 'royalblue', fontFamily: 'Avenir-Light' }}>About </Text>
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'flex-start', flex: 8 }}>
                            <Text style={{ fontFamily: 'Avenir-Light', fontSize: getFontSize(17), paddingVertical: 3 }}>At The Great Market, we are dedicated
                            in providing you with fresh and organic produce everyday so you can enjoy every meal with family and friends. We also strive to bring you great customer
                            service and the best prices to make your shopping experience as delightful as possible. We hope you come to our market sometime; we promise you won't regret it!</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    );
};

export default ExampleBusinessPage;
