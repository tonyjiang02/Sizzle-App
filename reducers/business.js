import { LOAD_BUSINESSES, LOAD_BUSINESS, CLEAR_BUSINESSES, LOAD_SEARCH, NEW_SEARCH, LEAVE_SEARCH, LOAD_LANDING, LOAD_FILTER, NEW_FILTER, NEW_LOCATION, LOAD_NEAREST, UPDATE_POPULATION, UPDATE_BUSINESS, LOG_OUT, ORIG_LOCATION } from "../actions/types";


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
    nearestBusinesses: [],
    filterBusinesses: [],
    dbFilterBusinesses: [], 
    dbNearestBusinesses: [],
    query: null,
    loadingAll: true,
    loadingOne: true,
    loadingSearch: true,
    loadingFilter: false,
    loadingNearest: true,
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
        case NEW_SEARCH:
            return {
                ...state,
                loadingSearch: true,
                searchBusinesses: []
            }
        case NEW_FILTER:
            return {
                ...state,
                filterBusinesses: [],
                dbFilterBusinesses: [],
                loadingFilter: true        
            }
        case LOAD_FILTER:
            return {
                ...state,
                filterBusinesses: payload.results,
                dbFilterBusinesses: payload.local,
                loadingFilter: false
            }
        case LOAD_LANDING:
            return {
                ...state,
                businesses: payload.results,
                dbBusinesses: payload.local,
                loadingAll: false
            };
        case LOAD_NEAREST:
            return {
                ...state,
                nearestBusinesses: payload.results,
                dbNearestBusinesses: payload.local,
                loadingNearest: false,
            }
        case NEW_LOCATION:
            return {
                ...state,
                businesses: [],
                dbBusinesses: [],
                loadingAll: true
            }
        case UPDATE_BUSINESS:
            const indexSearch = state.dbSearchBusinesses.findIndex(b => b._id === payload._id);
            const indexLanding = state.dbBusinesses.findIndex(b => b._id === payload._id);
            let searchUpdate = state.dbSearchBusinesses;
            let landingUpdate = state.dbBusinesses;
            if (indexSearch >= 0) {
                searchUpdate[indexSearch] = payload;
            }
            if (indexLanding >= 0) {
                landingUpdate[indexLanding] = payload;
            }
            console.log(indexSearch);
            console.log(indexLanding);
            return {
                ...state,
                dbBusiness: payload,
                dbSearchBusinesses: [...searchUpdate],
                dbBusinesses: [...landingUpdate]
            };
        case LOG_OUT:
            return {
                businesses: [],
                dbBusinesses: [],
                business: null,
                dbBusiness: null,
                searchBusinesses: [],
                dbSearchBusinesses: [],
                nearestBusinesses: [],
                dbNearestBusinesses: [],
                query: null,
                loadingAll: true,
                loadingOne: true,
                loadingSearch: true,
                loadingNearest: true,
            }
        default:
            return state;
    }
}