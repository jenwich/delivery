
import { getFetch } from '../../services';

const PREFIX = 'ORDER/CART/';
const UPDATE = PREFIX + 'UPDATE';

export default function(state = {}, action) {
    switch (action.type) {
        case UPDATE: {
            return action.data
        };
        default: return state;
    }
}

export function updateCart(data) {
    return {
        type: UPDATE, data
    }
}

window.updateCart = updateCart;

export function removeMenu(menu_id) {
    return (dispatch) => {
        return getFetch('/menus/decrease_cart', {menu_id}).then(res => {
            if (res.status >= 400) throw new Error("Bad response from server");
            return res.json();
        }).then(data => {
            dispatch(updateCart(data));
        });
    }
}

export function purchase() {
    return (dispatch, getState) => {
        var address = getState().address;
        return getFetch('/menus/purchase', {address}).then(res => {
            if (res.status >= 400) throw new Error("Bad response from server");
            return res.json();
        }).then(data => {
            console.log(data)
        });
    }
}
