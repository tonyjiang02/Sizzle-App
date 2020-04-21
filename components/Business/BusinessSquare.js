import React from 'react';
import { View, Image, Text } from 'react-native';

const BusinessSquare = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 2 }}>
                <Image source={{ uri: 'https://picsum.photos/200/300' }} style={{ height: '100%', width: 150 }}></Image>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Test</Text>
            </View>
        </View>
    );
};

export default BusinessSquare;
