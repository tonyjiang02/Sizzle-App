import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import BusinessSquare from './BusinessSquare';
import CategoryHeader from './CategoryHeader';
import { styles } from '../Styles';

const BusinessSideScroll = ({ businesses, category, navigation }) => {
    //businesses : {googleData, ourData}
    //bs = googleData
    //db = ourData
    const [list, updateList] = useState([]);
    useEffect(() => {
        const l = businesses.map((obj) =>
            <BusinessSquare key={obj.db._id} business={obj.business} db={obj.db} navigation={navigation}></BusinessSquare>
        );
        updateList(l);
    }, [businesses]);
    let returnView = <View></View>;
    if (list.length > 0){
        returnView = <View style={{ backgroundColor: "#f2f2f2" }}>
            <View style={{ backgroundColor: '#f2f2f2' }}>
                <CategoryHeader category={category} />
                <ScrollView horizontal={true} style={{ height: 200, paddingLeft: 15, paddingTop: 5 }} showsHorizontalScrollIndicator={false}>
                    {list}
                    <Text style={{ padding: 10 }}></Text>
                </ScrollView>
            </View>
            <View style={{borderBottomColor: 'gainsboro', borderBottomWidth: 0.7, height: 5}}></View>
        </View>
    }
    return (
        returnView
    );
};

export default BusinessSideScroll;
