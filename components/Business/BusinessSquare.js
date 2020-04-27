import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { picture } from '../Styles';
import { SearchBar } from 'react-native-elements';
const BusinessSquare = ({ business, navigation, db: { population, googleId, name } }) => {
    //single business
    useEffect(() => {
        console.log("Rendered Business Square");
    });
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 2 }}>
                <Image source={{ uri: 'https://picsum.photos/200/300' }} style={{ height: '100%', width: 150 }}></Image>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Name</Text>
                <Text>Population</Text>
            </View>
        </View>
    );
};

export default BusinessSquare;
