
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, SafeAreaView, Text, Linking, Animated, ScrollView, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../layout/Header'
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import MenuItem from './MenuItem';
import {ImageColorPicker} from 'react-native-image-color-picker';

export const MenuPage = ({ route: { params: { navigation, bizimage } }}) => {
    let addons = [{title:"cheese", selected:false, price:0.5}, {title:"onions", selected:false, price:0}, {title:"pickles", selected:false, price:0}, {title:"extra patty", selected:false, price:1.00}]
    let options = []
    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <View style={{backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'flex-end'}}>
                <Image source={bizimage ? { uri: bizimage } : require('../../../assets/backgroundhue.png')} style={{height: 100, width: 100, borderRadius: 50, borderColor: 'gainsboro', borderWidth: 0.5}}></Image>
                <Text style={{ color: 'black', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Menu</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{height: Dimensions.get('window').height}}>
                <TouchableWithoutFeedback>
                    <View style={{backgroundColor: 'white'}}>
                        <MenuItem name='Burger' price={3.50} image='https://picsum.photos/200/300' desc='This burger can add cheese, onions, pickles, two patties, and a charred bun.' outofstock={false} options></MenuItem>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
    );
};

const mapStateToProps = state => ({
    dbNearestBusinesses: state.business.dbNearestBusinesses,
    nearestBusinesses: state.business.nearestBusinesses,
    loadingNearest: state.business.loadingNearest,
    User: state.user,
    Auth: state.auth
});
export default MenuPage;