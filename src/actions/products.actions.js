import {SET_PRODUCT, 
    IS_PRODUCT_LOADING, 
    SET_CATEGORY_ID_PRODUCT_ID, 
    SET_PRODUCT_REVIEWS,
    SET_REVIEW_SCENE,
    IS_REVIEWS_LOADING,
    SET_SINGLE_PRODUCT_REVIEW
} from 'ActionTypes/products.actionTypes';

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

export const setReviewsIsLoading = () => {
    return {
        type: IS_REVIEWS_LOADING,
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

export const setReviewScene = (reviewScene) => {
    return {
        type: SET_REVIEW_SCENE,
        payload: {
            reviewScene,
        }
    }
}

export const setSingleProductReview = (review) => {
    return {
        type: SET_SINGLE_PRODUCT_REVIEW,
        payload: {
            review
        }
    }
}