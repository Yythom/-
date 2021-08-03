import React, { useState } from 'react';
import FloatBottom from '@/components/float/FloatBottom';
import { Text, View } from '@tarojs/components';
import { getStorageSync } from '@tarojs/taro';
import '@/src/coupon.scss'

const CouponFloat = ({
    show,
    setShow,
    list = [
        {
            title: '待领取优惠券',
            list: [
                {
                    price: '100',
                    name: '优惠券--1',
                    type: 'vip',
                    scpoe: 100,
                    date: '2021.8.1-2021.9.'
                },
                {
                    price: '100',
                    name: '优惠券--2',
                    scpoe: 0,
                    date: '2021.8.1-2021.9.'
                },
            ]
        },
        {
            title: '已领取优惠券',
            type: '2',
            list: [
                {
                    price: '100',
                    name: '优惠券--1',
                    scpoe: 0,
                    date: '2021.8.1-2021.9.'
                },
                {
                    price: '100',
                    name: '优惠券--2',
                    scpoe: 20,
                    date: '2021.8.1-2021.9.'
                },
            ]
        }
    ],
}) => {


    return (
        <FloatBottom bottom={getStorageSync('bar_height')} className='coupon-float' show={show} setShow={setShow} style={{ backgroundColor: '#fff' }}>
            <View className='title-pro fc'>优惠券</View>
            <View className='iconfont icon-close' onClick={() => setShow(false)} />
            <View style={{ height: '65vh', overflow: 'scroll' }}>
                {
                    list.map((e, i) => {
                        return (
                            <View className='item-wrap coupon-wrap' key={e.title + 'item-wrap'}>
                                <View className='title'>{e.title}</View>
                                {
                                    e.list.map((item, i) => {
                                        return (
                                            <View className={`item flex ${item.type == 'vip' && 'vip_item'}`} key={item.name + 'i'}>
                                                <View className='left flex'>
                                                    {item.type == 'vip' && <View className='dig fc'>会员红包</View>}
                                                    <View className='price-box fdc'>
                                                        <View className='price'>
                                                            <Text className='_money'>¥</Text>{item.price}
                                                        </View>
                                                        <View className='scope'>{item.scpoe == 0 ? '无门槛' : `满${item.scpoe}可用`}</View>
                                                    </View>
                                                    <View className='desc fd'>
                                                        <View className='name'>{item.name}</View>
                                                        <View className='date'>{item.date}</View>
                                                    </View>
                                                </View>
                                                <View className='right fc'>
                                                    <View className={`btn fc ${e.type == 2 && 'gray-btn'}`}>
                                                        {e.type == 2 ? '已领取' : '立即领取'}
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
            </View>
        </FloatBottom>
    )
}

export default CouponFloat;