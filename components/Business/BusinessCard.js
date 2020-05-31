//distance, address are not live

import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace, textTruncateBySpaceTwo } from '../../utils/TextTruncate';
import { openBusinessPage } from '../../actions/business';
import { connect } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import { straightLineDistance, kmToMi } from '../../utils/businessUtils';
import * as Location from 'expo-location';

const BusinessCard = ({ business, navigation, db, openBusinessPage, User }) => {
    const [lineDistance, setLineDistance ] = useState('unknown');
    useEffect(() => {
        let distance = 0;
        async function fetchDistance () {
            distance = await getDistance();
            if (distance > 99){
                setLineDistance('>99mi');
            }
            else{
                setLineDistance(distance + 'mi');
            }
        }
        fetchDistance();
    }, []);

    let { vicinity, opening_hours } = business;
    let { isVerified, openStatus, coverImageUrl, population } = db;
    const onPress = () => {
        openBusinessPage(business, db);
        if (db.isVerified) {
            navigation.navigate('BusinessPage', { business: business, db: db });
        } else {
            navigation.navigate('UnverifiedBusinessPage', { business: business, db: db });
        }
    };

    //business verification
    let verified = <View></View>;
    if (isVerified === true) {
        verified = <MaterialIcons name='verified-user' color='lightgreen' size={getIconSize(18.5)} style={{ paddingBottom: 3 }}></MaterialIcons>;
    }
    let number = 9999999;
    //population display
    let popDisplay = <Text></Text>;
    if (db.population < 10) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'green', fontSize: getFontSize(20), fontWeight: 'bold' }}>{db.population}</Text>;
    }
    else if (db.population >= 10 && db.population < 50) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'orange', fontSize: getFontSize(20), fontWeight: 'bold' }}>{db.population}</Text>;
    }
    else if (db.population >= 50) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'red', fontSize: getFontSize(20), fontWeight: 'bold' }}>{db.population}</Text>;
    }
    else if (db.population >= 10000 && db.population <= 1000000) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'red', fontSize: getFontSize(20), fontWeight: 'bold' }}>{Math.trunc(9999/ 100)/10}k</Text>;
    }
    else if (db.population >= 1000000) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'red', fontSize: getFontSize(20), fontWeight: 'bold' }}>{Math.trunc(db.population / 100000)/10}m</Text>;
    }
    else {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'gray', fontSize: getFontSize(20), fontWeight: 'bold' }}>{db.population}</Text>;
    }

    //open status
    let openDisplay = <Text></Text>;
    let openPicture = <Image source={coverImageUrl ? { uri: coverImageUrl } : require('../../assets/logos/image_unavailable.png')} style={{ height: 115, width: 115 }}></Image>;
    if (isVerified === true){
        if (openStatus === true) {
            openDisplay = <Text style={{
                paddingHorizontal: 2, alignSelf: 'center', color: 'white', fontSize: getFontSize(12),
                borderColor: 'green', borderWidth: 1, paddingVertical: 1, backgroundColor: 'green'
            }}>Open</Text>;
        }
        else if (openStatus === false){
            openDisplay = <Text style={{
                alignSelf: 'center', color: 'white', fontSize: getFontSize(12),
                borderColor: 'red', borderWidth: 1, padding: 3, backgroundColor: 'red'
            }}>Closed</Text>;
        }
    }
    else {
        let openStatus2 = 2;
        try {
            if (business.opening_hours.open_now===false){
                openStatus2 = 0;
            }
            else if (business.opening_hours.open_now===true){
                openStatus2 = 1;
            }
        }
        catch(err){
            openStatus2 = 2;
        }
        if (openStatus2 === 1) {
            openDisplay = <Text style={{
                paddingHorizontal: 5, alignSelf: 'center', color: 'white', fontSize: getFontSize(12),
                borderColor: 'green', borderWidth: 1, padding: 2, backgroundColor: 'green'
            }}>Open</Text>;
        }
        else if (openStatus2 === 0){
            openDisplay = <Text style={{
                paddingHorizontal: 5, alignSelf: 'center', color: 'white', fontSize: getFontSize(12),
                borderColor: 'red', borderWidth: 1, padding: 2, backgroundColor: 'red'
            }}>Closed</Text>;
        }
        else if (openStatus2 === 2){
            openDisplay = <Text style={{
                paddingHorizontal: 5, alignSelf: 'center', color: 'white', fontSize: getFontSize(12),
                borderColor: 'gray', borderWidth: 1, padding: 2, backgroundColor: 'gray'
            }}>N/A</Text>;
        }
    }

    //distance
    const getDistance = async () => {
        let currentloc = User.user.location;
        let response = await Location.requestPermissionsAsync();
        if (response.granted){
            let loc = await Location.getLastKnownPositionAsync();
            let coords = loc.coords;
            currentloc = coords;
        }
        var mi = kmToMi(straightLineDistance(currentloc, { latitude: parseFloat(business.geometry.location.lat), longitude: parseFloat(business.geometry.location.lng) }));
        var rounded = Math.round(mi * 10) / 10;
        return rounded;
    };

    return (
        <View>
            <View style={styles.businessCardOuter}>
                <TouchableOpacity onPress={onPress} style={styles.businessCardInner}>
                    <View style={{ flex: 10 }}>
                        {openPicture}
                    </View>
                    <View style={{ flex: 17 }}>
                        <View style={{ flex: 5, paddingBottom: 8 }}>
                            <Text style={{ fontSize: getFontSize(20), paddingTop: 10, flexWrap: 'wrap' }}>{business.name.length > 33 ? textTruncateBySpaceTwo(33, business.name) : business.name}</Text>
                            <Text style={{ fontSize: getFontSize(12), paddingBottom: 5 }}>{textTruncateBySpaceTwo(33, vicinity)}</Text>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', paddingBottom: 10 }}>
                            {verified}
                            <View style={{ paddingBottom: 3 }}>
                                <Text style={{ borderRadius: 5, borderColor: 'black', color: 'black', borderWidth: 1, padding: 3, fontSize: getFontSize(10) }}>
                                    {lineDistance}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name='md-person' color='black' size={getIconSize(18.5)} />
                                {popDisplay}
                            </View>
                            <View style={{ paddingBottom: 3 }}>
                                {openDisplay}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View> 
        </View>
    );
};

const mapStateToProps = state => ({
    User: state.user
});
export default connect(mapStateToProps, { openBusinessPage })(BusinessCard);
