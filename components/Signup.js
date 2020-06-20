import React, { useState, useEffect, useRef } from 'react';
import { Text, TextInput, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { styles, input } from './Styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { signup, signupGoogle, loginApple } from '../actions/auth';
import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';
const Signup = ({ navigation, signup, signupGoogle, loginApple }) => {
    const [fields, setFields] = useState({
        email: '',
        password: '',
        password2: '',
    });
    const auth = () => {
        if (fields.password === fields.password2) {
            console.log("signup pressed");
            signup(fields.email, fields.password);
        }
    };
    const signupWithGoogle = async () => {
        const { type, accessToken, user, idToken } = await Google.logInAsync({
            iosClientId: "359251985246-li6db3gevpfh6sde3iukm1hrp85jqb0e.apps.googleusercontent.com",
            iosStandaloneAppClientId: "359251985246-e15i2bibrv8dqo01dj89a6r9e9o5g96h.apps.googleusercontent.com",
            scopes: ['profile', 'email']
        });
        if (type === 'success') {
            signupGoogle(idToken);
        } else {
            createError("Google Authentication failed", "error");
        }
    };
    const navigateLogin = () => {
        navigation.navigate('Login');
    };
    const { email, password, password2 } = fields;
    return (
        <LinearGradient
            colors={['#ff9900', '#ff5f6d']}
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
                                onChangeText={(text) => setFields({ ...fields, email: text })}
                                defaultValue={email}
                                autoCorrect={false}
                            />
                            <TextInput
                                autoCapitalize='none'
                                autoCompleteType='password'
                                style={input.formInput}
                                textContentType="password"
                                placeholder="Password"
                                onChangeText={(text) => setFields({ ...fields, password: text })}
                                defaultValue={password}
                                secureTextEntry={true}
                                autoCorrect={false}
                            />
                            <TextInput
                                autoCapitalize='none'
                                autoCompleteType='password'
                                style={input.formInput}
                                textContentType="password"
                                placeholder="Password, again"
                                onChangeText={(text) => setFields({ ...fields, password2: text })}
                                defaultValue={password2}
                                secureTextEntry={true}
                                autoCorrect={false}
                            />
                            <TouchableOpacity onPress={() => auth()} style={{
                                height: 50, backgroundColor: '#ff9900', width: 300, borderRadius: 5, marginBottom: 20, shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, justifyContent: 'center', alignSelf: 'center'
                            }}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontFamily: 'AvenirNext-Bold', fontSize: 16 }}>Sign Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => signupWithGoogle()} style={{
                                flexDirection: "row", height: Dimensions.get('window').height / 17, backgroundColor: '#4285f4', width: Dimensions.get('window').width / 1.25, borderRadius: 5, marginBottom: 10, shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, alignSelf: 'center', alignItems: 'center'
                            }}>
                                <Image source={require('../assets/logos/google-light-signin-logo.png')} style={{ height: 50, width: 50 }}></Image>
                                <View style={{ width: 24 }}></View>
                                <Image source={require('../assets/logos/googletext.png')} style={{ height: 40, width: 160 }}></Image>
                            </TouchableOpacity>
                            <AppleAuthentication.AppleAuthenticationButton
                                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                                cornerRadius={5}
                                style={{
                                    width: Dimensions.get('window').width / 1.25, height: Dimensions.get('window').height / 17, shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, alignSelf: 'center'
                                }}
                                onPress={async () => {
                                    try {
                                        const credential = await AppleAuthentication.signInAsync({
                                            requestedScopes: [
                                                AppleAuthentication.AppleAuthenticationScope.EMAIL,
                                                AppleAuthentication.AppleAuthenticationScope.FULL_NAME
                                            ],
                                        });
                                        console.log(credential);
                                        loginApple(credential);
                                        // signed in
                                    } catch (e) {
                                        if (e.code === 'ERR_CANCELED') {
                                            // handle that the user canceled the sign-in flow
                                        } else {
                                            // handle other errors
                                        }
                                    }
                                }}
                            />
                            <View style={{ height: 50, borderBottomColor: 'gainsboro', borderBottomWidth: 0.7 }}></View>
                            <View style={{ height: 20 }}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Avenir-Light', fontSize: 20, color: 'white' }}>Returning user? </Text>
                                <TouchableOpacity onPress={() => navigateLogin()}>
                                    <Text style={{ fontFamily: 'Avenir-Light', fontSize: 18, color: 'white', fontWeight: 'bold' }}>Log In</Text>
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

export default connect(null, { signup, signupGoogle, loginApple })(Signup);
