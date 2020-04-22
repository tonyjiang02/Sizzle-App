import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Modal, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { findPlace, getNearby } from '../../actions/business';
import { styles } from '../Styles';
import BusinessList from './BusinessList';
import Loading from '../layout/Loading';
const Searching = ({ getNearby, route: { params: { query } }, navigation, business }) => {
    const [distance, setDistance] = useEffect(3);
    const [modalVisible, setVisible] = useEffect(false);
    const milesToKm = (miles) => {
        return 1.6 * miles;
    };
    useEffect(() => {
        //TODO Only add search results to state pressing the search bar again
        if (query) {
            getNearby({ keyword: query });
        } else {
            getNearby();
        }
    }, []);
    return (
        <View style={styles.landing}>
            {business.loadingSearch ? <Loading /> :
                <View style={{ flex: 1 }}>
                    <Text>HELLO THERE</Text>
                    <Button
                        title={distance + " Miles"}
                        onPress={setVisible(true)}
                    />

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={{ alignContent: center }}>
                            <Text>Search Preferences</Text>
                            <View>
                                <Text>Distance Within</Text>
                                <View style={{ flexDirection: row }}>
                                    <Button title="3 Miles"></Button>
                                    <Button title="5 Miles"></Button>
                                    <Button title="10 Miles"></Button>
                                    <Button title="10+ Miles"></Button>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            }
        </View>
    );
};
const mapStateToProps = state => ({
    business: state.business
});
export default connect(mapStateToProps, { getNearby })(Searching);
