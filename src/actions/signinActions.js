
import { validation } from '../utilities';
import fetch from 'isomorphic-fetch';

export function signinInvaidUsername(message) {
    return {
        type: 'SIGIN_INVALID_USERNAME',
        message
    }
}

export function signinRequest(username, password) {
    return {
        type: 'SIGNIN_REQUEST',
        username, password
    }
}

export function signinResponseSuccess() {
    return {
        type: 'SIGNIN_RESPONSE_SUCCESS'
    }
}

export function signinResponseFail(message) {
    return {
        type: 'SIGNIN_RESPONSE_FAIL',
        message
    }
}

export function signin(username, password) {
    return (dispatch) => {
        var message = validation.validateUsernamePassword(username, password);
        if (message != 'pass') dispatch(signinInvaidUsername(message));
        else {
            dispatch(signinRequest(username, password));
            return fetch('http://localhost:3000/signin/signin_req', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ username, password }),
            }).then((res) => {
                if (res.status >= 400) throw new Error("Bad response from server");
                return res.json();
            }).then((data) => {
                if (data.message == 'success') dispatch(signinResponseSuccess());
                else dispatch(signinResponseFail(data.message));
            });
        }
    }
}
