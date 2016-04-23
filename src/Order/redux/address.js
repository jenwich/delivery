
const PREFIX = 'ORDER/ADDRESS/';
const CHANGE = PREFIX + 'CHANGE'

export default function(state = "", action) {
    switch (action.type) {
        case CHANGE: {
            console.log(action.value);
            return action.value
        };
        default: return state;
    }
}
export function changeAddress(value) {
    return {
        type: CHANGE, value
    }
}
