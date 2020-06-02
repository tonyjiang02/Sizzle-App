import { LOAD_USER, LOGOUT_USER, NEW_LOCATION, OLD_LOCATION, ORIG_LOCATION, ALLOW_LOC, UPDATE_USER } from '../actions/types';
const initialState = {
    user: null,
    loadingUser: true,
    newLocationSet: false,
    locationChanged: false,
    locationPermissions: false
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOAD_USER:
            return {
                ...state,
                user: payload,
                loadingUser: false,
            };
        case UPDATE_USER: {
            return {
                ...state,
                user: { ...user, ...payload },
                loadingUser: false
            };
        }
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                loadingUser: true,
                newLocationSet: false
            };
        case NEW_LOCATION:
            return {
                ...state,
                newLocationSet: true,
                locationChanged: true
            };
        case OLD_LOCATION:
            return {
                ...state,
                newLocationSet: false
            };
        case ORIG_LOCATION:
            return {
                ...state,
                newLocationSet: true,
                locationChanged: false,
                locationPermissions: true
            };
        case ALLOW_LOC:
            return {
                ...state,
                locationPermissions: payload
            };
        default:
            return state;
    }
}