import 'react-native-gesture-handler';
import React, { useState, useEffect, Fragment } from 'react';
import Index from './Index';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
export default function App() {
    // useEffect(() => {
    //     async function foo() {
    //         await AsyncStorage.clear();
    //     }
    //     foo();
    // }, []);
    return (
        <Provider store={store}>
            <Index></Index>
        </Provider>
    );
}

