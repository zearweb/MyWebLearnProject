import { CONTENT_TYPE_FORM_URLENCODED, CONTENT_TYPE_JSON, HTTP_GET } from "./Constants.js";

export const DEFAULTS = {
    method: HTTP_GET,
    queryParams: null,
    requestBody: null,
    responseType: '',
    contentType: CONTENT_TYPE_JSON,
    timeoutTime: 30000,
    isCorsCookie: false,

    httpSuccess() { },
    httpError() { },
    error() { },
    about() { },
    timeout() { },
}