/* eslint-disable react/jsx-indent-props */
import React, { memo, useEffect, useState } from 'react';
import { View, Text, Radio } from '@tarojs/components';
import Taro, { getStorageSync, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'
import BlurImg from '@/components/blur-img/BlurImg';
import HandleInput from '@/components/page/handle-input/HandleInput';
import { navLinkTo } from '@/common/publicFunc';
import Move from './MoveSquare/move';
import isWeapp from '@/utils/env';


const ProductItem = memo(({
    product,
    onChange = Function.prototype,
    list,
    index,
    onChangeNumber = Function.prototype
}) => {
    return (
        <Move value={80} padding={16}>
            <View className='card flex' style={{ marginBottom: '0.2rem' }}>
                <View className='check fc'
                    onClick={() => {
                        const newList = JSON.parse(JSON.stringify(list));
                        newList[index].checked = !newList[index].checked;
                        let filter = JSON.parse(JSON.stringify(newList)).filter(item => {
                            return item.checked
                        })
                        onChange(newList, filter);
                    }}
                >
                    <Radio className='radio' color='#eb472b' checked={product?.checked} />
                </View>
                <View className='product flex' onClick={(e) => { navLinkTo('product-detail/index', { product_id: product.product_id }); e.stopPropagation(); }}>
                    <BlurImg className='img' src='https://img2.baidu.com/it/u=1336119765,2231343437&fm=26&fmt=auto&gp=0.jpg' />
                    <View className='desc fd'>
                        <Text className='p-name'>{product?.product_name}</Text>
                        <View className='p-sku'>
                            {product?.sku.map(e => {
                                return (
                                    <Text key={e} className='p-sku-item'>{e}</Text>
                                )
                            })}
                        </View>
                        <View className='p-num fb'>
                            <Text className='p-price price-color'><Text className='_money'>¥</Text>{product?.price}</Text>
                            <HandleInput
                                num={product.num}
                                onChange={(value) => {
                                    // console.log(value);
                                    // if (num > value ) { // 减
                                    //     return
                                    // }
                                    // if (num < value) { // 加

                                    // }
                                    // onChangeNumber()
                                    onChangeNumber(value)
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
