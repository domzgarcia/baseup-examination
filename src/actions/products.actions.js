import {SET_PRODUCT, IS_PRODUCT_LOADING, SET_CATEGORY_ID_PRODUCT_ID, SET_PRODUCT_REVIEWS} from 'ActionTypes/products.actionTypes';

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

export const setCategoryIdProductId = (categoryId, productId) => {
    return {
        type: SET_CATEGORY_ID_PRODUCT_ID,
        payload: {
            categoryId,
            productId,
        }
    }
}

export const setProductReviews = (reviews) => {
    return {
        type: SET_PRODUCT_REVIEWS,
        payload: {
            reviews
        }
    }
}