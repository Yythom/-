/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { getStorageSync, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro';
import Search from '@/components/search/Search';
import './index.scss'
import isWeapp from '@/utils/env';
import ProductItem from './pruduct/ProductItem';


const Index = () => {
    const query = Taro.getCurrentInstance().router.params;
    const [pageData, setPageData] = useState([
        {
            product_id: '101',
            product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
            price: '7999',
            sale: 12,
            num: '2',
        },
        {
            product_id: '102',
            product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
            price: '7999',
            sale: 33,
            num: '2',
        },
        {
            product_id: '103',
            product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
            price: '7999',
            sale: 9,
            num: '2',
        },
    ]);
    usePullDownRefresh(() => {
        ///
        stopPullDownRefresh();
    })

    return (
        <View className='product-list-wrap' style={!isWeapp && { minHeight: window.innerHeight + 'px' }}  >
            <View className='fc search' style={{ width: '100vw' }}>
                <Search width='84vw' text='搜索商品' />
                <Text className='iconfont icon-dingdan'></Text>
            </View>
            <View className='fb screen'>
                <Text className='item'>综合</Text>
                <Text className='item'>销售</Text>
                <Text className='item'>价格</Text>
            </View>
            <View className='result-list' >
                {
                    pageData?.map((e, i) => <ProductItem
                        list={pageData}
                        key={e.product_id}
                        product={e}
                    />)
                }
            </View>
        </View>
    )
}
export default Index;
