
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, SafeAreaView, Text, Linking } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { styles } from './Styles';
import Loading from './layout/Loading';
import Header from './layout/Header';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Octicons, Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Dimensions } from 'react-native'; 
import BusinessCard from './Business/BusinessCard';
import { getFontSize, getIconSize } from '../utils/fontsizes';
import Outlines from '../assets/Outlines';

export const Checkin = ({navigation}) => {
    var timedate = new Date("October 13, 2020 11:13:00");
    let time = timedate.toUTCString();
    time = time.substring(0, time.length-3);
    
    return (
        <View style={{backgroundColor: '#ff9900', height: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
            <Header navigation={navigation}></Header>
            <View style={{borderBottomWidth: 0.5, borderBottomColor: 'white'}}></View>
            <View style={{padding: 20, alignItems: 'center'}}>
                <View style={{paddingBottom: 5, alignItems: 'center'}}>
                    <View style={{height: 50}}></View>
                        <MaterialCommunityIcons name='map-marker-check' color='white' size={getIconSize(30)} />
                    <Text style={{color: 'white', fontSize: getFontSize(24), fontFamily: 'AvenirNext-Bold', paddingHorizontal: 10}}>You are now checked in at</Text>
                </View>
                <Outlines type='BusinessSquare'></Outlines>
                <View style={{paddingTop: 15}}>
                    <Text style={{fontFamily: 'Avenir-Light', color: 'white', fontSize: getFontSize(19)}}>{time}</Text>
                </View>
                <View style={{paddingTop: 50, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{textAlign: 'center', fontFamily: 'Avenir-Heavy', color: 'white', fontSize: getFontSize(19)}}>
                        Sizzle will automatically check-out from this location after an hour. Stay Safe!</Text>
                </View>
            </View>
        </View>
    );
};


export default Checkin;