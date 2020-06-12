//Searchbar functionality does not work

import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, Image, Animated, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Button, } from 'react-native-elements';
import { findPlace, getNearby, newSearch, newFilter, loadFilter } from '../../actions/business';
import { styles } from '../Styles';
import BusinessList from './BusinessList';
import SearchLoading from '../layout/SearchLoading';
import Header from '../../components/layout/Header';
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import { set } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const Searching = ({ getNearby, newSearch, newFilter, loadFilter, route: { params: { query, location } }, navigation, business }) => {
    const [distance, setDistance] = useState(3);
    const [search, updateSearch] = useState(query);
    const [sortModalVisible, setSortVisible] = useState(false);
    const [checkWithinFiveMiles, setWithinFiveMiles] = useState(false);
    const [checkLowPopulation, setLowPopulation] = useState(false);
    const [checkCurrentlyOpen, setCurrentlyOpen] = useState(false);
    const [checkVerified, setVerified] = useState(false);
    const [results, setResults] = useState(<SearchLoading></SearchLoading>);
    const [filterPressed, setFilterPressed] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.loop(
            Animated.sequence([
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800
              }), 
              Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 800
                })
            ]),
          ).start()
    };

    const milesToKm = (miles) => {
        return 1.6 * miles;
    };

    //Search loading stuff
    useEffect(() => {
        if (business.loadingSearch === true){
            setResults(<SearchLoading></SearchLoading>)
        }
        else if (business.loadingSearch === false) {
            setResults(<View style={{ flex: 1 }}>
                <BusinessList type='search' navigation={navigation}></BusinessList>
            </View>);
        }
    }, [business.loadingSearch])

    useEffect(() => {
        if (filterPressed){
            //console.log('filter pressed');
            //console.log('after useeffect: within: ' + checkWithinFiveMiles + ' lowpop: ' + checkLowPopulation + ' open: ' + checkCurrentlyOpen + ' verified: ' + checkVerified );
            getNewFilter();
            setFilterPressed(false);
        }
    }, [filterPressed])

    const getNewFilter = () => {
        //usestate doesnt rerender until component changes again so it's backwards
        console.log('getNewFilter method called');  
        newFilter();
        loadFilter(checkWithinFiveMiles, checkLowPopulation, checkCurrentlyOpen, checkVerified, business.searchBusinesses, business.dbSearchBusinesses, location);
        setResults(<View style={{ flex: 1 }}>
            <BusinessList type='filter' navigation={navigation}></BusinessList>
        </View>);
    }

    useEffect(() => {
        //TODO Only add search results to state pressing the search bar again
        if (query) {
            getNearby({ keyword: query }, location);
        } else {
            getNearby();
        }
    }, []);

    const newQuery = function (input) {
        newSearch();
        getNearby({ keyword: input }, location);
    };

    //filter buttons
    let withinFiveMilesDisplay = <Text></Text>;
    if (checkWithinFiveMiles === false) {
        withinFiveMilesDisplay = <Text style={{ borderRadius: 14, borderColor: 'white', color: 'white', fontWeight: 'bold', borderWidth: 0.7, padding: 9, fontSize: getFontSize(11) }}>Within 5 mi.</Text>;
    }
    else if (checkWithinFiveMiles === true) {
        withinFiveMilesDisplay =
            <View style={{ borderRadius: 14, borderColor: 'white', backgroundColor: 'white', padding: 10 }}>
                <Text style={{ color: '#ff9900', fontWeight: 'bold', fontSize: getFontSize(11) }}>Within 5 mi.</Text>
            </View>;
    }

    let lowPopulationDisplay = <Text></Text>;
    if (checkLowPopulation === false) {
        lowPopulationDisplay = <Text style={{ borderRadius: 14, borderColor: 'white', color: 'white', fontWeight: 'bold', borderWidth: 0.7, padding: 9, fontSize: getFontSize(11) }}>Low Population</Text>;
    }
    else if (checkLowPopulation === true) {
        lowPopulationDisplay =
            <View style={{ borderRadius: 14, borderColor: 'white', backgroundColor: 'white', padding: 10 }}>
                <Text style={{ color: '#ff9900', fontWeight: 'bold', fontSize: getFontSize(11) }}>Low Population</Text>
            </View>;
    }

    let currentlyOpenDisplay = <Text></Text>;
    if (checkCurrentlyOpen === false) {
        currentlyOpenDisplay = <Text style={{ borderRadius: 14, borderColor: 'white', color: 'white', fontWeight: 'bold', borderWidth: 0.7, padding: 9, fontSize: getFontSize(11) }}>Open</Text>;
    }
    else if (checkCurrentlyOpen === true) {
        currentlyOpenDisplay =
            <View style={{ borderRadius: 14, borderColor: 'white', backgroundColor: 'white', padding: 10 }}>
                <Text style={{ color: '#ff9900', fontWeight: 'bold', fontSize: getFontSize(11) }}>Open</Text>
            </View>;
    }

    let checkVerifiedDisplay = <Text></Text>;
    if (checkVerified === false) {
        checkVerifiedDisplay = <Text style={{ borderRadius: 14, borderColor: 'white', color: 'white', fontWeight: 'bold', borderWidth: 0.7, padding: 9, fontSize: getFontSize(11) }}>Verified Only</Text>;
    }
    else if (checkVerified === true) {
        checkVerifiedDisplay =
            <View style={{ borderRadius: 14, borderColor: 'white', backgroundColor: 'white', padding: 10 }}>
                <Text style={{ color: '#ff9900', fontWeight: 'bold', fontSize: getFontSize(11) }}>Verified Only</Text>
            </View>;
    }

    return (
        <View style={{backgroundColor: '#ff9900', flex: 1}}>
            <Header navigation={navigation}></Header>
            <SearchBar
                onChangeText={(text) => updateSearch(text)}
                value={search}
                platform="ios"
                containerStyle={{
                    width: Dimensions.get('window').width-5,
                    paddingTop: 10,
                    paddingBottom: 5,
                    backgroundColor: 'transparent',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 0.5,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 1.22,
                    elevation: 3,
                }}
                inputContainerStyle={{ backgroundColor: 'white', borderRadius: 5, height: 45 }}
                cancelButtonProps={{ disabled: true, buttonStyle: { width: 8 } }}
                returnKeyType="search"
                onSubmitEditing={(e) => newQuery(e.nativeEvent.text)}
            />
            {!business.loadingSearch ? <View style={{ paddingTop: 5, backgroundColor: '#ff9900'}}>
                <View flexDirection='row' style={{ height: 40, justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => { setWithinFiveMiles(!checkWithinFiveMiles); setFilterPressed(true)}} style={{ paddingHorizontal: 3, flex: 1 }}>
                        {withinFiveMilesDisplay}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setLowPopulation(!checkLowPopulation); setFilterPressed(true)}} style={{ paddingHorizontal: 3, flex: 1 }}>
                        {lowPopulationDisplay}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setCurrentlyOpen(!checkCurrentlyOpen); setFilterPressed(true)}} style={{ paddingHorizontal: 3, flex: 1 }}>
                        {currentlyOpenDisplay}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setVerified(!checkVerified); setFilterPressed(true)}} style={{ paddingHorizontal: 3, flex: 1 }}>
                        {checkVerifiedDisplay}
                    </TouchableOpacity>
                </View>
            </View> : 
            <View style={{ paddingTop: 5, backgroundColor: '#ff9900' }}>
                <Animated.View onLayout={fadeIn} flexDirection='row' style={{ height: 40, justifyContent: 'center', opacity: fadeAnim }}>
                    <TouchableWithoutFeedback style={{ paddingHorizontal: 3, flex: 1 }}>
                        <View style={{ borderRadius: 14, borderColor: 'gray', backgroundColor: 'gainsboro', padding: 10 }}>
                            <Text style={{ color: 'gainsboro', fontWeight: 'bold', fontSize: getFontSize(11) }}>Within 5 mi.</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={{ paddingHorizontal: 3, flex: 1 }}>
                        <View style={{ borderRadius: 14, borderColor: 'gray', backgroundColor: 'gainsboro', padding: 10 }}>
                            <Text style={{ color: 'gainsboro', fontWeight: 'bold', fontSize: getFontSize(11) }}>Low Population</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={{ paddingHorizontal: 3, flex: 1 }}>
                        <View style={{ borderRadius: 14, borderColor: 'gray', backgroundColor: 'gainsboro', padding: 10 }}>
                            <Text style={{ color: 'gainsboro', fontWeight: 'bold', fontSize: getFontSize(11) }}>Open</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback style={{ paddingHorizontal: 3, flex: 1 }}>
                        <View style={{ borderRadius: 14, borderColor: 'gray', backgroundColor: 'gainsboro', padding: 10 }}>
                            <Text style={{ color: 'gainsboro', fontWeight: 'bold', fontSize: getFontSize(11) }}>Verified Only</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </View> }
            <View style={{flex: 20}}>
                <LinearGradient
                    colors={['#ff9900', '#ff5f6d', '#ff5f6d']} style={{flex: 1}}
                >
                    {results}
                </LinearGradient>
            </View>
        </View>
    );
};
const mapStateToProps = state => ({
    business: state.business
});
export default connect(mapStateToProps, { getNearby, newSearch, newFilter, loadFilter })(Searching);