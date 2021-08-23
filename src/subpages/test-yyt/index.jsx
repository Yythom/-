/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useState } from 'react';
import { View, Text, Input, Button } from '@tarojs/components';
import Taro, { getStorageSync, showModal, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'
import WxPay from '@/utils/wxpay';
import './index.scss'


const Index = () => {
    const [order_id, setOrder_id] = useState('');
    const [pay_order_type, setpay_order_type] = useState(1);
    useEffect(() => {

    }, [])

    return (
        <View className='test-wrap'  >
            <View className='fb' style={{ marginBottom: '20rpx' }}>
                <View className=''>order_id :</View>
                <Input value={order_id} type='digit' onInput={(e) => setOrder_id(`${e.detail.value.trim()}`)} placeholder='输入 order_id' />
            </View>
            <View className='fb'>
                <View className=''>pay_order_type</View>
                <Input value={pay_order_type} type='digit' onInput={(e) => setpay_order_type(e.detail.value.trim())} placeholder='输入 pay_order_type' />
            </View>
            <View className='flex'>
                <Button
                    className='btn fc'
                    onClick={() => {
                        WxPay.getPayOrderParams(order_id, pay_order_type).then(res => {
                            console.log(res);
                            if (res) WxPay.pay(res)
                        })
                    }}
                >测试支付接口</Button>
                <Button
                    className='btn fc'
                    onClick={() => {
                        showModal({
                            // title: '清空',
                            content: '清空',
                            success: function (res) {
                                if (res.confirm) {
                                    setOrder_id('')
                                }
                            }
                        })
                    }}
                >清空</Button>
            </View>
        </View>
    )
}
export default Index;
