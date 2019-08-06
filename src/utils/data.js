const globalData = {
    // 与店铺相关
    // shop: {
        /*
        *   entryMode
        *   NORMAL - 直接进入，不带参数
        *   OUTSCAN - 微信扫一扫，带参数【触发APP-onShow，index-onLoad，index-onShow；逻辑处理在index-onLoad】
        *   SIGN - 签约回来【触发APP-onShow，index-onShow；逻辑处理在APP-onShow&index-onShow】
        *   INSCAN - 页面内调起扫码【触发APP-onShow，index-onShow；逻辑处理在扫码函数】
        *   SCORE - 支付分确认订单
        */
        entryMode: 'NORMAL', 
        doorData: {},
        shop_sn:'',
    // },
    // 与用户相关
    // user: {
        userCode: '',
        ID: '',  //openid userid
        unionid: '',
        phone: '',
        
    // },
    // 其他
    other: {
        
    }
     
}

export function setGlobalData (key, val) {
    globalData[key] = val
}

export function getGlobalData (key) {
    return globalData[key]
}