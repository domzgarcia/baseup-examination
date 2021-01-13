import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import common from '../common/redux/reducer';
import products from './products';

const reducers = combineReducers({
    common,
    products,
    routerReducer,
});

export default reducers;