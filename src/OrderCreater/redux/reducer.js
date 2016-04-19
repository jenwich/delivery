
import { combineReducers } from 'redux';
import appProcess from './appProcess';
import storeSelector from './storeSelector';
import menuSelector from './menuSelector';


export default combineReducers({
    appProcess,
    storeSelector,
    menuSelector
});
