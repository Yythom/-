/* eslint-disable react/jsx-indent-props */
import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, Image, Button } from '@tarojs/components';

import np from 'number-precision'
import './product.scss'
import { min_max_price_format } from '@/common/utils';
import SkewText from '@/components/page/skew-text/SkewText';

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

            <View className='flex' style={{ marginTop: '10rpx' }}>
                <View className='desc flex'>
                    {product?.product_tags?.map((e, i) => {
                        return (
                            <View key={e.name} className='desc-item fc'>{e.name}</View>
                        )
                    })}
                </View>
            </View>

            <View className='price-box fb'>
                <View className='price flex'>
                    <Text className='new'>
                        <Text style={{ fontSize: '40rpx' }}>{min_max_price_format(product?.max_discount_price, product?.discount_price)}</Text>
                    </Text>
                    <Text className='old'>
                        {min_max_price_format(product?.market_price, product?.market_price)}
                    </Text>
                </View>
            </View>
            {/* <View className='other fb'>

                <SkewText text={['会员价格',  min_max_price_format(product?.max_member_price, product?.member_price)]} />

                <View className='sale'>月售{product?.sale}</View>
            </View> */}
        </View>
    )
}

export default ProductInfo;