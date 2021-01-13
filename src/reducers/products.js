import {SET_PRODUCT} from 'ActionTypes/products.actionTypes';

const productsInitialState = {
    product: {},
};

const products = (state=productsInitialState, {type, payload}) => {
    switch(type){
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