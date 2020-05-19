import { combineReducers } from 'redux';
import auth from './auth';
import business from './business';
import user from './user';
export default combineReducers({
    auth,
    business,
    user
});