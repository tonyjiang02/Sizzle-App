import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text } from 'react-native';
import { styles } from '../Styles';
import { Button } from 'react-native-elements';
import { checkIn } from '../../actions/business';
const BusinessPage = ({ route: { params: { business } }, checkIn }) => {
    const onPressCheckIn = () => {
        checkIn(business.place_id);
    };
    return (
        <View style={styles.defaultView}>
            <View style={{ flex: 3 }}>
                <Image source={{ uri: 'https://picsum.photos/300/200' }} style={{ width: '100%', height: '100%' }}></Image>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alingItems: 'center' }}>
                <Button title="Check In" onPress={onPressCheckIn}></Button>
            </View>
            <View style={{ flex: 3 }}>
                <Text>{business.name}</Text>
                <Text>This is a description</Text>
            </View>
        </View>
    );
};

export default connect(null, { checkIn })(BusinessPage);
