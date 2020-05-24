import { LOAD_BUSINESSES, LOAD_BUSINESS, CLEAR_BUSINESSES, CLEAR_SEARCH, CLEAR_BUSINESS, ERROR, LOAD_SEARCH, LOAD_LANDING, UPDATE_POPULATION, UPDATE_BUSINESS } from './types';
import { BASE_URL, PLACES_API_KEY, ADD_API_KEY } from '../config';
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
export const openBusinessPage = (business, db) => dispatch => {
    console.log("Open Business Page");
    dispatch({
        type: LOAD_BUSINESS,
        payload: { db: db, business: business }
    });
};
export const test = () => {
    console.log("test");
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
export const getNearby = (params, coords) => async dispatch => {
    try {
        let p = { ...params, key: PLACES_API_KEY, rankby: "distance" };
        let location = `location=${coords.latitude},${coords.longitude}`;
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?&${location}&${toQueryString(p)}&fields=formatted_address,name,place_id,opening_hours,types`;
        const res = await fetch(url, {
            method: 'GET'
        });
        const json = await res.json();
        const ids = json.results.map(x => x.place_id);
        console.log(ids);
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
        let q;
        if (params.keyword) {
            q = "Nearby";
        } else {
            q = params.keyword;
        }
        dispatch({
            type: LOAD_SEARCH,
            payload: { results: json.results, query: q, local: json1 }
        });
    } catch (err) {
        console.log(err);
    }
};
export const getAll = (params, coords) => async dispatch => {
    try {
        let p = { ...params, key: PLACES_API_KEY, type: "point_of_interest" };
        let location = `location=${coords.latitude},${coords.longitude}`;
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?&${location}&${toQueryString(p)}&fields=formatted_address,name,place_id,opening_hours,types`;
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
export const checkIn = (id) => async (dispatch, getState) => {
    const token = getState().auth.token;
    console.log("Token " + token);
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
        dispatch({
            type: UPDATE_BUSINESS,
            payload: json
        });
        return json.population;
    } catch (error) {

    }
};
export const updateBusinessReservations = (id, reservations) => async dispatch => {
    console.log("Updating business reservations");
    try {
        const res = await fetch(`${BASE_URL}/api/business/updateReservations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                reservations: reservations
            })
        });
        const json = await res.json();
        dispatch({
            type: UPDATE_BUSINESS,
            payload: json
        });
    } catch (err) {
        console.log(err);
    }
};
export const getAdditionalData = async (googleId) => {
    try {
        let p = { key: ADD_API_KEY, place_id: googleId };
        let url = `https://maps.googleapis.com/maps/api/place/details/json?${toQueryString(p)}&fields=formatted_phone_number,opening_hours,website`;
        console.log(url);
        const res = await fetch(url);
        const json = await res.json();
        console.log(json);
        return json;
    } catch (err) {
        console.log(err);
    }
};