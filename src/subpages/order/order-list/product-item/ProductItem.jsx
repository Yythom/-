/* eslint-disable react/jsx-indent-props */
import React, { memo, useCallback, useEffect, useState } from 'react';
import { View, Text, Radio, Button, ScrollView, Image } from '@tarojs/components';
import BlurImg from '@/components/blur-img/BlurImg';
import HandleInput from '@/components/page/handle-input/HandleInput';
import { navLinkTo } from '@/common/publicFunc';
import dayjs from 'dayjs';
import { setStorageSync, showModal } from '@tarojs/taro';
import OrderService from '@/services/order';
import './product.scss';

const ProductItem = memo(({ order, getList }) => {
    if (!order) return null

    const againOrder = () => {
        const pro_arr = order.order_detail.map(e => {
            return {
                "sku_id": e.sku_id,
                "count": e.sku_count
            }
        })
        console.log(pro_arr);
        let pre = {
            "shop_id": "1",
            "sku_items": pro_arr
        };
        setStorageSync('pre-data', pre);
        setTimeout(() => {
            navLinkTo('order-comfirm/index', {})
        }, 200);
    }
    const showInfo = useCallback((content, cb) => {
        showModal({
            title: '提示',
            content: content || '这是一个模态弹窗',
            success: function (btn) {
                if (btn.confirm) {
                    cb()
                }
            }
        })
    }, []);

    const handle = async (type) => {
        const order_id = order?.order_id;
        switch (type) {
            case '取消订单':
                showInfo('确认取消订单', async () => await OrderService.offOrder(order_id) && getList());
                break;
            case '立即付款':

                break;
            case '确认订单':
                // showInfo('确认订单', async () => await OrderService.offOrder(order_id) && getList());
                break;
            case '再来一单':
                againOrder()
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
                <Text>{dayjs(order.create_at * 1000).format('YYYY-MM-DD HH:mm:ss')}</Text>
                <Text className='status'>待支付</Text>
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
                <Button className='btn fc' onClick={(event) => { handle('取消订单'); event.stopPropagation(); }} >取消订单</Button>
                <Button className='btn fc' onClick={(event) => { handle('再来一单');; event.stopPropagation(); }}>再来一单</Button>
                <Button className='btn act-btn fc' onClick={(event) => { handle('确认订单'); event.stopPropagation(); }} >确认订单</Button>
                <Button className='btn act-btn fc' onClick={(event) => { handle('立即付款'); event.stopPropagation(); }} >立即付款</Button>
            </View>
        </View>

    )
});

export default ProductItem;
