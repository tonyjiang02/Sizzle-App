/*
1. Business Title w Image background
    Underneath should show business distance, population, Address, Currently Open/Closed, Buttons:
        [Take me there], [Label as Favorite], [Check-in], [Notify me (when population is less than certain number)], 
2. Live updates 
    Scrollview that shows all live updates in reverse chronological order, each live update only shows header, desc. truncated, and images truncated, can expand for more info. 
3. Reserve time-slot (only if business is registered)
    Different time slots with availability for each
    Button to register
4. Business description
    Text desc., hours of operation, goods and services list (shows what is in and out of stock, on sale)
    Contact desc. 
5. Population Graph Display

FUTURE INTEGRATIONS:
    Live posts from restaurant itself or users, like ig stories but for businesses
*/

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Image, Text, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';
import { styles } from '../Styles';
import { Button } from 'react-native-elements';
import { checkIn, getBusiness } from '../../actions/business';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import LiveUpdate from '../Business/LiveUpdate';

const BusinessPage = ({ route: { params: { business, db } }, checkIn, population }) => {
    const onPressCheckIn = () => {
        checkIn(business.place_id);
    };
    const refresh = () => {
        getBusiness(business.place_id, db._id);
    };
    useEffect(() => {
        console.log(db);
    });

    let popDisplay = <Text></Text>;
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
    if (openStatus === true){
        openDisplay = <Text style={{ paddingHorizontal: 10, alignSelf: 'center', color: 'white',
                                     borderColor: 'green', borderWidth: 1, padding: 2, fontSize: 16, backgroundColor: 'green' }}>Open</Text>;
    }
    else {
        openDisplay = <Text style={{ paddingHorizontal: 10, alignSelf: 'center', color: 'white',
                                    borderColor: 'red', borderWidth: 1, padding: 2, fontSize: 16, backgroundColor: 'red' }}>Closed</Text>;
    }

    //This changes the favorite color; once you have the actual favorite parameter change the color based on the true/false of favorite
    let favoriteDisplay = <Ionicons name="md-heart-empty" color='white' size={35} />
    let isFavorite = false;
    if (isFavorite === true){
        favoriteDisplay = <Ionicons name="md-heart" color='red' size={35}/>
    }
    else if (isFavorite === false){
        favoriteDisplay = <Ionicons name="md-heart-empty" color='white' size={35}/>
    }

    return (
        <View style={styles.landing}>
            <ScrollView alwaysBounceVertical={false}>
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

                <View style={{ flexDirection: 'row', alignItems: 'flex-end', borderBottomWidth: 0.4, backgroundColor: 'white', 
                                paddingVertical: 6, shadowColor: "black", borderBottomColor: 'transparent', 
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
                        <MaterialCommunityIcons name='map-marker-check' color='#ff9900' size={40}/>
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
const mapStateToProps = state => ({
    population: state.business.dbBusiness.population
});
export default connect(mapStateToProps, { checkIn })(BusinessPage);
