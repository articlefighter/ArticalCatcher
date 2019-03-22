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

// async function safeFetch(url, options) {
//     let defaultOptions = Object.assign({}, defaultOpt);
//     if (options) {

//         defaultOptions = Object.assign(defaultOptions, options);
//     }
//     if (url) {
//         const res = await fetch(baseUrl + url, defaultOptions);
//         try {
//             if (res.ok) {
//                 let type = res.headers.get('Content-Type');
//                 let data;
//                 switch (type) {
//                     case 'application/json':
//                         data = await res.json();
//                         break;
//                     case 'text/plain':
//                     case 'text/html':
//                         data = await res.text();
//                 }
//                 return Promise.resolve({
//                     status: 1,
//                     statusText: 'success',
//                     data,
//                 });
//             }
//             return Promise.reject({
//                 status: 0,
//                 statusText: 'fail',
//             });
//         } catch (err) {
//             return Promise.reject({
//                 status: -1,
//                 statusText: 'error',
//                 message: err,
//             });
//         }
//     }
// }

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

const get = async (url, data = {}, headers = {}, options) => {
    let paramStr = '';
    for (key in data) {
        paramStr += `${key}=${encodeURIComponent(data[key])}`;
    }
    url = `${url}?${paramStr}`;

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

const post = async (url, data = {}, headers = new Headers(), options) => {
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

const _fetch = async (url, options = {}) => {
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
        return await get(url, data, headers, config);
    }
    // return await post(url,data,headers,config)
};

export default _fetch;
