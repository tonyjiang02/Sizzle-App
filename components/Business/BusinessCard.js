//distance, address are not live

import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace, textTruncateBySpaceTwo } from '../../utils/TextTruncate';
import { openBusinessPage } from '../../actions/business';
import { connect } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const BusinessCard = ({ business, navigation, db, openBusinessPage }) => {
    useEffect(() => {
    }, []);
    const onPress = () => {
        openBusinessPage(business, db);
        navigation.navigate('BusinessPage', { business: business, db: db });
    };
    
    //business verification
    let verified = <View></View>;
    let isVerified = true;
    if (isVerified===true){
        verified = <MaterialIcons name='verified-user' color='#ff9900' size={22} style={{paddingBottom: 3}}></MaterialIcons>;
    }
    let number = 9999999;
    //population display
    let popDisplay = <Text></Text>;
    if (db.population < 10) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'green', fontSize: 20, fontWeight: 'bold'}}>{db.population}</Text>;
    }
    else if (db.population >= 10 && db.population < 50) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'orange', fontSize: 20, fontWeight: 'bold' }}>{db.population}</Text>;
    }
    else if (db.population >= 50) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'red', fontSize: 20, fontWeight: 'bold' }}>{db.population}</Text>;
    }
    else if (db.population >=10000 && db.population <=1000000){
        popDisplay = <Text style={{ paddingLeft: 3, color: 'red', fontSize: 20, fontWeight: 'bold' }}>{Math.trunc(db.population / 1000)}k</Text>;
    }
    else if (db.population >= 1000000){
        popDisplay = <Text style={{ paddingLeft: 3, color: 'red', fontSize: 20, fontWeight: 'bold' }}>{Math.trunc(db.population / 1000000)}m</Text>;
    }
    else {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'gray', fontSize: 20, fontWeight: 'bold' }}>{db.population}</Text>;
    }

    //open status
    let openStatus = false;
    let openDisplay = <Text></Text>;
    let openPicture = <Image source={{ uri: 'https://picsum.photos/200/200' }} style={{ height: 115, width: 115 }}></Image>;
    if (openStatus === true){
        openDisplay = <Text style={{ paddingHorizontal: 2, alignSelf: 'center', color: 'white', fontSize: 10, 
                                     borderColor: 'green', borderWidth: 1, paddingBottom: 3, backgroundColor: 'green' }}>Open</Text>;
    }
    else {
        openDisplay = <Text style={{ alignSelf: 'center', color: 'white', fontSize: 10, 
                                    borderColor: 'red', borderWidth: 1, padding: 3, backgroundColor: 'red' }}>Closed</Text>;
        openPicture = <Image source={{ uri: 'https://picsum.photos/200/200' }} style={{ height: 115, width: 115, opacity: 0.3 }}></Image>;
    }

    return (
        <View style={styles.businessCardOuter}>
            <TouchableOpacity onPress={onPress} style={styles.businessCardInner}>
                <View style={{ flex: 10 }}>
                    {openPicture}
                </View>
                <View style={{ flex: 17}}>
                    <View style={{flex: 5, paddingBottom: 8}}>
                        <Text style={{fontSize: 20, paddingTop: 10, flexWrap: 'wrap'}}>{business.name.length > 33 ? textTruncateBySpaceTwo(33, business.name) : business.name}</Text>
                        <Text style={{fontSize: 12, paddingBottom: 5}}>{textTruncateBySpace(28, '11111 Test Rd., Cupertino, CA')}</Text>
                    </View>
                    <View style={{flex: 3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', paddingBottom: 10}}>
                        {verified}
                        <View style={{paddingBottom: 3}}>
                            <Text style={{borderRadius: 5, borderColor: 'black', color: 'black', borderWidth: 1, padding: 3, fontSize: 10}}>
                                1.0mi
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Ionicons name='md-person' color='black' size={18} style={{paddingBottom: 1}}/>
                            {popDisplay}
                        </View>
                        <View style={{paddingBottom: 3}}>
                            {openDisplay}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        
    );
};

export default connect(null, { openBusinessPage })(BusinessCard);
