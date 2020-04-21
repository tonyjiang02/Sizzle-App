import { LOGIN_SUCCESS, LOGIN_FAIL, LOAD_USER } from '../actions/types';
import { AsyncStorage } from 'react-native';
const initialState = {
    token: null,
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            AsyncStorage.setItem('token', payload.token);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                token: payload.token
            };

        case LOAD_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        default:
            return state;
    }
}