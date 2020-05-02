import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { picture } from '../Styles';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { styles, COLORS } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';
import { openBusinessPage } from '../../actions/business';
const BusinessSquare = ({ business, navigation, db, openBusinessPage }) => {
    let population = db.population;
    const onPress = () => {
        openBusinessPage(business, db);
        navigation.navigate('BusinessPage', { business: business, db: db });
    };


    let popDisplay = <Text></Text>;
    if (population < 10) {
        popDisplay = <Text style={{ paddingBottom: 30, alignSelf: 'center', color: 'green' }}>Current: {population}</Text>;
    }
    else if (population >= 10 && population < 50) {
        popDisplay = <Text style={{ alignSelf: 'center', color: 'orange' }}>Current: {population}</Text>;
    }
    else if (population >= 50) {
        popDisplay = <Text style={{ alignSelf: 'center', color: 'red' }}>Current: {population}</Text>;
    }
    else {
        popDisplay = <Text style={{ alignSelf: 'center', color: 'gray' }}>Current: {population}</Text>;
    }

    return (
        <TouchableOpacity style={styles.businessSquareOuter} onPress={onPress}>
            <View style={styles.businessSquareInner}>
                <Image source={{ uri: 'https://picsum.photos/200/300' }} style={{ height: 135, width: 220 }}></Image>
                <Text style={{paddingTop: 5, alignSelf: 'center', fontSize: 18, fontWeight: '10' }}>{business.name.length > 28 ? textTruncateBySpace(28, business.name) : business.name}</Text>
                {popDisplay}
            </View>
        </TouchableOpacity>
    );
};

export default connect(null, { openBusinessPage })(BusinessSquare);
