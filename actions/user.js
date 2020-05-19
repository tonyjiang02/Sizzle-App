import { UPDATE_USER } from './types';
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
    } catch (err) {
        console.log(err);
    }
};