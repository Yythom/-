/* eslint-disable react/jsx-indent-props */
import React, { useState, Fragment } from 'react';
import { Text, View } from '@tarojs/components';
import { getStorageSync } from '@tarojs/taro';
import { systemInfo } from '@/common/publicFunc';
import './v-coupon.scss'
import CouponFloat from './coupon';

const CouponList = ({
    bottom = Number(getStorageSync('bar_height')) + systemInfo?.safeArea?.top / 2,
    list = [
        {
            coupon_id: '101',
            price: '100',
            scpoe: '500'
        },
        {
            coupon_id: '102',
            price: '100',
            scpoe: '0'
        },
        {
            coupon_id: '103',
            price: '100',
            scpoe: '0'
        },
        {
            coupon_id: '104',
            price: '100',
            scpoe: '0'
        }
    ],
    coupon = [
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
    const [couponshow, setCouponshow] = useState(false);

    return (
        <Fragment >
            <View className='coupon'>
                {
                    list?.map((e, i) => {
                        return (
                            <View className='item flex' key={e.coupon_id} onClick={() => setCouponshow(true)}>
                                <View className='left flex'>
                                    <View className='square' />
                                    <Text style={{ zIndex: '1', marginRight: '36rpx' }} >优惠</Text>
                                    <View style={{ zIndex: '1', fontSize: '28rpx' }} >
                                        <Text className='_money'>¥</Text>{e.price}
                                    </View>
                                    <View className='line'></View>
                                </View>
                                <View className='right fc'>
                                    {e.scpoe == 0
                                        ? <Text >满{e.scpoe}可用</Text>
                                        : <Text >可领</Text>
                                    }
                                </View>
                            </View>
                        )
                    })
                }
            </View>

            {/* 优惠券弹框 */}
            <CouponFloat
                show={couponshow}
                coupon={coupon}
                setShow={setCouponshow}
                bottom={bottom}
            />
        </Fragment>

    )
}

export default CouponList;