
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { getFetch } from '../services'
import reducer from './redux/reducer.js';

import Store from './containers/Store';
import Category from './containers/Category';
import Menu from './containers/Menu';
import Cart from './containers/Cart';
import Address from './containers/Address';

import { changeStore } from './redux/store';
import { updateCart } from './redux/cart';
import { changeAddress } from './redux/address';

var $store = document.getElementById('store');
var $category = document.getElementById('category');
var $menu = document.getElementById('menu');
var $cart = document.getElementById('cart');
var $address = document.getElementById('address');

var props = {};
var initialState = {
    store: 0,
    category: {
		selected: "All",
		values: [],
	},
	menus: [],
	cart: {
		menus: [],
		total: 0,
		discount: 0,
		summary: 0
	},
	address: ""
}

var store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
window.dispatch = store.dispatch;

function init() {
    getFetch('/menus/init', {}).then(res => {
        if (res.status >= 400) throw new Error("Bad response from server");
        return res.json();
    }).then(data => {
        props = data;
        if (data.address.length) store.dispatch(changeAddress(data.address[0].value));
        var id = data.stores[0].store_id;
        initialLoadStore(id);
    });
}

function initialLoadStore(id) {
    getFetch('/menus/load_store', { store_id: id}).then(res => {
        if (res.status >= 400) throw new Error("Bad response from server");
        return res.json();
    }).then(data => {
        store.dispatch(changeStore(id));
        initialLoadCart();
    });
}

function initialLoadCart() {
    getFetch('/menus/load_cart', {}).then(res => {
        if (res.status >= 400) throw new Error("Bad response from server");
        return res.json();
    }).then(data => {
        store.dispatch(updateCart(data));
        ready();
    });
}

function ready() {
    ReactDOM.render(<Store store={store} stores={props.stores}/>, $store);
    ReactDOM.render(<Category store={store}/>, $category);
    ReactDOM.render(<Menu store={store} stores={props.stores}/>, $menu);
    ReactDOM.render(<Cart store={store} />, $cart);
    ReactDOM.render(<Address store={store} address={props.address}/>, $address);
}

init();
