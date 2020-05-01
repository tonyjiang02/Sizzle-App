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

    return (
        <TouchableOpacity onPress={onPress} style={{ flexDirection: "row", paddingVertical: 10 }}>
            <View style={{ flex: 1 }}>
                <Image source={{ uri: 'https://picsum.photos/200/200' }} style={{ height: 100, width: 100 }}></Image>
            </View>
            <View style={{ flex: 2 }}>
                <Text style={{ flex: 1 }}>{business.name}</Text>
                <Text style={{ flex: 2, flexWrap: 'wrap' }} adjustsFontSizeToFit>testdescription</Text>
                <Text>Population = {db.population}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default connect(null, { openBusinessPage })(BusinessCard);
