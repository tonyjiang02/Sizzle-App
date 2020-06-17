import React, { useState, useEffect, useRef } from 'react';
import { Text, TextInput, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { login, loginGoogle, createError } from '../actions/auth';
import { styles, input } from './Styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';
import Constants from 'expo-constants';
import * as Font from 'expo-font';

const Login = ({ login, auth1, business, navigation, loginGoogle, createError }) => {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    });
    const { email, password } = fields;
    const auth = () => {
        login(fields.email, fields.password);
    };
    const loginWithGoogle = async () => {
        const { type, idToken, accessToken, user } = await Google.logInAsync({
            iosClientId: "359251985246-li6db3gevpfh6sde3iukm1hrp85jqb0e.apps.googleusercontent.com",
            iosStandaloneAppClientId: "359251985246-e15i2bibrv8dqo01dj89a6r9e9o5g96h.apps.googleusercontent.com",
            scopes: ['profile', 'email']
        });
        if (type === 'success') {
            loginGoogle(idToken);
        } else {
            createError("Google Authentication failed", "error");
        }
    };
    const navigateSignup = () => {
        navigation.navigate("Signup");
    };
    return (
        <LinearGradient
            colors={['#ff9900', '#ff5f6d']}
            style={{ flex: 1 }}
        >
            <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', paddingTop: 50 }}>
                {console.log('login screen displayed')}
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
                            <TouchableOpacity onPress={() => loginWithGoogle()} style={{
                                flexDirection: "row", height: 50, backgroundColor: '#4285f4', width: 300, borderRadius: 5, marginBottom: 20, shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, alignSelf: 'center', alignItems: 'center'
                            }}>
                                <Image source={require('../assets/logos/google-light-signin-logo.png')} style={{ height: 50, width: 50 }}></Image>
                                <View style={{ width: 24 }}></View>
                                <Image source={require('../assets/logos/googletext.png')} style={{ height: 40, width: 160 }}></Image>
                            </TouchableOpacity>
                            <View style={{ height: 115, borderBottomColor: 'gainsboro', borderBottomWidth: 0.7 }}></View>
                            <View style={{ height: 20 }}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Avenir-Light', fontSize: 20, color: 'white' }}>New user? </Text>
                                <TouchableOpacity onPress={() => navigateSignup()}>
                                    <Text style={{ fontFamily: 'Avenir-Light', fontSize: 18, color: 'white', fontWeight: 'bold' }}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: 10 }}></View>
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
export default connect(mapStateToProps, { login, loginGoogle, createError })(Login);
