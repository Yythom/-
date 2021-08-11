/* eslint-disable react/jsx-indent-props */
import { navLinkTo } from '@/common/publicFunc';
import { Text, View } from '@tarojs/components';
import React, { Fragment, memo } from 'react';

const OrderType = memo(() => {
    return (
        <Fragment>
            <View className='order-card fb wallet-common ' style={{ marginTop: '0' }} onClick={() => navLinkTo('order/order-list/index', {})} >
                {/* <View className='title flex'>我的服务</View> */}
                <View
                    className='fdc'
                    onClick={() => navLinkTo('order/order-list/index', { defaultIndex: 1 })}
                >
                    <Text className='iconfont icon-ziyuan'></Text>
                    <View className=''>待付款</View>
                </View>
                <View
                    className='fdc'
                    onClick={() => navLinkTo('order/order-list/index', { defaultIndex: 2 })}
                >
                    <Text className='iconfont icon-ziyuan'></Text>
                    <View className=''>待发货</View>
                </View>
                <View
                    className='fdc'
                    onClick={() => navLinkTo('order/order-list/index', { defaultIndex: 3 })}
                >
                    <Text className='iconfont icon-ziyuan'></Text>
                    <View className=''>已发货</View>
                </View>
                <View
                    className='fdc'
                    onClick={() => navLinkTo('order/order-list/index', { defaultIndex: 2, delivery_type: 1 })}
                >
                    <Text className='iconfont icon-ziyuan'></Text>
                    <View className=''>待取货</View>
                </View>
                <View
                    className='fdc'
                    onClick={() => navLinkTo('order/order-list/index', { defaultIndex: 4 })}
                >
                    <Text className='iconfont icon-ziyuan'></Text>
                    <View className=''>已完成</View>
                </View>
            </View>

        </Fragment>
    )
})

export default OrderType;