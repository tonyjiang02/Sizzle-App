import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';

const Header = () => {
    const onPress = () => {
        openBusinessPage(business, db);
        navigation.navigate('BusinessPage', { business: business, db: db });
    };

    return (
        <View style={styles.headerStyle}>
            <View style={{height: 30, width: 30, marginRight: 50}}></View>
            <Image source={require( '../../assets/Sizzle_White.png' )} style={{height: 35, width: 120}} ></Image>
            <TouchableOpacity>
                <Image source={require('../../assets/checkin_button1.png')} style={{height: 35, width: 35, marginLeft: 50}}></Image>
            </TouchableOpacity>
        </View>
    );
};

export default Header;