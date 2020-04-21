import { LOAD_BUSINESSES, LOAD_BUSINESS, CLEAR_BUSINESSES, LOAD_SEARCH, LEAVE_SEARCH } from "../actions/types";
const initialState = {
    businesses: [],
    business: null,
    searchBusinesses: [],
    query: null,
    loadingAll: true,
    loadingOne: true,
    loadingSearch: true
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOAD_BUSINESSES:
            return {
                ...state,
                businesses: payload.businesses,
                loadingAll: false,
            };
        case LOAD_BUSINESS:
            return {
                ...state,
                business: payload.business,
                loadingOne: false
            };
        case LOAD_SEARCH:
            return {
                ...state,
                searchBusinesses: payload.results,
                loadingSearch: false,
                query: payload.query
            };
        case LEAVE_SEARCH:
            return {
                ...state,
                loadingSearch: false,
                query: null,
                searchBusinesses: []
            };
        default:
            return state;
    }
}