
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './redux/reducer.js';

import Store from './containers/Store';
import Category from './containers/Category';
import Menu from './containers/Menu';
import Cart from './containers/Cart';
import Address from './containers/Address';

var $store = document.getElementById('store');
var $category = document.getElementById('category');
var $menu = document.getElementById('menu');
var $cart = document.getElementById('cart');
var $address = document.getElementById('address');


var props = {
    stores: [],
	address: []
};

var initialState = {
    store: 1,
    category: {
		selected: "All",
		values: [],
	},
	menus: [],
	cart: {
		menus: [],
		total: 0,
		discount: 0,
		Summary: 0
	},
	address: ""
}

var store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
window.dispatch = store.dispatch;
ReactDOM.render(<Store store={store} stores={props.stores}/>, $store);
ReactDOM.render(<Category store={store}/>, $category);
ReactDOM.render(<Menu store={store} stores={props.stores}/>, $menu);
ReactDOM.render(<Cart store={store} />, $cart);
ReactDOM.render(<Address store={store} address={props.address}/>, $address);
