
import { updateCategory } from './category';
import { updateMenus } from './menus';
import { getFetch } from '../../services'

const PREFIX = 'ORDER/STORE/';
const CHANGE = PREFIX + 'CHANGE'

export default function(state = 0, action) {
    switch (action.type) {
        case CHANGE: {
            return action.store_id;
        }
        default: return state;
    }
}

export function changeStoreId(store_id) {
    return {
        type: CHANGE, store_id
    }
}

export function changeStore(store_id) {
    return (dispatch) => {
        return getFetch('/menus/load_store', {store_id}).then(res => {
            if (res.status >= 400) throw new Error("Bad response from server");
            return res.json();
        }).then(data => {
            dispatch(load(data));
            dispatch(changeStoreId(store_id));
        })
    }
}

export function load(data) {
    return (dispatch) => {
        dispatch(updateMenus(data.menus));
        dispatch(updateCategory(data.category));
    }
}
