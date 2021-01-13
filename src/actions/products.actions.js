import {SET_PRODUCT, IS_PRODUCT_LOADING} from 'ActionTypes/products.actionTypes';

export const setProduct = (product) => {
    return {
        type: SET_PRODUCT,
        payload: {
            product,
        },
    }
};

export const setProductIsLoading = () => {
    return {
        type: IS_PRODUCT_LOADING,
    }
}