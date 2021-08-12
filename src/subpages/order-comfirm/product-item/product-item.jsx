/* eslint-disable react/jsx-indent-props */
import React, { memo } from "react";
import { Text, View } from "@tarojs/components";
import { navLinkTo } from "@/common/publicFunc";
import BlurImg from "@/components/blur-img/BlurImg";
import np from 'number-precision'
import './product.scss'

const ProductItem = memo(({
    pageData,
}) => {
    return (
        <View className='pruduct_wrap'>
            {/* <View className='shop_name' onClick={() => navLinkTo('/subpages/online_shop_product_list/index', { shop_id: pageData?.shop_id })}><Text className='iconfont icon-shangpu' />{pageData?.shop_name} <Text className='iconfont icon-right' style={{ color: '#999', fontSize: '32rpx' }}></Text></View> */}
            {
                (pageData && pageData.product.length > 0) && pageData.product.map(e => {
                    return <View key={e.product_id + '__product'} className='product_item'>
                        <BlurImg className='img' src={e.image} />
                        <View className='center fd'>
                            <View className='product_name'>{e.product_name}</View>
                            <View className='desc'>
                                <View className='product_sku'>{e.spec}</View>
                                <View className='price fb'>
                                    <View className='flex'>
                                        <View className='new price'>
                                            <Text className='_money'>¥</Text>{
                                                e.member_price ? np.times(e?.member_price, 0.01)
                                                    : np.times(e?.discount_price, 0.01)
                                            }
                                        </View>
                                        <View className='del'>
                                            <Text className='_money'>¥</Text>{np.times(e?.market_price || 0, 0.01)}
                                        </View>
                                    </View>
                                    <View className='num'>x{e.product_count}</View>
                                </View>
                            </View>
                        </View>
                    </View>
                })
            }
            {/* <View className='fb'>
                <View className='left'>商品金额</View>
                <View className='right'>¥{pageData?.product_price}</View>
            </View>
            <View className='fb'>
                <View className='left'>运费</View>
                <View className='right'>¥{pageData?.freight}</View>
            </View> */}
        </View >
    )
})

export default ProductItem;