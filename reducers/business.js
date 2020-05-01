import { LOAD_BUSINESSES, LOAD_BUSINESS, CLEAR_BUSINESSES, LOAD_SEARCH, LEAVE_SEARCH, LOAD_LANDING, UPDATE_POPULATION } from "../actions/types";


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
            console.log("LOAD BUSINESS");
            return {
                ...state,
                dbBusiness: payload.db,
                business: payload.business,
                loadingOne: false
            };
        case LOAD_SEARCH:
            return {
                ...state,
                searchBusinesses: payload.results,
                loadingSearch: false,
                query: payload.query,
                dbSearchBusinesses: payload.local
            };
        case LEAVE_SEARCH:
            return {
                ...state,
                loadingSearch: false,
                query: null,
                searchBusinesses: []
            };
        case LOAD_LANDING:
            return {
                ...state,
                businesses: payload.results,
                dbBusinesses: payload.local,
                loadingAll: false
            };
        case UPDATE_POPULATION:
            return {
                ...state,
                dbBusiness: payload
            };
        default:
            return state;
    }
}