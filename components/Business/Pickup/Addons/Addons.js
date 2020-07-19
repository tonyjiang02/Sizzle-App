import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Dimensions} from 'react-native';
import { getFontSize, getIconSize } from '../../../../utils/fontsizes'
import Addon from './Addon';
import { processFontFamily } from 'expo-font';
import { add } from 'react-native-reanimated';

const Addons = ({obj}) => {
    const [addons, setAddons] = useState([]);
    let selected = [];
    const [pressed, setPressed ] = useState(false);
    const [changed, setChanged ] = useState(false);

    useEffect(() => {
      let tempAddon = [];
      for (let k = 0; k < obj.length; k++){
        tempAddon.push(<Addon name={obj[k].title} price={obj[k].price} index={k} onPress={changeSelection}></Addon>)
        selected.push(false);
      }
      setAddons(tempAddon);
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
            {addons}
          <View style={{height: 5}}></View>
        </View>
    );
}

export default Addons;
