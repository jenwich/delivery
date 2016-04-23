
const PREFIX = 'ORDER/CATEGORY/';
const CHANGE = PREFIX + 'CHANGE';
const UPDATE = PREFIX + 'UPDATE';

export default function(state = {}, action) {
    switch (action.type) {
        case CHANGE: {
            return Object.assign({}, state, {
                selected: action.category
            });
        };
        case UPDATE: {
            return {
                selected: "All",
                values: [...action.values]
            }
        }
        default: return state;
    }
    return state;
}

export function changeCategory(category) {
    return {
        type: CHANGE, category
    }
}

export function updateCategory(values) {
    return {
        type: UPDATE, values
    }
}
