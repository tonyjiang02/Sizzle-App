import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView, Dimensions} from 'react-native';
import BusinessHistoryCard from './BusinessHistoryCard';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import { styles } from '../Styles';
import Header from '../layout/Header';
import { Octicons, Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
 
export const BusinessHistoryList = ({navigation, user}) => {
   const [historyDisplay, updateDisplay] = useState([]);
   useEffect(() => {
       let history = [...user.history];
       let res = history.reverse().map((res, i) =>
           <BusinessHistoryCard key={i} id={res._id} date={res.date} name={res.name} address={res.address}></BusinessHistoryCard>
       );
       updateDisplay(res);
   }, [user]);
   return (
       <View style={{ flex: 20, backgroundColor: 'white'}}>
           <Header navigation={navigation}></Header>
           <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'white' }}></View>
           <LinearGradient
                   colors={['#ff9900', '#ff5f6d', '#ff5f6d']}
               >
               <View style={{height: Dimensions.get('window').height}}>
                   <View style={{flexDirection: 'row', paddingTop: 10, backgroundColor: 'transparent', justifyContent: 'center'}}>
                       <MaterialCommunityIcons name='map-marker-check' color='white' size={35} />
                       <Text style={{ color: 'white', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Check-in History</Text>
                   </View>
                   <ScrollView showsVerticalScrollIndicator={false}>
                       {historyDisplay}
                       <View style={{height: 200, backgroundColor: 'transparent'}}></View>
                   </ScrollView>
               </View>
           </LinearGradient>
       </View>
   );
};
const mapStateToProps = state => ({
   user: state.user.user
});
export default connect(mapStateToProps, {})(BusinessHistoryList);

