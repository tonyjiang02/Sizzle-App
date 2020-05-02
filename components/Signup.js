import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './Styles';
import { signup } from '../actions/auth';
const Signup = () => {
    const [fields, setFields] = useState({
        email: '',
        password: '',
    });
    const auth = () => {
        signup(fields.email, fields.password);
    };
    const { email, password } = fields;
    return (
        <View style={styles.defaultView}>
            <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                <Text>This is Sizzle</Text>
            </View>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <View style={{ flexDirection: row }}></View>
                <TextInput
                    style={input.formInput}
                    placeholder="Email"
                    onChangeText={(text) => setFields({ email: text, password: password })}
                    defaultValue={email}
                />
                <TextInput
                    style={input.formInput}
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={(text) => setFields({ email: email, password: text })}
                    defaultValue={password}
                />
                <TouchableOpacity onPress={auth}><Text>Login</Text></TouchableOpacity>

            </KeyboardAvoidingView>
        </View >
    );
};

export default Signup;
