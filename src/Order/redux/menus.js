
import { getFetch } from '../../services';
import { updateCart } from './cart';

const PREFIX = 'ORDER/MENU/';
const ADD = PREFIX + 'ADD';
const UPDATE = PREFIX + 'UPDATE';

export default function(state = [], action) {
    switch (action.type) {
        case UPDATE: {
            return [...action.menus];
        };
        default: state;
    }
    return state;
}

export function updateMenus(menus) {
    return {
        type: UPDATE, menus
    }
}

export function addMenu(menu_id) {
    return (dispatch, getState) => {
        var store_id = getState().store;
        return getFetch('/menus/add_cart', {menu_id, store_id: 1}).then(res => {
            if (res.status >= 400) throw new Error("Bad response from server");
            return res.json();
        }).then(data => {
            dispatch(updateCart(data));
        });
    }
}
