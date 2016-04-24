
import { getFetch } from '../../services'

const PREFIX = 'MANAGER_MENUS/MENUS/';
const UPDATE = PREFIX + 'UPDATE'

export default function(state = [], action) {
    switch (action.type) {
        case UPDATE: {
            return [...action.data]
        };
        default: return state;
    }
    return state;
}

export function updateMenus(data) {
    return {
        type: UPDATE, data
    }
}

export function changeAvailable(menu_id, value) {
    return (dispatch) => {
        return getFetch('/manager/view/menus/change_available', {menu_id, value}).then(res => {
            if (res.status >= 400) throw new Error("Bad response from server");
            return res.json();
        }).then(data => {
            dispatch(updateMenus(data));
        });
    }
}
