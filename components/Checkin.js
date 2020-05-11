
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
import { Camera } from 'expo-camera';
import { Dimensions } from 'react-native';
import BusinessCard from './Business/BusinessCard';
import Outlines from '../assets/Outlines';

export const Checkin = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View>
            <Header navigation={navigation}></Header>
            <View style={{paddingTop: 20, alignItems: 'center'}}>
                <Text style={{color: '#ff9900', fontSize: 30, paddingBottom: 5, fontFamily: 'AvenirNext-Bold'}}>Scan:</Text>
                <View style={{alignSelf: 'center', shadowColor: "#000",
                    shadowOffset: {
                    width: 0,
                    height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5}}>
                    <Camera style={{height: 280, width: (Dimensions.get('window').width-50)}} type={type}>
                        <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        </View>
                    </Camera>
                </View>
                <Text style={{color: '#ff9900', fontSize: 30, paddingBottom: 5, paddingTop: 15, fontFamily: 'AvenirNext-Bold'}}>Select:</Text>
                <View>
                    <Outlines type='BusinessCard'></Outlines>
                    <Outlines type='BusinessCard'></Outlines>
                </View>
            </View>
        </View>
    );
};


export default Checkin;