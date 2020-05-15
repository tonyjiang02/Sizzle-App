import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { styles, input } from './Styles';
const Login = ({ login, auth1, business, navigation }) => {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    });
    const { email, password } = fields;
    const auth = () => {
        login(fields.email, fields.password);
    };
    return (
        <View style={styles.defaultView}>
            <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                <Image source={require('../assets/logos/Sizzle_S_Logo.png')} style={{ height: 100, width: 80, alignSelf: 'center' }} ></Image>
            </View>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <TextInput
                    style={input.formInput}
                    placeholder="Email"
                    onChangeText={(text) => setFields({ email: text, password: password })}
                    defaultValue={email}
                />
                <TextInput
                    style={input.formInput}
                    type="password"
                    placeholder="Password"
                    onChangeText={(text) => setFields({ email: email, password: text })}
                    defaultValue={password}
                />
                <TouchableOpacity onPress={auth}><Text>Login</Text></TouchableOpacity>

            </KeyboardAvoidingView>
        </View>
    );
};
const mapStateToProps = state => ({
    auth1: state.auth,
    business: state.business
});
export default connect(mapStateToProps, { login })(Login);