import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const Header = () => {
    const onPress = () => {
        openBusinessPage(business, db);
        navigation.navigate('BusinessPage', { business: business, db: db });
    };

    return (
        <View style={{height: 80, backgroundColor: '#ff9900', flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 3, paddingHorizontal: 10, justifyContent: 'space-between'}}>
            <MaterialCommunityIcons name='checkbox-blank' color='#ff9900' size={35}></MaterialCommunityIcons>
            <Image source={require( '../../assets/logos/Sizzle_White.png' )} style={{height: 40, width: 130}} ></Image>
            <TouchableOpacity>
                <MaterialCommunityIcons name='map-marker-check' color='white' size={35}/>
            </TouchableOpacity>
        </View>
    );
};

export default Header;