
import React, { useState, useEffect } from 'react';
import { View, TextInput, SafeAreaView, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { styles } from './Styles';
import Loading from './layout/Loading';
import Header from './layout/Header';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Octicons, Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Linking } from 'expo';
import { logout } from '../actions/auth';
import { getFontSize, getIconSize } from '../utils/fontsizes';
export const Account = ({ navigation, logout }) => {
    const [FAQModalVisible, setFAQVisible] = useState(false);
    const [contactModalVisible, setContactVisible] = useState(false);
    const openCheckInHistory = () => {
        navigation.navigate('BusinessHistoryList', {navigation: navigation});
    }
    const openFavorites = () => {
        navigation.navigate('Favorites', {navigation: navigation});
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
            <View style={{ backgroundColor: '#f2f2f2' }}>
                <Header navigation={navigation}></Header>
                <View style={{ paddingHorizontal: 15, paddingTop: 30 }}>
                    <TouchableOpacity onPress={openCheckInHistory} style={{ padding: 10 }}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                            shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                            elevation: 3, alignItems: 'center'
                        }}>
                            <MaterialCommunityIcons name='map-marker-check' color='#ff9900' size={35} style={{ paddingRight: 5 }} />
                            <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Check-in History</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openFavorites} style={{ padding: 10 }}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                            shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                            elevation: 3, alignItems: 'center'
                        }}>
                            <Ionicons name="md-heart" color='red' size={35} style={{ paddingLeft: 5, paddingRight: 10, paddingLeft: 2 }} />
                            <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Favorites</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ height: 30, backgroundColor: '#f2f2f2' }}></View>

                    <TouchableOpacity onPress={()=> Linking.openURL('https://www.szzl.app/privacy-policy')} style={{ padding: 10 }}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                            shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                            elevation: 3, alignItems: 'center'
                        }}>
                            <FontAwesome name='legal' color='black' size={30} style={{ paddingLeft: 5, paddingRight: 10 }} />
                            <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Privacy Policy</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFAQVisible(true)} style={{ padding: 10 }}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                            shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                            elevation: 3, alignItems: 'center'
                        }}>
                            <FontAwesome name='question-circle' color='black' size={35} style={{ paddingLeft: 5, paddingRight: 10 }} />
                            <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>FAQ</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setContactVisible(true)} style={{ padding: 10 }}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                            shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                            elevation: 3, alignItems: 'center'
                        }}>
                            <MaterialCommunityIcons name='email' color='black' size={35} style={{ paddingLeft: 5, paddingRight: 11 }} />
                            <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Contact</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ height: 30, backgroundColor: '#f2f2f2' }}></View>

                    <TouchableOpacity style={{ padding: 10 }} onPress={logout}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 5, backgroundColor: '#FDDFDF',
                            shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                            elevation: 3, alignItems: 'center'
                        }}>
                            <Octicons name='sign-out' color='black' size={35} style={{ alignSelf: 'center', paddingRight: 10, paddingTop: 10 }} />
                            <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Sign Out</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ height: 300, backgroundColor: '#f2f2f2' }}></View>
                </View>
            </View>
        </View>
    );
};


export default connect(null, { logout })(Account);