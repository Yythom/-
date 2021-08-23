/* eslint-disable react/jsx-indent-props */
import { navLinkTo } from '@/common/publicFunc';
import order_type from '@/src/subpages/order/orderType';
import make_type from '@/src/subpages/order/type';
import { Text, View } from '@tarojs/components';
import { navigateTo, setStorageSync } from '@tarojs/taro';
import React, { Fragment, memo } from 'react';

const tabsList = [
    { title: '全部', status: '' },
    { title: '备货中', status: order_type.UserOrderStatus.READY },
    { title: '待取货', status: order_type.UserOrderStatus.WAIT_MOTION },
    { title: '已完成', status: order_type.UserOrderStatus.FINISH },
    { title: '待付款', status: order_type.UserOrderStatus.INIT },
    // { title: '退款', status: order_type.UserOrderStatus },
]

const OrderType = memo(() => {
    return (
        <Fragment>
            <View className='order-card fb wallet-common ' style={{ marginTop: '0' }}  >
                {/* <View className='title flex'>我的服务</View> */}
                {
                    tabsList.map((e, i) => {
                        return (
                            <Fragment key={e.title}>
                                <View
                                    className='fdc'
                                    onClick={() => {
                                        setTimeout(() => {
                                            navLinkTo('order/order-list/index', {
                                                delivery_type: make_type.DeliveryType.SELF_MENTION,
                                                defaultIndex: i
                                            })
                                        }, 200);
                                    }}
                                >
                                    <Text className='iconfont icon-dingdan'></Text>
                                    <View className=''>{e.title}</View>
                                </View>
                            </Fragment>
                        )
                    })
                }

                {/* <View
                    className='fdc'
                    onClick={() => navLinkTo('order/order-list/index', { defaultIndex: 4 })}
                >
                    <Text className='iconfont icon-ziyuan'></Text>
                    <View className=''>已完成</View>
                </View> */}
            </View>

        </Fragment>
    )
})

export default OrderType;