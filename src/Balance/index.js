import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { getFetch } from '../services'
import reducer from './redux/reducer.js';
import Balance from './containers/Balance';
import { updateBalance } from './redux/balance'

var $balance = document.getElementById('balance');
var props = {
    amounts: [5, 10, 20, 50, 100, 500, 1000 ]
}
var initialState = {
    balance: 0
}

var store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));

function init() {
    getFetch('/account/balance/load', {}).then(res => {
        if (res.status >= 400) throw new Error("Bad response from server");
        return res.json();
    }).then(data => {
        store.dispatch(updateBalance(data.balance));
        ready();
    });
}

function ready() {
    ReactDOM.render(<Balance store={store} {...props} />, $balance);
}

init();
