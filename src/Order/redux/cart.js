
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
        var state = getState();
        var address = state.address;
        if (state.cart.menus.length == 0) {
            window.alert("Please choose some products");
        } else if (address == "") {
            window.alert("Please choose your address");
        } else {
            return getFetch('/menus/purchase', {address}).then(res => {
                if (res.status >= 400) throw new Error("Bad response from server");
                return res.json();
            }).then(data => {
                if (data.message == 'success') {
                    window.location = data.redirect
                } else {
                    window.alert(data.message)
                }
            });
        }
    }
}

export function clearCart() {
    return (dispatch) => {
        return getFetch('/menus/clear', {}).then(res => {
            if (res.status >= 400) throw new Error("Bad response from server");
            return res.json();
        }).then(data => {
            if (data.message) {
                window.alert(data.message)
            } else {
                dispatch(updateCart(data))
            }
        });
    }
}
