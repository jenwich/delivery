
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './redux/reducer.js';
import OrderCreater from './containers/OrderCreater'
var $app = document.getElementById('app');

var initialState = {
    appProcess: "waiting", // waiting, select_store, select_menu
    storeSelector: {
        store: 0,
        address: "",
        message: ""
    },
    menuSelector: {
        category: "",
        cart: {
            menus: [{ id: 2, amount: 1}],
            sumPrice: 0,
            discount: 0,
            finalPrice: 0
        },
        message: ""
    }
}

var props = {
    balance: 1000,
    stores: [
        { id: 2, name: "New Yorks" },
        { id: 4, name: "Los Angles" }
    ],
    address: [
        { id: 1, address: "My home" },
        { id: 2, address: "My office" }
    ],
    menus: [
        { id: 2, name: "Salad", category: "Salad", imageUrl: "a", price: 20 },
        { id: 9, name: "Burger", category: "Main", imageUrl: "b", price: 25 },
        { id: 29, name: "Pizza", category: "Main", imageUrl: "c", price: 50 },
    ],
    categories: ["Salad", "Main", "Fish"],
    // menuSets: [
    //     {
    //         id: 1,
    //         name: "Big set",
    //         price: 60,
    //         menus: [
    //             { id: 2, amount: 2},
    //             { id: 9, amount: 1}
    //         ]
    //     },
    //     {
    //         id: 2,
    //         name: "Very Big set",
    //         price: 200,
    //         menus: [
    //             { id: 29, amount: 5},
    //         ]
    //     }
    // ]
};

var store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));

ReactDOM.render(<OrderCreater store={store} {...props}/>, $app);
