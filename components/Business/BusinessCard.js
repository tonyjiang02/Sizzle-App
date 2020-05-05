//distance, address are not live

import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';
import { openBusinessPage } from '../../actions/business';
import { connect } from 'react-redux';
const BusinessCard = ({ business, navigation, db, openBusinessPage }) => {
    useEffect(() => {
    }, []);
    const onPress = () => {
        openBusinessPage(business, db);
        navigation.navigate('BusinessPage', { business: business, db: db });
    };

    let popDisplay = <Text></Text>;
    if (db.population < 10) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'green', fontSize: 18, fontWeight: 'bold'}}>{db.poopulation}</Text>;
    }
    else if (db.population >= 10 && db.population < 50) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'orange', fontSize: 18, fontWeight: 'bold' }}>{db.population}</Text>;
    }
    else if (db.population >= 50) {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'red', fontSize: 18, fontWeight: 'bold' }}>{db.population}</Text>;
    }
    else if (db.population >=9999){
        popoDIsplay = <Text style={{ paddingLeft: 3, color: 'red', fontSize: 18, fontWeight: 'bold' }}>9999+</Text>;
    }
    else {
        popDisplay = <Text style={{ paddingLeft: 3, color: 'gray', fontSize: 18, fontWeight: 'bold' }}>{db.population}</Text>;
    }

    let openStatus = false;
    let openDisplay = <Text></Text>;
    let openPicture = <Image source={{ uri: 'https://picsum.photos/200/200' }} style={{ height: 115, width: 115 }}></Image>;
    if (openStatus === true){
        openDisplay = <Text style={{ paddingHorizontal: 2, alignSelf: 'center', color: 'white', fontSize: 10, 
                                     borderColor: 'green', borderWidth: 1, padding: 3, backgroundColor: 'green' }}>Open</Text>;
    }
    else {
        openDisplay = <Text style={{ paddingHorizontal: 2, alignSelf: 'center', color: 'white', fontSize: 10, 
                                    borderColor: 'red', borderWidth: 1, padding: 3, backgroundColor: 'red' }}>Closed</Text>;
        openPicture = <Image source={{ uri: 'https://picsum.photos/200/200' }} style={{ height: 115, width: 115, opacity: 0.3 }}></Image>;
    }

    return (
        <View style={styles.businessCardOuter}>
            <TouchableOpacity onPress={onPress} style={styles.businessCardInner}>
                <View style={{ flex: 10 }}>
                    {openPicture}
                </View>
                <View style={{ flex: 17, flexDirection: 'column'}}>
                    <View style={{flex: 2}}>
                        <Text style={{fontSize: 20, paddingTop: 10}}>{business.name.length > 28 ? textTruncateBySpace(28, business.name) : business.name}</Text>
                        <Text style={{fontSize: 12, paddingBottom: 5}}>{textTruncateBySpace(28, '11111 Test Rd., Cupertino, CA')}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-end', paddingBottom: 10}}>
                        <View>
                            <Text style={{borderRadius: 5, borderColor: 'black', color: 'black', borderWidth: 1, padding: 3, fontSize: 10}}>
                                1.0mi
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 5}}>
                            <Image source={require('../../assets/icons/person_icon.png')} style={{width: 8, height: 12}}></Image>
                            {popDisplay}
                        </View>
                        <View>
                            {openDisplay}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        
    );
};

export default connect(null, { openBusinessPage })(BusinessCard);
