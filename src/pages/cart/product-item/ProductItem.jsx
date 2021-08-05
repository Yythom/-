/* eslint-disable react/jsx-indent-props */
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, Radio, Image } from '@tarojs/components';
import Taro, { getStorageSync, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro';
import BlurImg from '@/components/blur-img/BlurImg';
import HandleInput from '@/components/page/handle-input/HandleInput';
import { navLinkTo } from '@/common/publicFunc';
import Move from './MoveSquare/move';


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
                    <Radio className='radio' color='#eb472b' checked={product.checked} />
                </View>
                <View className='product flex' onClick={(e) => { navLinkTo('product-detail/index', { product_id: product.product_id }); e.stopPropagation(); }}>
                    <BlurImg className='img' mode='aspectFill' src='https://img2.baidu.com/it/u=1336119765,2231343437&fm=26&fmt=auto&gp=0.jpg' />
                    {/* <Image mode='aspectFill' /> */}
                    <View className='desc fd'>
                        <Text className='p-name'>{product?.product_name}</Text>
                        <View className='p-sku' onClick={(event) => {
                            showSku(product, index, shop_id);
                            event.stopPropagation();
                        }}>
                            {product?.sku?.toString()}
                            {/* {product?.sku.map(e => {
                                return (
                                    <Text key={e} className='p-sku-item'>{e}</Text>
                                )
                            })} */}
                            <Text className='iconfont icon-unfold'></Text>
                        </View>
                        <View className=' fb'>
                            <View className='flex'>
                                <Text className='price'><Text className='_money'>¥</Text>{product?.price}</Text>
                                <Text className='del'><Text className='_money'>¥</Text>{product?.price}</Text>
                            </View>
                        </View>
                        <View className='p-num fb'>
                            {
                                product?.isVip == 1
                                    ? <View className='vip-price-act'>会员价格</View>
                                    : <View className='vip-price'>会员价格¥320</View>
                            }

                            <HandleInput
                                list={list}
                                num={product.num}
                                onChange={(value) => {
                                    // console.log(value);
                                    // if (num > value ) { // 减
                                    //     return
                                    // }
                                    // if (num < value) { // 加

                                    // }
                                    // onChangeNumber()
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
