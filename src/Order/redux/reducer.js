
import { combineReducers } from 'redux';
import store from './store';
import category from './category';
import menus from './menus';
import cart from './cart';
import address from './address';

export default combineReducers({
    store, category, menus, cart, address
});
