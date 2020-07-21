
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
import Option from './Option';
import { createError } from '../../../actions/auth';

export const MenuPage = ({ route: { params: { navigation, bizimage, name } }, createError}) => {
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
    let addItem = ({id: 'start', options: [], addons: [], price: 0});
    const [stateAddItem, setStateAddItem] = useState({});
    const [order, setOrder ] = useState([]);
    const [totalPrice, setTotalPrice ] = useState(0);
    const [reviewButton, setReviewButton] = useState(<></>);

    useEffect(() => {
        let list = [];
        for (let k=0; k<menu.menu.length; k++){
            list.push(<MenuCategory navigation={navigation} name={menu.menu[k].category} items={menu.menu[k].items} onPress={showModal}></MenuCategory>);
        }
        setMenuList(list);
    }, [])

    useEffect(() => {
        console.log(order);
        if (order.length > 0){
            console.log('orderlength > 0')
            setReviewButton(
                <TouchableOpacity>
                    <View style={{width: Dimensions.get('window').width - 50, height: 50, borderRadius: 20, backgroundColor: '#ff9900', position: 'absolute', bottom: 30, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', shadowColor: "#000", shadowOffset: {width: 0,height: 1,},shadowOpacity: 0.22,shadowRadius: 2.22,elevation: 3}}>
                        <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{flex: 2, textAlign: 'center', fontFamily: 'AvenirNext-Bold', fontSize: getFontSize(18), color: 'white'}}>Review Order</Text>
                            <Text style={{flex: 1, fontFamily: 'AvenirNext-Bold', fontSize: getFontSize(18), color: 'white'}}>${totalPrice.toFixed(2)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }, [order])

    const addItemToOrder = () => {
        console.log(stateAddItem);
        try {
            for (let a = 0; a < menu.menu.length; a++){
                for (let b = 0; b < menu.menu[a].items.length; b++){
                    if (menu.menu[a].items[b].id === stateAddItem.id){
                        for (let c = 0; c < menu.menu[a].items[b].options.length; c++){
                            let found = false;
                            for (let d = 0; d < stateAddItem.options.length; d++){
                                console.log('state: '+stateAddItem.options[d].id);
                                console.log(menu.menu[a].items[b].options[c].id)
                                if (stateAddItem.options[d].id === menu.menu[a].items[b].options[c].id){
                                    found = true;
                                }
                            }
                            if (found === false){
                                createError('Please make a selection for all options.', 'error');
                                return false;
                            }
                        }
                    }
                }
            }
            let totalItemPrice = stateAddItem.price;
            console.log(stateAddItem);
            for (let e = 0; e < stateAddItem.options.length; e++){
                totalItemPrice += stateAddItem.options[e].selected.price;
            }
            console.log(totalItemPrice);
            for (let f = 0; f < stateAddItem.addons.length; f++){
                totalItemPrice += stateAddItem.addons[f].price;
            }
            console.log(totalItemPrice);

            setTotalPrice(totalPrice + totalItemPrice);
            setOrder(order.concat(stateAddItem));
            
            return true;
        }
        catch(err) {
            createError('Error adding item, please try again.', 'error')
        }
    }
 
    const addOption = (selectedOption) => {
        let tempAddItemOptions = [...(addItem.options)];
        if (tempAddItemOptions.length === 0){
            tempAddItemOptions.push(selectedOption);
        }
        else {
            for (let k = 0; k < tempAddItemOptions.length; k++){
                if (tempAddItemOptions[k].id === selectedOption.id){
                    tempAddItemOptions.splice(k, 1);
                }
            }
            tempAddItemOptions.push(selectedOption);
        }
        addItem = {id: addItem.id, options: tempAddItemOptions, addons: addItem.addons, price: addItem.price};
        setStateAddItem(addItem);
    }

    const addAddon = (selectedAddon) => {
        let tempAddItemAddons = [...(addItem.addons)];
        if (tempAddItemAddons.length === 0){
            tempAddItemAddons.push(selectedAddon);
        }
        else {
            let remove = false;
            for (let k = 0; k < tempAddItemAddons.length; k++){
                if (tempAddItemAddons[k].id === selectedAddon.id){
                    tempAddItemAddons.splice(k, 1);
                    remove = true;
                }
            }
            if (remove === false){
                tempAddItemAddons.push(selectedAddon);
            }
        }
        addItem = {id: addItem.id, options: addItem.options, addons: tempAddItemAddons, price: addItem.price};
        setStateAddItem(addItem);
    }

    const showModal = (name, image, options, addons, price, desc, id) => {
        setAddons(<Addons obj={addons} addAddon={addAddon}></Addons>);
        if (options.length === 0){
            setOptions(<Text style={{paddingVertical: 15, fontFamily: 'Avenir', fontSize: getFontSize(18), textAlign: 'center'}}>No Options Available</Text>)
        }
        else {
            setOptions(options.map((x)=><Option obj={x} addOption={addOption}></Option>));
        }
        setItemName(name);
        setItemImage(image);
        setItemPrice(price);
        setDesc(desc);
        addItem = {id: id, options: [], addons: [], price: price};
        setStateAddItem(addItem);
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
                        addons: [{title:"onions", price:0, id: 1}, {title:"pickles", price:0, id: 2}, {title:"extra patty", price:1.00, id: 3}], 
                        options: [{name: 'Patty Style', options: [{name: 'medium rare', price: 0}, {name: 'medium', price: 0}, {name: 'well done', price: 0}], id: 1}, {name: 'Bun Style', options: [{name: 'Regular', price: 0}, {name: 'Protein Style', price: 0}], id: 2}],
                        dealPrice: 2.45,
                        id: 'a'
                    },
                    {
                        name: 'Cheeseburger', 
                        price: 2.40,
                        image: 'https://picsum.photos/200/300',
                        desc: "This burger can add cheese, onions, pickles, one patty, and a charred bun.",
                        outofstock: false,
                        addons: [{title:"cheese", price:0.5, id: 1}, {title:"onions", price:0, id: 2}, {title:"pickles", price:0, id: 3}], 
                        options: [{name: 'Patty Style', options: [{name: 'medium rare', price: 0}, {name: 'medium', price: 0}, {name: 'well done', price: 0}], id: 1}, {name: 'Bun Style', options: [{name: 'Regular', price: 0}, {name: 'Protein Style', price: 0}], id: 2}],
                        id: 'b'
                    },
                    {
                        name: 'Hamburger', 
                        price: 2.10,
                        image: 'https://picsum.photos/200/300',
                        desc: "This burger can add onions, pickles, one patty, and a charred bun.",
                        outofstock: false,
                        addons: [{title:"onions", price:0, id: 1}, {title:"pickles", price:0, id: 2}],  
                        options: [{name: 'Patty Style', options: [{name: 'medium rare', price: 0}, {name: 'medium', price: 0}, {name: 'well done', price: 0}], id: 1}, {name: 'Bun Style', options: [{name: 'Regular', price: 0}, {name: 'Protein Style', price: 0}], id: 2}],
                        id: 'c'
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
                        options: [{name: 'Size', options: [{name: 'small', price: 0}, {name: 'medium', price: 0.2}, {name: 'large', price: 0.3}], id: 1}, {name: 'Drink', options: [{name: 'Sprite', price: 0}, {name: 'Coke', price: 0}], id: 2}],
                        id: 'd'
                    },
                    {
                        name: 'Shake', 
                        price: 2.15,
                        image: 'https://picsum.photos/200/300',
                        desc: "Medium and large upgrades available",
                        outofstock: false,
                        addons: [],
                        options: [{name: 'Size', options: [{name: 'small', price: 0}, {name: 'medium', price: 0.3}, {name: 'large', price: 0.5}], id: 1}, {name: 'Flavor', options: [{name: 'Strawberry', price: 0}, {name: 'Vanilla', price: 0}, {name: 'Chocolate', price: 0}], id: 2}],
                        id: 'e'
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
                    <TouchableOpacity onPress={() => { addItem = {id: '', options: [], addons: [], price: 0}; setStateAddItem(addItem);setItemModalVisible(false); }}>
                        <AntDesign name='downcircle' color='purple' size={getIconSize(19)} style={{ alignSelf: 'center' }}></AntDesign>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 10}}>
                        <View style={{paddingRight: 10}}>
                            <Image source={{ uri: itemImage}} style={{height: 50, width: 50, borderRadius: 25}}></Image>
                        </View>
                        <Text style={{ color: 'black', fontSize: getFontSize(24), fontFamily: 'Avenir-Heavy', paddingBottom: 10, alignSelf: 'flex-end'}}>{itemName}</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Text style={{fontFamily: 'Avenir', fontSize: getFontSize(15), color: 'black', textAlign: 'center'}}>{itemDesc}</Text>
                        </View>
                        <View style={{height: 10}}></View>
                        {<View style={{alignItems: 'center'}}>
                            <Text style={{fontFamily: 'AvenirNext-Bold', fontSize: getFontSize(22), textAlign: 'center'}}>Options</Text>
                            {itemOptions}
                        </View>}
                        <View style={{height: 10}}></View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontFamily: 'AvenirNext-Bold', fontSize: getFontSize(22), textAlign: 'center'}}>Addons</Text>
                            {itemAddons}
                        </View>
                        <Text></Text>
                    </ScrollView>
                    <View style={{height: 10}}></View>
                    <TouchableOpacity onPress={() => {if (addItemToOrder() === true) {setItemModalVisible(false)}}}>
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
            {reviewButton}
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
export default connect(mapStateToProps, { createError})(MenuPage);
