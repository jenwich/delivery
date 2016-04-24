
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { getFetch } from '../services'
import reducer from './redux/reducer.js';

import Orders from './containers/Orders'

import { updateOrder } from './redux/orders'

var $order = document.getElementById('order');

var initialState = {
    orders: []
}

var store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
window.dispatch = store.dispatch;

function init() {
    getFetch('/account/order/load', {}).then(res => {
        if (res.status >= 400) throw new Error("Bad response from server");
        return res.json();
    }).then(data => {
        store.dispatch(updateOrder(data));
        ready();
    });
}

function ready() {
    ReactDOM.render(<Orders store={store}/>, $order);
}

init();
