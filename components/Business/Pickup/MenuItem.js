//business can report a live update

import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, TimePickerAndroid, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from '../../Styles';
import { textTruncateBySpaceTwo } from '../../../utils/TextTruncate';
import { openBusinessPage } from '../../../actions/business';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { getFontSize, getIconSize } from '../../../utils/fontsizes';

const MenuItem = ({ name, price, image, desc, outofstock, options, addons, onPress, dealPrice, id }) => {
    let picture = <Image source={image ? { uri: image } : require('../../../assets/logos/image_unavailable.png')} style={{ height: 115, width: 115, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}></Image>
    if (outofstock === true){
        picture = <Image source={image ? { uri: image } : require('../../../assets/logos/image_unavailable.png')} style={{ height: 115, width: 115, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, opacity: 0.5 }}></Image>
    }

    let priceDisplay = <Text style={{ fontSize: getFontSize(16), paddingBottom: 5, color: 'black', fontFamily: 'Avenir-Light' }}>${price.toFixed(2)}</Text>
    let actualPrice = price;
    if (typeof dealPrice !== 'undefined'){
        actualPrice = dealPrice;
        priceDisplay = <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={{ fontSize: getFontSize(16), paddingBottom: 5, color: 'red', fontFamily: 'Avenir-Light' }}>${dealPrice.toFixed(2)}</Text>
            <Text> </Text>
            <Text style={{ fontSize: getFontSize(16), paddingBottom: 5, color: 'black', textDecorationLine: 'line-through', textDecorationStyle:'solid', fontFamily: 'Avenir-Light'}}>${price.toFixed(2)}</Text>
        </View>
    }
    return (
        <View>
            <View style={styles.businessCardOuter}>
                <TouchableOpacity style={styles.businessCardInner} onPress={() => {onPress(name, image, options, addons, actualPrice, desc, id)}}>
                    <View style={{ flex: 10 }}>
                        {picture}
                    </View>
                    <View style={{ flex: 17 }}>
                        <View style={{ flex: 5, paddingBottom: 8 }}>
                            <Text style={{ fontSize: getFontSize(20), paddingTop: 10, flexWrap: 'wrap', fontFamily: 'Avenir' }}>{name.length > 21 ? textTruncateBySpaceTwo(19, name) : name}</Text>
                            <Text style={{ fontSize: getFontSize(12), paddingBottom: 5, fontFamily: 'Avenir-Light' }}>{desc.length > 70 ? textTruncateBySpaceTwo(67, desc) : desc}</Text>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                            {priceDisplay}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default  MenuItem;
