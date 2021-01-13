import {SET_PRODUCT} from 'ActionTypes/products.actionTypes';
import { IS_PRODUCT_LOADING } from '../actionTypes/products.actionTypes';

const productsInitialState = {
    product: {},
    isLoading: false,
};

const products = (state=productsInitialState, {type, payload}) => {
    switch(type){
        case IS_PRODUCT_LOADING:
        return { 
            ...state,
            isLoading: !state.isLoading,
        }
        case SET_PRODUCT:
        return {
            ...state,
            product: payload.product,
        }
        default:
        return state;
    }
}

export default products;