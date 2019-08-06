import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
// import { set as setGlobalData, get as getGlobalData } from '../../utils/data'
import './goods_list.scss'
// import GoodsIcon from '../../assets/images/goods_icon'

export default class Goods extends Component {

	config = {
		// navigationBarTitleText: '首页'
	}
	state = {
		activityList: [
			{ act_name:'测试1'},
			{ act_name:'测试2测试2测试2测试2测试2测试2测试2测试2测试2测试2'}
		],
		goodsList: [
			{
				barcode: "4892214255521",
				best_sell:1,
				first_create_time:"0",
				g_sku_id:"13157",
				g_sku_name:"道地蜂蜜绿茶500ml",
				goods_labels:[],
				is_new:0,
				is_wish:"2",
				membership_price:"-1.00",
				on_sale_count:"1",
				pic_big:"http://clb-sys-img-1255353254.cos.ap-guangzhou.myqcloud.com/2018/04/03/2018040315227204052784.jpg",
				price:"5.50",
				total_sale_count: "21"
			},{
				barcode: "4892214255521",
				best_sell:1,
				first_create_time:"0",
				g_sku_id:"13157",
				g_sku_name:"道地蜂蜜绿茶500ml",
				goods_labels:[],
				is_new:0,
				is_wish:"2",
				membership_price:"-1.00",
				on_sale_count:"1",
				pic_big:"http://clb-sys-img-1255353254.cos.ap-guangzhou.myqcloud.com/2018/04/03/2018040315227204052784.jpg",
				price:"5.50",
				total_sale_count: "21"
			},{
				barcode: "4892214255521",
				best_sell:1,
				first_create_time:"0",
				g_sku_id:"13157",
				g_sku_name:"道地蜂蜜绿茶500ml",
				goods_labels:[],
				is_new:0,
				is_wish:"2",
				membership_price:"-1.00",
				on_sale_count:"1",
				pic_big:"http://clb-sys-img-1255353254.cos.ap-guangzhou.myqcloud.com/2018/04/03/2018040315227204052784.jpg",
				price:"5.50",
				total_sale_count: "21"
			// },{
			// 	barcode: "4892214255521",
			// 	best_sell:1,
			// 	first_create_time:"0",
			// 	g_sku_id:"13157",
			// 	g_sku_name:"道地蜂蜜绿茶500ml",
			// 	goods_labels:[],
			// 	is_new:0,
			// 	is_wish:"2",
			// 	membership_price:"-1.00",
			// 	on_sale_count:"1",
			// 	pic_big:"http://clb-sys-img-1255353254.cos.ap-guangzhou.myqcloud.com/2018/04/03/2018040315227204052784.jpg",
			// 	price:"5.50",
			// 	total_sale_count: "21"
			},
		]
	}
	componentWillMount () { }

	componentDidMount () { }

	componentWillUnmount() { 
		// console.log('preload: ', this.$router.preload.key)
	}

	componentDidShow () { }

	componentDidHide () { }

	render() {
		const { activityList, goodsList } = this.state;

		return (
			<View id='goodsList'>
				{/*活动通知*/}
				{activityList.length > 0 ?
					<View className='notice-wrap'>
						<View className='notice-box'>
							<Swiper className='notice-swiper' autoplay="true" interval='5000' duration='500' circular="true " vertical="{{false}}" skip-hidden-item-layout="{{true}}">
								{
									activityList.map((item) => {
										return <SwiperItem><View>{item.act_name}</View></SwiperItem>
									})
								}
							</Swiper>
						</View>
					</View >
				: ''}	
				
				{/*消息提示*/}
				<View className='tips'>当前列表仅作商品信息展示</View>

				{/*商品列表*/}
				{goodsList.length > 0 ? 
					<View className='goods-wrap'>
						{
							goodsList.map((item, index) => {
								return <View className='goods-item' key='index'>
									<View className='goods-cover'>
										<Image
											src={item.pic_big || '../../assets/images/goods_icon/goods_default.png'}
											className={item.best_sell == 1 ?  'goods-sell': item.is_new == 1 ? 'goods-new' : ''} />
									</View>
									<View className='goods-prize'>

									</View>
								</View>

							})
						}
					</View>
				: ''}
			</View>
		)
	}
}

