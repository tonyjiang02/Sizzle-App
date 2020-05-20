//distance, address are not live

import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace, textTruncateBySpaceTwo } from '../../utils/TextTruncate';
import { openBusinessPage } from '../../actions/business';
import { connect } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getFontSize, getIconSize } from '../../utils/fontsizes';

const BusinessCard = ({ business, navigation, db, openBusinessPage }) => {
    useEffect(() => {
    }, []);
    let { vicinity } = business;
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
        popDisplay = <Text style={{ paddingLeft: 3, color: 'red', fontSize: getFontSize(20), fontWeight: 'bold' }}>{Math.trunc(db.population / 1000)}k</Text>;
    }
    else if (db.population >= 1000000) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'red', fontSize: getFontSize(20), fontWeight: 'bold' }}>{Math.trunc(db.population / 1000000)}m</Text>;
    }
    else {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'gray', fontSize: getFontSize(20), fontWeight: 'bold' }}>{db.population}</Text>;
    }

    //open status
    let openDisplay = <Text></Text>;
    let openPicture = <Image source={coverImageUrl ? { uri: coverImageUrl } : require('../../assets/logos/image_unavailable.png')} style={{ height: 115, width: 115 }}></Image>;

    // if (openStatus === true) {
    //     openDisplay = <Text style={{
    //         paddingHorizontal: 2, alignSelf: 'center', color: 'white', fontSize: getFontSize(12),
    //         borderColor: 'green', borderWidth: 1, paddingVertical: 1, backgroundColor: 'green'
    //     }}>Open</Text>;
    // }
    // else {
    //     openDisplay = <Text style={{
    //         alignSelf: 'center', color: 'white', fontSize: getFontSize(12),
    //         borderColor: 'red', borderWidth: 1, padding: 3, backgroundColor: 'red'
    //     }}>Closed</Text>;
    // }

    return (
        <View style={styles.businessCardOuter}>
            <TouchableOpacity onPress={onPress} style={styles.businessCardInner}>
                <View style={{ flex: 10 }}>
                    {openPicture}
                </View>
                <View style={{ flex: 17 }}>
                    <View style={{ flex: 5, paddingBottom: 8 }}>
                        <Text style={{ fontSize: getFontSize(20), paddingTop: 10, flexWrap: 'wrap' }}>{business.name.length > 33 ? textTruncateBySpaceTwo(33, business.name) : business.name}</Text>
                        <Text style={{ fontSize: getFontSize(12), paddingBottom: 5 }}>{textTruncateBySpace(28, vicinity)}</Text>
                    </View>
                    <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', paddingBottom: 10 }}>
                        {verified}
                        {/* <View style={{ paddingBottom: 3 }}>
                            <Text style={{ borderRadius: 5, borderColor: 'black', color: 'black', borderWidth: 1, padding: 3, fontSize: getFontSize(10) }}>
                                1.0mi
                            </Text>
                        </View> */}
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

    );
};

export default connect(null, { openBusinessPage })(BusinessCard);
