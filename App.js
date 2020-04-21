import 'react-native-gesture-handler';
import React, { useState, useEffect, Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from 'react-native';
import { loadUser } from './actions/auth';
import Login from './components/Login';
import Home from './components/Home';
import Loading from './components/layout/Loading';
import Landing from './components/Business/Landing';
import Searching from './components/Business/Searching';
import BusinessPage from './components/Business/BusinessPage';
import { Provider } from 'react-redux';
import store from './store';

const Stack = createStackNavigator();
export default function App() {
    const [isAuth, setAuth] = useState(0);
    useEffect(() => {
        const isAuthenticated = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                store.dispatch(loadUser());
                setAuth(2);
                console.log("Is Authenticated");
            } else {
                console.log("Not Authenticated");
                setAuth(1);
            }

        };
        isAuthenticated();
    }, []);
    authController = () => {
        if (isAuth === 1) {
            return (
                <Stack.Screen name="Login" component={Login} />
            );
        }
        if (isAuth === 2) {
            return (
                <Fragment>
                    <Stack.Screen name="Landing" component={Landing} />
                    <Stack.Screen name="Searching" component={Searching} />
                    <Stack.Screen name="BusinessPage" component={BusinessPage} />
                </Fragment>

            );
        }
    };
    return (
        <Provider store={store}>
            {isAuth === 0 ? (<Loading></Loading>) : (
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        {authController()}
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </Provider>
    );
}

