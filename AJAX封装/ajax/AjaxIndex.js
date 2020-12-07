import { Ajax } from "./Ajax.js";
import {
    HTTP_GET,
    RESPONSE_TYPE_JSON,
    HTTP_POST,
    HTTP_ERROR,
    HTTP_ERROR_REQUEST,
    HTTP_ERROR_TIMEOUT,
    HTTP_ERROR_ABOUT,
    HTTP_ERROR_TEXT,
    HTTP_ERROR_REQUEST_TEXT,
    HTTP_ERROR_ABOUT_TEXT,
    HTTP_ERROR_TIMEOUT_TEXT,
    HTTP_SUCCESS
} from "./Constants.js";


const ajax = (url, options) => {
    let xhr_new;
    const p = new Promise((resolve, reject) => {
        xhr_new = new Ajax(url, {
            ...options,
            httpSuccess(response, xhr) { resolve({ code: HTTP_SUCCESS, content: response, xhr }); },
            httpError(xhr) { reject({ code: HTTP_ERROR, content: HTTP_ERROR_TEXT, xhr }); },
            error(xhr) { reject({ code: HTTP_ERROR_REQUEST, content: HTTP_ERROR_REQUEST_TEXT, xhr }); },
            about(xhr) { reject({ code: HTTP_ERROR_ABOUT, content: HTTP_ERROR_ABOUT_TEXT, xhr }); },
            timeout(xhr) { reject({ code: HTTP_ERROR_TIMEOUT, content: HTTP_ERROR_TIMEOUT_TEXT, xhr }); },
        }).getXHR();
    });
    p.HTTP_ERROR = HTTP_ERROR;
    p.HTTP_ERROR_REQUEST = HTTP_ERROR_REQUEST;
    p.HTTP_ERROR_TIMEOUT = HTTP_ERROR_TIMEOUT;
    p.HTTP_ERROR_ABOUT = HTTP_ERROR_ABOUT;
    p.xhr = xhr_new;
    return p;
}


const get = (url, options) => {
    return ajax(url, { ...options, method: HTTP_GET })
}

const getJson = (url, options) => {
    return ajax(url, { ...options, method: HTTP_GET, responseType: RESPONSE_TYPE_JSON })
}

const post = (url, options) => {
    return ajax(url, { ...options, method: HTTP_POST })
}

export { ajax, get, getJson, post }