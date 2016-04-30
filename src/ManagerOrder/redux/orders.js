
const PREFIX = 'MANAGER_ORDER/ORDERS/'
const RECEIVE = PREFIX + 'RECEIVE'
const UPDATE = PREFIX + 'UPDATE'
import { getFetch } from '../../services'

export default function(state = [], action) {
    switch (action.type) {
        case UPDATE: {
            return action.data.filter(row => row.process == 'ordered')
        };
        default: return state;
    }
    return state
}

export function cookOrder(order_id) {
    return (dispatch) => {
        return getFetch('/manager/view/order/cook', {order_id}).then(res => {
            if (res.status >= 400) throw new Error("Bad response from server");
            return res.json();
        }).then(data => {
            dispatch(updateOrder(data));
        });
    }
}

export function updateOrder(data) {
    return {
        type: UPDATE,
        data
    }
}

window.updateOrder = updateOrder;
