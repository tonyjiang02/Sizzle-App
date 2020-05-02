import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, ImageBackground } from 'react-native';
import { styles } from '../Styles';
import { Button } from 'react-native-elements';
import { checkIn, getBusiness } from '../../actions/business';
import { LinearGradient } from 'expo-linear-gradient';

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
                    <ImageBackground source={{ uri: 'https://picsum.photos/300/200' }} style={{ width: '100%', height: '100%' }}>
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.8)']}
                                style={{
                                flex: 3,
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                height: 350,
                            }}
                        />
                        <View style={{flex: 3, flexDirection: 'row', position: 'absolute', bottom: 60, alignItems: 'baseline'}}>
                            <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', paddingLeft: 20}}>{business.name}</Text>
                            <Text style={{color: 'lightgray', fontSize: 15, paddingHorizontal: 10, fontWeight: 'normal'}}>5.0 mi</Text>
                        </View>
                    </ImageBackground>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch', paddingHorizontal: 15}}>
                <Button color="#ff9900" title="Check In" onPress={onPressCheckIn} ></Button>
            </View>
            <View style={{ flex: 3 }}>
                
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
