/* eslint-disable react/jsx-indent-props */
import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, Image, Button } from '@tarojs/components';

import np from 'number-precision'
import './product.scss'

function ProductInfo({
    className,
    product,
}) {

    return (
        <View className={'p-info ' + className}>
            <View className='p-name fb'>
                <View className='name'>
                    {product?.product_name}
                </View>
                {/* <Button openType='share' className='share fd' style={{ alignItems: 'center' }}
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
                </Button> */}
            </View>

            <View className='price-box fb'>
                <View className='price flex'>
                    <Text className='new'>
                        <Text className='_moneny'>¥</Text>
                        {np.times(product?.discount_price || 0, 0.01)}
                    </Text>
                    <Text className='old'>
                        <Text className='_moneny'>¥</Text>
                        {np.times(product?.market_price || 0, 0.01)}
                    </Text>
                </View>
            </View>
            <View className='other fb'>
                <View className='flex'>
                    <View className='vip-price' style={{ marginRight: '10rpx' }}>¥ {np.times(product?.member_price || 0, 0.01)}</View>


                    <View className='desc flex'>
                        {product?.product_tags?.map((e, i) => {
                            return (
                                <View key={e.name} className='desc-item fc'>{e.name}</View>
                            )
                        })}
                    </View>



                </View>
                <View className='sale'>月售{product?.sale}</View>
            </View>
        </View>
    )
}

export default ProductInfo;