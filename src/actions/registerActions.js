
import fetch from 'isomorphic-fetch';
import { validation, fetchOptions, pattern } from '../services';

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

function registerRequestSuccess() {
    return {
        type: 'REGISTER_REQUEST_SUCCESS'
    }
}

function registerRequestFail(message) {
    return {
        type: 'REGISTER_REQUEST_FAIL',
        message
    }
}

export function submit() {
    return (dispatch, getState) => {
        if (shouldSubmit(getState())) {
            dispatch(registerRequest());
            setTimeout(() => {
                dispatch(registerRequestSuccess());
                setTimeout(() => {
                    dispatch(registerRequestFail('Somethings wrong'));
                }, 1000)
            },1000)
        } else {
            dispatch(messageInvalid());
        }
    }
}
