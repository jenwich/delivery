
import { validation, getFetch, pattern } from '../services';

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
            return getFetch('/signin/req', { username, password }).then((res) => {
                if (res.status >= 400) throw new Error("Bad response from server");
                return res.json();
            }).then((data) => {
                if (data.message == 'success') {
                    dispatch(signinResponseSuccess());
                    window.location = data.redirect;
                }
                else dispatch(signinResponseFail(data.message));
            });
        }
    }
}
