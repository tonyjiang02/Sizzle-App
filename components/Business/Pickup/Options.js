import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Dimensions} from 'react-native';
import { getFontSize, getIconSize } from '../../../../utils/fontsizes'

const Options = ({obj}) => {
    const [thisOptions, setOptions] = useState([]);
    
    useEffect(() => {
    }, [])

    const changeSelection = (index) => {
      if (selected[index] === true){
        selected[index] = false;
      }
      else {
        selected[index] = true;
      }
      setChanged(true);
      console.log(selected);
    }

    return (
        <View style={{width: Dimensions.get('window').width-100}}>
          <View style={{height: 5}}></View>
            
          <View style={{height: 5}}></View>
        </View>
    );
}

export default Options;

