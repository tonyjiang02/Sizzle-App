//business can report a live update

import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles';
import { textTruncateBySpace } from '../../utils/TextTruncate';
import { openBusinessPage } from '../../actions/business';
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
const ReservationScroll = ({ /*business, navigation, db, openBusinessPage*/ }) => {
    //Needs this reservation's date, current time, opening time, closing time, time slot length, #ppl allowed, #ppl currently registered at each time slot

    let curent = new Date(2020, 5, 6, 10, 33);
    let opening = new Date(2020, 5, 6, 8, 0);
    let closing= new Date(2020, 5, 6, 18, 0)
    let timeslot = 30; //in minutes
    let people = 50;
    let registered=Math.round(Math.random()*people);

    

    return (
        <View>
            <Text style={{fontFamily: 'AvenirNext-Bold', fontSize: 24, color: 'darkslategrey', paddingTop: 5}}>Today</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingTop: 5}}>
                <View style={{paddingRight: 10, flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', paddingBottom: 5}}>
                        <Text style={{fontFamily: 'AvenirNext-Bold'}}>11:30-12:00pm</Text>
                        <Text>{people} / {people}</Text>
                    </View>
                    <View>
                        <View style={{borderRadius: 20, borderColor: 'gray', borderWidth: 0.5, backgroundColor: 'gray', paddingHorizontal: 30}}>
                            <Text style={{color: 'white', fontWeight: 'bold' ,padding: 8, fontSize: 12 }}>
                                Reserve
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{paddingRight: 10, flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', paddingBottom: 5}}>
                        <Text style={{fontFamily: 'AvenirNext-Bold'}}>12:00-12:30pm</Text>
                        <Text>{registered} / {people}</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={{borderRadius: 20, borderColor: '#ff9900', borderWidth: 0.5, backgroundColor: '#ff9900', paddingHorizontal: 30}}>
                            <Text style={{color: 'white', fontWeight: 'bold' ,padding: 8, fontSize: 12 }}>
                                Reserve
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{paddingRight: 10, flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', paddingBottom: 5}}>
                        <Text style={{fontFamily: 'AvenirNext-Bold'}}>12:30-1:00pm</Text>
                        <Text>{registered} / {people}</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={{borderRadius: 20, borderColor: '#ff9900', borderWidth: 0.5, backgroundColor: '#ff9900', paddingHorizontal: 30}}>
                            <Text style={{color: 'white', fontWeight: 'bold' ,padding: 8, fontSize: 12 }}>
                                Reserve
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{paddingRight: 10, flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', paddingBottom: 5}}>
                        <Text style={{fontFamily: 'AvenirNext-Bold'}}>1:00-1:30pm</Text>
                        <Text>{registered} / {people}</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={{borderRadius: 20, borderColor: '#ff9900', borderWidth: 0.5, backgroundColor: '#ff9900', paddingHorizontal: 30}}>
                            <Text style={{color: 'white', fontWeight: 'bold' ,padding: 8, fontSize: 12 }}>
                                Reserve
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{paddingRight: 10, flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', paddingBottom: 5}}>
                        <Text style={{fontFamily: 'AvenirNext-Bold'}}>1:30-2:00pm</Text>
                        <Text>{registered} / {people}</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={{borderRadius: 20, borderColor: '#ff9900', borderWidth: 0.5, backgroundColor: '#ff9900', paddingHorizontal: 30}}>
                            <Text style={{color: 'white', fontWeight: 'bold' ,padding: 8, fontSize: 12 }}>
                                Reserve
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{paddingRight: 10, flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', paddingBottom: 5}}>
                        <Text style={{fontFamily: 'AvenirNext-Bold'}}>2:00-2:30pm</Text>
                        <Text>{registered} / {people}</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={{borderRadius: 20, borderColor: '#ff9900', borderWidth: 0.5, backgroundColor: '#ff9900', paddingHorizontal: 30}}>
                            <Text style={{color: 'white', fontWeight: 'bold' ,padding: 8, fontSize: 12 }}>
                                Reserve
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{paddingRight: 10, flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', paddingBottom: 5}}>
                        <Text style={{fontFamily: 'AvenirNext-Bold'}}>2:30-3:00pm</Text>
                        <Text>{registered} / {people}</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={{borderRadius: 20, borderColor: '#ff9900', borderWidth: 0.5, backgroundColor: '#ff9900', paddingHorizontal: 30}}>
                            <Text style={{color: 'white', fontWeight: 'bold' ,padding: 8, fontSize: 12 }}>
                                Reserve
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                

            
            <View style={{width: 20}}></View>
            
            
            </ScrollView>
        </View>
        
    );
};

export default ReservationScroll;
