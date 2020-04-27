import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';
import { findPlace, getNearby } from '../../actions/business';
import { styles } from '../Styles';
import BusinessList from './BusinessList';
import Loading from '../layout/Loading';
const Searching = ({ getNearby, route: { params: { query } }, navigation, business }) => {
    const [distance, setDistance] = useState(3);
    const [modalVisible, setVisible] = useState(false);
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
                <View style={{ flex: 1}}>
                    <Button
                        title={"Search Options"}
                        onPress={() => { setVisible(true); }}
                    />
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
                                <View style={{ flexDirection: "row" }}>
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
