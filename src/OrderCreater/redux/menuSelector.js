
import { combineReducers } from 'redux';

const PREFIX = 'ORDER_CREATER/MENUELECTOR/';
const SELECT_CATEGORY = PREFIX + 'SELECT_CATEGORY';
const UPDATE_CART = PREFIX + 'UPDATE_CART';
const ADD_MENU = PREFIX + 'ADD_MENU';
const REMOVE_MENU = PREFIX + 'REMOVE_MENU';
const UPDATE_PRICE = PREFIX + 'UPDATE_PRICE';
const MESSAGE = PREFIX + 'MESSAGE';
const SEND_ORDER_SUCCESS = PREFIX + 'SEND_ORDER_SUCCESS';
const SEND_ORDER_FAIL = PREFIX + 'SEND_ORDER_FAIL';

export default combineReducers({
    category: categoryReducer,
    cart: cartReducer,
    message: messageReducer
});

function categoryReducer(state = "", action) {
    switch (action.type) {
        case SELECT_CATEGORY: {
            return action.category;
        };
        default: return state;
    }
    return state;
}

function cartReducer(state = {}, action) {
    switch (action.type) {
        case ADD_MENU: {
            return addMenuReducer(state, action.menuId);
        };
        case REMOVE_MENU: {
            return removeMenuReducer(state, action.menuId);
        };
        case UPDATE_PRICE: {
            return Object.assign({}, state, {
                sumPrice: action.sumPrice,
                discount: action.discount,
                finalPrice: action.finalPrice
            });
        }
        default: return state;
    }
    return state
}

function messageReducer(state = "", action) {
    switch (action.type) {
        case MESSAGE: {
            return action.message
        };
        default: return state;
    }
}

function addMenuReducer(state, menuId) {
    var menus = [...state.menus];
    var isAdd = false;
    for (var i in menus) {
        if (menus[i].id == menuId) {
            menus[i].amount++;
            isAdd = true;
        }
    }
    if (!isAdd) menus.push({ id: menuId, amount: 1 });
    return Object.assign({}, state, {menus});
}

function removeMenuReducer(state, menuId) {
    var menus = [...state.menus];
    var index = -1;
    for (var i in menus) {
        if (menus[i].id == menuId) {
            index = i;
            break;
        }
    }
    if (index != -1) {
        menus[index].amount--;
        if (menus[index].amount == 0) menus.splice(index, 1);
    }
    return Object.assign({}, state, {menus});
}

export function selectCategory(category) {
    return {
        type: SELECT_CATEGORY, category
    }
}

export function addMenuToCart(menuId) {
    return {
        type: ADD_MENU, menuId
    }
}

export function addMenu(menuId) {
    return (dispatch, getState) => {
        dispatch(addMenuToCart(menuId));
        var menus = getState().menuSelector.cart.menus;
        setTimeout(() => {
            console.log("calculate", menus);
            dispatch(updatePrice({sumPrice: 25, discount: 5, finalPrice: 20}));
        }, 200);
    }
}

export function removeMenuFromCart(menuId) {
    return {
        type: REMOVE_MENU, menuId
    }
}

export function removeMenu(menuId) {
    return (dispatch, getState) => {
        dispatch(removeMenuFromCart(menuId));
        var menus = getState().menuSelector.cart.menus;
        setTimeout(() => {
            console.log("calculate", menus);
            dispatch(updatePrice({sumPrice: 5, discount: 0, finalPrice: 5}));
        }, 200);
    }
}

export function updatePrice(data) {
    return {
        type: UPDATE_PRICE,
        sumPrice: data.sumPrice,
        discount: data.discount,
        finalPrice: data.finalPrice
    }
}

function sendMessage(message) {
    return {
        type: MESSAGE, message
    }
}

function sendOrderSuccess() {
    return {
        type: SEND_ORDER_SUCCESS
    }
}

function sendOrderFail(message, data) {
    return {
        type: SEND_ORDER_FAIL
    }
}

export function submit() {
    return (dispatch, getState) => {
        dispatch(sendMessage("Loading"));
        var state = getState();
        var data = {
            store: state.storeSelector.store,
            address: state.storeSelector.address,
            menus: state.menuSelector.cart.menus
        };
        console.log(data);
        setTimeout(() => {

        }, 200);
    }
}
