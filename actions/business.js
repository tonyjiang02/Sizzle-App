import { LOAD_BUSINESSES, LOAD_BUSINESS, CLEAR_BUSINESSES, ERROR, LOAD_SEARCH } from './types';
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

export const findPlace = (params) => async dispatch => {
    try {
        let p = { ...params, key: PLACES_API_KEY, inputtype: 'textquery' };
        let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=photos,formatted_address,name,rating,opening_hours,geometry&${toQueryString(p)}`;
        console.log(url);
        // const res = await fetch(url, {
        //     method: 'GET',

        // });
    } catch (err) {

    }
};
export const getNearby = (params) => async dispatch => {
    console.log("nearby Function called");
    try {
        let p = { ...params, key: PLACES_API_KEY, radius: "300" };
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.2555603,-122.0413537&${toQueryString(p)}`;
        console.log(url);
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
export const checkIn = (id) => async dispatch => {
    console.log("Checking in");
    console.log(id);
    try {
        const res = await fetch("http://sizzleco.herokuapp.com/api/business/addPerson/ChIJvYn1GuBKjoARPxL6JHn5FAc", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                googleId: "ChIJvYn1GuBKjoARPxL6JHn5FAc"
            })
        });
        const json = await res.json();
        console.log(json.msg);
    } catch (error) {

    }
};