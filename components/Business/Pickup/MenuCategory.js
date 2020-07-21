import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView } from 'react-native';
import {getFontSize, getIconSize} from '../../../utils/fontsizes';
import MenuItem from './MenuItem';
import { styles } from '../../Styles';
export const MenuCategory = ({ navigation, name, items, onPress }) => {
    const [itemsList, setItemsList ] = useState([]);
    useEffect(()=> {
        let list = [];
        for (let k = 0; k < items.length; k++){
            list.push(<MenuItem name={items[k].name} price={items[k].price} image={items[k].image} desc={items[k].desc} outofstock={items[k].outofstock} options={items[k].options} addons={items[k].addons} dealPrice={items[k].dealPrice} onPress={onPress} id={items[k].id}></MenuItem>)
        }
        if (list.length > 0){
            setItemsList(list);
        }
        else {
            setItemsList(<Text style={{fontSize: getFontSize(18), color: 'black', fontFamily: 'Avenir-Light'}}>No Results</Text>)
        }
    }, [])
    return (
        <View style={{ backgroundColor: 'transparent' }}>
            <Text style={{fontFamily: 'AvenirNext-Bold', fontSize: getFontSize(24), color: 'black', paddingHorizontal: 10 }}>{name}</Text>
            {itemsList}
            <View style={{height: 15}}></View>
        </View>
    );
};

export default MenuCategory;