import { ERROR_MESSAGE } from '../actions/types';
const initialState = {
    error: null
};
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ERROR_MESSAGE:
            console.log("error message dispatched");
            state = {
                ...state,
                error: payload
            };
        default:
            return state;
    }
} 