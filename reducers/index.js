import { combineReducers } from 'redux';
import auth from './auth';
import business from './business';

export default combineReducers({
    auth,
    business
});