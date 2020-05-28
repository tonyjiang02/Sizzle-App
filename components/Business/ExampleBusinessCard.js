//distance, address are not live

import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace, textTruncateBySpaceTwo } from '../../utils/TextTruncate';
import { openBusinessPage } from '../../actions/business';
import { connect } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getFontSize, getIconSize } from '../../utils/fontsizes';

const ExampleBusinessCard = ({ imageURL, population, name, address, distance}) => {

    //population display
    let popDisplay = <Text>{population}</Text>

    //open status
    let openPicture = <Image source={{uri: imageURL}} style={{height: 115, width: 115}}></Image>
    let openStatus = true;
    let openDisplay=<Text></Text>;
    let verified = <MaterialIcons name='verified-user' color='lightgreen' size={getIconSize(18.5)} style={{ paddingBottom: 3 }}></MaterialIcons>;
    if (population < 10) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'green', fontSize: getFontSize(20), fontWeight: 'bold' }}>{population}</Text>;
    }
    else if (population >= 10 && population < 50) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'orange', fontSize: getFontSize(20), fontWeight: 'bold' }}>{population}</Text>;
    }
    else if (population >= 50) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'red', fontSize: getFontSize(20), fontWeight: 'bold' }}>{population}</Text>;
    }
    else if (population >= 10000 && population <= 1000000) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'red', fontSize: getFontSize(20), fontWeight: 'bold' }}>{Math.trunc(population / 1000)}k</Text>;
    }
    else if (population >= 1000000) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'red', fontSize: getFontSize(20), fontWeight: 'bold' }}>{Math.trunc(population / 1000000)}m</Text>;
    }
    else {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'gray', fontSize: getFontSize(20), fontWeight: 'bold' }}>{population}</Text>;
    }
    if (openStatus === true) {
        openDisplay = <Text style={{
            paddingHorizontal: 2, alignSelf: 'center', color: 'white', fontSize: getFontSize(12),
            borderColor: 'green', borderWidth: 1, paddingVertical: 1, backgroundColor: 'green'
            }}>Open</Text>;
        }
        else {
            openDisplay = <Text style={{
                alignSelf: 'center', color: 'white', fontSize: getFontSize(12),
                borderColor: 'red', borderWidth: 1, padding: 3, backgroundColor: 'red'
            }}>Closed</Text>;
        }

    return (
        <View style={styles.businessCardOuter}>
            <TouchableOpacity style={styles.businessCardInner}>
                <View style={{ flex: 10 }}>
                    {openPicture}
                </View>
                <View style={{ flex: 17 }}>
                    <View style={{ flex: 5, paddingBottom: 8 }}>
                        <Text style={{ fontSize: getFontSize(20), paddingTop: 10, flexWrap: 'wrap' }}>{name > 33 ? textTruncateBySpaceTwo(33, name) : name}</Text>
                        <Text style={{ fontSize: getFontSize(12), paddingBottom: 5 }}>{textTruncateBySpaceTwo(33, address)}</Text>
                    </View>
                    <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', paddingBottom: 10 }}>
                        {verified}
                        <View style={{ paddingBottom: 3 }}>
                            <Text style={{ borderRadius: 5, borderColor: 'black', color: 'black', borderWidth: 1, padding: 3, fontSize: getFontSize(10) }}>
                                1.0mi
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

    );
};

export default connect(null, { openBusinessPage })(ExampleBusinessCard);
