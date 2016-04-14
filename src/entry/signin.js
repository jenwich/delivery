
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import signinReducer from '../reducers/signinReducer';
import Signin from '../components/Signin';

var _signin = document.getElementById('signin');

var initialState = {
    username: "",
    password: "",
    message: ""
};

var store = createStore(signinReducer, initialState, applyMiddleware(thunkMiddleware));

ReactDOM.render(<Signin store={ store }/>, _signin);
