import Client from 'Client/api';

export default class ProductService {
    static endpoint = '/categories';
    
    static getCategories() {
        return Client.setUrl(this.endpoint)
        .get()
        .then(res => res)
        .catch(e => { throw e }) 
    }

    static searchByCategory(keyword) {
        return Client.setUrl(`${this.endpoint}?search=${keyword}`)
        .get()
        .then(res => res)
        .catch(e => { throw e }) 
    }

    static getCategoriesOrderBy(orderBy) {
        return Client.setUrl(`${this.endpoint}?sortBy=createdAt&order=${orderBy}`)
        .get()
        .then(res => res)
        .catch(e => { throw e }) 
    }

    static getProductDetailsAndReviews(categoryId, productId) {
        return Client.setUrl(`${this.endpoint}/${categoryId}/products/${productId}`)
        .get()
        .then(res => res)
        .catch(e => { throw e }) 
    }

    static getProductReviews(categoryId, productId) {
        return Client.setUrl(`${this.endpoint}/${categoryId}/products/${productId}/reviews`)
        .get()
        .then(res => res)
        .catch(e => { throw e }) 
    }

    static createProductReview(categoryId, productId, review) {
        return Client.setUrl(`${this.endpoint}/${categoryId}/products/${productId}/reviews`)
        .post(review)
        .then(res => res)
        .catch(e => { throw e }) 
    }

    static updateProductReview(categoryId, productId, reviewId, review) {
        return Client.setUrl(`${this.endpoint}/${categoryId}/products/${productId}/reviews/${reviewId}`)
        .put(review)
        .then(res => res)
        .catch(e => { throw e })
    }
}