import React, { useState, useEffect, useRef } from 'react';
import { Text, TextInput, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { styles, input } from './Styles';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { signup, signupGoogle } from '../actions/auth';
import * as Google from 'expo-google-app-auth';
const Signup = ({ navigation, signup, signupGoogle }) => {
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
            scopes: ['profile', 'email']
        });
        if (type === 'success') {
            signupGoogle(idToken);
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
                            <TouchableOpacity onPress={() => signupWithGoogle()} style={{ flexDirection: "row", height: 50, width: 300, borderRadius: 5, backgroundColor: "white", alignSelf: "center", marginBottom: 20, alignItems: "center" }}>
                                <Image source={require('../assets/logos/google-light-signin-logo.png')} style={{ height: 50, width: 50 }}></Image>
                                <Text>Sign Up With Google</Text>
                            </TouchableOpacity>
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

export default connect(null, { signup, signupGoogle })(Signup);
