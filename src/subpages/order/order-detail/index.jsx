/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, hideLoading, navigateBack, navigateTo, removeStorageSync, setClipboardData, setStorageSync, showLoading, showModal, stopPullDownRefresh, useDidShow, usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { callPhone } from '@/common/public';
import './index.scss'
import BlurImg from '@/components/blur-img/BlurImg';
import order_type from '../orderType';
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
        const res = await OrderService.getOrderDetailApi(order_id)
        console.log('res', res)
        setPageData(res)
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
                            <View className='address'>{pageData?.order_address?.address}{pageData?.order_address?.number}</View>
                        </View>
                    </View>
                    <Text className='name'>{pageData?.order_address?.contact_name}</Text>
                    <Text className='phone'>{pageData?.order_address?.mobile}</Text>
                </View>
            </View>




            <View className='card'>
                <View className='title-status fb'>
                    <Text className='msg'>{pageData?.user_status_msg}</Text>
                    <Text className='desc'>商家配送</Text>
                </View>
                {
                    pageData?.order_detail?.map(product => {
                        return (
                            <View className='product_item flex' key={product.cover}
                                onClick={() => {
                                    navLinkTo('product-detail/index', {})
                                }}
                            >
                                <BlurImg className='left' src={product.cover} />
                                <View className='right fb'>
                                    <View className='desc fd' style={{width: '100%'}}>
                                        <View className='product_name'>
                                            {product.product_name}
                                        </View>
                                        <View className='_sku'>{product.spec_detail}</View>

                                        <View className='price-box fb'>
                                            <View className='flex'>
                                                <View className='price'><Text className='_money'>¥</Text>{product.sku_price}</View>
                                                <Text className='number'> x{product.sku_count}</Text>
                                            </View>
                                            <View className='price'><Text className='_money'>¥</Text>{product.amount}</View>
                                        </View>
                                        <View className='del'><Text className='_money'>¥</Text>{product.market_price}</View>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
                <View className='line' />
                <View className='order-desc'>
                    {pageData?.order_fee?.map((item)=>{
                        return <View className='item fb'>{item.fee_type_msg}：<Text className='price'>¥{item.fee}</Text> </View>
                    })}
                    {pageData?.order_discount?.map((etem)=>{
                        return   <View className='item fb'>{etem.detail}：<Text className='price'>¥{etem.amount}</Text> </View>
                    })}
                    <View className='item fb'>备注：<Text>{pageData?.pay_at || '暂无备注'}</Text> </View>
                    <View className='line' />
                    <View className='item fb'>订单合计<Text>¥{pageData?.order_amount || '暂无备注'}</Text> </View>
                    <View className='item fb' style={{ marginTop: '10rpx' }}>
                        <View className='left'></View>
                        <View className='right'>实付金额
                            &nbsp;<Text className='price'><Text className='_money'>¥</Text>{pageData?.order_amount}</Text></View>
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
                <View className='item fb'>下单时间： <Text >{pageData?.create_at}</Text></View>
                <View className='item fb'>配送时间： <Text >{pageData?.delivery_at || '暂未设置'}</Text> </View>
            </View>

            <View className='footer'>
                {/* <View className='kefu' onClick={(event) => { }}>联系客服</View> */}
                <View className='btns flex'>
                   {/*  {(true) && <View className='btn fc' onClick={async () => {

                    }}
                    >确认收货</View>}
                    <View className='btn fc'>取消订单</View>
                    <View className='btn act-btn fc'>去付款</View> */}
                { pageData.user_status === order_type.UserOrderStatus.READY && <View className='btn fc' onClick={() => {}} >取消订单</View>}
                { pageData.user_status === order_type.UserOrderStatus.FINISH && <View className='btn fc' onClick={() => {}}>再来一单</View>}
                { pageData.user_status === order_type.UserOrderStatus.DELIVERING && <View className='btn act-btn fc' onClick={() => {}} >确认订单</View>}
                </View>
            </View>
        </View>
    )
}
export default Index;
