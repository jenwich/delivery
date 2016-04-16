
import { validation, getFetch, pattern } from '../services';

export function validateUsername(username) {
    return {
        type: 'TEST_USERNAME',
        username
    }
}

export function validatePassword(password, confirmPassword) {
    return {
        type: 'TEST_PASSWORD',
        password, confirmPassword
    }
}

export function validateEmail(email) {
    return {
        type: 'TEST_EMAIL',
        email
    }
}

export function validateName(firstName, lastName) {
    return {
        type: 'TEST_NAME',
        firstName, lastName
    }
}

var addressId = 1;
export function addAddress() {
    return {
        type: 'ADD_ADDRESS',
        id: addressId++
    }
}

export function changeAddress(index, value) {
    return {
        type: 'CHANGE_ADDRESS',
        index, value
    }
}
export function deleteAddress(index, value) {
    return {
        type: 'DELETE_ADDRESS',
        index
    }
}

function shouldSubmit(state) {
    return ['username', 'password', 'confirmPassword', 'email']
        .reduce((result, item) => result && state[item].valid, true);
}

function messageInvalid() {
    return {
        type: 'MESSAGE_INVALID',
    }
}

function registerRequest() {
    return {
        type: 'REGISTER_REQUEST'
    }
}

function registerResponseSuccess() {
    return {
        type: 'REGISTER_RESPONSE_SUCCESS'
    }
}

function registerResponseFail(message) {
    return {
        type: 'REGISTER_RESPONSE_FAIL',
        message
    }
}

export function submit() {
    return (dispatch, getState) => {
        if (shouldSubmit(getState())) {
            dispatch(registerRequest());
            var state = getState();
            var data = {
                username: state.username.value,
                password: state.password.value,
                email: state.email.value,
                firstName: state.firstName.value,
                lastName: state.lastName.value,
                address: state.address.map(item => item.value).filter(item => item != "")
            }
            return getFetch('/signup/req', data).then(res => {
                if (res.status >= 400) throw new Error("Bad response from server");
                return res.json();
            }).then(data => {
                if (data.message == 'success') {
                    dispatch(registerResponseSuccess());
                    window.location = data.redirect;
                }
                else dispatch(registerResponseFail(data.message));
            });
        } else {
            dispatch(messageInvalid());
        }
    }
}
