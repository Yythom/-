/* eslint-disable react/jsx-indent-props */
import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, Radio, Button, ScrollView, Image } from '@tarojs/components';
import BlurImg from '@/components/blur-img/BlurImg';
import HandleInput from '@/components/page/handle-input/HandleInput';
import { navLinkTo } from '@/common/publicFunc';
import dayjs from 'dayjs';
import { setStorageSync, showModal } from '@tarojs/taro';
import order_type from '../../orderType';
import OrderService from '@/services/order';
import './product.scss';
import { againOrder, showInfo } from '../../order-btn-handle';

const ProductItem = memo(({ order, getList }) => {
    if (!order) return null

    const handle = async (type) => {
        const order_id = order?.order_id;
        switch (type) {
            case '取消订单':
                showInfo('确认取消订单', async () => await OrderService.offOrder(order_id) && getList(false));
                break;
            case '立即付款':

                break;
            case '确认订单':
                // showInfo('确认订单', async () => await OrderService.offOrder(order_id) && getList());
                break;
            case '再来一单':
                againOrder(order);
                break;
            case '确认收货':
                showInfo('确认收货', async () => await OrderService.okOrder(order_id) && getList(false));
                break;
            default:
                break;
        }
    }



    return (
        <View
            className='order-item'

        >
            <View className='title fb'>
                <Text>取货码：{order?.order_code?.map((e) => { return e.code })
                    // dayjs(order.create_at * 1000).format('YYYY-MM-DD HH:mm:ss')
                }</Text>
                <Text className='status'>{order.user_status_msg}</Text>
            </View>
            <ScrollView scrollX className='pruduct_wrap' style={{ marginBottom: '0.2rem' }}>
                <View className='pruduct_wrap ' style={{ paddingRight: '170rpx', width: 'max-content' }}  >
                    {order?.order_detail?.map((product, i) => {
                        return (
                            <>
                                <View className='product_item' key={product.product_id + '-product_id'}>
                                    <View className='img'>
                                        <Image mode='aspectFill' src={product.cover} />
                                    </View>
                                    <View className='name'>
                                        {product?.product_name}
                                    </View>
                                </View>
                            </>

                        )
                    })}
                </View>

            </ScrollView>
            <View className='info fdc' >
                <Text className='price'><Text className='_money'>&nbsp;¥</Text>{order.order_amount}</Text>
                <Text style={{ fontSize: '24rpx' }}>共{order.sku_count}件</Text>
            </View>
            <View className='btns flex'>
                {order.user_status === order_type.UserOrderStatus.READY && <Button className='btn fc' onClick={(event) => { handle('取消订单'); event.stopPropagation(); }} >取消订单</Button>}
                {order.user_status === order_type.UserOrderStatus.CANCEL && <Button className='btn fc' onClick={(event) => { handle('再来一单');; event.stopPropagation(); }}>再来一单</Button>}
                {order.user_status === order_type.UserOrderStatus.DELIVERING && <Button className='btn fc' onClick={(event) => { handle('确认订单'); event.stopPropagation(); }} >确认订单</Button>}
                {order.user_status === order_type.UserOrderStatus.WAIT_MOTION && <Button className='btn fc' onClick={(event) => { handle('确认收货'); event.stopPropagation(); }} >确认收货</Button>}
                {/*  order.status === '' && <Button className='btn act-btn fc' onClick={(event) => { handle('立即付款'); event.stopPropagation(); }} >立即付款</Button> */}
            </View>
        </View>

    )
});

export default ProductItem;
