import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import { set as setGlobalData, get as getGlobalData } from '../../utils/data'
import './mine.scss'

export default class Mine extends Component {

	config = {
		// navigationBarTitleText: '首页'
	}

	componentWillMount () { }

	componentDidMount () { }

	componentWillUnmount () { }

	componentDidShow () { }

	componentDidHide () { }

	render () {
		return (
			<View className='mine'>
				<Text>mine</Text>
			</View>
		)
	}
}

