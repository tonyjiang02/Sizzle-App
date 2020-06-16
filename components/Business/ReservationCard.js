import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView, Dimensions, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import ExampleBusinessCard from './ExampleBusinessCard';
import { styles } from '../Styles';
import Outlines from '../../assets/Outlines';
import { textTruncateBySpace } from '../../utils/TextTruncate';
import { getFontSize, getIconSize } from '../../utils/fontsizes';
import { updateUserWithoutReturn } from '../../actions/user';
import { updateBusinessReservations, getBusinessField } from '../../actions/business';
import user from '../../reducers/user';

export const ReservationCard = ({ index, date, id, time, name, address, key, reservations, deleteIndex, updateUserWithoutReturn, updateBusinessReservations, getBusinessField }) => {
    const splitDate = date.split(' ');
    const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const weekMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const compareDate = new Date(splitDate[3], monthArr.indexOf(splitDate[1]), splitDate[2], 23, 59, 59);
    console.log(compareDate);
    let d = Date.now();
    const cancelReservation = async () => {
        let changedReservations = reservations;
        console.log("Deleted key " + deleteIndex);
        changedReservations.splice(deleteIndex, 1);
        let user = {
            reservations: changedReservations
        };
        updateUserWithoutReturn(user);
        let response = await getBusinessField(id, "reservations");
        console.log(response);
        let businessReservations = response.reservations;
        businessReservations[weekMap[index.day].toLowerCase()][index.index].users -= 1;
        updateBusinessReservations(id, businessReservations);
    };
    const past = d < compareDate;
    const createCancelAlert = () =>
        Alert.alert(
            'Do you want to cancel this reservation?',
            '',
            [
                { text: "No" },
                { text: "Yes", onPress: () => cancelReservation() }
            ],
            { cancelable: false }
        );
    return (
        <View style={{ paddingTop: 15 }}>
            <View style={{ height: (Dimensions.get('window').width / 2.5), width: Dimensions.get('window').width - 20, alignSelf: 'center', backgroundColor: past ? 'green' : 'gray', flex: 1, flexDirection: "row", borderRadius: 10 }}>
                <View style={{ paddingLeft: 15, flex: 3.5, alignSelf: 'center' }}>
                    <Text style={{ fontSize: getFontSize(22), flexWrap: 'wrap', fontFamily: 'AvenirNext-Bold', color: 'white' }}>{name > 25 ? textTruncateBySpace(25, name) : name}</Text>
                    <Text style={{ fontSize: getFontSize(12), color: 'white' }}>{address}</Text>
                    <View style={{ height: 10 }}></View>
                    <Text style={{ fontSize: getFontSize(18), color: 'white' }}>{time}</Text>
                    <Text style={{ fontFamily: 'Avenir-Light', color: 'white', fontSize: getFontSize(19) }}>{date}</Text>
                </View>
                {past ?
                    <TouchableOpacity onPress={() => createCancelAlert()} style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: 'red', borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                        <View>
                            <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold' }}>Cancel </Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: 'gray', borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                        <View>
                            <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold' }}>Past </Text>
                        </View>
                    </View>
                }
                <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'gainsboro' }}></View>
            </View>
        </View>
    );
};

const mapStateToProps = state => ({
    reservations: state.user.user.reservations
});

export default connect(mapStateToProps, { updateUserWithoutReturn, updateBusinessReservations, getBusinessField })(ReservationCard);