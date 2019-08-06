export const API_ENV = 'dev';   //dev  test master
export const API_HOSTNAME = {
    dev: {
        normal: 'http://dev.weboxapi.esgao.cn/api/',		//普通
        open: 'https://webox-gz.api.esgao.cn/test/test/',	//开门
        member: 'http://dev.api.vip.esgao.cn/api/',			//会员	
        company: 'https://dev.cwf.esgao.cn/api/v1/',			//企业
        pay:'https://dev.pay.api.esgao.cn/api/v1/'
    },
    test: {
        normal: 'http://test.weboxapi.esgao.cn/api/',
        open: 'https://webox-gz.api.esgao.cn/test/test/',
        member: 'http://dev.api.vip.esgao.cn/api/',
        company: 'https://dev.cwf.esgao.cn/api/v1/'
    },
    master: {
        normal: 'https://weboxapi.esgao.cn/api/',
        open: 'https://webox-gz.api.esgao.cn/release/',
        member: 'https://weboxapi.esgao.cn/api/',
        company: 'https://api.es.esgao.cn/api/v1/'
    }
}