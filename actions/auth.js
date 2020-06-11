import { SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL, ERROR, LOAD_USER, LOGOUT_USER, SET_TOKEN, NOT_AUTHENTICATED } from './types';
import { BASE_URL } from '../config';
import { AsyncStorage, Alert } from 'react-native';
//saves user token into local storage (only handles localstorage of token)
export const login = (email, password) => async (dispatch, getState) => {
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
        if (!res.ok) {
            const err = await res.text();
            throw Error(err);
        }
        const data = await res.json();
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: ERROR,
            payload: err
        });
    }
};
export const loginGoogle = (id) => async (dispatch) => {
    try {
        console.log("logging in with google");
        const res = await fetch(`${BASE_URL}/api/users/google`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        });
        if (!res.ok) {
            const err = await res.text();
            throw Error(err);
        }
        const json = await res.json();
        dispatch({
            type: LOGIN_SUCCESS,
            payload: json
        });
    } catch (err) {
        console.log(err);
    }
};
export const signupGoogle = (id) => async (dispatch) => {
    try {
        console.log("Signing up with with google");
        const res = await fetch(`${BASE_URL}/api/users/google`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        });
        if (!res.ok) {
            const err = await res.text();
            throw Error(err);
        }
        const json = await res.json();
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: json.token
        });
    } catch (err) {
        console.log(err);
    }
};
export const logout = () => async dispatch => {
    console.log("Logout Action");
    await AsyncStorage.removeItem('token');
    dispatch({
        type: LOGOUT_USER
    });
};
export const signup = (email, password) => async dispatch => {
    console.log("SIGNUP ACTION");
    try {
        const res = await fetch(`${BASE_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        if (!res.ok) {
            const err = await res.text();
            throw Error(err);
        }
        const data = await res.json();
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: data
        });
    } catch (err) {
        console.log(err);
        //Alert.alert(err);
    }
};
//Loads basic user data into redux state 
export const loadUser = () => async dispatch => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        try {
            const res = await fetch(`${BASE_URL}/api/auth/user`, {
                method: 'GET',
                headers: {
                    'x-auth-token': token
                }
            });
            if (!res.ok) {
                const err = await res.text();
                throw Error(err);
            }
            const json = await res.json();
            console.log('dispatching');
            dispatch({
                type: LOAD_USER,
                payload: json
            });
        } catch (err) {
            console.log(err);
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
//sets redux token on app launch
export const loadToken = (token) => dispatch => {
    dispatch({
        type: SET_TOKEN,
        payload: token
    });
};
//runs on not authenticated, triggers reload of auth redux
export const notAuthenticated = () => dispatch => {
    dispatch({
        type: ERROR
    });
};