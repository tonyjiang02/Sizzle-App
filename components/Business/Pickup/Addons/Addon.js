import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Dimensions} from 'react-native';
import { getFontSize, getIconSize } from '../../../../utils/fontsizes'
import { FontAwesome, AntDesign } from '@expo/vector-icons';

const Addon = ( {name, price, index, onPress} ) => {
    const [selected, setSelected] = useState(false);
    let borderStyle = {flexDirection: 'row', padding: 10, borderRadius: 15, borderWidth: 1, borderColor: 'black', width: Dimensions.get('window').width-100}
    let textColor = 'black';
    let priceDisplay = "";
    let checked = <AntDesign name="plussquare" size={getIconSize(18)}></AntDesign>
    if (price === 0){
        priceDisplay = "Free";
    }
    else {
        priceDisplay = '$' + price.toFixed(2);
    }
    if (selected === false){
      borderStyle = {flexDirection: 'row', padding: 10, borderRadius: 15, borderWidth: 1, borderColor: '#e6e6e6', backgroundColor: '#e6e6e6', width: Dimensions.get('window').width-100, alignItems: 'center'}
      textColor = 'black';
      checked = <AntDesign name="plussquare" size={getIconSize(18)} color='black'></AntDesign>
    }
    if (selected === true){
      borderStyle = {flexDirection: 'row', padding: 10, borderRadius: 15, borderWidth: 1, borderColor: '#ff9900', backgroundColor: '#ff9900', width: Dimensions.get('window').width-100}
      textColor = 'white';
      checked = <AntDesign name="checksquare" size={getIconSize(18)} color='white'></AntDesign>
    }

    return (
        <View>
          <TouchableOpacity style={{alignItems: 'center', paddingTop: 5}} onPress={() => {setSelected(!selected); onPress(index)}}>
              <View style={borderStyle}>
                <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                  {checked}
                  <Text style={{fontSize: getFontSize(18), color: textColor, fontFamily: 'Avenir'}}>  {name}</Text>
                </View>
                <Text style={{fontSize: getFontSize(18), flex: 1, color: textColor, fontFamily: 'Avenir-Light'}}>{priceDisplay}</Text>
              </View>
          </TouchableOpacity>
        </View>
    );
}

export default Addon;

