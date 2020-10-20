//business can report a live update

import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, TimePickerAndroid } from 'react-native';
import { styles } from '../../Styles';
import { textTruncateBySpaceTwo } from '../../../utils/TextTruncate';
import { openBusinessPage } from '../../../actions/business';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { getFontSize, getIconSize } from '../../../utils/fontsizes';

const MenuItem = ({ name, price, image, desc, outofstock, options, addons }) => {
    let picture = <Image source={image ? { uri: image } : require('../../../assets/logos/image_unavailable.png')} style={{ height: 115, width: 115, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}></Image>
    if (outofstock === true){
        picture = <Image source={image ? { uri: image } : require('../../../assets/logos/image_unavailable.png')} style={{ height: 115, width: 115, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, opacity: 0.5 }}></Image>
    }
    return (
        <View>
            <View style={styles.businessCardOuter}>
                <TouchableOpacity style={styles.businessCardInner}>
                    <View style={{ flex: 10 }}>
                        {picture}
                    </View>
                    <View style={{ flex: 17 }}>
                        <View style={{ flex: 5, paddingBottom: 8 }}>
                            <Text style={{ fontSize: getFontSize(20), paddingTop: 10, flexWrap: 'wrap' }}>{name.length > 20 ? textTruncateBySpaceTwo(33, name) : name}</Text>
                            <Text style={{ fontSize: getFontSize(12), paddingBottom: 5 }}>{desc.length > 40 ? textTruncateBySpaceTwo(33, desc) : desc}</Text>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', paddingBottom: 10 }}>
                        <Text style={{ fontSize: getFontSize(12), paddingBottom: 5, color: 'gray' }}>{price}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default  MenuItem;
