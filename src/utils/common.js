import { CommonCompNotification, NOTIFICATION_TYPE } from '../components/commonComp/commonCompNotification';

/**
 * 公共数据管理 - 键名
 */
export const LOCALSTORAGE_KEY = {
    /**
     * @public {String} KEY_ACCESSTOLEM - 用户令牌
     */
    KEY_ACCESSTOLEM: 'accessToken'
};

export const SPLITWORDS = '-=-=-=-=-=-=';

/**
 * 客户端缓存（Cookie）管理
 * 该部分实现已经由localStorage 替换
 * */
/**
 * set cookie
 * @param {String} key    [key]
 * @param {String} val    [value]
 * @param {String} days   [days]
 * @param {String} path   [path]
 * @param {String} domain [domain]
 */
export function setCookie(key, val, days, path, domain) {
    var expire = new Date();
    expire.setTime(expire.getTime() + (days ? 3600000 * 24 * days : 30 * 24 * 60 * 60 * 1000)); // 默认1个月
    document.cookie = key + '=' + encodeURIComponent(val.toString()) + ';expires=' + expire.toGMTString() + ';path=' +
        (path ? path : '/') + ';' + (domain ? ('domain=' + domain + ';') : '');
}

/**
 * del cookie
 * @param  {String} key    [key]
 * @param  {String} path   [path]
 * @param  {String} domain [domain]
 */
export function delCookie(key, path, domain) {
    var expires = new Date(0);
    document.cookie = key + '=;expires=' + expires.toUTCString() + ';path=' + (path ? path : '/') + ';' + (domain ?
        ('domain=' + domain + ';') : '');
}

/**
 * get cookie
 * @param  {[type]} key [key]
 * @return {String}     [cookie value]
 */
export function getCookie(key) {
    var r = new RegExp("(?:^|;+|\\s+)" + key + "=([^;]*)");
    var m = window.document.cookie.match(r);
    return (!m ? "" : m[1]) || null;
}

/**
 * clear cookie
 * @param {String} key        [key]
 * */
export function clearCookie(key) {
    setCookie(key, '', 1);
}


/**
 * 客户端数据存储（LocalStorage）管理
 * */
/**
 * set localStorage
 * @param {String} key [key]
 * @param {String} val [value]
 */
export function setItem(key, val) {
    val = val.toString();
    if (typeof (window.Storage) !== 'undefined') {
        localStorage.setItem(key, val);
    }
    else {
        setCookie(key, val);
    }
}

/**
 * get localStorage
 * @param  {String} key [key]
 * @return {String}     [value]
 */
export function getItem(key) {
    if (typeof (window.Storage) !== 'undefined') {
        return localStorage.getItem(key);
    }
    else {
        return getCookie(key);
    }
}

/**
 * delete localStorage
 * @param  {String} key [key]
 * @return {String}     [value]
 */
export function delItem(key) {
    if (typeof (window.Storage) !== 'undefined') {
        delete localStorage[key];
    }
    else {
        delCookie(key);
    }
}

/**
 * clear localStorage
 * @param {String} key    [key]
 * */
export function clearItem(key = null) {
    if (window.Storage !== void 0)
        localStorage.clear();
    else
        clearCookie(key);
}

/**
 * 获取现在的时间并格式化
 * 
 * @param {String} type
 *      a  标准时间格式 2015-10-10 10:10:10 (默认)
 *      b  14位时间格式 20151010101010
 *      c  13 位数时间戳
 *      d  10 位数时间戳
 *      e  2015.10.10
 * 		f  2015-10-10 10:10
 * 		g  8位时间格式 20151010
 *      h  2015-10-10
 *      u  ISO 时间格式 2018-04-08T02:43:12.511Z
 *      ff 小时：分钟, 示例：10:10
 *      默认格式为标准格式
 * @param {String} [date] 10、13位时间戳、UTC时间、ISO时间
 * */
export function getFormatDateNew(type, date) {
    if (/^1\d{9}/.test(date) && date.toString().length === 10) date = date * 1000;
    if (/^1\d{9}/.test(date) || /^1\d{12}/.test(date)) {
        date = typeof date === 'number' ? date : parseInt(date, 10);
    }
    let D = date !== void 0 ? new Date(date) : new Date();
    const _ = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'],
        y = D.getFullYear(),
        m = D.getMonth() + 1,
        d = D.getDate(),
        h = D.getHours(),
        i = D.getMinutes(),
        s = D.getSeconds();
    switch (type) {
        case 'a':
            return [y, _[m] || m, _[d] || d].join('-') + ' ' + [_[h] || h, _[i] || i, _[s] || s].join(':');
        case 'b':
            return [y, _[m] || m, _[d] || d, _[h] || h, _[i] || i, _[s] || s].join('');
        case 'c':
            return Number(D);
        case 'd':
            return Math.floor(Number(D) / 1000);
        case 'e':
            return [y, _[m] || m, _[d] || d].join('.');
        case 'f':
            return [y, _[m] || m, _[d] || d].join('-') + ' ' + [_[h] || h, _[i] || i].join(':');
        case 'g':
            return [y, _[m] || m, _[d] || d].join('');
        case 'h':
            return [y, _[m] || m, _[d] || d].join('-');
        case 'u':
            return D.toISOString();
        case 'ff':
            return [_[h] || h, _[i] || i].join(':');
        default:
            return [y, _[m] || m, _[d] || d].join('-') + ' ' + [_[h] || h, _[i] || i, _[s] || s].join(':');
    }
}

/**
 * @public HTTP 请求的 Mime-Type
 */
export const MIME_TYPE = {
    JSON: "application/json",
    FORM: "multipart/form-data",
    TEXT: "text/plain"
};

/**
 * 处理通用Ajax 异步请求: 获取请求响应 request.data 的值 || 下载文件
 *      - 仅处理GET 请求或表单的POST请求
 * @param {String} url - 请求的完整地址
 * @param {String} method - 请求方式 'GET' || 'POST'
 * @param {Object} params - 请求体内容 键值对象或FormData
 * @param {Funtion} callback - 回调函数
 * @param {Boolean} [isFakeRequest=false] - 是否为模拟请求
 * @param {Boolean} [isFullRes=false] - 是否返回完整响应内容。true 返回配置文件原内容的json对象;false 返回后端res.data 的json对象
 * @param {String} [mimeType="Application/json"] - 请求的Mime-Type 类型
 * @param {Boolean} [download] - 是否为下载请求
 * @param {Function} [messageBoxShow] - 消息盒子展示
 */
export function handleCommonHttpRequest(url, method, params, callback, isFakeRequest, isFullRes, mimeType, download, messageBoxShow) {
    method = method === void 0 ? 'get' : method;
    params = params === void 0 ? {} : params;
    isFullRes = !!isFullRes;
    mimeType = mimeType === void 0 ? MIME_TYPE.JSON : mimeType;

    let headers = new Headers();
    headers.append("Accept", MIME_TYPE.JSON);

    if (getItem(LOCALSTORAGE_KEY.KEY_ACCESSTOLEM)) {
        headers.append(LOCALSTORAGE_KEY.KEY_ACCESSTOLEM, getItem(LOCALSTORAGE_KEY.KEY_ACCESSTOLEM));
    }

    let options = {
        method: method.toLowerCase(),
        timeout: 5 * 60 * 1000,
        mode: "cors",
        redirect: "follow"  //重定向跟随跳转
    };

    if (method.toLowerCase() === 'get') {
        url = combineQueryUrl(url, params, true);
    } else {
        switch (mimeType) {
            case MIME_TYPE.JSON:
                options.body = JSON.stringify(params);
                headers.append("Content-Type", mimeType);
                break;
            case MIME_TYPE.FORM:
                if (params instanceof FormData) {
                    options.processData = false;
                    options.contentType = false;
                    options.body = params;
                } else {
                    if (Object.keys(params).length > 0) {
                        var form = new FormData();
                        Object.keys(params).map(function (key) {
                            if (params[key] instanceof FileList) {
                                for (let i = 0; i < params[key].length; i++) {
                                    form.append(key, params[key][i]);
                                }
                            } else {
                                form.append(key, params[key]);
                            }
                            return true;
                        });
                        options.processData = false;
                        options.contentType = false;
                        options.body = form;
                    }
                }
                break;
            case MIME_TYPE.TEXT:
                options.body = params;
                headers.append("Content-Type", mimeType);
                break;
            default:
                options.body = JSON.stringify(params);
                headers.append("Content-Type", mimeType);
                break;
        }
    }
    options.headers = headers;

    if (isFakeRequest) {
        callback([], null);
        return;
    }

    fetch(url, options)
        .then(response => download ? response.blob() : response.json())
        .then(result => {
            if (download) {
                // 文件下载逻辑
                let fileName = url.split('/').pop().split('.').shift();
                let fileSuffix = url.split('/').pop().split('.').pop();


                if (window.navigator.msSaveOrOpenBlob) {
                    if (fileName.indexOf(fileSuffix) > -1) {
                        navigator.msSaveBlob(result, fileName);
                    } else {
                        navigator.msSaveBlob(result, fileName + '.' + fileSuffix);
                    }
                } else {
                    let downloadLink = document.createElement('a');
                    let body = document.querySelector('body');

                    downloadLink.href = window.URL.createObjectURL(result);
                    downloadLink.download = fileName + '.' + fileSuffix;

                    downloadLink.style.display = 'none';
                    body.appendChild(downloadLink);

                    downloadLink.click();

                    //销毁
                    body.removeChild(downloadLink);
                    window.URL.revokeObjectURL(downloadLink.href);
                };
                return;
            }

            let res = parserRequestResponse(result, isFullRes);

            if (isFullRes) {
                callback(res, null);
                return;
            }

            if (res) {
                if (Object.keys(res).length > 0) {
                    callback(res || []);
                } else {
                    if (messageBoxShow) {
                        messageBoxShow('请求失败');
                    } else {
                        CommonCompNotification({
                            type: NOTIFICATION_TYPE.ERROR,
                            msg: res.msg || '请求失败'
                        });
                    }

                    callback(null, res);
                }
            } else {
                if (messageBoxShow) {
                    messageBoxShow(res.msg || '系统错误,请联系管理员!');
                } else {
                    CommonCompNotification({
                        type: NOTIFICATION_TYPE.ERROR,
                        msg: res.msg || '系统错误,请联系管理员!'
                    });
                }
                callback(null, res);
                return true;
            }

        })
        .catch(error => {
            if (messageBoxShow) {
                messageBoxShow('系统错误,请联系管理员!');
            } else {
                CommonCompNotification({
                    type: NOTIFICATION_TYPE.ERROR,
                    msg: '系统错误,请联系管理员!',
                    desc: error.toString()
                });
            }
            callback(null, error);
        });
}

/**
 * 合并GET请求字符串
 * @param {String} url 服务路径
 * @param {Object} params
 * @param {Boolean} encode 是否对字符Urlencode 编码
 */
function combineQueryUrl(url, params, encode) {
    encode = encode === void 0 ? true : encode;

    let parts = [];
    for (let i in params) {
        if (params.hasOwnProperty(i)) {
            encode ?
                parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(params[i]))
                :
                parts.push(i + "=" + params[i]);
        }
    }
    if (parts.length === 0) return url;
    return url + "?" + parts.join("&");
}

/**
 * 格式化请求响应体为Json-Object
 * @param {Object} response - Http请求响应体
 * @param {Boolean} isFullRes - 是否返回完整响应体
 * @returns {Object} Json-Object
 */
function parserRequestResponse(response, isFullRes) {
    if (response === void 0) {
        return {};
    }

    if (typeof response === 'string') {
        try {
            return JSON.parse(response);
        } catch (error) {
            if (isFullRes) {
                return response;
            } else {
                return {};
            }
        }
    }
    return response;
}