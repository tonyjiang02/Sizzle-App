
import React, { useState, useEffect } from 'react';
import { View, TextInput, SafeAreaView, Text, Dimensions, TouchableWithoutFeedback, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { styles } from './Styles';
import Loading from './layout/Loading';
import Header from './layout/Header';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Octicons, Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons, FontAwesome, EvilIcons, Entypo } from '@expo/vector-icons';
import { Linking } from 'expo';
import { logout } from '../actions/auth';
import { updateUser, updateUserWithoutReturn } from '../actions/user';
import { newLocation } from '../actions/business';
import * as Location from 'expo-location';
import {getCoords, reverseCoords } from '../utils/businessUtils';
import { getFontSize, getIconSize } from '../utils/fontsizes';
import { LinearGradient } from 'expo-linear-gradient';
export const Account = ({ navigation, logout, User, newLocation, updateUser, updateUserRedux }) => {
    const [FAQModalVisible, setFAQVisible] = useState(false);
    const [contactModalVisible, setContactVisible] = useState(false);
    const [locationInfoModalVisible, setLocationInfoVisible] = useState(false);
    const [location, updateLocation] = useState("");
    const [locDisplay, updateLocDisplay] = useState("");

    const openCheckInHistory = () => {
        navigation.navigate('BusinessHistoryList', {navigation: navigation});
    }
    const openFavorites = () => {
        navigation.navigate('Favorites', {navigation: navigation});
    }

    const openUserReservations = () => {
        navigation.navigate('UserReservations', {navigation: navigation});
    }

    const emailDisplay = () => {
        if (User.loadingUser === false){
            return User.user.email;
        }
    }

    useEffect(() => {
        console.log('running start useEffect from Account')
        const updateLocationDisplay = async () => {
            if (User.loadingUser === false){
                console.log('refreshing loc');
                console.log(User.location);
                if (User.location.latitude != 0 && User.location.longitude != 0){
                    let reverse = await reverseCoords(User.location.latitude, User.location.longitude);
                    let city = "";
                    let county = "";
                    let state="";
                    if (typeof reverse.address.city !== 'undefined'){
                        city = reverse.address.city + ", "
                    }
                    if (typeof reverse.address.county !== 'undefined'){
                        county = reverse.address.county + ", "
                    }
                    let display = city + county + reverse.address.state;
                    console.log(display);
                    updateLocDisplay(display);
                }
                else{
                    updateLocDisplay("Unknown/Unavailable");
                }
            }
        }
        updateLocationDisplay();
    }, []);

    useEffect(() => {
        const updateLocationDisplay = async () => {
            if (User.loadingUser === false){
                if (User.location.latitude != 0 && User.location.longitude != 0){
                    let reverse = await reverseCoords(User.location.latitude, User.location.longitude);
                    let city = "";
                    let county = "";
                    let state="";
                    if (typeof reverse.address.city !== 'undefined'){
                        city = reverse.address.city + ", "
                    }
                    if (typeof reverse.address.county !== 'undefined'){
                        county = reverse.address.county + ", "
                    }
                    let display = city + county + reverse.address.state;
                    updateLocDisplay(display);
                }
                else{
                    updateLocDisplay("Unknown/Unavailable");
                }
            }
        }
        if (User.newLocationSet){
            console.log('running newLocationSet useEffect from Account');
            updateLocationDisplay();
        }
    }, [User.newLocationSet])

    const setNewLocation = async function (input) {
        let coords = await getCoords(input);
        console.log(coords);
        newLocation(coords);
    };

    const getCurrentLocation = async () => {
        console.log('getting loc permissions');
        let response = await Location.requestPermissionsAsync();
        if (response.granted){
            let location = await Location.getLastKnownPositionAsync();
            newLocation(location.coords);
        }
        else {
            Alert.alert('Location Permissions not granted. To see nearby businesses from your current location, please either allow location permissions or enter your current location in the "Set Location" search bar.');
        }
    }

    return (
        <View>
            <Modal
                propagateSwipe={true}
                isVisible={FAQModalVisible}
                backdropColor={"white"}
                backdropOpacity={0.8}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                animationInTiming={500}
                swipeDirection={['down']}
                onSwipeComplete={(e) => { if (e.swipingDirection === 'down') setFAQVisible(false); }}
            >
                <View style={styles.introModalView}>
                    <TouchableOpacity onPress={() => { setFAQVisible(false) }}>
                        <View style={{ height: 10 }}></View>
                        <AntDesign name='downcircle' color='black' size={25} style={{ alignSelf: 'center'}}></AntDesign>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'center'}}>
                        <FontAwesome name='question-circle' color='black' size={30} style={{ paddingRight: 10 }} />
                        <Text style={{ color: '#323131', fontSize: getFontSize(24), fontFamily: 'AvenirNext-Bold' }}>FAQ</Text>
                    </View>
                    <ScrollView>
                        <TouchableWithoutFeedback>
                            <View>
                                <View style={{padding: 10}}>
                                    <Text style={{ color: '#323131', fontSize: getFontSize(18), fontFamily: 'AvenirNext-Bold' }}>Does Sizzle ever release my location?</Text>
                                    <View style={{height: 5}}></View>
                                    <Text style={{ color: '#323131', fontSize: getFontSize(14), fontFamily: 'Avenir' }}>Sizzle will never release your location. Our 
                                    population counters are increased anonymously through user check-in. Other users will not be able to see who specifically is where at a certain 
                                    time.</Text>
                                </View>
                                <View style={{padding: 10}}>
                                    <Text style={{ color: '#323131', fontSize: getFontSize(18), fontFamily: 'AvenirNext-Bold' }}>What if I don't want to allow location access?</Text>
                                    <View style={{height: 5}}></View>
                                    <Text style={{ color: '#323131', fontSize: getFontSize(14), fontFamily: 'Avenir' }}>Users can check-in through selecting a location they are within
                                    (which requires location access) or scanning a QR code displayed directly outside the location (which doesn't require location access). Therefore, 
                                    at verified Sizzle locations, please locate the QR code and scan to check-in.</Text>
                                </View>
                                <View style={{padding: 10}}>
                                    <Text style={{ color: '#323131', fontSize: getFontSize(18), fontFamily: 'AvenirNext-Bold' }}>What does checking in do?</Text>
                                    <View style={{height: 5}}></View>
                                    <Text style={{ color: '#323131', fontSize: getFontSize(14), fontFamily: 'Avenir' }}>Checking in allows your community to get a more accurate live 
                                    population count, which can then help them with their decision of visiting a location. Sizzle also keeps your check-in history, which you can currently 
                                    personally review. In the near future, checking in at every location you visit will also allow full functionality (and provide the most accurate results) 
                                    for the Voluntary Contact Tracing Program, which can then notify you of possible COVID-19 or illness exposure. Read "What is Voluntary Contact Tracing?" for 
                                    more details. </Text>
                                </View>
                                <View style={{padding: 10}}>
                                    <Text style={{ color: '#323131', fontSize: getFontSize(18), fontFamily: 'AvenirNext-Bold' }}>What is Voluntary Contact Tracing?</Text>
                                    <View style={{height: 5}}></View>
                                    <Text style={{ color: '#323131', fontSize: getFontSize(14), fontFamily: 'Avenir' }}>The Sizzle Team is currently working on a Voluntary Contact Tracing
                                    system, in which users can self-report symptoms or positive COVID-19 testings through our app. This will then notify all other users who have checked
                                    in at the same location at the same time with a warning of potential COVID-19 exposure and an estimated percentage of contraction. Please be advised that
                                    Sizzle is not working as a health organization; we are providing you with information that we hope you can find useful. For medical issues and inquiries, 
                                    please contact your local medical provider.</Text>
                                </View>
                                <View style={{padding: 10}}>
                                    <Text style={{ color: '#323131', fontSize: getFontSize(18), fontFamily: 'AvenirNext-Bold', textAlign: 'center' }}>For any further questions, 
                                    please email support@szzl.app</Text>
                                    <View style={{height: 5}}></View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
            </Modal>
            <Modal
                propagateSwipe={true}
                isVisible={contactModalVisible}
                backdropColor={"white"}
                backdropOpacity={0.8}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                animationInTiming={500}
                swipeDirection={['down']}
                onSwipeComplete={(e) => { if (e.swipingDirection === 'down') setContactVisible(false); }}
            >
                <View style={styles.introModalView}>
                    <TouchableOpacity onPress={() => { setContactVisible(false) }}>
                        <View style={{ height: 10 }}></View>
                        <AntDesign name='downcircle' color='black' size={25} style={{ alignSelf: 'center'}}></AntDesign>
                    </TouchableOpacity>
                    <View style={{height: 5}}></View>
                    <Text style={{ color: '#323131', fontSize: getFontSize(18), fontFamily: 'AvenirNext-Bold', textAlign: 'center' }}>To contact the Sizzle Team, 
                        please email support@szzl.app
                    </Text>
                    <View style={{height: 10}}></View>
                </View>
            </Modal>
            <Modal
                propagateSwipe={true}
                isVisible={locationInfoModalVisible}
                backdropColor={"white"}
                backdropOpacity={0.8}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                animationInTiming={500}
                swipeDirection={['down']}
                onSwipeComplete={(e) => { if (e.swipingDirection === 'down') setLocationInfoVisible(false); }}
            >
                <View style={styles.introModalView}>
                    <TouchableOpacity onPress={() => { setLocationInfoVisible(false) }}>
                        <View style={{ height: 10 }}></View>
                        <AntDesign name='downcircle' color='black' size={25} style={{ alignSelf: 'center'}}></AntDesign>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Entypo name='info-with-circle' color='black' size={22} style={{ paddingRight: 10 }} />
                        <Text style={{ color: 'black', fontSize: getFontSize(24), fontFamily: 'AvenirNext-Bold' }}>Info: Set Location</Text>
                    </View>
                    <View>
                        <View style={{padding: 10}}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                            <Text style={{fontWeight: 'bold', fontFamily: 'Avenir-Light'}}>
                                For users that share their location: 
                            </Text>
                            <Text style={{fontFamily: 'Avenir-Light'}}>
                            Sizzle already has permission to your
                            location, so all of your results are automatically filtered to be nearby your current location. If you truly desire to change your location from where you actually
                            are currently, you can do so here. Tapping on the blue arrow will reset your location to your actual current location.
                            </Text>
                        </View>
                        <View style={{height: 15}}></View>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}></View>
                            <Text style={{fontWeight: 'bold', fontFamily: 'Avenir-Light'}}>
                                For users not sharing their location:
                            </Text>
                            <Text style={{fontFamily: 'Avenir-Light'}}>
                            Sizzle currently does not have access
                            to your location. Therefore, you must set your location so Sizzle can provide results near you.
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <View>
                <Header navigation={navigation}></Header>
                <LinearGradient
                    colors={['#ff9900', '#ff5f6d', '#ff5f6d']}
                >
                <ScrollView style={{ paddingHorizontal: 15, paddingTop: 15 }}>
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <View style={{flex: 1}}>
                            <Text style={{fontFamily: "Avenir-Light", fontWeight: 'bold', color: 'white'}}>Current login: </Text>
                        </View>
                        <View style={{flex: 2, alignItems: 'flex-start', paddingLeft: 10}}>
                            <Text style={{fontFamily: 'Avenir-Light', color: 'white'}}>{emailDisplay()}</Text>
                        </View>
                    </View>
                    <View style={{height: 5}}></View>
                    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <View style={{flex: 1}}>
                            <Text style={{fontFamily: "Avenir-Light", fontWeight: 'bold', color: 'white'}}>Current location: </Text>
                        </View>
                        <View style={{flex: 2, alignItems: 'flex-start', paddingLeft: 10}}>
                            <Text style={{fontFamily: 'Avenir-Light', color: 'white'}}>{locDisplay}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => setLocationInfoVisible(true)}>
                            <Entypo name="info-with-circle" color='white' size={getIconSize(18)}></Entypo>
                        </TouchableOpacity>
                        <SearchBar
                            placeholder="Set Location"
                            searchIcon={<EvilIcons name="location" size={getIconSize(18.5) } color='gray'></EvilIcons>}
                            onChangeText={(text) => updateLocation(text)}
                            defaultValue={location}
                            cancelButtonProps={{disabled: true, buttonStyle: {width: 8}}}
                            value={location}
                            platform={"ios"}
                            containerStyle={{
                                paddingTop: 10,
                                width: Dimensions.get('window').width-100,
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
                            onSubmitEditing={(e) => setNewLocation(e.nativeEvent.text)}
                        />
                        <View style={{paddingBottom: 2, shadowColor: "#000",shadowOffset: {width: 0,height: 0.5,},shadowOpacity: 0.4,shadowRadius: 1.22,elevation: 1,}}>
                            <TouchableOpacity onPress={getCurrentLocation} style={{backgroundColor: 'white', borderRadius: 5,justifyContent: 'center', alignItems: 'center', height: 45, width: 45}}>
                                    <FontAwesome5 name='location-arrow' size={18} color='lightblue'></FontAwesome5>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ height: 30, backgroundColor: 'transparent' }}></View>

                    <TouchableOpacity onPress={openCheckInHistory} style={{ padding: 10 }}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                            shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                            elevation: 3, alignItems: 'center', borderRadius: 10
                        }}>
                            <MaterialCommunityIcons name='map-marker-check' color='#ff9900' size={35} style={{ paddingRight: 5 }} />
                            <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Check-in History</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openFavorites} style={{ padding: 10 }}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                            shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                            elevation: 3, alignItems: 'center', borderRadius: 10
                        }}>
                            <Ionicons name="md-heart" color='red' size={35} style={{ paddingLeft: 5, paddingRight: 10, paddingLeft: 2 }} />
                            <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Favorites</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openUserReservations} style={{ padding: 10 }}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                            shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                            elevation: 3, alignItems: 'center', borderRadius: 10
                        }}>
                            <MaterialCommunityIcons name="clock" size={35} color='green' style={{ paddingRight: 5 }}></MaterialCommunityIcons>
                            <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Reservations</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ height: 30, backgroundColor: 'transparent' }}></View>

                    <TouchableOpacity onPress={()=> Linking.openURL('https://www.szzl.app/privacy-policy')} style={{ padding: 10 }}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                            shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                            elevation: 3, alignItems: 'center', borderRadius: 10
                        }}>
                            <FontAwesome name='legal' color='black' size={30} style={{ paddingLeft: 5, paddingRight: 10 }} />
                            <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Privacy Policy</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFAQVisible(true)} style={{ padding: 10 }}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                            shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                            elevation: 3, alignItems: 'center', borderRadius: 10
                        }}>
                            <FontAwesome name='question-circle' color='black' size={35} style={{ paddingLeft: 5, paddingRight: 10 }} />
                            <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>FAQ</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setContactVisible(true)} style={{ padding: 10 }}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                            shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                            elevation: 3, alignItems: 'center', borderRadius: 10
                        }}>
                            <MaterialCommunityIcons name='email' color='black' size={35} style={{ paddingLeft: 5, paddingRight: 11 }} />
                            <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Contact</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ height: 30, backgroundColor: 'transparent' }}></View>

                    <TouchableOpacity style={{ padding: 10 }} onPress={logout}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 5, backgroundColor: 'white',
                            shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                            elevation: 3, alignItems: 'center', borderRadius: 10
                        }}>
                            <Octicons name='sign-out' color='red' size={35} style={{ alignSelf: 'center', paddingRight: 10, paddingTop: 10 }} />
                            <Text style={{ color: 'red', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Sign Out</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ height: 350, backgroundColor: 'transparent' }}></View>
                </ScrollView>
            </LinearGradient>
            </View>
        </View>
    );
};

const mapStateToProps = state => ({
    User: state.user
});


export default connect(mapStateToProps, { logout, newLocation, updateUser, updateUserWithoutReturn })(Account);