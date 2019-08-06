import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import configStore from './store'
import Index from './pages/index'

import './app.scss'
const store = configStore()
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

	config = {
		pages: [
			'pages/index/index',
			'pages/mine/mine',
			'pages/goods_list/goods_list'
		],
		window: {
			backgroundTextStyle: 'light',
			navigationBarBackgroundColor: '#fff',
			navigationBarTitleText: '购能量便利柜',
			navigationBarTextStyle: 'black'
		},
		tabBar: {
			color: '#777',
			selectedColor: '#60c0bd',
			backgroundColor: '#fff',
			borderStyle: 'white',
			list: [
				{
					pagePath: "pages/index/index",
					text: "首页",
					iconPath: "./assets/images/tab_icon/tab01.png",
					selectedIconPath: "./assets/images/tab_icon/tab01_act.png"
				},
				{
					pagePath: "pages/mine/mine",
					text: "我的",
					iconPath: "./assets/images/tab_icon/tab02.png",
					selectedIconPath: "./assets/images/tab_icon/tab02_act.png"
				},
			]
		},
		navigateToMiniProgramAppIdList: [
			"wxbd687630cd02ce1d",
			"wx407be9a701ec8f02",
			"wxa94c6566e6db4c2f",
			"wxd8f3793ea3b935b8"
		]
	}

	componentDidMount () {}

	componentDidShow () {}

	componentDidHide () {}

	componentDidCatchError () {}

	// 在 App 类中的 render() 函数没有实际作用
	// 请勿修改此函数
	render () {
		return (
			<Provider store={store}>
				<Index />
			</Provider>
		)
	}
}

Taro.render(<App />, document.getElementById('app'))
