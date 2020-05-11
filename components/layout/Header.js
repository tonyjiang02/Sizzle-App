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
        <View style={{height: 85, backgroundColor: '#ff9900', flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 3, paddingHorizontal: 10, justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={onAccountPress}>
                <MaterialCommunityIcons name='account-circle' color='white' size={35}></MaterialCommunityIcons>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLandingPress}>
                <Image source={require( '../../assets/logos/Sizzle_White.png' )} style={{height: 40, width: 130}} ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCheckinPress}>
                <MaterialCommunityIcons name='map-marker-check' color='white' size={35}/>
            </TouchableOpacity>
        </View>
    );
};

export default Header;