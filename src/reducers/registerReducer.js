
import { combineReducers } from 'redux';
import { pattern } from '../services';

function usernameValidate(username) {
    var message = "", valid = false;
    if (username != "") {
        if (username.match(pattern.username)) valid = true;
        else message = "Invaid username";
    }
    return { username: { value: username, message, valid } };
}

function passwordValidate(password, confirmPassword) {
    var valid1 = true, valid2 = true;
    var message1 = "", message2 = "";
    if (password != "" && password.length < 6) {
        valid1 = false;
        message1 = "Password is too short";
    } else if (password == "") valid1 = false;
    if (confirmPassword != "" && password != confirmPassword) {
        valid2 = false;
        message2 = "Not matched";
    } else if (confirmPassword == "") valid2 = false;
    return {
        password: {
            value: password,
            message: message1,
            valid: valid1
        },
        confirmPassword: {
            value: confirmPassword,
            message: message2,
            valid: valid2
        }
    };
}

function emailValidate(email) {
    var message = "", valid = false;
    if (email != "") {
        if (email.match(pattern.email)) valid = true;
        else message = "Invaid email";
    }
    return { email: { value: email, message, valid } };
}

function nameValidate(firstName, lastName) {
    return {
        firstName: { value: firstName, valid: true },
        lastName: { value: lastName, valid: true }
    };
}

function addAddress(addresses, id) {
    return {
        addresses: [...addresses, { id, value: "" }]
    };
}

function changeAddress(addresses, index, value) {
    return {
        addresses: addresses.map((item, i) => {
            item = Object.assign({}, item, {});
            if (i == index) item.value = value;
            return item;
        })
    };
}

function deleteAddress(addresses, index) {
    return {
        addresses: addresses.filter((item, i) => {
            return i != index;
        })
    };
}

function sendMessage(message) {
    return {
        message: message
    }
}

export default function registerReducer(state = {}, action) {
    switch (action.type) {
        case 'TEST_USERNAME': {
            return Object.assign({}, state, usernameValidate(action.username));
        };
        case 'TEST_PASSWORD': {
            return Object.assign({}, state, passwordValidate(action.password, action.confirmPassword));
        };
        case 'TEST_EMAIL': {
            return Object.assign({}, state, emailValidate(action.email));
        };
        case 'TEST_NAME': {
            return Object.assign({}, state, nameValidate(action.firstName, action.lastName));
        };
        case 'ADD_ADDRESS': {
            return Object.assign({}, state, addAddress(state.addresses, action.id));
        };
        case 'CHANGE_ADDRESS': {
            return Object.assign({}, state, changeAddress(state.addresses, action.index, action.value));
        };
        case 'DELETE_ADDRESS': {
            return Object.assign({}, state, deleteAddress(state.addresses, action.index));
        };
        case 'MESSAGE_INVALID': {
            return Object.assign({}, state, sendMessage("Some fields invalid"));
        };
        case 'REGISTER_REQUEST': {
            return Object.assign({}, state, sendMessage("Loading"));
        };
        case 'REGISTER_REQUEST_SUCCESS': {
            return Object.assign({}, state, sendMessage("Success"));
        };
        case 'REGISTER_REQUEST_FAIL': {
            return Object.assign({}, state, sendMessage(action.message));
        };
        default: return state;
    }
}
