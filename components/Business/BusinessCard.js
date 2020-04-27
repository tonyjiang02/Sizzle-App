import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';
const BusinessCard = ({ business, navigation }) => {
    useEffect(() => {
    }, []);
    const onPress = () => {
        navigation.navigate('BusinessPage', { business: business });
    };

    return (
        <TouchableOpacity onPress={onPress} style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
                <Image source={{ uri: 'https://picsum.photos/200/200' }} style={{ height: 100, width: 100 }}></Image>
            </View>
            <View style={{ flex: 2 }}>
                <Text style={{ flex: 1 }}>testbusiness</Text>
                <Text style={{ flex: 2, flexWrap: 'wrap' }} adjustsFontSizeToFit>testdescription</Text>
            </View>
        </TouchableOpacity>
    );
};

export default BusinessCard;
