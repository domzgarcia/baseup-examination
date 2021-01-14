import { 
    SET_PRODUCT,
    IS_PRODUCT_LOADING, 
    SET_CATEGORY_ID_PRODUCT_ID, 
    SET_PRODUCT_REVIEWS,
    SET_REVIEW_SCENE,
    IS_REVIEWS_LOADING,
    SET_SINGLE_PRODUCT_REVIEW
} from '../actionTypes/products.actionTypes';

const productsInitialState = {
    product: {},
    reviews: [],
    isLoading: false,
    currCategoryIdProductId: {
        categoryId: null,
        productId: null,
    },
    reviewScene: 'view', // view | edit | add
    review: {},
    isReviewLoading: false,
};

const products = (state=productsInitialState, {type, payload}) => {
    switch(type){
        case IS_PRODUCT_LOADING:
        return { 
            ...state,
            isLoading: !state.isLoading,
        }
        case IS_REVIEWS_LOADING:
        return { 
            ...state,
            isReviewLoading: !state.isReviewLoading,
        }
        case SET_PRODUCT:
        return {
            ...state,
            product: payload.product,
        }
        case SET_PRODUCT_REVIEWS:
        return {
            ...state,
            reviews: payload.reviews,
        }
        case SET_CATEGORY_ID_PRODUCT_ID:
        return {
            ...state,
            currCategoryIdProductId: {
                ...state.currCategoryIdProductId,
                categoryId: payload.categoryId,
                productId: payload.productId,
            }
        }
        case SET_REVIEW_SCENE:
        return {
            ...state,
            reviewScene: payload.reviewScene,
        }
        case SET_SINGLE_PRODUCT_REVIEW:
        return {
            ...state,
            review: payload.review,
        }
        default:
        return state;
    }
}

export default products;