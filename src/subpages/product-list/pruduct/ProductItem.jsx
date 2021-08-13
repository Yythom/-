/* eslint-disable react/jsx-indent-props */
import React, { memo, useEffect, useState } from 'react';
import { View, Text, Radio } from '@tarojs/components';
import BlurImg from '@/components/blur-img/BlurImg';
import { navLinkTo } from '@/common/publicFunc';
import np from 'number-precision';
import './ProductItem.scss';

const ProductItem = memo(({ product, }) => {
    return (
        <View className='product-item card flex'>
            <View className='product flex' onClick={(e) => { navLinkTo('product-detail/index', { product_id: product.product_id }); e.stopPropagation(); }}>
                <BlurImg className='img' src={product.cover} />
                <View className='desc p-desc'>
                    <Text className='p-name'>{product?.product_name}</Text>
                    <View className='p-tag-wrap flex'>
                        {
                            product?.tags.map((tag, i) => (
                                <View className='desc-item ' key={tag.name + i}>{tag.name}</View>
                            ))
                        }
                    </View>

                    <View className='p-num fb'>
                        <View className='price-box flex'>
                            <Text className='price'><Text className='_money'>¥</Text>{product?.discount_price + '起'}</Text>
                            {/* <Text className='del'><Text className='_money'>¥</Text>{product?.market_price}</Text> */}
                            <View className='vip-price' ><Text className='_money'>¥</Text>{product?.member_price + '起'}</View>
                        </View>

                        {/* <View className='sale'>
                            已售{'TODO:'}件
                        </View> */}
                    </View>
                </View>
            </View>
        </View>
    )
});

export default ProductItem;
