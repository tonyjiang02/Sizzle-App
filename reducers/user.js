import { LOAD_USER, LOGOUT_USER, NEW_LOCATION, OLD_LOCATION, ORIG_LOCATION, ALLOW_LOC, UPDATE_USER } from '../actions/types';
const initialState = {
    user: null,
    loadingUser: true,
    newLocationSet: false,
    locationChanged: false,
    locationPermissions: false,
    location: {latitude: 0, longitude: 0}
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOAD_USER:
            console.log(payload);
            return {
                ...state,
                user: payload,
                loadingUser: false,
            };
        case UPDATE_USER: {
            return {
                ...state,
                user: { ...state.user, ...payload },
                loadingUser: false
            };
        }
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                loadingUser: true,
                newLocationSet: false,
                location: {latitude: 0, longitude: 0}
            };
        case NEW_LOCATION:
            return {
                ...state,
                newLocationSet: true,
                locationChanged: true,
                location: payload
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
                locationPermissions: true, 
                location: payload
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