import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import Signin from './components/Signin';
import SigninReducer from './reducers/signinReducer';

var _signin = document.getElementById('signin');
var _register = document.getElementById('register');

var initialState = {
    signin: {
        message: ""
    },
    register: {
        message: ""
    }
}

var store = createStore(SigninReducer, initialState, applyMiddleware(thunkMiddleware));

ReactDOM.render(<Signin store={ store }/>, _signin);
