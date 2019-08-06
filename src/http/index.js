import Taro from '@tarojs/taro'
import Cryptojs from '../assets/js/crypto-js/index'
import { HTTP_STATUS } from './status'
import { API_ENV, API_HOSTNAME } from './host'
import { logError } from '../utils/util'

class Http {
	constructor(){
		// const HOSTNAME = process.env.API_HOSTNAME
		this.url = {}
    }

	request(params, method = 'GET') {
        Taro.showNavigationBarLoading();
        let { type, urls, data, header } = params;

        if (type == 'open'){
            let dataTime = new Date().toGMTString(),
                srcStr = 'source: easygo\nx-date: ' + dataTime,
                authen, signStr,
                secId = 'AKIDMm2mynkdYC30guRnA351dAUIc9gabzhj5A0r', //AKID2z2m3uk6v3BGr3BSwqbIQQ1578Bqe0CbTw6
                seKey = 'GuA50me0gmA6xHl10o67j9MsxZFoygd1wzVqx3Vb'; //JC0r28438F5bFVlC6hgWgqhob14cWtB1GxtVVHxw
            
            signStr = Cryptojs.enc.Base64.stringify(Cryptojs.HmacSHA1(srcStr, seKey))
            authen = 'hmac id="' + secId + '", algorithm="hmac-sha1", headers="source x-date", signature="' + signStr + '\"';
            
            header = {
                'Source': 'easygo',
                'X-Date': dataTime,
                'Authorization': authen,
                'Content-Type': 'application/json;charset=utf-8',
            }
            // data
            data = {
                ...data,
                _tamp: Date.parse(new Date())/1000,
            }
        } else {
            header = header || {
                    'Content-Type': method == 'GET' ? 'application/json': method== 'POST'? 'application/x-www-form-urlencoded':''
            };
            // data
            data = {
                ...data,
                _t: Date.parse(new Date())/1000,
            }
        }

		return new Promise((resolve, reject) => {
            Taro.request({
                url: type ? API_HOSTNAME[API_ENV][type] + urls : urls,
                method, data, header
            }).then(res => {
				Taro.hideNavigationBarLoading()
                if (res.statusCode == HTTP_STATUS.SUCCESS) {
                    resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data))
                // } else if (res.statusCode == HTTP_STATUS.SUCCESS) {
                //     Taro.showToast({ title: '请求资源不存在' })
                //     reject(res)
                // } else if (res.statusCode == HTTP_STATUS.BAD_GATEWAY) {
                //     Taro.showToast({ title: '服务端出现了问题' })
                //     reject(res)
                // } else if (res.statusCode == HTTP_STATUS.FORBIDDEN) {
                //     Taro.showToast({ title: '没有权限访问' })
                //     reject(res)
                // } else if (res.statusCode == HTTP_STATUS.GATEWAY_TIMEOUT) {
                //     Taro.showToast({ title: '网络连接超时' })
                //     reject(res)
                // } else if (res.statusCode == HTTP_STATUS.SERVER_ERROR) {
                //     Taro.showToast({ title: '接口错误' })
                //     reject(res)
                } else {
                    logError('Api', `接口错误${res.statusCode}`)    
                    reject(res)
                }
            }).catch( err => {
                Taro.hideNavigationBarLoading()
                logError('Api', `接口失败`, err)    
				reject(err)
			})
		})
	}
    // type normal普通 open开门 member会员 company企业 false布尔-自定义api网关
    get(type, urls, data, header) {
        const option = { type, urls, data, header }
        return this.request(option)
    }
    post(type, urls, data, header) {
        const option = { type, urls, data, header }
        return this.request(option, 'POST')
    } 
}

//添加事件结束
Promise.prototype.finally = function (callback) {
    var Promise = this.constructor;
    return this.then(
        function (value) {
            Promise.resolve(callback()).then(
                function () {
                    return value;
                }
            );
        },
        function (reason) {
            Promise.resolve(callback()).then(
                function () {
                    throw reason;
                }
            );
        }
    );
}

export default new Http();