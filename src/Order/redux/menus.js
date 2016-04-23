
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
    return (dispatch) => {
        console.log("add", menu_id);
    }
}
