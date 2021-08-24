/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { View, Text, Image, Button } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import dayjs from 'dayjs';
import Taro, { getStorageSync, hideLoading, navigateBack, navigateTo, removeStorageSync, setClipboardData, setStorageSync, showLoading, showModal, stopPullDownRefresh, useDidShow, usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { callPhone } from '@/common/public';
import BlurImg from '@/components/blur-img/BlurImg';
import order_type from '../orderType';
import { navLinkTo } from '@/common/publicFunc';
import OrderService from '@/services/order';
import { againOrder, showInfo } from '../order-btn-handle';
import Refund from './refund-float/refund';
import './index.scss'


const Index = () => {
    const query = Taro.getCurrentInstance().router.params;
    const [show, setShow] = useState(false); // 申请退款弹框
    const [pageData, setPageData] = useState(null
        // {
        // status_message: '待发货',
        // order_id: '101',
        // pay_at: '2020-12-01',
        // delivery_at: '2020-12-01',
        // status: '1',
        // price: '8799',
        // address: {
        //     username: '用户1',
        //     mobile: '13489890983',
        //     address: '一个地址',
        // },
        // products: [
        //     {
        //         product_name: '特色油门小龙虾-武汉飞飞下庄联名款名款名',
        //         sale_price: '7999',
        //         number: '2',
        //         spec: '黑色；m；64G',
        //         image: 'https://img2.baidu.com/it/u=2790689811,54471194&fm=26&fmt=auto&gp=0.jpg'
        //     }
        // ]
        // }
    )


    const init = async () => {
        const order_id = getStorageSync('order_id_detail')
        const res = await OrderService.getOrderDetailApi(query.order_id || order_id)
        console.log('res', res)
        setPageData(res)
        console.log(query);
    }


    const handle = async (type) => {
        const order_id = pageData?.order_id;
        switch (type) {
            case '取消订单':
                showInfo('确认取消订单', async () => await OrderService.offOrder(order_id) && init());
                break;
            case '立即付款':

                break;
            case '确认订单':
                // showInfo('确认订单', async () => await OrderService.offOrder(order_id) && getList());
                break;
            case '再来一单':
                againOrder(pageData);
                break;
            case '确认收货':
                showInfo('确认收货', async () => await OrderService.okOrder(order_id) && init());
            default:
                break;
        }
        setStorageSync('order-handle', true)
    }

    useDidShow(() => {
        init();
    })

    return (
        <View className='order_detail_wrap fd'  >
            <View className='bg' style={{ paddingBottom: '20rpx' }}>
                <NavBar back onBack={() => {
                    const back = getStorageSync('back');
                    navigateBack({
                        delta: back || 1,
                        success: () => {
                            removeStorageSync('back')
                        }
                    })
                }} title='订单详情' background='#00D0BF' color='#fff' iconColor='#fff'
                />
                {!(pageData?.user_status === order_type.UserOrderStatus.INIT || pageData?.user_status === order_type.UserOrderStatus.FINISH || pageData?.user_status === order_type.UserOrderStatus.CANCEL ) && <View className='code fc'>
                    <Text className='fixed-tag'>取货码</Text>
                    {pageData?.order_code?.map((e) => {
                        return Array.from(e.code.replace(/\s+/g, "-")).map((v, index) => {
                            return <Text key={index} className='num'>{v}</Text>
                        })
                    })}
                </View>}

            </View>

            {/* 地址 */}
            <View className='square flex'>
                <View className='right'>
                    <View className='info flex'>
                        <View className='address'>
                            <Text className='iconfont icon-dingwei' />
                            {pageData?.shop?.shop_address || '暂未设置'}{pageData?.shop?.shop_address_number}
                        </View>
                    </View>
                    <Text className='name'>{pageData?.delivery_type === 1 ? '商家电话' : '预留电话'}&nbsp;</Text>
                    <Text className='phone'>{pageData?.self_mention?.mobile || '暂未设置电话号码'}</Text>
                </View>
            </View>




            <View className='card'>
                <View className='title-status fb'>
                    <Text className='msg'>{pageData?.user_status_msg}</Text>
                    <Text className='desc'>{pageData?.delivery_type_msg}</Text>
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
                                    <View className='desc fd' style={{ width: '100%' }}>
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
                                        {
                                            Number(product.market_price) !== 0 && <View className='del'><Text className='_money'>¥</Text>{product.market_price}</View>
                                        }

                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
                <View className='line' />
                <View className='order-desc'>
                    {pageData?.order_fee?.map((item) => {
                        return <View className='item fb'>{item.fee_type_msg}<Text className='price'>+&nbsp;¥{item.fee}</Text> </View>
                    })}

                    <View className='item fb'>备注：<Text>{pageData?.remark || '暂无备注'}</Text> </View>
                    <View className='line' />

                    <View className='item fb'>订单合计<Text>¥{pageData?.order_amount || '暂无备注'}</Text> </View>
                    {pageData?.order_discount?.map((etem, i) => {
                        return <View className='item fb discount' key={i + 'discount'} >
                            <View className='flex'> <View className='discount_dig fc'>减</View> {etem.detail}</View>
                            <Text className='price'>-&nbsp;¥{etem.amount}</Text>
                        </View>
                    })}
                    <View className='item fb' style={{ marginTop: '10rpx' }}>
                        <View className='left'></View>
                        <View className='right'>实付金额
                            &nbsp;<Text className='price'><Text className='_money'>¥</Text>{pageData?.order_amount}</Text></View>
                    </View>
                </View>
            </View>

            <View className='summary card' >

                <View className='item fb'>
                    订单编号：
                    <View className='fb' onClick={() => { setClipboardData({ data: pageData?.order_id, }) }}>
                        <View className='copy'>
                            {pageData?.order_id}
                        </View>
                        <View className='copy_btn' >复制</View>
                    </View>
                </View>
                <View className='item fb'>取货码： <Text >{pageData?.order_code?.map((e) => { return e.code })}</Text></View>
                <View className='item fb'>创单时间： <Text >{dayjs(pageData?.create_at * 1000).format('YYYY-MM-DD HH:mm:ss')}</Text></View>
                <View className='item fb'>支付方式： <Text >{pageData?.pay_type_msg}</Text></View>
                {/* {pageData?.delivery_at && <View className='item fb'>配送时间： <Text >{pageData?.delivery_at || '暂未设置'}</Text> </View>} */}
            </View>

            <View className='footer'>
                {/* <View className='kefu' onClick={(event) => { }}>联系客服</View> */}
                <View className='btns flex'>
                    {/*  {(true) && <View className='btn fc' onClick={async () => {

                    }}
                    >确认收货</View>}
                    <View className='btn fc'>取消订单</View>
                    <View className='btn act-btn fc'>去付款</View> */}
                    <View className='btns flex'>
                        {pageData?.user_status === order_type.UserOrderStatus.READY && <Button className='btn fc' onClick={(event) => { handle('取消订单'); event.stopPropagation(); }} >取消订单</Button>}
                        {pageData?.user_status === order_type.UserOrderStatus.CANCEL && <Button className='btn fc' onClick={(event) => { handle('再来一单');; event.stopPropagation(); }}>再来一单</Button>}
                        {pageData?.user_status === order_type.UserOrderStatus.DELIVERING && <Button className='btn fc' onClick={(event) => { handle('确认订单'); event.stopPropagation(); }} >确认订单</Button>}
                        {pageData?.user_status === order_type.UserOrderStatus.WAIT_MOTION && <Button className='btn fc' onClick={(event) => { handle('确认收货'); event.stopPropagation(); }} >确认收货</Button>}
                        {/*  order.status === '' && <Button className='btn act-btn fc' onClick={(event) => { handle('立即付款'); event.stopPropagation(); }} >立即付款</Button> */}
                    </View>
                </View>
            </View>

            <Refund show={show} setShow={setShow} />
        </View>
    )
}
export default Index;
