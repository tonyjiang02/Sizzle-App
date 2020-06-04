import { SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL, LOAD_USER, LOGOUT_USER, ERROR } from '../actions/types';
import { AsyncStorage } from 'react-native';
const initialState = {
    token: null,
    isAuthenticated: false,
    loading: true,
    user: null,
    firstTime: false
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            console.log("AUTH REDUCER: LOGIN SUCCESS");
            AsyncStorage.setItem('token', payload.token);
            console.log(payload);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                token: payload.token,
                firstTime: false
            };
        case LOGOUT_USER:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: true,
                user: null
            };
        case SIGNUP_SUCCESS:
            console.log("AUTH REDUCER: SIGNUP SUCCESS");
            AsyncStorage.setItem('token', payload.token);
            console.log(payload);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                token: payload.token,
                firstTime: true
            };
        case ERROR:
            return {
                ...state
            };
        default:
            return state;
    }
}