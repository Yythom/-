/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, hideLoading, navigateBack, navigateTo, removeStorageSync, setClipboardData, setStorageSync, showLoading, showModal, stopPullDownRefresh, useDidShow, usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { callPhone } from '@/common/public';
import './index.scss'
import BlurImg from '@/components/blur-img/BlurImg';
import { navLinkTo } from '@/common/publicFunc';
import OrderService from '@/services/order';


const Index = () => {
    const query = Taro.getCurrentInstance().router.params;
    const [pageData, setPageData] = useState({
        status_message: '待发货',
        order_id: '101',
        pay_at: '2020-12-01',
        delivery_at: '2020-12-01',
        status: '1',
        price: '8799',
        address: {
            username: '用户1',
            mobile: '13489890983',
            address: '一个地址',
        },
        products: [
            {
                product_name: '特色油门小龙虾-武汉飞飞下庄联名款名款名',
                sale_price: '7999',
                number: '2',
                spec: '黑色；m；64G',
                image: 'https://img2.baidu.com/it/u=2790689811,54471194&fm=26&fmt=auto&gp=0.jpg'
            }
        ]
    })


    const init = async () => {
        const order_id = getStorageSync('order_id_detail')
        const res = OrderService.getOrderDetailApi(order_id)
        console.log(query);
    }

    useDidShow(() => {
        init();
    })
    return (
        <View className='order_detail_wrap fd'  >
            <NavBar back onBack={() => {
                const back = getStorageSync('back');
                navigateBack({
                    delta: back || 1,
                    success: () => {
                        removeStorageSync('back')
                    }
                })
            }} title='订单详情' background='linear-gradient(360deg, #FF8C48 0%, #FF6631 100%);' color='#fff' iconColor='#fff' />

            {/* 地址 */}
            <View className='square flex'>
                <View className='right'>
                    <View className='info flex'>
                        <View className='flex'>
                            <Text className='iconfont icon-dingwei' />
                            <View className='address'>{pageData?.address.address}</View>
                        </View>
                    </View>
                    <Text className='name'>{pageData?.address.username}</Text>
                    <Text className='phone'>{pageData?.address.mobile}</Text>
                </View>
            </View>




            <View className='card'>
                <View className='title-status fb'>
                    <Text className='msg'>{pageData?.status_message}</Text>
                    <Text className='desc'>商家配送</Text>
                </View>
                {
                    pageData?.products.map(product => {
                        return (
                            <View className='product_item flex' key={product.image}
                                onClick={() => {
                                    navLinkTo('product-detail/index', {})
                                }}
                            >
                                <BlurImg className='left' src={product.image} />
                                <View className='right fb'>
                                    <View className='desc fd'>
                                        <View className='product_name'>
                                            {product.product_name}
                                        </View>
                                        <View className='_sku'>{product.spec}</View>

                                        <View className='price-box fb'>
                                            <View className='flex'>
                                                <View className='price'><Text className='_money'>¥</Text>{product.sale_price}</View>
                                                <Text className='number'> x{product.number}</Text>
                                            </View>
                                            <View className='price'><Text className='_money'>¥</Text>{product.sale_price}</View>
                                        </View>
                                        <View className='del'><Text className='_money'>¥</Text>{product.sale_price}</View>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
                <View className='line' />
                <View className='order-desc'>
                    <View className='item fb'>包装费：<Text className='price'>¥{111}</Text> </View>
                    <View className='item fb'>配送费：<Text className='price'>¥{222}</Text> </View>
                    <View className='item fb'>备注：<Text>{pageData?.pay_at || '暂无备注'}</Text> </View>
                    <View className='line' />
                    <View className='item fb'>订单合计<Text>{pageData?.pay_at || '暂无备注'}</Text> </View>
                    <View className='item fb' style={{ marginTop: '10rpx' }}>
                        <View className='left'></View>
                        <View className='right'>实付金额
                            &nbsp;<Text className='price'><Text className='_money'>¥</Text>{pageData?.price}</Text></View>
                    </View>
                </View>
            </View>

            <View className='summary card'>

                <View className='item fb'>
                    订单编号：
                    <View className='copy' onClick={() => { setClipboardData({ data: pageData?.order_id, }) }}>
                        {pageData?.order_id} &nbsp;复制
                    </View>
                </View>
                <View className='item fb'>下单时间： <Text >{pageData?.pay_at}</Text></View>
                <View className='item fb'>配送时间： <Text >{pageData?.delivery_at}</Text> </View>
            </View>

            <View className='footer'>
                {/* <View className='kefu' onClick={(event) => { }}>联系客服</View> */}
                <View className='btns flex'>
                    {(true) && <View className='btn fc' onClick={async () => {

                    }}
                    >确认收货</View>}
                    <View className='btn fc'>取消订单</View>
                    <View className='btn act-btn fc'>去付款</View>
                </View>
            </View>
        </View>
    )
}
export default Index;
