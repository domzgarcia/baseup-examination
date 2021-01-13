import Client from 'Client/api';

export default class ProductService {
    static endpoint = '/categories';
    
    static getCategories() {
        return Client.setUrl(this.endpoint)
        .get()
        .then(res => res)
        .catch(e => { throw e }) 
    }
}