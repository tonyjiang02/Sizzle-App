import { LOAD_USER, LOGOUT_USER } from '../actions/types';
const initialState = {
    user: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOAD_USER:
            return {
                user: payload
            };
        case LOGOUT_USER:
            return {
                user: null
            };
        default:
            return state;
    }
}