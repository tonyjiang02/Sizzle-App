
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, SafeAreaView, Text, Linking, Animated, ScrollView, Dimensions, Image, TouchableOpacity, Picker } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import Header from '../../layout/Header'
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getFontSize, getIconSize } from '../../../utils/fontsizes';
import { styles } from '../../Styles';
import MenuItem from './MenuItem';
import MenuCategory from './MenuCategory';
import Addons from './Addons/Addons';

export const MenuPage = ({ route: { params: { navigation, bizimage, name } }}) => {
    const [itemAddons, setAddons] = useState(null);
    const [checkDeals, setDeals] = useState(false);
    const [ checkAvailable, setAvailable] = useState(false);
    const [ menuList, setMenuList ] = useState([]);
    const [ itemOptions, setOptions ] = useState([]);
    const [ itemDesc, setDesc ] = useState('');
    const [ itemName, setItemName] = useState("");
    const [ itemImage, setItemImage ] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const [itemModalVisible, setItemModalVisible] = useState(false);

    useEffect(() => {
        let list = [];
        for (let k=0; k<menu.menu.length; k++){
            list.push(<MenuCategory navigation={navigation} name={menu.menu[k].category} items={menu.menu[k].items} onPress={showModal}></MenuCategory>);
        }
        setMenuList(list);
    }, [])

    const showModal = (name, image, options, addons, price, desc) => {
        setAddons(<Addons obj={addons}></Addons>);
        setOptions(options);
        setItemName(name);
        setItemImage(image);
        setItemPrice(price);
        setDesc(desc);
        setItemModalVisible(true);
    }
    //example menu object
    const menu = {
        businessname: 'Temp Name',
        businessID: 'tempid',
        menu: [
            {
                category: 'Burgers and Fries',
                items: [
                    {
                        name: 'Double-Double', 
                        price: 3.45,
                        image: 'https://picsum.photos/200/300',
                        desc: "This burger can add cheese, onions, pickles, two patties, and a charred bun. ",
                        outofstock: false,
                        addons: [{title:"onions", price:0}, {title:"pickles", price:0}, {title:"extra patty", price:1.00}], 
                        options: [{name: 'Patty Style', options: [{name: 'medium rare', price: 0}, {name: 'medium', price: 0}, {name: 'well done', price: 0}]}, {name: 'Bun Style', options: [{name: 'Regular', price: 0}, {name: 'Protein Style', price: 0}]}],
                        dealPrice: 2.45
                    },
                    {
                        name: 'Cheeseburger', 
                        price: 2.40,
                        image: 'https://picsum.photos/200/300',
                        desc: "This burger can add cheese, onions, pickles, one patty, and a charred bun.",
                        outofstock: false,
                        addons: [{title:"cheese", price:0.5}, {title:"onions", price:0}, {title:"pickles", price:0}], 
                        options: [{name: 'Patty Style', options: [{name: 'medium rare', price: 0}, {name: 'medium', price: 0}, {name: 'well done', price: 0}]}, {name: 'Bun Style', options: [{name: 'Regular', price: 0}, {name: 'Protein Style', price: 0}]}]
                    },
                    {
                        name: 'Hamburger', 
                        price: 2.10,
                        image: 'https://picsum.photos/200/300',
                        desc: "This burger can add onions, pickles, one patty, and a charred bun.",
                        outofstock: false,
                        addons: [{title:"onions", price:0}, {title:"pickles", price:0}],  
                        options: [{name: 'Patty Style', options: [{name: 'medium rare', price: 0}, {name: 'medium', price: 0}, {name: 'well done', price: 0}]}, {name: 'Bun Style', options: [{name: 'Regular', price: 0}, {name: 'Protein Style', price: 0}]}]
                    }
                ]
            },
            {
                category: 'Drinks',
                items: [
                    {
                        name: 'Soft Drink', 
                        price: 1.50,
                        image: 'https://picsum.photos/200/300',
                        desc: "Medium and large upgrades available.",
                        outofstock: false,
                        addons: [],
                        options: [{name: 'Size', options: [{name: 'small', price: 0}, {name: 'medium', price: 0.2}, {name: 'large', price: 0.3}]}, {name: 'Drink', options: [{name: 'Sprite', price: 0}, {name: 'Coke', price: 0}]}]
                    },
                    {
                        name: 'Shake', 
                        price: 2.15,
                        image: 'https://picsum.photos/200/300',
                        desc: "Medium and large upgrades available",
                        outofstock: false,
                        addons: [],
                        options: [{name: 'Size', options: [{name: 'small', price: 0}, {name: 'medium', price: 0.3}, {name: 'large', price: 0.5}]}, {name: 'Flavor', options: [{name: 'Strawberry', price: 0}, {name: 'Vanilla', price: 0}, {name: 'Chocolate', price: 0}]}]
                    }
                ]
            }
        ]
    }

    //filter buttons
    let categoriesDropdown = 
            <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                <View style={{paddingRight: 5}}>
                    <AntDesign name="down" size={getIconSize(12)} color='purple'></AntDesign>
                </View>
                <Text style={{ color: 'purple', fontWeight: 'bold', fontSize: getFontSize(12) }}>Categories</Text>
            </View>;

    let priceDropdown = 
            <View style={{ borderRadius: 14, borderColor: 'white', backgroundColor: 'transparent', padding: 10, flexDirection: 'row' }}>
                <View style={{paddingRight: 5}}>
                    <AntDesign name="down" size={getIconSize(12)} color='purple'></AntDesign>
                </View>
                <Text style={{ color: 'purple', fontWeight: 'bold', fontSize: getFontSize(12) }}>Price</Text>
            </View>

    let dealsButton = <Text></Text>;
    if (checkDeals === false) {
        dealsButton = <Text style={{ borderRadius: 14, borderColor: 'purple', color: 'purple', fontWeight: 'bold', borderWidth: 0.7, padding: 9, fontSize: getFontSize(12) }}>Deals</Text>;
    }
    else if (checkDeals === true) {
        dealsButton =
            <View style={{ borderRadius: 14, borderColor: 'purple', backgroundColor: 'purple', padding: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: getFontSize(12) }}>Deals</Text>
            </View>;
    }

    let availableDisplay = <Text></Text>;
    if (checkAvailable === false) {
        availableDisplay = <Text style={{ borderRadius: 14, borderColor: 'purple', color: 'purple', fontWeight: 'bold', borderWidth: 0.7, padding: 9, fontSize: getFontSize(12) }}>Available</Text>;
    }
    else if (checkAvailable === true) {
        availableDisplay =
            <View style={{ borderRadius: 14, borderColor: 'purple', backgroundColor: 'purple', padding: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: getFontSize(12) }}>Available</Text>
            </View>;
    }

    return (
        <View style={{backgroundColor: 'lavender', flex: 1}}>
            <Modal
                propagateSwipe={true}
                isVisible={itemModalVisible}
                coverScreen={false}
                backdropColor={"lavender"}
                backdropOpacity={0.7}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                animationInTiming={500}
            >
                <View style={styles.pickupModalView}>
                    <TouchableOpacity onPress={() => { setItemModalVisible(false); }}>
                        <AntDesign name='downcircle' color='purple' size={getIconSize(19)} style={{ alignSelf: 'center' }}></AntDesign>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{paddingRight: 10}}>
                            <Image source={{ uri: itemImage}} style={{height: 50, width: 50, borderRadius: 25}}></Image>
                        </View>
                        <Text style={{ color: 'black', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingBottom: 10, alignSelf: 'flex-end'}}>{itemName}</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{paddingTop: 10}}>
                            <Text style={{fontFamily: 'Avenir', fontSize: getFontSize(15), color: 'black', textAlign: 'center'}}>{itemDesc}</Text>
                        </View>
                        <View style={{height: 10}}></View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontFamily: 'AvenirNext-Bold', fontSize: getFontSize(22), textAlign: 'center'}}>Addons</Text>
                            {itemAddons}
                        </View>
                        <Text></Text>
                    </ScrollView>
                    <View style={{height: 10}}></View>
                    <TouchableOpacity>
                        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff9900', borderRadius: 20, alignSelf: 'center', shadowColor: "#000", shadowOffset: {width: 0,height: 1,},shadowOpacity: 0.22,shadowRadius: 2.22,elevation: 3}}>
                            <Text style={{paddingVertical: 10, width: Dimensions.get('window').width-100, fontSize: getFontSize(22), fontFamily: 'AvenirNext-Bold', textAlign: 'center', color: 'white'}}>Add</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={{backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'flex-end'}}>
                <View style={{height: 50}}></View>
                <Text style={{ color: 'black', fontSize: getFontSize(24), fontFamily: 'AvenirNext-Bold' }}>Pickup</Text>
                <View style={{shadowColor: "#000", shadowOffset: {width: 0,height: 1,},shadowOpacity: 0.22,shadowRadius: 2.22,elevation: 3, paddingVertical: 5}}>
                    <Image source={bizimage ? { uri: bizimage } : require('../../../assets/backgroundhue.png')} style={{height: 100, width: 100, borderRadius: 50}}></Image>
                </View>
                <Text style={{ color: 'black', fontSize: getFontSize(18), fontFamily: 'Avenir-Light'}}>{name}</Text>
            </View>
            <View style={{ paddingTop: 5, backgroundColor: 'transparent'}}>
                <View flexDirection='row' style={{ height: 40, justifyContent: 'center'}}>
                    <TouchableOpacity style={{ paddingHorizontal: 3 }}>
                        {categoriesDropdown}
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingHorizontal: 3 }}>
                        {priceDropdown}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setDeals(!checkDeals)}} style={{ paddingHorizontal: 3 }}>
                        {dealsButton}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setAvailable(!checkAvailable)}} style={{ paddingHorizontal: 3 }}>
                        {availableDisplay}
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{height: Dimensions.get('window').height}}>
                <View style={{backgroundColor: 'lavender'}}>
                    {menuList}
                    <View style={{height: 100}}></View>
                </View>
            </ScrollView>
        </View>
    );
};

const mapStateToProps = state => ({
    dbNearestBusinesses: state.business.dbNearestBusinesses,
    nearestBusinesses: state.business.nearestBusinesses,
    loadingNearest: state.business.loadingNearest,
    User: state.user,
    Auth: state.auth
});
export default MenuPage;