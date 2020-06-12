import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView, Dimensions } from 'react-native';
import BusinessHistoryCard from './BusinessHistoryCard';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import { styles } from '../Styles';
import Header from '../layout/Header';
import { Octicons, Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Outlines from '../../assets/Outlines';
import BusinessList from './BusinessList';
import {LinearGradient} from 'expo-linear-gradient';
import SearchLoading from '../layout/SearchLoading';
import {reloadFavorites, getFavorites} from '../../actions/business'
 
export const Favorites = ({navigation, User, reloadFavorites, getFavorites, loadingFavorites}) => {
   //console.log(User.user.favorites);
   useEffect(() => {
       async function loadFavorites () {
           await reloadFavorites();
           const returned = await getFavorites(User.user.favorites);
       }
       loadFavorites();
   }, [User.user.favorites])
   useEffect(() => {
       async function loadFavorites () {
           await reloadFavorites();
           const returned = await getFavorites();
           console.log(returned);
       }
       loadFavorites();
   }, [])
   return (
       <View>
           <Header navigation={navigation}></Header>
           <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'white' }}></View>
           <View>
               <LinearGradient
                   colors={['#ff9900', '#ff5f6d', '#ff5f6d']}
               >
                   <View style={{height: Dimensions.get('window').height}}>
                       <View style={{flexDirection: 'row', paddingTop: 10, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'}}>
                           <Ionicons name="md-heart" color='red' size={35} style={{ paddingLeft: 8, paddingRight: 10, paddingLeft: 2 }} />
                           <Text style={{ color: 'white', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Favorites</Text>
                       </View>
                       {loadingFavorites ? <SearchLoading></SearchLoading> : <BusinessList type="favorites"></BusinessList>}
                   </View>
               </LinearGradient>
           </View>
       </View>
   );
};
const mapStateToProps = state => ({
   User: state.user,
   loadingFavorites: state.business.loadingFavorites,
});
export default connect(mapStateToProps, {reloadFavorites, getFavorites})(Favorites);
