
import { next as nextProcess } from './appProcess';

const PREFIX = 'ORDER_CREATER/STORESELECTOR/';
const CHANGE_ADDRESS = PREFIX + 'CHANGE_ADDRESS';
const SUBMIT = PREFIX + 'SUBMIT';

export default function(state = {}, action) {
    switch (action.type) {
        case SUBMIT: {
            return {
                store: action.store,
                address: action.address
            };
        }
        default: return state;
    }
}

export function submit(store, address) {
    return {
        type: SUBMIT,
        store, address
    }
}

export function next(store, address) {
    return (dispatch, getState) => {
        dispatch(submit(store, address));
        var state = getState();
        console.log(state.storeSelector);
        dispatch(nextProcess());
    }
}
