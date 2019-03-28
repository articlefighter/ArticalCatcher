import config from '../../../config.json';

const baseUrl = config.baseUrl || '';

const defaultOpt = {
    method: 'GET',
    mode: 'no-cors', //是否跨域
    credentials: 'include', //是否携带 cookie
};

const defaultHeaders = {
    'Content-Type': 'application/json',
};

const responseHandler = async response => {
    if (response && response.ok) {
        let data;
        let contentType = response.headers.get('Content-Type');
        if (contentType.match(/text\/(plain|html)/)) {
            data = await response.text();
        }
        if (contentType.match(/application\/json/)) {
            data = await response.json();
        }
        if (contentType.match(/form/)) {
            data = await response.formData();
        }
        if (contentType.match(/video/)) {
            data = await response.blob();
        }
        return {
            status: 1,
            statusText: 'success',
            data,
            originResponse: response,
        };
    }
    return {
        status: 0,
        statusText: 'fail',
        originResponse: response,
    };
};

const _get = async (url, data = {}, headers = {}, options) => {
    let paramStr = '';
    for (let key in data) {
        paramStr += `${key}=${encodeURIComponent(data[key])}`;
    }
    paramStr&&(url = `${url}?${paramStr}`);

    try {
        let response = await fetch(url, { ...options, headers });
        return await responseHandler(response);
    } catch (err) {
        return {
            status: -1,
            statusText: 'error',
            message: err,
            originResponse: null,
        };
    }
};

const _post = async (url, data = {}, headers = new Headers(), options) => {
    // application/x-www-form-urlencoded
    let contentType = headers.get('Content-Type');
    if (contentType.match(/application\/x-www-form-urlencoded/)) {
        let formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }
        data = formData;
    }

    try {
        let response = await fetch(url, {...options,headers,body:data})
        return await responseHandler(response);
    } catch (err) {
        return {
            status: -1,
            statusText: 'error',
            message: err,
            originResponse: null,
        };
    }
};

// options: method,headers,data

const $fetch = async (url, options = {}) => {
    url = baseUrl + url || '';
    let headers;
    let data;
    let method = 'GET';

    let config = Object.assign({}, defaultOpt);
    for (var key in options) {
        switch (key) {
            case 'headers':
                headers = new Headers(
                    Object.assign({}, defaultHeaders, options.headers)
                );
                break;
            case 'data':
                typeof options.data === 'object' && (data = options.data);
                break;
            case 'method':
                method = options.method;
                break;
            default:
                config[key] = options[key];
                break;
        }
    }

    if (method === 'GET') {
        return await _get(url, data, headers, config);
    }
    // return await post(url,data,headers,config)
};

export default $fetch;
