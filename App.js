import 'react-native-gesture-handler';
import React, { useState, useEffect, Fragment } from 'react';
import Index from './Index';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
export default function App() {
    return (
        <Provider store={store}>
            <Index></Index>
        </Provider>
    );
    <Stack.Screen name="Landing" component={Landing} />
}

