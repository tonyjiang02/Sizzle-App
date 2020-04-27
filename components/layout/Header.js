import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';

const Header = () => {
    return (
        <View style={styles.headerStyle}>
            <Image source={require( '../../assets/Sizzle_White.png' )} style={{height: 30, width: 120, alignSelf: 'center'}} ></Image>
        </View>
    );
};

export default Header;
