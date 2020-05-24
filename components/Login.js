import React, { useState, useEffect, useRef } from 'react';
import { Text, TextInput, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { styles, input } from './Styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';

const Login = ({ login, auth1, business, navigation }) => {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    });
    const { email, password } = fields;
    const auth = () => {
        login(fields.email, fields.password);
    };
    const navigateSignup = () => {
        navigation.navigate("Signup");
    };
    return (
        <LinearGradient
            colors={['#ff9900', '#FFDF7D', '#AED6FB', '#A38EFA']}
            style={{ flex: 1 }}
        >
            <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', paddingTop: 50 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <View style={{ backgroundColor: 'transparent', alignItems: 'center', paddingTop: 30 }}>
                            <Image source={require('../assets/logos/Sizzle_White_Transparent.png')} style={{ height: 150, width: 220 }} ></Image>
                        </View>
                        <View>
                            <TextInput
                                autoCapitalize='none'
                                style={input.formInput}
                                keyboardType='email-address'
                                textContentType='username'
                                placeholder="Email"
                                onChangeText={(text) => setFields({ email: text, password: password })}
                                defaultValue={email}
                                autoCorrect={false}
                            />
                            <TextInput
                                autoCapitalize='none'
                                autoCompleteType='password'
                                style={input.formInput}
                                textContentType="password"
                                placeholder="Password"
                                onChangeText={(text) => setFields({ email: email, password: text })}
                                defaultValue={password}
                                secureTextEntry={true}
                                autoCorrect={false}
                            />
                            <TouchableOpacity onPress={auth} style={{
                                height: 50, backgroundColor: '#ff9900', width: 300, borderRadius: 5, marginBottom: 20, shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, justifyContent: 'center', alignSelf: 'center'
                            }}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontFamily: 'AvenirNext-Bold', fontSize: 16 }}>Log In</Text>
                            </TouchableOpacity>
                            <View style={{ height: 115, borderBottomColor: 'gainsboro', borderBottomWidth: 0.7 }}></View>
                            <View style={{ height: 20 }}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Avenir-Light', fontSize: 20, color: 'white' }}>New user? </Text>
                                <TouchableOpacity onPress={() => navigateSignup()}>
                                    <Text style={{ fontFamily: 'Avenir-Light', fontSize: 18, color: 'orangered', fontWeight: 'bold' }}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{height: 10}}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Avenir-Light', fontSize: 18, color: 'white' }}>For businesses, please visit www.szzl.app</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};
const mapStateToProps = state => ({
    auth1: state.auth,
    business: state.business
});
export default connect(mapStateToProps, { login })(Login);
