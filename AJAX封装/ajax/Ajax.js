import { HTTP_GET, CONTENT_TYPE_FORM_URLENCODED, CONTENT_TYPE_JSON } from "./Constants.js"
import { serialQueryParam, serialRequestBodyToJson, spliceUrl } from "./ConvertUtils.js"
import { DEFAULTS } from "./Defaults.js"

class Ajax {
    constructor(url, options) {
        this.url = url;
        this.options = Object.assign({}, DEFAULTS, options);
        this.init();
    }

    /**
     * 初始化XHR
     */
    init() {
        const xhr = new XMLHttpRequest();
        this.xhr = xhr;

        //绑定事件
        this.bindEvent();
        //设置查询参数
        this.setQueryParams();
        //设置是否Cors传递Cookies
        this.setIsCorsCookie();
        //设置超时时间
        this.setTimeoutTime();
        //设置响应类型
        this.setResponseType();
        //发送请求
        this.sendData();
    }

    /**
     * 设置响应类型
     */
    setResponseType() {
        const xhr = this.xhr;
        const { responseType } = this.options;
        if (!responseType) return;
        if (!(typeof responseType == "string")) return;
        xhr.responseType = responseType;
    }

    /**
     * 设置是否Cors传递Cookies
     */
    setIsCorsCookie() {
        const xhr = this.xhr;
        const { isCorsCookie } = this.options;
        if (!isCorsCookie) return;
        if (!(typeof isCorsCookie == "boolean")) return;
        if (isCorsCookie) {
            xhr.withCredentials = isCorsCookie;
        }
    }

    /**
     * 设置超时时间
     */
    setTimeoutTime() {
        const xhr = this.xhr;
        const { timeoutTime } = this.options;
        if (!timeoutTime) return;
        if (!(typeof timeoutTime == "number")) return;
        xhr.timeout = timeoutTime;
    }
    /**
     * 设置请求类型
     */
    setContentType() {
        const xhr = this.xhr;
        const { contentType } = this.options;
        if (!contentType) return;
        xhr.setRequestHeader("content-type", contentType);
    }

    /**
     * 设置get请求参数
     */
    setQueryParams() {
        const xhr = this.xhr;
        const { method, queryParams } = this.options;
        const newUrl = spliceUrl(this.url, serialQueryParam(queryParams))
        xhr.open(method, newUrl, true);
    }

    /**
     * 发送请求
     */
    sendData() {
        const xhr = this.xhr;
        const { requestBody, contentType } = this.options;

        if (!this.isGet()) {
            //设置请求类型
            this.setContentType();
        }

        if (!this.isSendData()) {
            xhr.send(null);
            return;
        }

        let sendData = "";
        if (this.isRequestBodyTypeOfForm()) {
            sendData = requestBody;
        } else if (this.isRequestBodyTypeOfFormEncoded()) {
            sendData = serialQueryParam(requestBody);
        } else if (this.isRequestBodyTypeOfJson()) {
            sendData = serialRequestBodyToJson(requestBody);
        } else {
            sendData = requestBody;
        }
        xhr.send(sendData);

    }


    isGet() {
        const { method } = this.options;
        return (method.toLowerCase() === HTTP_GET.toLowerCase());
    }


    /**
     * 是否可以发送数据
     */
    isSendData() {
        const { requestBody, method } = this.options;
        if (this.isGet()) return false;
        if (!requestBody) return false;
        return true;
    }

    /**
     * 请求体是否是表单数据
     */
    isRequestBodyTypeOfForm() {
        const { requestBody } = this.options;
        if (!requestBody) return false;
        if (requestBody instanceof FormData) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 请求体是否是application/json
     */
    isRequestBodyTypeOfJson() {
        const { requestBody, contentType } = this.options;
        if (!requestBody) return false;
        if ((typeof requestBody === "object")) {
            return contentType.toLowerCase().includes(CONTENT_TYPE_JSON.toLowerCase());
        } else {
            return false;
        }
    }

    /**
     * 请求体是否是application/x-www-form-urlencoded
     */
    isRequestBodyTypeOfFormEncoded() {
        const { requestBody, contentType } = this.options;
        if (!requestBody) return false;
        if ((typeof requestBody === "object")) {
            return contentType.toLowerCase().includes(CONTENT_TYPE_FORM_URLENCODED.toLowerCase());
        } else {
            return false;
        }
    }

    /**
     * 绑定XHR事件,比如成功,http失败,失败,中止,超时
     */
    bindEvent() {
        const xhr = this.xhr;
        const { httpSuccess, httpError, error, about, timeout } = this.options;
        xhr.addEventListener("load", () => {
            if (this.isHttpResponseSuccess()) {
                httpSuccess(xhr.response, xhr)
            } else {
                httpError(xhr);
            }
        });

        xhr.addEventListener("error", () => {
            error(xhr);
        });

        xhr.addEventListener("abort", () => {
            about(xhr);
        });

        xhr.addEventListener("timeout", () => {
            timeout(xhr);
        });
    }


    /**
     * 是否http请求返回成功
     */
    isHttpResponseSuccess() {
        const status = this.xhr.status;
        return ((status >= 200 && status < 300) || status === 304);
    }

    /**
     * 获取XHR
     */
    getXHR() {
        return this.xhr;
    }
}


export { Ajax }