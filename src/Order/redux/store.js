
import { updateCategory } from './category';
import { updateMenus } from './menus';

const PREFIX = 'ORDER/STORE/';
const CHANGE = PREFIX + 'CHANGE'

export default function(state = 0, action) {
    switch (action.type) {
        case CHANGE: {
            console.log(action.store_id);
            return action.store_id;
        }
        default: return state;
    }
}

export function changeStore(store_id) {
    return {
        type: CHANGE, store_id
    }
}

export function load(data) {
    return (dispatch) => {
        dispatch(updateMenus(data.menus));
        dispatch(updateCategory(data.category));
    }
}
