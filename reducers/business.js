import { LOAD_BUSINESSES, LOAD_BUSINESS, CLEAR_BUSINESSES, LOAD_SEARCH, LEAVE_SEARCH, LOAD_LANDING } from "../actions/types";


/*
businesses: landing page
business: individual business page
searchBusinesses: search page
*/
const initialState = {
    businesses: [],
    dbBusinesses: [],
    business: null,
    dbBusiness: null,
    searchBusinesses: [],
    dbSearchBusinesses: [],
    query: null,
    loadingAll: true,
    loadingOne: true,
    loadingSearch: true
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
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
        case LOAD_LANDING:
            console.log('LOAD LANDING');
            return {
                ...state,
                businesses: payload.results,
                dbBusinesses: payload.local,
                loadingAll: false
            };
        default:
            return state;
    }
}