import { SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL, ERROR, LOAD_USER, LOGOUT_USER, SET_TOKEN, NOT_AUTHENTICATED, ERROR_MESSAGE } from './types';
import { BASE_URL } from '../config';
import { AsyncStorage, Alert } from 'react-native';
//saves user token into local storage (only handles localstorage of token)
export const createError = (msg, type) => dispatch => {
    dispatch({
        type: ERROR_MESSAGE,
        payload: { msg: msg, type: type }
    });
};
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
            const err = await res.json();
            console.log(err);
            throw err;
        }
        const data = await res.json();
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        });
    } catch (err) {
        dispatch(createError(err.msg, 'error'));
    }
};
export const loginGoogle = (id) => async (dispatch) => {
    try {
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
            const err = await res.json();
            throw err;
        }
        const json = await res.json();
        dispatch({
            type: LOGIN_SUCCESS,
            payload: json
        });
    } catch (err) {
        dispatch(createError(err.msg, 'error'));
    }
};
export const loginApple = (credential) => async dispatch => {
    try {
        console.log(credential.authorizationCode);
        const res = await fetch(`${BASE_URL}/api/users/appleTemp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identityToken: credential.identityToken,
                authorizationCode: credential.authorizationCode
            })
        });
        if (!res.ok) {
            const err = await res.json();
            throw err;
        }
        const json = await res.json();
        console.log(json);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: json
        });
    } catch (err) {
        dispatch(createError(err.msg, 'error'));
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
            const err = await res.json();
            throw err;
        }
        const json = await res.json();
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: json
        });
    } catch (err) {
        dispatch(createError(err.msg, 'error'));
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
            const err = await res.json();
            throw err;
        }
        const data = await res.json();
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: data
        });
    } catch (err) {
        dispatch(createError(err.msg, 'error'));
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
                const err = await res.json();
                throw err;
            }
            const json = await res.json();
            console.log('dispatching');
            dispatch({
                type: LOAD_USER,
                payload: json
            });
        } catch (err) {
            dispatch(createError(err.msg, 'error'));
        }
    } else {
        dispatch(createError("User does not exist", 'error'));
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