import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { picture } from '../Styles';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { styles, COLORS } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';
import { openBusinessPage } from '../../actions/business';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const BusinessSquare = ({ business, navigation, db, openBusinessPage }) => {
    let population = db.population;
    const onPress = () => {
        openBusinessPage(business, db);
        navigation.navigate('BusinessPage', { business: business, db: db });
    };

    let popDisplay = <Text></Text>;

    //if the business is verified
    let verified = <View></View>;
    let isVerified = true;
    if (isVerified===true){
        verified = <MaterialIcons name='verified-user' color='#ff9900' size={18} style={{paddingLeft: 5}}></MaterialIcons>;
    }

    if (population < 10) {
        popDisplay = <Text style={{ paddingLeft: 3, alignSelf: 'center', color: 'green', fontSize: 20, fontWeight: 'bold' }}>{population}</Text>;
    }
    else if (population >= 10 && population < 50) {
        popDisplay = <Text style={{ paddingLeft: 3, alignSelf: 'center', color: 'orange', fontSize: 20, fontWeight: 'bold' }}>{population}</Text>;
    }
    else if (population >= 50) {
        popDisplay = <Text style={{ paddingLeft: 3, alignSelf: 'center', color: 'red', fontSize: 20, fontWeight: 'bold' }}>{population}</Text>;
    }
    else {
        popDisplay = <Text style={{ paddingLeft: 3, alignSelf: 'center', color: 'gray', fontSize: 20, fontWeight: 'bold' }}>{population}</Text>;
    }
    let openStatus = true;
    let openDisplay = <Text></Text>;
    let openPicture = <Image source={{ uri: 'https://picsum.photos/200/300' }} style={{ height: 125, width: 235 }}></Image>
    if (openStatus === true){
        openDisplay = <Text style={{ paddingHorizontal: 5, alignSelf: 'center', color: 'white', fontSize: 12, 
                                     borderColor: 'green', borderWidth: 1, padding: 2, backgroundColor: 'green' }}>Open</Text>;
    }
    else {
        openDisplay = <Text style={{ paddingHorizontal: 5, alignSelf: 'center', color: 'white', fontSize: 12, 
                                    borderColor: 'red', borderWidth: 1, padding: 2, backgroundColor: 'red' }}>Closed</Text>;
        openPicture = <Image source={{ uri: 'https://picsum.photos/200/300' }} style={{ height: 125, width: 235, opacity: 0.3 }}></Image>
    }

    return (
        <TouchableOpacity style={styles.businessSquareOuter} onPress={onPress}>
            <View style={styles.businessSquareInner}>
                {openPicture}
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 5, paddingBottom: 3}}>
                    <Text style={{fontSize: 18}}>{business.name.length > 21 ? textTruncateBySpace(21, business.name) : business.name}</Text>
                    {verified}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                    <Text style={{borderRadius: 5, borderColor: 'black', color: 'black', borderWidth: 1, padding: 2, fontSize: 12}}>
                        1.0mi
                    </Text>
                    <View style={{paddingLeft: 20, flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Ionicons name='md-person' color='black' size={19}/>
                        {popDisplay}
                    </View>
                    <View style={{paddingLeft: 20}}>
                        {openDisplay}
                    </View>
                </View>
                
            </View>
        </TouchableOpacity>
    );
};

export default connect(null, { openBusinessPage })(BusinessSquare);
