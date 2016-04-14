
import { combineReducers } from 'redux';
import { pattern } from '../services';

export default function signinReducer(state = {}, action) {
    switch (action.type) {
        case 'SIGIN_INVALID_USERNAME': {
            return Object.assign({}, state, {
                message: "Invaid: "+ action.message
            });
        };
        case 'SIGNIN_REQUEST': {
            return Object.assign({}, state, {
                message: "Loading..."
            });
        };
        case 'SIGNIN_RESPONSE_SUCCESS': {
            return Object.assign({}, state, {
                message: "Sign In Successful."
            });
        };
        case 'SIGNIN_RESPONSE_FAIL': {
            return Object.assign({}, state, {
                message: action.message
            });
        };
        default: return state;
    }
}
