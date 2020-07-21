import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Dimensions} from 'react-native';
import { getFontSize, getIconSize } from '../../../utils/fontsizes'
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';

const Option = ({obj}) => {
    const [selectedArray, setSelectedArray] = useState(obj.options.map((x) => false));
    
    const getPriceDisplay = (price) => {
      if (price === 0){
          return "Free";
      }
      else {
          return ("$"+price.toFixed(2));
      }
    }
    const getBorderStyle = (selected) => {
      if (selected === true){
        return {flexDirection: 'row', padding: 10, borderRadius: 15, borderWidth: 1, borderColor: '#ff9900', backgroundColor: '#ff9900', width: Dimensions.get('window').width-100}
      }
      else {
        return {flexDirection: 'row', padding: 10, borderRadius: 15, borderWidth: 1, borderColor: '#e6e6e6', backgroundColor: '#e6e6e6', width: Dimensions.get('window').width-100}
      }
    }
    const getTextColor = (selected) => {
      if (selected === true){
        return 'white';
      }
      else {
        return 'black';
      }
    }
    const changeSelected = (index) => {
      console.log('changing selected for index: ' + index)
      let temp = [...selectedArray];
      for (let k = 0; k < temp.length; k++){
        if (k === index){
          if (temp[index] === false){
            temp[index] = true;
          }
          else {
            temp[index] = false;
          }
        }
        else {
          temp[k] = false;
        }
      }
      setSelectedArray(temp);
    }

    let list = obj.options.map((x, i) => 
      <TouchableOpacity style={{alignItems: 'center', paddingTop: 5}} onPress={() => changeSelected(i)}>
          <View style={getBorderStyle(selectedArray[i])}>
              <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome name='circle' size={getIconSize(18)} color='white'></FontAwesome>
                  <Text style={{fontSize: getFontSize(18), color: getTextColor(selectedArray[i]), fontFamily: 'Avenir'}}>  {x.name}</Text>
              </View>
              <Text style={{fontSize: getFontSize(18), flex: 1, color: getTextColor(selectedArray[i]), fontFamily: 'Avenir-Light'}}>{getPriceDisplay(x.price)}</Text>
          </View>
      </TouchableOpacity>
    );

    return (
        <View style={{width: Dimensions.get('window').width-100}}>
          <Text style={{fontFamily: 'Avenir', fontSize: getFontSize(18)}}> {obj.name}</Text>
          <View style={{height: 5}}></View>
            {list}
          <View style={{height: 5}}></View>
        </View>
    );
}

export default Option;

