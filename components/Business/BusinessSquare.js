import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { picture } from '../Styles';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { styles, COLORS } from '../Styles';
import { textTruncateBySpace, textTruncateBySpaceTwo } from '../../utils/TextTruncate';
import { straightLineDistance, kmToMi } from '../../utils/businessUtils';
import { openBusinessPage } from '../../actions/business';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import * as Location from 'expo-location';

const BusinessSquare = ({ business, navigation, db, openBusinessPage, type, User }) => {
    const [lineDistance, setLineDistance] = useState('N/A');
    let { vicinity, opening_hours } = business;
    let { isVerified, openStatus, coverImageUrl, population } = db;
    useEffect(() => {
        let distance = 0;
        async function fetchDistance() {
            distance = await getDistance();
            setLineDistance(distance + 'mi');
        }
        fetchDistance();
    }, []);
    const onPress = () => {
        openBusinessPage(business, db);
        if (db.isVerified) {
            navigation.navigate('BusinessPage', { business: business, db: db });
        } else {
            navigation.navigate('UnverifiedBusinessPage', { business: business, db: db });
        }
    };

    //if the business is verified
    let verifiedDisplay = <View></View>;
    let image = <Image style={{ height: '100%', width: '100%' }}></Image>;
    let openPictureStyle = styles.openPictureStyle;
    if (isVerified === true) {
        verifiedDisplay = <MaterialIcons name='verified-user' color='lightgreen' size={getIconSize(18)} style={{ paddingLeft: 5 }}></MaterialIcons>;
        image = <Image source={coverImageUrl ? { uri: coverImageUrl } : require('../../assets/logos/image_unavailable.png')} style={openPictureStyle}></Image>;
    }
    if (isVerified === false) {
        image = <Image source={require('../../assets/logos/image_unavailable.png')} style={openPictureStyle}></Image>;
    }

    //population display
    let popDisplay = <Text></Text>;
    if (population < 10) {
        popDisplay = <Text style={{ paddingLeft: 1, alignSelf: 'center', color: 'green', fontSize: getFontSize(20), fontWeight: 'bold' }}>{population}</Text>;
    }
    else if (population >= 10 && population < 50) {
        popDisplay = <Text style={{ paddingLeft: 3, alignSelf: 'center', color: 'orange', fontSize: getFontSize(20), fontWeight: 'bold' }}>{population}</Text>;
    }
    else if (population >= 50) {
        popDisplay = <Text style={{ paddingLeft: 3, alignSelf: 'center', color: 'red', fontSize: getFontSize(20), fontWeight: 'bold' }}>{population}</Text>;
    }
    else {
        popDisplay = <Text style={{ paddingLeft: 3, alignSelf: 'center', color: 'gray', fontSize: getFontSize(20), fontWeight: 'bold' }}>{population}</Text>;
    }

    //open status
    let openDisplay = <Text></Text>;
    if (isVerified === true) {
        if (openStatus === true) {
            openDisplay = <Text style={{
                paddingHorizontal: 2, alignSelf: 'center', color: 'white', fontSize: getFontSize(12),
                borderColor: 'green', borderWidth: 1, paddingVertical: 1, backgroundColor: 'green'
            }}>Open</Text>;
        }
        else if (openStatus === false) {
            openDisplay = <Text style={{
                alignSelf: 'center', color: 'white', fontSize: getFontSize(12),
                borderColor: 'red', borderWidth: 1, padding: 3, backgroundColor: 'red'
            }}>Closed</Text>;
        }
    }
    else {
        let openStatus2 = 2;
        try {
            if (business.opening_hours.open_now === false) {
                openStatus2 = 0;
            }
            else if (business.opening_hours.open_now === true) {
                openStatus2 = 1;
            }
        }
        catch (err) {
            openStatus2 = 2;
        }
        if (openStatus2 === 1) {
            openDisplay = <Text style={{
                paddingHorizontal: 5, alignSelf: 'center', color: 'white', fontSize: getFontSize(12),
                borderColor: 'green', borderWidth: 1, padding: 2, backgroundColor: 'green'
            }}>Open</Text>;
        }
        else if (openStatus2 === 0) {
            openDisplay = <Text style={{
                paddingHorizontal: 5, alignSelf: 'center', color: 'white', fontSize: getFontSize(12),
                borderColor: 'red', borderWidth: 1, padding: 2, backgroundColor: 'red'
            }}>Closed</Text>;
        }
        else if (openStatus2 === 2) {
            openDisplay = <Text style={{
                paddingHorizontal: 5, alignSelf: 'center', color: 'white', fontSize: getFontSize(12),
                borderColor: 'gray', borderWidth: 1, padding: 2, backgroundColor: 'gray'
            }}>N/A</Text>;
        }
    }

    //distance
    const getDistance = async () => {
        let currentLoc = User.user.location;
        let response = await Location.requestPermissionsAsync();
        if (response.granted) {
            let loc = await Location.getLastKnownPositionAsync();
            let coords = loc.coords;
            currentLoc = coords;
        }
        var mi = kmToMi(straightLineDistance(currentLoc, { latitude: parseFloat(business.geometry.location.lat), longitude: parseFloat(business.geometry.location.lng) }));
        var rounded = Math.round(mi * 10) / 10;
        return rounded;
    };

    return (
        <TouchableOpacity style={styles.businessSquareOuter} onPress={onPress}>
            <View style={styles.businessSquareInner}>
                {image}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Text style={{ fontSize: getFontSize(18) }}>{business.name.length > 20 ? textTruncateBySpaceTwo(20, business.name) : business.name}</Text>
                    {verifiedDisplay}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', flex: 1, paddingBottom: 3 }}>
                    <Text style={{ borderRadius: 5, borderColor: 'black', color: 'black', borderWidth: 1, padding: 2, fontSize: getFontSize(12) }}>
                        {lineDistance}
                    </Text>
                    <View style={{ paddingLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name='md-person' color='black' size={getIconSize(18.5)} />
                        {popDisplay}
                    </View>
                    <View style={{ paddingLeft: 20 }}>
                        {openDisplay}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
const mapStateToProps = state => ({
    User: state.user
});
export default connect(mapStateToProps, { openBusinessPage })(BusinessSquare);
