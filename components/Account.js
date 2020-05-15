/*
Previously Checked In
Favorites

Legal
Terms of Service
Support

Sign out
*/

import React, { useState, useEffect } from 'react';
import { View, TextInput, SafeAreaView, Text } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { styles } from './Styles';
import Loading from './layout/Loading';
import Header from './layout/Header';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Octicons, Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { logout } from '../actions/auth';
export const Account = ({ navigation, logout }) => {
    return (
        <View style={{ backgroundColor: '#f2f2f2' }}>
            <Header navigation={navigation}></Header>
            <View style={{ paddingHorizontal: 15, paddingTop: 30 }}>
                <TouchableOpacity style={{ padding: 10 }}>
                    <View style={{
                        flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                        shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                        elevation: 3, alignItems: 'center'
                    }}>
                        <MaterialCommunityIcons name='map-marker-check' color='#ff9900' size={35} style={{ paddingRight: 5 }} />
                        <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Check-in History</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10 }}>
                    <View style={{
                        flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                        shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                        elevation: 3, alignItems: 'center'
                    }}>
                        <Ionicons name="md-heart" color='red' size={35} style={{ paddingLeft: 8, paddingRight: 10, paddingLeft: 2 }} />
                        <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Favorites</Text>
                    </View>
                </TouchableOpacity>

                <View style={{ height: 30, backgroundColor: '#f2f2f2' }}></View>

                <TouchableOpacity style={{ padding: 10 }}>
                    <View style={{
                        flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                        shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                        elevation: 3, alignItems: 'center'
                    }}>
                        <FontAwesome name='legal' color='black' size={30} style={{ paddingLeft: 10, paddingRight: 10 }} />
                        <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Legal</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10 }}>
                    <View style={{
                        flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                        shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                        elevation: 3, alignItems: 'center'
                    }}>
                        <Ionicons name='ios-paper' color='black' size={35} style={{ paddingLeft: 10, paddingRight: 10 }} />
                        <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Terms of Service</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10 }}>
                    <View style={{
                        flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                        shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                        elevation: 3, alignItems: 'center'
                    }}>
                        <FontAwesome name='support' color='black' size={35} style={{ paddingLeft: 8, paddingRight: 10 }} />
                        <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Support</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 10 }}>
                    <View style={{
                        flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'white',
                        shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
                        elevation: 3, alignItems: 'center'
                    }}>
                        <MaterialCommunityIcons name='thumbs-up-down' color='black' size={35} style={{ paddingLeft: 8, paddingRight: 11 }} />
                        <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Feedback</Text>
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
    );
};


export default connect(null, { logout })(Account);