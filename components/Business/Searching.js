//Searchbar functionality does not work

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Button,  } from 'react-native-elements';
import { findPlace, getNearby } from '../../actions/business';
import { styles } from '../Styles';
import BusinessList from './BusinessList';
import Loading from '../layout/Loading';
import Header from '../../components/layout/Header'
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const Searching = ({ getNearby, route: { params: { query, location } }, navigation, business }) => {
    const [distance, setDistance] = useState(3);
    const [search, updateSearch] = useState("");
    const [modalVisible, setVisible] = useState(false);
    const milesToKm = (miles) => {
        return 1.6 * miles;
    };

    const newQuery = function (input) {
        navigation.navigate('Searching', { query: input, location: location });
    };

    useEffect(() => {
        //TODO Only add search results to state pressing the search bar again
        if (query) {
            getNearby({ keyword: query }, location.coords);
        } else {
            getNearby();
        }
    }, []);
    return (
        <View style={styles.landing}>
            {business.loadingSearch ? <Loading /> :
                <View style={{ flex: 1 }}>
                    <Header></Header>
                    <SearchBar
                        placeholder="Search"
                        onChangeText={(text) => updateSearch(text)} 
                        defaultValue={search}
                        value={search}
                        platform="ios"
                        containerStyle={{backgroundColor: 'transparent',
                        padding: 5, 
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3}}
                        inputContainerStyle={{backgroundColor: 'white', borderRadius: 0, height: 50}}
                        returnKeyType="search"
                        onSubmitEditing={(e) => newQuery(e.nativeEvent.text)}
                    />
                    <View style={{flex: 1.1, paddingBottom: 8}}>
                        <ScrollView horizontal={true} style={{ height: 20, paddingLeft: 15}} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity style={{paddingHorizontal: 3}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', borderRadius: 14, borderColor: 'gray', borderWidth: 0.5, padding: 8}}>
                                    <View style={{paddingRight: 3}}><MaterialCommunityIcons name='filter' color='gray' size={14}></MaterialCommunityIcons></View>
                                    <Text style={{color: 'gray', fontWeight: 'bold', fontSize: 11}}>
                                        Filter
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{paddingHorizontal: 3}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', borderRadius: 14, borderColor: 'gray', borderWidth: 0.5, padding: 8}}>
                                    <View style={{paddingRight: 5}}><MaterialCommunityIcons name='sort' color='gray' size={14}></MaterialCommunityIcons></View>
                                    <Text style={{color: 'gray', fontWeight: 'bold', fontSize: 11}}>
                                        Sort
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{paddingHorizontal: 3}}>
                                <Text style={{borderRadius: 14, borderColor: 'gray', color: 'gray', fontWeight: 'bold' ,borderWidth: 0.7, padding: 8, fontSize: 11}}>
                                    Within 5 mi.
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{paddingHorizontal: 3}}>
                                <Text style={{borderRadius: 14, borderColor: 'gray', color: 'gray', fontWeight: 'bold' ,borderWidth: 0.7, padding: 8, fontSize: 11}}>
                                    Low Population
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{paddingHorizontal: 3}}>
                                <Text style={{borderRadius: 14, borderColor: 'gray', color: 'gray', fontWeight: 'bold', borderWidth: 0.7, padding: 8, fontSize: 11}}>
                                    Currently Open
                                </Text>
                            </TouchableOpacity>
                            <View style={{width: 30}}></View>
                        </ScrollView>
                    </View>
                    <Modal
                        isVisible={modalVisible}
                        coverScreen={false}
                        backdropColor={"white"}
                        backdropOpacity={0.8}
                        animationInTiming={500}
                        swipeDirection={['up', 'down']}
                        onSwipeComplete={(e) => { if (e.swipingDirection === 'down') setVisible(false); }}
                    >
                        <View style={{ height: 100, width: "100%", alignContent: "center" }}>
                            <Text>Search Preferences</Text>
                            <View>
                                <Text>Distance Within</Text>
                                <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                                    <Button title="3 Miles"></Button>
                                    <Button title="5 Miles"></Button>
                                    <Button title="10 Miles"></Button>
                                    <Button title="10+ Miles"></Button>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <View style={{borderTopWidth: 1, borderTopColor: 'gainsboro'}}></View>
                    <BusinessList navigation={navigation} businesses={business.searchBusinesses} dbBusinesses={business.dbSearchBusinesses}></BusinessList>
                </View>
            }
        </View>
    );
};
const mapStateToProps = state => ({
    business: state.business
});
export default connect(mapStateToProps, { getNearby })(Searching);
