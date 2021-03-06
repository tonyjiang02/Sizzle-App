
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, SafeAreaView, Text, Linking, Animated } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { styles } from './Styles';
import Loading from './layout/Loading';
import Header from './layout/Header';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Octicons, Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Dimensions } from 'react-native';
import BusinessCard from './Business/BusinessCard';
import BusinessList from './Business/BusinessList';
import Outlines from '../assets/Outlines';
import * as Location from 'expo-location';
import { getNearest, getBusiness, checkIn, openBusinessPage } from '../actions/business';
import { timeDifferenceInMin } from '../utils/businessUtils';
import { updateUserWithoutReturn } from '../actions/user';
import SearchLoading from './layout/LandingLoading';

export const Checkin = ({ navigation, getNearest, loadingNearest, updateUserWithoutReturn, checkIn, dbNearestBusinesses, nearestBusinesses, getBusiness, User, Auth }) => {
    const openCheckedIn = () => {
        navigation.navigate('CheckedIn', { navigation: navigation });
    };
    const [hasPermission, setHasPermission] = useState(false);
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [scanned, setScanned] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    let user = User.user;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 800
                })
            ]),
        ).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds

    };

    let camera = <View></View>;

    useEffect(() => {
        console.log('opening checkin page');
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            let response = await Location.requestPermissionsAsync();
            if (response.granted) {
                setHasLocationPermission(true);
                let location = await Location.getLastKnownPositionAsync();
                if (loadingNearest === true) {
                    getNearest({ radius: 200 }, location.coords);
                }
                else {
                    if (User.locationChanged === false) {
                        if ((Math.abs(location.coords.latitude - User.user.location.latitude) > 0.03) || (Math.abs(location.coords.longitude - User.user.location.longitude) > 0.03)) {
                            console.log('lat abs: ' + Math.abs(location.coords.latitude - User.user.location.latitude));
                            console.log(' lon abs ' + Math.abs(location.coords.longitude - User.user.location.longitude));
                            User.user.location.latitude = location.coords.latitude;
                            User.user.location.longitude = location.coords.longitude;
                            getNearest({ radius: 200 }, location.coords);
                        }
                    }
                }
            }
        })();
    }, [User.loadingUser]);

    const handleBarCodeScanned = async ({ type, data }) => {
        console.log("Scanning data");
        if (data.indexOf('szzl.app') > -1) {
            setScanned(true);
            const id = data.substring(28);
            console.log(id);
            if (user.occupying) {
                if (user.occupying.id === id && timeDifferenceInMin(Date.now(), user.occupying.date) < 60) {
                    console.log('already checked in');
                    return;
                }
            }
            console.log("checking in");
            const businessJSON = await checkIn(id);
            console.log(businessJSON);
            openBusinessPage(null, businessJSON);
            navigation.replace('DbBusinessPage', { db: businessJSON });
        }
    };

    const getCurrentLocation = async () => {
        console.log('getting loc permissions');
        let response = await Location.requestPermissionsAsync();
        if (response.granted) {
            let location = await Location.getLastKnownPositionAsync();
            return location.coords;
        }
        return "none";
    };

    const noPermissionDisplay = <Text style={{ alignSelf: 'center', color: 'white', paddingTop: 30 }}>Sizzle currently has no access to your camera. Please go to "Settings" and change your camera permissions.</Text>;

    camera = hasPermission ? <Camera style={{ height: (Dimensions.get('window').width - 140), width: (Dimensions.get('window').width - 120) }} type={type}
        barCodeScannerSettings={{ barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] }} onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}>
        <View style={{ flex: 1, backgroundColor: 'transparent' }}></View>
    </Camera> : noPermissionDisplay;

    let temp = true;

    return (
        <View style={{ backgroundColor: '#ff9900', height: Dimensions.get('window').height, width: Dimensions.get('window').width }}>
            <Header navigation={navigation}></Header>
            <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'white' }}></View>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <View style={{ paddingBottom: 5, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Avenir-Light', paddingHorizontal: 10, paddingBottom: 3 }}>Check-in through scanning a</Text>
                        <FontAwesome name='qrcode' size={22} color='white'></FontAwesome>
                    </View>
                    <View>
                        <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Avenir-Light', paddingHorizontal: 10, fontWeight: 'bold' }}>OR</Text>
                    </View>
                    <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Avenir-Light', paddingHorizontal: 10, paddingTop: 0 }}>selecting an option below</Text>
                    <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Avenir-Light', paddingHorizontal: 10 }}>(selecting only available if location access is granted)</Text>
                </View>
                <Text style={{ color: 'white', fontSize: 25, paddingBottom: 5, fontFamily: 'AvenirNext-Bold' }}>Scan:</Text>
                <View style={{ alignSelf: 'center', height: (Dimensions.get('window').width - 140), width: (Dimensions.get('window').width - 120), borderRadius: 25, overflow: 'hidden' }}>
                    {camera}
                </View>
                <Text style={{ color: 'white', fontSize: 25, paddingTop: 15, fontFamily: 'AvenirNext-Bold' }}>Select:</Text>
                <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Avenir-Light', paddingHorizontal: 10, textAlign: 'center' }}>(scroll for more options; if your location is still not listed, please check-in by searching your business)</Text>
                <ScrollView style={{ width: Dimensions.get('window').width, height: 250 }}>
                    {hasLocationPermission ?
                        <View>{loadingNearest ? <Animated.View onLayout={fadeIn} style={{ opacity: fadeAnim }}><Outlines type='BusinessCard'></Outlines><Outlines type='BusinessCard'></Outlines></Animated.View> : <BusinessList type='nearest' navigation={navigation}></BusinessList>}</View> :
                        <View><Text style={{ textAlign: 'center', paddingHorizontal: 10, fontFamily: 'Avenir-Light' }}>For you to check-in through selection, Sizzle must have access to your location.</Text></View>}
                </ScrollView>
            </View>
        </View>
    );
};

const mapStateToProps = state => ({
    dbNearestBusinesses: state.business.dbNearestBusinesses,
    nearestBusinesses: state.business.nearestBusinesses,
    loadingNearest: state.business.loadingNearest,
    User: state.user,
    Auth: state.auth
});
export default connect(mapStateToProps, { getNearest, getBusiness, checkIn, updateUserWithoutReturn })(Checkin);