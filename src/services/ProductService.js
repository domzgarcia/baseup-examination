import Client from '~/client/api';

export default class ProductService {
    static endpoint = '/categories';
    
    static getCategories() {
        return Client.setUrl(this.endpoint)
        .get()
        .then( res => {
            console.log(res);
        })
        .catch( e => {
            throw e;
        })
    }
}