/* eslint-disable react/jsx-indent-props */
import React, { memo, useEffect, useState } from 'react';
import { View, Text, Radio } from '@tarojs/components';
import BlurImg from '@/components/blur-img/BlurImg';
import { navLinkTo } from '@/common/publicFunc';
import './ProductItem.scss';

const ProductItem = memo(({ product, onChange = Function.prototype, list, index, onChangeNumber = Function.prototype }) => {
    return (
        <View className='product-item card flex'>
            <View className='product flex' onClick={(e) => { navLinkTo('product-detail/index', { product_id: product.product_id }); e.stopPropagation(); }}>
                <BlurImg className='img' src='https://img2.baidu.com/it/u=1336119765,2231343437&fm=26&fmt=auto&gp=0.jpg' />
                <View className='desc p-desc'>
                    <Text className='p-name'>{product?.product_name}</Text>
                    <View className='p-tag-wrap flex'>
                        {
                            product?.tags.map((tag) => (
                                <View className='p-tag' key={tag.id}>{tag.name}</View>
                            ))
                        }
                    </View>
                    <View className='p-sku'>
                        已售{product.sale}件
                    </View>
                    <View className='p-num'>
                        <Text className='p-price price-color'><Text className='_money'>¥</Text>{product?.price}</Text>
                        <View className='p-member-price'>会员价格 <Text className='_money'>¥</Text>{product?.member_price}</View>
                    </View>
                </View>
            </View>
        </View>
    )
});

export default ProductItem;
