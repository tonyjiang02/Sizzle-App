import { LOAD_BUSINESSES, LOAD_BUSINESS, CLEAR_BUSINESSES, ERROR, LOAD_SEARCH, LOAD_LANDING } from './types';
import { BASE_URL, PLACES_API_KEY } from '../config';
import toQueryString from '../utils/QueryString';
export const getBusinesses = (params) => async dispatch => {
    return null;
};

export const getRegisteredBusinesses = (params) => async dispatch => {
    //Get list of Registered Businesses from DB
    try {
        const res = await fetch(`${BASE_URL}/api/business`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        dispatch({
            type: LOAD_BUSINESSES,
            payload: {
                businesses: data,
                query: null
            }
        });
    } catch (err) {
        dispatch({
            type: ERROR,
            payload: err
        });
    }
};
export const getBusiness = (googleId, id) => async dispatch => {
    var res = null;
    try {
        if (googleId) {

        }
        else if (id) {
            res = await fetch(`${BASE_URL}/api/business/id/${id}`);
        }
        dispatch({
            type: LOAD_BUSINESS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: ERROR,
            payload: err
        });
    }
};
export const getNearby = (params) => async dispatch => {
    try {
        let p = { ...params, key: PLACES_API_KEY };
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.2555603,-122.0413537&${toQueryString(p)}`;
        const res = await fetch(url, {
            method: 'GET'
        });
        const json = await res.json();
        let q;
        if (params.keyword) {
            q = "Nearby";
        } else {
            q = params.keyword;
        }
        dispatch({
            type: LOAD_SEARCH,
            payload: { results: json.results, query: q }
        });
    } catch (err) {
        console.log(err);
    }
};
export const getAll = (params) => async dispatch => {
    try {
        let p = { ...params, key: PLACES_API_KEY, type: "point_of_interest" };
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=37.2555603,-122.0413537&${toQueryString(p)}`;
        const res = await fetch(url);
        const json = await res.json();
        const ids = json.results.map(x => x.place_id);
        const local = await fetch(`${BASE_URL}/api/business/ids`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ids: ids
            })
        });
        const json1 = await local.json();
        dispatch({
            type: LOAD_LANDING,
            payload: { results: json.results, local: json1 }
        });
    } catch (err) {
        console.log(err);
    }
};
export const checkIn = (id) => async dispatch => {
    try {
        const res = await fetch(`${BASE_URL}/api/business/addPerson/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                googleId: id
            })
        });
        const json = await res.json();
    } catch (error) {

    }
};