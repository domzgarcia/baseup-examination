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
}