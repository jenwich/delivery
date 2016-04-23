
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
        console.log("remove", menu_id);
    }
}

export function purchase() {
    return (dispatch) => {
        console.log("purchase");
    }
}
