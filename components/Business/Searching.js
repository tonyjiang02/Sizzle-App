//Searchbar functionality does not work

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, Image, Animated, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Button, } from 'react-native-elements';
import { findPlace, getNearby, newSearch } from '../../actions/business';
import { styles } from '../Styles';
import BusinessList from './BusinessList';
import SearchLoading from '../layout/SearchLoading';
import Header from '../../components/layout/Header';
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { getFontSize, getIconSize } from '../../utils/fontsizes';

const Searching = ({ getNearby, newSearch, route: { params: { query, location } }, navigation, business }) => {
    const [distance, setDistance] = useState(3);
    const [search, updateSearch] = useState(query);
    const [sortModalVisible, setSortVisible] = useState(false);
    const [checkWithinFiveMiles, setWithinFiveMiles] = useState(false);
    const [checkLowPopulation, setLowPopulation] = useState(false);
    const [checkCurrentlyOpen, setCurrentlyOpen] = useState(false);
    const [checkVerified, setVerified] = useState(false);

    const milesToKm = (miles) => {
        return 1.6 * miles;
    };

    const newQuery = function (input) {
        newSearch();
        getNearby({ keyword: input }, location);
    };

    //filter buttons
    let withinFiveMilesDisplay = <Text></Text>;
    if (checkWithinFiveMiles === false) {
        withinFiveMilesDisplay = <Text style={{ borderRadius: 14, borderColor: 'gray', color: 'gray', fontWeight: 'bold', borderWidth: 0.7, padding: 9, fontSize: getFontSize(11) }}>Within 5 mi.</Text>;
    }
    else if (checkWithinFiveMiles === true) {
        withinFiveMilesDisplay =
            <View style={{ borderRadius: 14, borderColor: '#ff9900', backgroundColor: '#ff9900', padding: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: getFontSize(11) }}>Within 5 mi.</Text>
            </View>;
    }

    let lowPopulationDisplay = <Text></Text>;
    if (checkLowPopulation === false) {
        lowPopulationDisplay = <Text style={{ borderRadius: 14, borderColor: 'gray', color: 'gray', fontWeight: 'bold', borderWidth: 0.7, padding: 9, fontSize: getFontSize(11) }}>Low Population</Text>;
    }
    else if (checkLowPopulation === true) {
        lowPopulationDisplay =
            <View style={{ borderRadius: 14, borderColor: '#ff9900', backgroundColor: '#ff9900', padding: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: getFontSize(11) }}>Low Population</Text>
            </View>;
    }

    let currentlyOpenDisplay = <Text></Text>;
    if (checkCurrentlyOpen === false) {
        currentlyOpenDisplay = <Text style={{ borderRadius: 14, borderColor: 'gray', color: 'gray', fontWeight: 'bold', borderWidth: 0.7, padding: 9, fontSize: getFontSize(11) }}>Open</Text>;
    }
    else if (checkCurrentlyOpen === true) {
        currentlyOpenDisplay =
            <View style={{ borderRadius: 14, borderColor: '#ff9900', backgroundColor: '#ff9900', padding: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: getFontSize(11) }}>Open</Text>
            </View>;
    }

    let checkVerifiedDisplay = <Text></Text>;
    if (checkVerified === false) {
        checkVerifiedDisplay = <Text style={{ borderRadius: 14, borderColor: 'gray', color: 'gray', fontWeight: 'bold', borderWidth: 0.7, padding: 9, fontSize: getFontSize(11) }}>Verified Only</Text>;
    }
    else if (checkVerified === true) {
        checkVerifiedDisplay =
            <View style={{ borderRadius: 14, borderColor: '#ff9900', backgroundColor: '#ff9900', padding: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: getFontSize(11) }}>Verified Only</Text>
            </View>;
    }

    //Search loading stuff
    let results = <SearchLoading />;
    if (business.loadingSearch === true) {
        results = <SearchLoading></SearchLoading>;
    }
    else if (business.loadingSearch === false) {
        results = <View style={{ flex: 1 }}>
            <BusinessList navigation={navigation}></BusinessList>
        </View>;
    }

    useEffect(() => {
        //TODO Only add search results to state pressing the search bar again
        if (query) {
            getNearby({ keyword: query }, location);
        } else {
            getNearby();
        }
    }, []);
    return (
        <View style={styles.landing}>
            <Header navigation={navigation}></Header>
            <SearchBar
                onChangeText={(text) => updateSearch(text)}
                value={search}
                platform="ios"
                containerStyle={{
                    width: Dimensions.get('window').width-5,
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
                inputContainerStyle={{ backgroundColor: 'white', borderRadius: 5, height: 40 }}
                returnKeyType="search"
                onSubmitEditing={(e) => newQuery(e.nativeEvent.text)}
            />
            <View style={{ paddingVertical: 5 }}>
                <View flexDirection='row' style={{ height: 40, justifyContent: 'space-between', paddingHorizontal: 10 }} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => { setWithinFiveMiles(!checkWithinFiveMiles); }} style={{ paddingHorizontal: 3, flex: 1 }}>
                        {withinFiveMilesDisplay}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setLowPopulation(!checkLowPopulation); }} style={{ paddingHorizontal: 3, flex: 1 }}>
                        {lowPopulationDisplay}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setCurrentlyOpen(!checkCurrentlyOpen); }} style={{ paddingHorizontal: 3, flex: 1 }}>
                        {currentlyOpenDisplay}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setVerified(!checkVerified); }} style={{ paddingHorizontal: 3, flex: 1 }}>
                        {checkVerifiedDisplay}
                    </TouchableOpacity>
                    <View style={{ width: 30 }}></View>
                </View>
            </View>
            <View style={{ borderTopWidth: 0.7, borderTopColor: 'gainsboro' }}></View>
            {results}
        </View>
    );
};
const mapStateToProps = state => ({
    business: state.business
});
export default connect(mapStateToProps, { getNearby, newSearch })(Searching);