import Taro from '@tarojs/taro'
import Http from '../http/index'
// import { set as setGlobalData, get as getGlobalData } from './data'
import { setGlobalData, getGlobalData } from './data'
import Util from './util'
// 常用接口
const TARO_ENV = Taro.getEnv();  
/* WEAPP -- 微信小程序环境
*  SWAN -- 百度小程序环境
*  ALIPAY -- 支付宝小程序环境
*  TT -- 字节跳动小程序环境
*  WEB -- WEB(H5)环境
*  RN -- ReactNative 环境
*/


/*
* 获取用户信息
* wx: openid unionid 
* alipay: userid
*/

/* 微信 */
const getOpenid = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success: res_code => {
                setGlobalData('userCode', res_code.code)
                Http.post('open','user/auth',{
                    code: res_code.code,
                    contract_code: '',
                    contract_id: '',
                    web_contract_code: 'FAIL'
                }).then( res => {
                    if (res.code === 200) {
                        let datas = res.result;
                        setGlobalData('ID', datas.openid)
                        Util.setStorage('ID', datas.openid, true)
                    }
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            }
        })
    })
}
const getUnionid = (detail) => {
    return new Promise((resolve, reject) => {
        Http.post('open','user/register',{
            encrypted_data: encodeURIComponent(detail.encryptedData),
            iv: encodeURIComponent(detail.iv),
            openid: getGlobalData('ID'),
            shop_sn: getGlobalData('shop_sn')
        }).then( res => {
            if (res.code === 200) {
                let datas = res.result;
                // app.globalData.openid = datas.openid;
                // Taro.setStorage({ key: 'ID', data: datas.openid }).then(res => { })
                // Util.setStorage('ID', datas.openid, true)
            }
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
/* 支付宝 */
const getUserid = () => {
    return new Promise((resolve, reject) => {
        my.getAuthCode({
            scopes: 'auth_user',	//auth_base（静默授权）/ auth_user（主动授权） / auth_zhima（芝麻信用）
            success: (res) => {
                if (res.authCode.status && res.authCode.status == 'failed') {
                    console.warn('my.getAuthCode success01:', res)
                    reject(res)
                } else {
                    setGlobalData('userCode', res.authCode)
                    
                    if (res.authCode) {
                        Http.post('false','https://open.esgao.cn/dev/api/alibb/minapp/authorize/oauth_token',{
                            auth_code: res.authCode,					
                            shop_sn: getGlobalData('shop_sn') || '',
                            sign:Math.random().toString(36).substr(2),
                        }).then( res_auth => {
                            if (res_auth.return_code == 200) {
                                const {headimg,nick_name,alipay_user_id} = res_auth.result
                                const userInfo = {
                                        avatar: headimg,
                                        nickName: nick_name,
                                        userId: alipay_user_id
                                    }
                                // my.setStorageSync({
                                //     key: 'userInfo',
                                //     data: userInfo
                                // });
                                setGlobalData('userInfo', userInfo)
                                Util.setStorage('userInfo', userInfo, true)
                                // Taro.setStorage({ key: 'ID', data: alipay_user_id }).then(res => { })                                
                                setGlobalData('ID', alipay_user_id)
                                Util.setStorage('ID', alipay_user_id, true)
                            }
                            resolve(res)
                        }).catch(err => {
                            reject(err)
                        })
                    }else{
                        console.warn('my.getAuthCode success02:', res)
                        reject(res)
                    }
                }
            },
            fail: (err) => {
                console.warn('my.getAuthCode fail:', err)
                reject(err)
            }
        });
    })
}
const authPhone = (detail) => {
    let openid = Util.getStorage('ID', true) || getGlobalData('ID');

    if (openid){
        return new Promise((resolve, reject) => { 
            Http.post('normal','weixin/minapp/eg_us/encrypt_phone_debug',{
                iv: encodeURIComponent(detail.iv),
                encrypted_data: encodeURIComponent(detail.encryptedData),
                openid: openid,
                wx_openid: 'wxapps45wrym75hnnalwr2e'
            }).then( res => {
                if (res.code === 200) {
                    setGlobalData('phone', res.result)
                    Util.setStorage('phone', res.result)
                }
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    } else {
        getOpenid().then(() => {
            setTimeout(() => {
                authPhone(detail)
            }, 50)
        }).catch(() => {
            
        })
    }
    
}
const getPhone = () => {

}

export default {
    getID() {
        if (TARO_ENV == 'WEAPP') {
            return getOpenid();
        } else if (TARO_ENV == 'ALIPAY'){
            return getUserid();            
        }
    },
    getUnionid,

}