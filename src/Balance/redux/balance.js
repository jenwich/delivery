
import { getFetch } from '../../services'
const PREFIX = 'CUSTOMER_BALANCE/BALANCE/';
const UPDATE = PREFIX + 'UPDATE';

export default function(state = {}, action) {
    switch (action.type) {
        case UPDATE: {
            return action.amount;
        };
        default: return state;
    }
    return state;
}

export function addBalance(amount) {
    return (dispatch) => {
        return getFetch('/account/balance/add', {amount}).then(res => {
            if (res.status >= 400) throw new Error("Bad response from server");
            return res.json();
        }).then(data => {
            dispatch(updateBalance(data.balance));
        });
    }
}

export function updateBalance(amount) {
    return {
        type: UPDATE, amount
    }
}
