/* eslint-disable react/jsx-indent-props */
import React, { memo, useEffect, useMemo, useState } from 'react';
import { View, Text, Radio } from '@tarojs/components';
import Taro, { getStorageSync, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro';
import BlurImg from '@/components/blur-img/BlurImg';
import HandleInput from '@/components/page/sku/handle-input/HandleInput';
import { navLinkTo } from '@/common/publicFunc';
import Move from './MoveSquare/move';


const ProductItem = memo(({
    product,
    list,
    index,
    shop_id,
    onChange = Function.prototype,
    onChangeNumber = Function.prototype
}) => {

    const handle = (type, value) => {
        const newList = JSON.parse(JSON.stringify(list));
        const shopIndex = newList.findIndex(e => e.shop_id == shop_id);
        let shop = newList[shopIndex]       // 查找到某个店铺
        let item = shop.products[index];  // 查找到某个店铺下的该商品
        switch (type) {
            case 'delete':
                shop.products.splice(index, 1);
                break;
            case 'number':
                item.num = value; // 修改当前商品选择状态
                onChangeNumber(newList);
                break;
            case 'check':
                item.checked = !item.checked; // 修改当前商品选择状态
                break;
        }
        type !== 'number' && onChange(newList)
    }

    return (
        <Move value={80} padding={16} onClick={() => { handle('delete') }}  >
            <View className='card flex' style={{ marginBottom: '0.2rem' }}>
                <View className='check fc'
                    onClick={() => { handle('check') }}
                >
                    <Radio className='radio' color='#eb472b' checked={product.checked} />
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
                                    handle('number', value)
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
