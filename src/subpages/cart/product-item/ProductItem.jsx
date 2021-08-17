/* eslint-disable react/jsx-indent-props */
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, Radio, Image } from '@tarojs/components';
import Taro, { getStorageSync, showToast, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro';
import BlurImg from '@/components/blur-img/BlurImg';
import HandleInput from '@/components/page/handle-input/HandleInput';
import { navLinkTo } from '@/common/publicFunc';
import np from 'number-precision'
import Move from './MoveSquare/move';
import SkewText from '@/components/page/skew-text/SkewText';


const ProductItem = memo(({
    product,
    list,
    handle = Function.prototype,
    index,
    showSku = Function.prototype,
    shop_id,
}) => {
    return (
        <Move value={80} padding={0} onClick={() => { handle(index, shop_id, 'delete') }}  >
            <View className='card flex' >
                <View className='check fc'
                    onClick={() => { handle(index, shop_id, 'check') }}
                >
                    <Radio className='radio' color='#00D0BF' checked={product.checked} />
                </View>
                <View className='product flex' onClick={(e) => { navLinkTo('product-detail/index', { product_id: product.product_id }); e.stopPropagation(); }}>
                    <BlurImg className='img' mode='aspectFill' src={product?.sku.cover} />
                    {/* <Image mode='aspectFill' /> */}
                    <View className='desc fd'>
                        <Text className='p-name'>{product?.product.product_name || '空'}</Text>
                        {product?.sku?.sku_default_value.length > 0 && <View className='p-sku' onClick={(event) => {
                            showSku(product, index, shop_id);
                            event.stopPropagation();
                        }}>
                            {product?.sku?.sku_default_value.map(e => e?.value + ' ').toString()}
                            {/* {product?.sku.map(e => {
                                return (
                                    <Text key={e} className='p-sku-item'>{e}</Text>
                                )
                            })} */}
                            <Text className='iconfont icon-unfold'></Text>
                        </View>}
                        <View className=' fb'>
                            <View className='flex'>
                                <Text className='price'><Text className='_money'>¥</Text>{product?.sku.discount_price}</Text>
                                {product?.sku.market_price != 0 && <Text className='del'><Text className='_money'>¥</Text>{product?.sku.market_price}</Text>}
                            </View>
                        </View>
                        <View className='p-num fb'>
                            <SkewText
                            // text={['会员价格', '¥' + product?.sku.member_price]}
                            />
                            <HandleInput
                                list={list}
                                num={product.product_count}
                                onChange={(value) => {
                                    if (value > product?.sku?.stock) {
                                        handle(index, shop_id, 'number', false)
                                        return showToast({ title: '最大库存:' + product?.sku?.stock, icon: 'none' })
                                    }
                                    handle(index, shop_id, 'number', value)

                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Move>
    )
});

export default ProductItem;
