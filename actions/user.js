import { UPDATE_USER, LOAD_USER, ALLOW_LOC } from './types';
import { BASE_URL } from '../config';
export const updateUser = (user) => async (dispatch, getState) => {
    console.log("updating user");
    const token = getState().auth.token;
    console.log(user);
    try {
        const res = await fetch(`${BASE_URL}/api/users/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({
                user: user
            })
        });
        const json = await res.json();
        return json;
    } catch (err) {
        console.log(err);
    }
};
//Updates redux and database without syncing
export const updateUserWithoutReturn = (user) => async dispatch => {
    updateUser(user);
    dispatch({
        type: UPDATE_USER,
        payload: user
    });
};
//Updates the redux with the return from the database
export const updateUserWithReturn = (user) => async dispatch => {
    const newUser = await updateUser(user);
    dispatch({
        type: UPDATE_USER,
        payload: newUser
    });
};

export const updateUserRedux = () => async (dispatch, getState) => {
    console.log("updating user through redux state");
    const token = getState().auth.token;
    const user = getState().user.user;
    console.log(user);
    try {
        const res = await fetch(`${BASE_URL}/api/users/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({
                user: user
            })
        });
        const json = await res.json();
        console.log(json);
    } catch (err) {
        console.log(err);
    }
};

export const locPermissionChange = (bool) => dispatch => {
    console.log('location permissions changed');
    dispatch({
        type: ALLOW_LOC,
        payload: bool
    });
};