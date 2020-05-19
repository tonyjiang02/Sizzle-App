import { LOGIN_SUCCESS, LOGIN_FAIL, LOAD_USER, LOGOUT_USER } from '../actions/types';
import { AsyncStorage } from 'react-native';
const initialState = {
    token: null,
    isAuthenticated: false,
    loading: true,
    user: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            console.log("AUTH REDUCER: LOGIN SUCCESS");
            AsyncStorage.setItem('token', payload.token);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                token: payload.token
            };
        case LOGOUT_USER:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: true,
                user: null
            };
        default:
            return state;
    }
}