import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import BusinessSquare from './BusinessSquare';
const BusinessSideScroll = ({ businesses }) => {
    //businesses : {googleData, ourData}
    //bs = googleData
    //db = ourData
    const [list, updateList] = useState([]);
    useEffect(() => {
        console.log("Side scroll rendered");
        console.log(businesses.length);
        const l = businesses.map((tuple) => {
            <BusinessSquare key={tuple.business.googleId} business={tuple.business} db={tuple.db}></BusinessSquare>;
        });
        updateList(l);
    }, [businesses]);

    return (
        <ScrollView
            horizontal={true}
            style={{ height: 200 }}
        >
            {list}
        </ScrollView>
    );
};

export default BusinessSideScroll;
