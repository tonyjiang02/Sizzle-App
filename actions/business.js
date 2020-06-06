import { LOAD_BUSINESSES, LOAD_BUSINESS, CLEAR_BUSINESSES, CLEAR_SEARCH, CLEAR_BUSINESS, ERROR, LOAD_SEARCH, LOAD_NEAREST, LOAD_FILTER, NEW_FILTER, NEW_SEARCH, NEW_LOCATION, LOAD_LANDING, UPDATE_POPULATION, UPDATE_BUSINESS, OLD_LOCATION, ORIG_LOCATION, ALLOW_LOC } from './types';
import { BASE_URL, PLACES_API_KEY, ADD_API_KEY } from '../config';
import { straightLineDistance, kmToMi } from '../utils/businessUtils';
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
    dispatch({
        type: LOAD_BUSINESS,
        payload: { db: db, business: business }
    });
};
export const test = () => {
};
export const getBusiness = (googleId, id) => async dispatch => {
    console.log('getting business again');
    var res = null;
    try {
        if (id) {
            console.log('fetching id');
            res = await fetch(`${BASE_URL}/api/business/id/${id}`);
        }
        else if (googleId) {

        }
        const data = await res.json();
        console.log(data.email);
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
export const newSearch = () => dispatch => {
    console.log('new search dispatch');
    dispatch({
        type: NEW_SEARCH
    });
};

export const newFilter = () => dispatch => {
    console.log('new filter dispatch');
    dispatch({
        type: NEW_FILTER
    });
};

export const loadFilter = (within, pop, open, verified, search, dbSearch, currentLoc) => dispatch => {
    let temp = search.slice(0);
    let dbTemp = dbSearch.slice(0);
    if (temp.length != 0) {
        if (within === true) {
            let counter = 0;
            while (counter < temp.length) {
                if (kmToMi(straightLineDistance(currentLoc, { latitude: parseFloat(temp[counter].geometry.location.lat), longitude: parseFloat(temp[counter].geometry.location.lng) })) > 5) {
                    temp.splice(counter, 1);
                    dbTemp.splice(counter, 1);
                }
                else {
                    counter++;
                }
            }
        }
        if (pop === true) {
            let counter = 0;
            while (counter < temp.length) {
                if (dbTemp[counter].population > 10) {
                    temp.splice(counter, 1);
                    dbTemp.splice(counter, 1);
                }
                else {
                    counter++;
                }
            }
        }
        if (open === true) {
            let counter = 0;
            while (counter < dbTemp.length) {
                try {
                    if (dbTemp[counter].isVerified === true) {
                        if (dBTemp[couner].openStatus != true) {
                            temp.splice(counter, 1);
                            dbTemp.splice(counter, 1);
                        }
                        else {
                            counter++;
                        }
                    }
                    else {
                        if (temp[counter].opening_hours.open_now != true) {
                            temp.splice(counter, 1);
                            dbTemp.splice(counter, 1);
                        }
                        else {
                            counter++;
                        }
                    }
                }
                catch (err) {
                    temp.splice(counter, 1);
                    dbTemp.splice(counter, 1);
                }
            }
        }
        if (verified === true) {
            let counter = 0;
            while (counter < temp.length) {
                if (dbTemp[counter].isVerified != true) {
                    temp.splice(counter, 1);
                    dbTemp.splice(counter, 1);
                }
                else {
                    counter++;
                }
            }
        }
    }
    console.log('after filter filterbusiness length: ' + temp.length + 'db: ' + dbTemp.length);
    dispatch({
        type: LOAD_FILTER,
        payload: { results: temp, local: dbTemp }
    });
};

export const getNearby = (params, coords) => async dispatch => {
    try {
        let p = { ...params, key: PLACES_API_KEY, rankby: "distance" };
        let location = `location=${coords.latitude},${coords.longitude}`;
        console.log('fetching search results from: ' + location);
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?&${location}&${toQueryString(p)}&type=point_of_interest&fields=formatted_address,name,place_id,opening_hours,types`;
        const res = await fetch(url, {
            method: 'GET'
        });
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
        let q;
        if (params.keyword) {
            q = "Nearby";
        } else {
            q = params.keyword;
        }
        console.log('dispatching new search results');
        dispatch({
            type: LOAD_SEARCH,
            payload: { results: json.results, query: q, local: json1 }
        });
    } catch (err) {
        console.log(err);
    }
};
export const getNomatimNearby = (name, coords) => async dispatch => {
    try {
        console.log('getting nomatim nearby');
        let url = `photon.komoot.de/api/?q=${name}&lat=${coords.latitude}&lon=${coords.longitude}&limit=20`;
        console.log(url);
        const res = await fetch(url);
        const json = await res.json();
        console.log(json);
    } catch (err) {
        console.log(err);
    }
};

export const newLocation = () => dispatch => {
    console.log('new location method called');
    dispatch({
        type: NEW_LOCATION
    });
};

export const oldLocation = () => dispatch => {
    console.log('old location method called');
    dispatch({
        type: OLD_LOCATION
    });
};

export const origLocation = () => dispatch => {
    console.log('old location method called');
    dispatch({
        type: ORIG_LOCATION
    });
};

export const getAll = (params, coords) => async dispatch => {
    try {
        console.log('getAll called');
        let p = { ...params, key: PLACES_API_KEY, type: "point_of_interest" };
        let location = `location=${coords.latitude},${coords.longitude}`;
        //console.log("getAll coords: " + coords.latitude + " " + coords.longitude);
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
export const getNearest = (params, coords) => async dispatch => {
    try {
        console.log('getNearest called');
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
            type: LOAD_NEAREST,
            payload: { results: json.results, local: json1 }
        });
    } catch (err) {
        console.log(err);
    }
};
export const checkIn = (id) => async (dispatch, getState) => {
    const token = getState().auth.token;
    const user = getState().user.user;
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
        // user.history.push({ business: json.id });
        // const userUpdate = await fetch(`${BASE_URL}/api/users/update`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         user: {
        //             history: user.history
        //         }
        //     })
        // });
        // const updatedUser = await userUpdate.json();
        dispatch({
            type: UPDATE_BUSINESS,
            payload: json
        });
        return json;
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
        const res = await fetch(url);
        const json = await res.json();
        return json.result;
    } catch (err) {
        console.log(err);
    }
};
