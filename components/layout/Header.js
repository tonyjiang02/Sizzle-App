import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

const Header = ({ getRegisteredBusinesses, getAll, navigation, businesses, loadingAll, dbBusinesses }) => {
    const onAccountPress = () => {
        navigation.navigate('Account', {navigation: navigation});
    };
    const onLandingPress = () => {
        navigation.navigate('Landing', {navigation: navigation});
    }
    const onCheckinPress = () => {
        navigation.navigate('Checkin', {navigation: navigation});
    }

    return (
        <View style={{height: 85, backgroundColor: '#ff9900', flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 3, paddingHorizontal: 10, justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={onAccountPress} style={{paddingBottom: 5}}>
                <View style={{borderWidth: 0.5, borderColor: 'white', paddingHorizontal: 2.5, paddingTop: 4, paddingBottom: 2, borderRadius: 12, flexDirection: 'row'}}>
                    <MaterialCommunityIcons name='account-circle' color='white' size={25} style={{paddingLeft: 1.5}}/>
                    <Text style={{alignSelf: 'center', paddingRight: 2, paddingLeft: 3, color: 'white', fontFamily: 'Avenir-Light', fontSize: 16}}>Account</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLandingPress}>
                <Image source={require( '../../assets/logos/Sizzle_White.png' )} style={{height: 25, width: 100, paddingBottom: 43}} ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCheckinPress} style={{ paddingBottom: 5 }}>
                <View style={{borderWidth: 0.5, borderColor: 'white', paddingHorizontal: 2.5, paddingTop: 4, paddingBottom: 2, borderRadius: 12, flexDirection: 'row', backgroundColor: 'white',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2.22,
            elevation: 3}}>
                    <MaterialCommunityIcons name='map-marker-check' color='#ff9900' size={25}/>
                    <Text style={{alignSelf: 'center', paddingRight: 3, color: '#ff9900', fontFamily: 'Avenir-Light', fontSize: 16}}>Check-in</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Header;