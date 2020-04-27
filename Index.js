import 'react-native-gesture-handler';
import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { loadUser } from './actions/auth';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Loading from './components/layout/Loading';
import Landing from './components/Business/Landing';
import Searching from './components/Business/Searching';
import BusinessPage from './components/Business/BusinessPage';
import { Provider } from 'react-redux';
import store from './store';

const Stack = createStackNavigator();
const Index = ({ auth: { isAuthenticated } }) => {

    const [isAuth, setAuth] = useState(0);
    useEffect(() => {
        const isAuthenticated = async () => {
            await AsyncStorage.clear();
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
        console.log("checking Auth");
        if (isAuthenticated) {
            setAuth(2);
        } else {
            isAuthenticated();
        }

    }, [isAuthenticated]);
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

        <NavigationContainer>
            {isAuth === 0 ? <Loading /> :
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {authController()}
                </Stack.Navigator>
            }
        </NavigationContainer>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {})(Index);
