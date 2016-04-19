
const MODULE_PREFIX = 'ORDER_CREATER/APPPROCESS/';
const NEXT = MODULE_PREFIX + 'NEXT';

export default function(state = "waiting", action) {
    switch (action.type) {
        case NEXT: {
            switch (state) {
                case 'waiting': return 'select_store';
                case 'select_store': return 'select_menu';
                case 'select_menu': return 'waiting';
            }
        };
        default: return state;
    }
}

export function next() {
    return {
        type: NEXT
    }
}
