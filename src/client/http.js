import axios from 'axios';
import { mergeDeep } from '~/utilities/helpersFunc';

export default class Http {
    constructor(ctx = null) {
        this.config = {};
        this.ctx = ctx;
    }

    get(url, params = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'get', config);
        this.config.params = params;
        return this._send();
    }

    post(url, data = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'post', config);
        this.config.data = data;
        return this._send();
    }

    put(url, data = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'put', config);
        this.config.data = data;
        return this._send();
    }

    patch(url, data = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'patch', config);
        this.config.data = data;
        return this._send();
    }

    delete(url, data = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'delete', config);
        this.config.data = data;
        return this._send();
    }

    _prepareXhr(url, method, config) {
        this.config.url = url;
        this.config.method = method;
        this.overrides = config;
    }

    _construct() {
        this.overrides = {};
        this.config = {
            url: '',
            data: {},
            method: 'get',
            headers: {},
            params: {},
        };
    }

    _send() {
        if (!!Object.keys(this.overrides).length) {
            this.config = mergeDeep(this.config, this.overrides);
            this.config.ctx = this.ctx;
        }

        return axios(this.config).then((response) => {
            return response.data;
        });
    }
}