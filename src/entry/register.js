
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import registerReducer from '../reducers/registerReducer';
import Register from '../components/Register';

var _register = document.getElementById('register');

var initialState = {
    username: {
        value: "",
        message: "",
        valid: false
    },
    password: {
        value: "",
        message: "",
        valid: false
    },
    confirmPassword: {
        value: "",
        message: "",
        valid: false
    },
    email: {
        value: "",
        message: "",
        valid: false
    },
    firstName: {
        value: "",
        valid: true
    },
    lastName: {
        value: "",
        valid: true
    },
    address: [
        { id: 0, value: "" }
    ],
    message: ""
};

var store = createStore(registerReducer, initialState, applyMiddleware(thunkMiddleware));

ReactDOM.render(<Register store={ store }/>, _register);
