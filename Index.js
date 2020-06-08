import 'react-native-gesture-handler';
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { loadUser, loadToken } from './actions/auth';
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
import Account from './components/Account';
import Checkin from './components/Checkin';
import SearchLoading from './components/layout/SearchLoading';
import ExampleBusinessPage from './components/Business/ExampleBusinessPage';
import UnverifiedBusinessPage from './components/Business/UnverifiedBusinessPage';
import Signup from './components/Signup';
import CheckedIn from './components/Checkedin';
import BusinessHistoryList from './components/Business/BusinessHistoryList';
import Favorites from './components/Business/Favorites';
import UserReservations from './components/Business/UserReservations';

const Stack = createStackNavigator();
const Index = ({ auth }) => {
    const [isAuth, setAuth] = useState(0);
    const initialMount = useRef(true);
    useEffect(() => {
        const isAuthenticated = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                console.log(token);
                store.dispatch(loadUser());
                setAuth(2);
                console.log("Is Authenticated");
            } else {
                console.log("Not Authenticated");
                setAuth(1);
            }

        };
        if (initialMount.current) {
            initialMount.current = false;
        } else {
            console.log("Auth State Changed");
            console.log("Running Auth Check");
            if (auth.isAuthenticated) {
                setAuth(2);
                store.dispatch(loadUser());
                console.log("Is Authenticated First Time");
            } else {
                console.log("Checking local storage");
                isAuthenticated();
            }
        }

    }, [auth]);
    useEffect(() => {
        AsyncStorage.getItem('token', function (err, res) {
            if (res) {
                store.dispatch(loadToken(res));
            }
        });
    }, [null]);
    const authController = () => {
        if (isAuth === 1) {
            return (
                <Fragment>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={Signup} />
                </Fragment>
            );
        }
        if (isAuth === 2) {
            return (
                <Fragment>
                    <Stack.Screen name="Landing" component={Landing} />
                    <Stack.Screen name="Searching" component={Searching} />
                    <Stack.Screen name="BusinessPage" component={BusinessPage} />
                    <Stack.Screen name="Account" component={Account} />
                    <Stack.Screen name="Checkin" component={Checkin} />
                    <Stack.Screen name="SearchLoading" component={SearchLoading}></Stack.Screen>
                    <Stack.Screen name="ExampleBusinessPage" component={ExampleBusinessPage} />
                    <Stack.Screen name="UnverifiedBusinessPage" component={UnverifiedBusinessPage} />
                    <Stack.Screen name="CheckedIn" component={CheckedIn} />
                    <Stack.Screen name="BusinessHistoryList" component={BusinessHistoryList} />
                    <Stack.Screen name="Favorites" component={Favorites} />
                    <Stack.Screen name="UserReservations" component={UserReservations} />
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

export default connect(mapStateToProps, { loadUser })(Index);
