import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Form, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import Http from '../../http/index'
import Request from '../../utils/request'
// import Util from '@util'
// import { set as setGlobalData, get as getGlobalData } from '../../utils/data'
import './index.scss'

import { add, minus, asyncAdd } from '../../actions/counter'
// 通过 tarojs/redux 提供的 connect 方法将 redux 与我们的页面进行连接
// connect 方法接受两个参数 mapStateToProps 与 mapDispatchToProps
// mapStateToProps，函数类型，接受最新的 state 作为参数，用于将 state 映射到组件的 props
// mapDispatchToProps，函数类型，接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法
@connect(({ counter }) => ({
 	counter
}), (dispatch) => ({
	add () {
		dispatch(add())
	},
	dec () {
		dispatch(minus())
	},
	asyncAdd () {
		dispatch(asyncAdd())
	}
}))
	
class Index extends Component {

	config = {
		// navigationBarTitleText: '首页'
	}

	// 添加一个类构造函数来初始化状态 this.state,  递 props 到基础构造函数
	constructor (props) {
		super(props)
		// this.state = { date: new Date() }
	}

	// 类的局部状态
	state = {
		user: {
			avatarUrl: '',
			nickName: 'YC',
			isUserAuth: true,
			isPhoneAuth: true,
		}
	}
	// onLoad
	componentWillMount() { 
		console.log(Taro.getEnv())
		Request.getID().then(res => {
			console.log(1,res)
		}).catch(err => {
			console.log(2,err)			
		})
		// console.log(this, Taro,Http)
		// Taro.request({
		// 	url: 'test',
		// 	data:
		// })
		// const type = 'open', sn='WEBOX-B15HH'
		// Http.post(false,`http://weboxapi.c26f21b5e2f034a57a562a46b1c2691fd.cn-shenzhen.alicontainer.com/api/webox/v1/${type}/sn/${sn}`,{
		// 	js_code: '',
		// 	openid: 'o1kUo44GrEZuu7xp4F2XGpBmuFU0',
		// 	contract_code:'',
		// 	contract_id:'',
		// 	web_contract_code: 'FAIL',
		// 	form_id:''
		// },{'Content-Type': 'application/json;charset=utf-8'}).then( res => {
		// 	console.log(res)
		// }).catch(err => {
		// 	console.log(err)
        // }).finally(() => {})
	}

	componentDidMount () { }

	componentWillUnmount () { }

	componentDidShow () { }

	componentDidHide() { }
	
	// 方法
	getFormId(e){
		console.log(e)
	}
	toGoodsList() {
		// this.$preload('key', 'val')
		Taro.navigateTo({ url: '/pages/goods_list/goods_list' }).then(() => {
			Taro.showToast({ title: '跳转成功'})
		})
	}
	testChange() {
		
	}

	render() {
		const { user } = this.state;
		let srcs = '../../assets/images/index_icon/', text = '';
		if (!user.isUserAuth) {
			srcs = `${srcs}user.png`;
			text = '用户授权'
		} else if (user.isUserAuth && !user.isPhoneAuth) {
			srcs = `${srcs}phone.png`;
			text = '授权手机号'
		} else {
			srcs = `${srcs}door.png`;
			text = '扫码开门'
		}
		const handle = (
			<Button className='handle-btn' onClick={this.toGoodsList}>
				<Image className='handle-icon' src={srcs} />
				<Text className='handle-text'>{text}</Text>
			</Button>
		)

		return (
			<View id='index'>

				{/*用户信息*/}
				<View className='user'>
					<Image className='user-avatar' src={user.avatarUrl}/>
					<Text className='user-name'>{user.nickName}</Text>
				</View>

				{/*按钮*/}
				<Form className='handle-from' onSubmit={this.getFormId} >
					{handle}
				</Form>
				
				{/*短信授权手机*/}
				{user.isUserAuth && !user.isPhoneAuth ?
					<View className='tips'>无法授权？点击 <Text className='tips-handle'>短信验证码授权</Text></View>: ''}
				

			</View>
		)
	}
}

export default Index