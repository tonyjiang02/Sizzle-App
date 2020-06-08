import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView } from 'react-native';
import BusinessHistoryCard from './BusinessHistoryCard';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import { styles } from '../Styles';
import Header from '../layout/Header';
import { Octicons, Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Outlines from '../../assets/Outlines';
import BusinessList from './BusinessList';
import {reloadFavorites, getFavorites} from '../../actions/business'

export const Favorites = ({navigation, User, reloadFavorites, getFavorites}) => {
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
        <View style={{ flex: 20, backgroundColor: 'white'}}>
            <Header navigation={navigation}></Header>
            <View style={{flexDirection: 'row', paddingVertical: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderBottomColor: 'gainsboro', borderBottomWidth: 0.5}}>
                <Ionicons name="md-heart" color='red' size={35} style={{ paddingLeft: 8, paddingRight: 10, paddingLeft: 2 }} />
                <Text style={{ color: '#323131', fontSize: 24, fontFamily: 'AvenirNext-Bold' }}>Favorites</Text>
            </View>
            <BusinessList type='favorites'></BusinessList>
        </View>
    );
};
const mapStateToProps = state => ({
    User: state.user
});
export default connect(mapStateToProps, {reloadFavorites, getFavorites})(Favorites);