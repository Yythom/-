/* eslint-disable react/jsx-indent-props */
import React, { memo, useEffect, useState } from 'react';
import { View, Text, Radio, Button } from '@tarojs/components';
import BlurImg from '@/components/blur-img/BlurImg';
import HandleInput from '@/components/page/handle-input/HandleInput';
import { navLinkTo } from '@/common/publicFunc';
import './product.scss';

const ProductItem = memo(({ products, }) => {
    return (
        <View
            className='order-item'
            onClick={(e) => { navLinkTo('order/order-detail/index', {}); e.stopPropagation(); }}
        >
            <View className='title fb'>
                <Text>2021-07-06 10:26:30</Text>
                <Text className='status'>待支付</Text>
            </View>
            <View className='pruduct_wrap' style={{ marginBottom: '0.2rem' }}>
                {products?.map((product, i) => {
                    return (
                        <View className='product_item' key={product.product_id + '-product_id'}>
                            <BlurImg className='img' src='https://img2.baidu.com/it/u=1336119765,2231343437&fm=26&fmt=auto&gp=0.jpg' />
                            <View className='center fd'>
                                <View className='product_name'> {product?.product_name}</View>
                                <View className='desc'>
                                    <View className='product_sku'>银色；16g</View>
                                    <View className='price fb'>
                                        <View className='flex'>
                                            <View className='new price'>
                                                <Text className='_money'>¥</Text>{222}
                                            </View>
                                            <View className='del'>
                                                <Text className='_money'>¥</Text>{333}
                                            </View>
                                        </View>
                                        <View className='num'>x2</View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })}

                {/* <View
                    className='product flex'
                // onClick={(e) => { navLinkTo('product-detail/index', { product_id: product.product_id }); e.stopPropagation(); }}
                >
                    <BlurImg className='img' src='https://img2.baidu.com/it/u=1336119765,2231343437&fm=26&fmt=auto&gp=0.jpg' />
                    <View className='desc fd'>
                        <View className='fb'>
                            <Text className='p-name'>
                                {product?.product_name}
                            </Text>
                            <View className='price-box fd' style={{ alignItems: 'flex-end' }}>
                                <Text className='p-price'><Text className='_money'>¥</Text>7999</Text>
                                <Text className='number'>x{2}</Text>
                            </View>
                        </View>
                        <View className='p-sku'>
                            {product?.sku.map(e => {
                                return (
                                    <Text key={e} className='p-sku-item'>{e}</Text>
                                )
                            })}
                        </View>
                    </View>

                </View> */}
            </View>
            <View className='info flex' >共{3}件商品，总金额<Text className='price'><Text className='_money'>&nbsp;¥</Text>7999</Text></View>
            <View className='btns flex'>
                <Button className='btn fc'>去支付</Button>
            </View>
        </View>

    )
});

export default ProductItem;
