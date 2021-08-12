/* eslint-disable react/jsx-indent-props */
import React, { memo, useEffect, useState } from 'react';
import { View, Text, Radio, Button, ScrollView } from '@tarojs/components';
import BlurImg from '@/components/blur-img/BlurImg';
import HandleInput from '@/components/page/handle-input/HandleInput';
import { navLinkTo } from '@/common/publicFunc';
import './product.scss';
import dayjs from 'dayjs';
import { setStorageSync } from '@tarojs/taro';

const ProductItem = memo(({ order }) => {
    if (!order) return null

    const oldPre = () => {
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

    return (
        <View
            className='order-item'

        >
            <View className='title fb'>
                <Text>{dayjs(order.create_at * 1000).format('YYYY-MM-DD HH:mm:ss')}</Text>
                <Text className='status'>待支付</Text>
            </View>
            <ScrollView scrollX className='pruduct_wrap' style={{ marginBottom: '0.2rem' }}>
                {order?.order_detail?.map((product, i) => {
                    return (
                        <View className='product_item' key={product.product_id + '-product_id'}>
                            <BlurImg className='img' src={product.cover} />
                        </View>
                    )
                })}
            </ScrollView>
            <View className='info fdc' >
                <Text className='price'><Text className='_money'>&nbsp;¥</Text>{order.order_amount}</Text>
                <Text style={{ fontSize: '24rpx' }}>共{order.sku_count}件</Text>
            </View>
            <View className='btns flex'>
                <Button className='btn fc'>取消订单</Button>
                <Button className='btn fc' onClick={(event) => { event.stopPropagation(); oldPre() }}>再来一单</Button>
                <Button className='btn act-btn fc'>立即付款</Button>
            </View>
        </View>

    )
});

export default ProductItem;
