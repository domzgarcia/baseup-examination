import Http from './http';

export default class ApiClient {
    static url = '';
    // static API_BASE = `${process.env.NEXT_PUBLIC_BYOB_HOST}/api/v1`;
    static API_BASE = "https://5ffbed0e63ea2f0017bdb67d.mockapi.io";

    static setUrl(url) {
        this.url = this.API_BASE + url;
        return ApiClient;
    }

    static post(data, options = {}, ctx = null) {
        let http = new Http(ctx);
        return http.post(this.url, data, options);
    }

    static put(data, options = {}, ctx = null) {
        let http = new Http(ctx);
        return http.put(this.url, data, options);
    }

    static patch(data, options = {}, ctx = null) {
        let http = new Http(ctx);
        return http.patch(this.url, data, options);
    }

    static delete(data, options = {}, ctx = null) {
        let http = new Http(ctx);
        return http.delete(this.url, data, options);
    }

    static get(params, options = {}, ctx = null) {
        let http = new Http(ctx);
        return http.get(this.url, params, options);
    }
}
