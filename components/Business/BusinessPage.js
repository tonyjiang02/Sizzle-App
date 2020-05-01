import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text } from 'react-native';
import { styles } from '../Styles';
import { Button } from 'react-native-elements';
import { checkIn, getBusiness } from '../../actions/business';
const BusinessPage = ({ route: { params: { business, db } }, checkIn, population }) => {
    const onPressCheckIn = () => {
        checkIn(business.place_id);
    };
    const refresh = () => {
        getBusiness(business.place_id, db._id);
    };
    useEffect(() => {
        console.log(db);
    });
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
                <Text>{population != null ? population : "Loading..."}</Text>
            </View>
        </View>
    );
};
const mapStateToProps = state => ({
    population: state.business.dbBusiness.population
});
export default connect(mapStateToProps, { checkIn })(BusinessPage);
