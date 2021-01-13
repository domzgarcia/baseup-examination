import {SET_PRODUCT} from 'ActionTypes/products.actionTypes';

export const setProduct = (product) => {
    return {
        type: SET_PRODUCT,
        payload: {
            product,
        },
    }
};