/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, hideLoading, navigateTo, setClipboardData, setStorageSync, showLoading, showModal, stopPullDownRefresh, useDidShow, usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { callPhone } from '@/common/public';
import './index.scss'
import BlurImg from '@/components/blur-img/BlurImg';
import { navLinkTo } from '@/common/publicFunc';


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
                product_name: '商品1',
                sale_price: '7999',
                number: '2',
                spec: '黑色；m；64G',
                image: 'https://img2.baidu.com/it/u=2790689811,54471194&fm=26&fmt=auto&gp=0.jpg'
            }
        ]
    })


    const init = async () => {

    }

    useDidShow(() => {
        init();
    })
    return (
        <View className='order_detail_wrap fd'  >
            <NavBar back title='订单详情' background='rgb(255, 199, 116)' color='#fff' iconColor='#fff' />
            <View className='title-status'>{pageData?.status_message}</View>

            <View className='square flex'>
                <View className='left'><Text className='iconfont icon-dingwei'></Text></View>
                <View className='right'>
                    <View className='info'>
                        <Text className='name'>{pageData?.address.username}</Text>
                        <Text className='phone'>{pageData?.address.mobile}</Text>
                    </View>
                    <View className='address'>{pageData?.address.address}</View>
                </View>
            </View>

            <View className='card'>
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
                                        <View className='sku'>{product.spec}</View>
                                    </View>
                                    <View className='price-box fd'>
                                        <View className='number'>  x{product.number}</View>
                                        <View className='price'><Text className='_money'>¥</Text>{product.sale_price}</View>
                                    </View>
                                </View>

                            </View>
                        )
                    })
                }
                <View className='order-desc'>
                    <View className='item fb'>
                        订单编号：{pageData?.order_id}
                        <View className='copy' onClick={() => { setClipboardData({ data: pageData?.order_id, }) }}>
                            复制
                        </View>
                    </View>
                    <View className='item fb'>下单时间：{pageData?.pay_at} </View>
                    <View className='item fb'>配送时间：{pageData?.delivery_at} </View>
                </View>
            </View>

            <View className='summary card'>
                <View className='_title'>订单合计</View>
                <View className='item fb'>
                    <View className='right'>商品总价</View>
                    <View className='left'><Text className='_money'>¥</Text>{pageData?.price}</View>
                </View>
            </View>

            <View className='footer'>
                {/* <View className='kefu' onClick={(event) => { }}>联系客服</View> */}
                <View className='btns flex'>
                    {(true) && <View className='btn fc' onClick={async () => {

                    }}
                    >确认收货</View>}
                    <View className='btn fc'>取消订单</View>
                    <View className='btn fc'>去付款</View>
                </View>
            </View>
        </View>
    )
}
export default Index;
