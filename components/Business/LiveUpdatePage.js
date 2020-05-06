
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Image, Text, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';
import { styles } from '../Styles';
import { Button } from 'react-native-elements';
import { checkIn, getBusiness } from '../../actions/business';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import LiveUpdate from '../Business/LiveUpdate';

const LiveUpdatePage = ({ route: { params: { business, db } }, checkIn, population }) => {

    return (
        <View style={styles.landing}>
            <ScrollView>
                <ImageBackground source={{ uri: 'https://picsum.photos/300/200' }} style={{ width: '100%', height: 250}}>
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                            style={{
                            flex: 3,
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: 250,
                        }}
                    />
                    <View style={{position: 'absolute', bottom: 40, alignItems: 'baseline'}}>
                        <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', paddingLeft: 20}}>{business.name}</Text>
                        <View style={{paddingLeft: 20, paddingTop: 10, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{borderRadius: 5, borderColor: 'white', color: 'white', borderWidth: 1, padding: 3, fontSize: 16}}>
                                1.0mi
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
                                <Ionicons name='md-person' color='white' size={22}/>
                                {popDisplay}
                            </View> 
                            <View style={{paddingLeft: 20, flexDirection: 'row', alignItems: 'center'}}>
                                {openDisplay}
                            </View>            
                            <TouchableOpacity style={{position: 'absolute', left: 330, top: 33 }}> 
                                {favoriteDisplay}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

                <View style={{ flexDirection: 'row', alignItems: 'flex-end', borderBottomWidth: 0.4, backgroundColor: 'white', paddingVertical: 6, shadowColor: "black", borderBottomColor: 'transparent',
                            shadowOffset: {
                                width: 0,
                                height: 6,
                            },
                            shadowOpacity: 0.2,
                            shadowRadius: 5,
                            elevation: 10,}}>
                    <TouchableOpacity onPress={onPressCheckIn} style={{alignItems: 'center', flex: 1}}>
                        <MaterialCommunityIcons name='directions' color='royalblue' size={35}/>
                        <Text style={{color: 'black'}}>Directions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressCheckIn} style={{alignItems: 'center', flex: 1}}>
                        <MaterialCommunityIcons name='check-circle' color='#ff9900' size={40}/>
                        <Text style={{color: '#ff9900'}}>Check In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressCheckIn} style={{alignItems: 'center', flex: 1}}>
                        <Ionicons name='md-notifications' color='indianred' size={35}/>
                        <Text style={{color: 'black'}}>Notify Me</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: 15, backgroundColor: '#fdeedc', height: 150}}>
                    <TouchableOpacity style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Text style={{color: '#ff9900', fontSize: 24, fontFamily: 'Avenir-Heavy', paddingTop: 5, paddingRight: 10}}>Live Updates</Text>
                        <AntDesign name='rightcircle' color='#ff9900' size={18} style={{paddingTop: 12}}></AntDesign>
                    </TouchableOpacity>
                    <View style={{flex: 2.5}}>
                        <LiveUpdate></LiveUpdate>
                    </View>
                </View>
                <View style={{borderTopWidth: 1, borderTopColor: '#fdeedc'}}></View>
            </ScrollView>
        </View>
    );
};

export default LiveUpdatePage;
