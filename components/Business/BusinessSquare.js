import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { picture } from '../Styles';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { styles, COLORS } from '../Styles';
import { textTruncateBySpace, textTruncateBySpaceTwo } from '../../utils/TextTruncate';
import { openBusinessPage } from '../../actions/business';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getFontSize, getIconSize } from '../../utils/fontsizes';

const BusinessSquare = ({ business, navigation, db, openBusinessPage, type }) => {
    let population = db.population;
    const onPress = () => {
        openBusinessPage(business, db);
        if (db.isVerified) {
            navigation.navigate('BusinessPage', { business: business, db: db });
        } else {
            navigation.navigate('UnverifiedBusinessPage', { business: business, db: db })
        }

    };

    let popDisplay = <Text></Text>;

    //if the business is verified
    let verifiedDisplay = <View></View>;
    let image = <Image style={{ height: '100%', width: '100%' }}></Image>;
    let openPictureStyle = styles.openPictureStyle;
    let isVerified = false;
    if (isVerified === false) {
        verifiedDisplay = <MaterialIcons name='verified-user' color='lightgreen' size={getIconSize(18)} style={{ paddingLeft: 5 }}></MaterialIcons>;
    }
    if (isVerified === false) {
        image = <Image source={{ uri: 'https://picsum.photos/600/400' }} style={openPictureStyle}></Image>
    }

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
    let openStatus = true;
    let openDisplay = <Text></Text>;

    if (openStatus === true) {
        openDisplay = <Text style={{
            paddingHorizontal: 5, alignSelf: 'center', color: 'white', fontSize: getFontSize(12),
            borderColor: 'green', borderWidth: 1, padding: 2, backgroundColor: 'green'
        }}>Open</Text>;
    }
    else {
        openDisplay = <Text style={{
            paddingHorizontal: 5, alignSelf: 'center', color: 'white', fontSize: getFontSize(12),
            borderColor: 'red', borderWidth: 1, padding: 2, backgroundColor: 'red'
        }}>Closed</Text>;
        openPictureStyle = styles.closedPictureStyle;
    }

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
                        1.0mi
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

export default connect(null, { openBusinessPage })(BusinessSquare);
