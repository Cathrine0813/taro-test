import Taro from '@tarojs/taro'
const TARO_ENV = Taro.getEnv();  //weapp h5 alipay

export const promisify = (func, ctx) => {
    // 返回一个新的function
    return function () {
        // 初始化this作用域
        var ctx = ctx || this;
        // 新方法返回的promise
        return new Promise((resolve, reject) => {
            // 调用原来的非promise方法func，绑定作用域，传参，以及callback（callback为func的最后一个参数）
            func.call(ctx, ...arguments, function () {
                // 将回调函数中的的第一个参数error单独取出
                var args = Array.prototype.map.call(arguments, item => item);
                var err = args.shift();
                // 判断是否有error
                if (err) {
                    reject(err)
                } else {
                    // 没有error则将后续参数resolve出来
                    args = args.length > 1 ? args : args[0];
                    resolve(args);
                }
            });
        })
    };
};

// 下载图片
export const downLoadImg = (imgurl, msg) => {
    return new Promise((resolve, reject) => {
        let that = this
        // util.showToast(msg + 'download...')
        wx.downloadFile({
            url: imgurl,
            complete: function (res) {
                console.log(res)
                if (res.statusCode === 200) {
                    resolve(res.tempFilePath)
                } else {
                    console.log('downloadstatusCode', res)
                    reject(new Error(res))
                }
            },
            fail: function (res) {
                console.log('downloadFilefail', res)
            }
        })
    })
}

export const promiseImage = (url) => {
    return new Promise(function (resolve, reject) {
        resolve(url)
    })
}

export const handleName = (str) => {
    let res = emoj2str(str)
    if (isChinese(res)) {
        res = res.length > 4 ? res.slice(0, 4) + '...' : res
    } else {
        res = res.length > 7 ? res.slice(0, 7) + '...' : res
    }
    return res
}

export const emoj2str = (str) => {
    return unescape(escape(str).replace(/\%uD.{3}/g, ''))
}

export const isChinese = (str) => {
    if (escape(str).indexOf("%u") < 0) return false
    return true
}
//防抖 函数防抖就是法师发技能的时候要读条，技能读条没完再按技能就会重新读条
export const debounce = (fn, wait) => {
    let timeout = null;
    return function() {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(fn, wait);
    };
}

//节流 函数节流就是fps游戏的射速，就算一直按着鼠标射击，也只会在规定射速内射出子弹
export const throttle = (fn, wait) => {
    let prev = Date.now();
    return function() {
        let now = Date.now();
        if (now - prev >= wait) {
            fn();
            prev = Date.now();
        }
    };
}
/*
* url
*/
// 获取当前页
export const getCurrentPageUrl = () => {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let url = currentPage.route
    return url
}
// 获取某页
export const getPageData = (field, num = 1) => {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - num]
    let data = currentPage[field]
    return data
}
// 获取路由参数
export const handleURL = (url, keys) => {
    const hash = url.split('?')[1];
    let obj = {}, arr = hash.split('&');
    arr.forEach(item=>{
        let [key, value] = item.split('=');
        obj[key] = value;
    })
    return obj[keys];
}

/*
* 时间
*/
// 时间
export const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 时间戳转换
export const getTime = (config) => {

    let { dateJoin = '-' } = config; // 默认日期连接符：-
    let { timeJoin = ':' } = config; // 默认时间连接符：:
    let { timeType = 'minutes' } = config; // 默认精确到分钟（minutes：精确到分钟；seconds：精确到秒）
    let { dataType = 'all' } = config; // 默认类型为日期+时间（all：日期+时间；date：日期；time：时间）

    if (config.data) {
        let d = new Date(parseInt(config.data) * 1000);
        let date = d.getFullYear() + dateJoin + ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + dateJoin + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate());
        let time;

        // 获取时间（精确到秒）
        if (timeType == 'seconds') {
            time = (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + timeJoin + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + timeJoin + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
        } else {
            time = (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + timeJoin + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes());
        }

        // 返回日期+时间
        if (dataType === 'all') {
            return date + ' ' + time;

        // 返回日期
        } else if (dataType === 'date') {
            return date;

        // 返回时间
        } else if (dataType === 'time') {
            return time;
        }
    } else {
        return '';
    }
}

/*
* 加密
*/
//jiami  sha1
export const encodeUTF8 = (s) => {
    var i, r = [], c, x;
    for (i = 0; i < s.length; i++)
        if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
        else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
    else {
        if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
            c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
            r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
        else r.push(0xE0 + (c >> 12 & 0xF));
        r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
    };
    return r;
};

// 字符串加密成 hex 字符串
export const sha1 = (s) => {
    var data = new Uint8Array(encodeUTF8(s))
    var i, j, t;
    var l = ((data.length + 8) >>> 6 << 4) + 16,
        s = new Uint8Array(l << 2);
    s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
    for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2);
    s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
    s[l - 1] = data.length << 3;
    var w = [],
        f = [
            function() {
                return m[1] & m[2] | ~m[1] & m[3];
            },
            function() {
                return m[1] ^ m[2] ^ m[3];
            },
            function() {
                return m[1] & m[2] | m[1] & m[3] | m[2] & m[3];
            },
            function() {
                return m[1] ^ m[2] ^ m[3];
            }
        ],
        rol = function(n, c) {
            return n << c | n >>> (32 - c);
        },
        k = [1518500249, 1859775393, -1894007588, -899497514],
        m = [1732584193, -271733879, null, null, -1009589776];
    m[2] = ~m[0], m[3] = ~m[1];
    for (i = 0; i < s.length; i += 16) {
        var o = m.slice(0);
        for (j = 0; j < 80; j++)
            w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
            t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
            m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
        for (j = 0; j < 5; j++) m[j] = m[j] + o[j] | 0;
    };
    t = new DataView(new Uint32Array(m).buffer);
    for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2);

    var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function(e) {
        return (e < 16 ? "0" : "") + e.toString(16);
    }).join("");

    return hex;
};

//base64
export const base64_encode = (str) => {
    var c1, c2, c3;
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var i = 0,
        len = str.length,
        string = '';

    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt((c1 & 0x3) << 4);
            string += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            string += base64EncodeChars.charAt((c2 & 0xF) << 2);
            string += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        string += base64EncodeChars.charAt(c1 >> 2);
        string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        string += base64EncodeChars.charAt(c3 & 0x3F)
    }
    return string
}

// 错误信息上报
export const logError = (name, action, info) => {
    if (!info) {
        info = 'empty'
    }
    try {
        let deviceInfo = Taro.getSystemInfoSync()
        var device = JSON.stringify(deviceInfo)
    } catch (e) {
        console.error('not support getSystemInfoSync api', e.message)
    } finally {
        let time = formatTime(new Date())
        console.error(time, name, action, info, device)
        // 如果使用了 第三方日志自动上报
        // if (typeof action !== 'object') {
        // fundebug.notify(name, action, info)
        // }
        // fundebug.notifyError(info, { name, action, device, time })
        if (typeof info === 'object') {
            info = JSON.stringify(info)
        }
    }
}   



/*
* 微信、h5、支付宝api兼容
*/
// 存 Sync是否同步
export const setStorage = (key, data, Sync = false) => {
    if (TARO_ENV == 'WEAPP' || TARO_ENV == 'WEB') {
        if (Sync) {
            Taro.setStorageSync(key, data)
        } else {
            return new Promise((resolve, reject) => {
                Taro.setStorage({
                    key, data
                }).then(res => { resolve(res) }).catch(err => { reject(err) })        
            })
        }
        
    } else if (TARO_ENV == 'ALIPAY') {
        if (Sync) {
            my.setStorageSync({ key, data, });
        } else {
            return new Promise((resolve, reject) => {
                my.setStorage({
                    key, data,
                    success() { resolve(res) },
                    fail() { reject(err) }
                });     
            })
        }
    }
}
// 取 Sync是否同步
export const getStorage = (key, Sync = false) => {
    if (TARO_ENV == 'WEAPP' || TARO_ENV == 'WEB') {
        if (Sync) {
            Taro.getStorageSync(key)
        } else {
            return new Promise((resolve, reject) => {
                Taro.getStorage({ key }).then(res => { resolve(res) }).catch(err => { reject(err) })        
            })
        }
        
    } else if (TARO_ENV == 'ALIPAY') {
        if (Sync) {
            my.getStorageSync({key});
        } else {
            return new Promise((resolve, reject) => {
                my.getStorage({
                    key,
                    success() { resolve(res) },
                    fail() { reject(err) }
                });     
            })
        }
    }
}

