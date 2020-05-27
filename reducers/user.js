import { LOAD_USER, LOGOUT_USER } from '../actions/types';
const initialState = {
    user: null,
    loadingUser: true,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOAD_USER:
            return {
                user: payload,
                loadingUser: false
            };
        case LOGOUT_USER:
            return {
                user: null,
                loadingUser: true
            };
        default:
            return state;
    }
}