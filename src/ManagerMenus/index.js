import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { getFetch } from '../services'
import reducer from './redux/reducer.js';
import { updateMenus } from './redux/menus.js';

import Menus from './containers/Menus'

var $menus = document.getElementById('menus')

var initialState = {
    menus: [
        {
            menu_id: 1,
            name: "test",
            available: 1
        }
    ]
}

var store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
window.dispatch = store.dispatch;

function init() {
    getFetch('/manager/view/menus/load', {}).then(res => {
        if (res.status >= 400) throw new Error("Bad response from server");
        return res.json();
    }).then(data => {
        store.dispatch(updateMenus(data))
        ready();
    });
}

function ready() {
    ReactDOM.render(<Menus store={store}/>, $menus);
}

init();
