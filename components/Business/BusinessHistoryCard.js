import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView, Dimensions } from 'react-native';
import BusinessCard from './BusinessCard';
import { styles } from '../Styles';
import Outlines from '../../assets/Outlines';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
 
export const BusinessHistoryCard = ({ index, date, id, name, address }) => {
   let parsed = "";
   if (date.indexOf('-') === -1){
       parsed = parseInt(date);
   }
   else {
       parsed = Date.parse(date);
   }
   let convert = new Date(parsed);
   let hour = convert.getHours(parsed);
   let min = convert.getHours(parsed);
   let day = convert.getDate();
   let month = convert.getMonth() + 1;
   let year = convert.getFullYear();
   let ampm = "a.m";
   //formatting
   if (hour < 12){
       ampm = "a.m";
       if (hour === 0){
           hour = 12;
       }
   }
   else {
       ampm = "p.m";
       if (hour !== 12){
           hour = hour - 12;
       }
   }
   if (min < 10){
       min = "0"+min;
   }
   const dateString = hour + ":" + min + " " + ampm + " - " + month + "/" + day + "/" + year;
   return (
       <View style={{ paddingTop: 15 }}>
           <View style={{ height: (Dimensions.get('window').width / 4), width: Dimensions.get('window').width - 20, alignSelf: 'center', backgroundColor: 'white', flex: 1, flexDirection: "row", borderRadius: 10 }}>
               <View style={{ paddingLeft: 15, flex: 3.5, alignSelf: 'center' }}>
                   <Text style={{ fontSize: getFontSize(22), flexWrap: 'wrap', fontFamily: 'AvenirNext-Bold', color: 'black' }}>{name > 25 ? textTruncateBySpace(25, name) : name}</Text>
                   <Text style={{ fontSize: getFontSize(12), color: 'black', fontFamily: 'Avenir-Light' }}>{address}</Text>
                   <View style={{ height: 10 }}></View>
                   <Text style={{ fontFamily: 'Avenir-Light', color: 'black', fontSize: getFontSize(19) }}>{dateString}</Text>
               </View>
           </View>
       </View>
   );
};
export default BusinessHistoryCard;
