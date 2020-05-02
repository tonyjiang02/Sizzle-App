import { LOGIN_SUCCESS, LOGIN_FAIL, ERROR, LOAD_USER } from './types';
import { BASE_URL } from '../config';
import { AsyncStorage } from 'react-native';
//saves user token into local storage (only handles localstorage of token)
export const login = (email, password) => async dispatch => {
    //login user using fetch
    //save token to async storage
    console.log("LOGIN ACTION");
    try {
        const res = await fetch(`${BASE_URL}/api/auth/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const data = await res.json();
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: ERROR,
            payload: err
        });
    }
};
export const signup = (email, password) => async dispatch => {
    console.log("SIGNUP ACTION");
};
//Loads basic user data into redux state 
export const loadUser = () => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        try {
            const res = await fetch(`${BASE_URL}/api/auth/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await res.json();
            dispatch({
                type: LOAD_USER,
                payload: json
            });
        } catch (err) {
            dispatch({
                type: ERROR,
                payload: err
            });
        }
    } else {
        dispatch({
            type: ERROR,
            payload: { msg: 'No user found' }
        });
    }
};