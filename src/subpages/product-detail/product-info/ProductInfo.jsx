/* eslint-disable react/jsx-indent-props */
import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, Image, Button } from '@tarojs/components';
import { getClipboardData, setClipboardData, showShareMenu, showToast, useDidShow, useShareAppMessage } from '@tarojs/taro';
import isWeapp from '@/utils/env';

function ProductInfo({
    className,
    product,
}) {
    useDidShow(() => {
        isWeapp && showShareMenu();
    })

    useShareAppMessage(res => {
        console.log(res, 'res');
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '自定义转发标题',
            path: `/subpages/product-detail?id=123`,
        }
    });

    return (
        <View className={'p-info ' + className}>
            <View className='price-box fb'>
                <View className='price'>
                    <Text className='new price-color'>
                        <Text className='_moneny'>¥</Text>
                        {product?.sale_price}
                    </Text>
                    <Text className='old'>
                        <Text className='_moneny'>¥</Text>
                        {product?.price}
                    </Text>
                </View>
                <View className='sale'>已售 {product?.sale}件</View>
            </View>
            <View className='p-name fb'>
                <View className='name'>
                    {product?.product_name}
                </View>
                <Button openType='share' className='share fd' style={{ alignItems: 'center' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (window) setClipboardData({
                            data: window.location.href,
                            success: function () {
                                // getClipboardData({
                                //     success: function () {
                                showToast({ title: '当前链接已复制', icon: 'none' })
                                //     }
                                // })
                            }
                        })

                    }}
                >
                    <Text className='iconfont icon-fenxiang'></Text>
                    <Text className=''>分享</Text>
                </Button>
            </View>
        </View>
    )
}

export default ProductInfo;