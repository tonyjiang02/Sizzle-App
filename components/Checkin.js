
import React, { useState, useEffect } from 'react';
import { View, TextInput, SafeAreaView, Text, Linking } from 'react-native';
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
import Outlines from '../assets/Outlines';

export const Checkin = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [scanned, setScanned] = useState(false);

    let camera = <View></View>;

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        Linking.openURL(data);
      };

    const noPermissionDisplay = <Text style={{alignSelf: 'center', color: 'white', paddingTop: 30}}>Sizzle currently has no access to your camera. Please go to "Settings" and change your camera permissions.</Text>;
    
    camera = hasPermission ?  <Camera style={{height: (Dimensions.get('window').width-150), width: (Dimensions.get('window').width-130)}} type={type}
    barCodeScannerSettings={{barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]}} onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}>
<View style={{flex: 1, backgroundColor: 'transparent'}}></View>
</Camera> : noPermissionDisplay

    return (
        <View style={{backgroundColor: '#ff9900'}}>
            <Header navigation={navigation}></Header>
            <View style={{borderBottomWidth: 0.5, borderBottomColor: 'white'}}></View>
            <View style={{padding: 20, alignItems: 'center'}}>
                <View style={{paddingBottom: 5, alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <Text style={{color: 'white', fontSize: 18, fontFamily: 'Avenir-Light', paddingHorizontal: 10, paddingBottom: 3}}>Check-in through scanning a</Text>
                        <FontAwesome name='qrcode' size={22} color='white'></FontAwesome>
                    </View>
                    <View>
                        <Text style={{color: 'white', fontSize: 18, fontFamily: 'Avenir-Light', paddingHorizontal: 10, fontWeight: 'bold'}}>OR</Text>
                    </View>
                    <Text style={{color: 'white', fontSize: 18, fontFamily: 'Avenir-Light', paddingHorizontal: 10}}>selecting an option below</Text>
                    <Text style={{color: 'white', fontSize: 12, fontFamily: 'Avenir-Light', paddingHorizontal: 10}}>(selecting only available if location access is granted)</Text>
                </View>
                <Text style={{color: 'white', fontSize: 25, paddingBottom: 5, fontFamily: 'AvenirNext-Bold'}}>Scan:</Text>
                <View style={{alignSelf: 'center', height: (Dimensions.get('window').width-150), width: (Dimensions.get('window').width-130), borderRadius: 25, overflow: 'hidden'}}>
                    {camera}
                </View>
                <Text style={{color: 'white', fontSize: 25, paddingTop: 15, fontFamily: 'AvenirNext-Bold'}}>Select:</Text>
                <ScrollView style={{width: Dimensions.get('window').width, height: 250}}>
                    <Outlines type='BusinessCard'></Outlines>
                    <Outlines type='BusinessCard'></Outlines>
                    <Outlines type='BusinessCard'></Outlines>
                    <Outlines type='BusinessCard'></Outlines>
                    <View style={{backgroundColor: '#ff9900'}}></View>
                </ScrollView>
                <View style={{height: 500, backgroundColor: '#ff9900'}}></View>
            </View>
        </View>
    );
};


export default Checkin;