import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { picture } from '../Styles';
import { SearchBar } from 'react-native-elements';
import {styles, COLORS} from '../Styles';
const BusinessSquare = (/*{ business, navigation, db: { population, googleId, name } }*/) => {
    //single business
<<<<<<< HEAD
    useEffect(() => {
        console.log("Rendered Business Square");
    });
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 2 }}>
                <Image source={{ uri: 'https://picsum.photos/200/300' }} style={{ height: '100%', width: 150 }}></Image>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Name</Text>
                <Text>Population</Text>
=======
    const population = Math.round(Math.random()*100);

    let popDisplay = <Text></Text>;
    if (population < 10){
        popDisplay = <Text style={{alignSelf: 'center', color: 'green'}}>Current: {population}</Text>;
    }
    else if (population >= 10 && population < 50){
        popDisplay = <Text style={{alignSelf: 'center', color: 'orange'}}>Current: {population}</Text>;
    }
    else if (population >= 50){
        popDisplay = <Text style={{alignSelf: 'center', color: 'red'}}>Current: {population}</Text>;
    }
    else{
        popDisplay = <Text style={{alignSelf: 'center', color: 'gray'}}>Current: {population}</Text>;
    }

    return (
        <View style={styles.businessSquareOuter}>
            <View style={styles.businessSquareInner}>
                <Image source={{ uri: 'https://picsum.photos/200/300' }} style={{ height: 125, width: 220}}></Image>
                <Text style={{paddingTop: 5, alignSelf: 'center', fontSize: 17}}>[Insert Business Name]</Text>
                {popDisplay}
>>>>>>> 2764d55b22d9da83e744675e0fb2ab688f39891c
            </View>
        </View>
    );
};

export default BusinessSquare;
