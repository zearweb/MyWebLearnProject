
/**
 * 序列化查询参数
 * @param { object} queryParams get请求查询参数,对象
 * @return { string } 字符串
 */
const serialQueryParam = (queryParams) => {
    if (!queryParams) return;
    if (!(queryParams instanceof Object)) return;

    const queryParamArr = [];

    for (const [name, value] of Object.entries(queryParams)) {
        queryParamArr.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
    }

    return queryParamArr.join("&");
}


/**
 * 拼接url
 * @param {string} url 原始url
 * @param {string} queryParams get请求查询参数,字符串
 */
const spliceUrl = (url, queryParams) => {
    if (!(typeof queryParams === "string")) return url;
    if (!queryParams) return url;

    const mark = url.includes("?") ? "&" : "?";

    return url + mark + queryParams;
}


/**
 * 序列化请求体
 * @param {object} requestBody 请求体
 */
const serialRequestBodyToJson = (requestBody) => {
    if (!requestBody) return;
    if (!(requestBody instanceof Object)) return;
    return JSON.stringify(requestBody);
}


export { serialQueryParam, spliceUrl, serialRequestBodyToJson };

