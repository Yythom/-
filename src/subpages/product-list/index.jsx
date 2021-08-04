/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { View, ScrollView, Text } from '@tarojs/components';
import Taro, { getStorageSync, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro';
import Search from '@/components/search/Search';
import Screen from '@/components/screen';
import isWeapp from '@/utils/env';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { actions } from '../../../store';
import ProductItem from './pruduct/ProductItem';
import './index.scss'



const sortCate = [
    {
        key: 'uni',
        name: '综合排序'
    },
    {
        key: 'sale',
        name: '销量'
    },
    {
        key: 'price',
        name: '价格'
    },
]


const Index = () => {
    const query = Taro.getCurrentInstance().router.params;
    const dispatch = useDispatch();

    // const {

    // } = actions;

    const {
        // search
    } = useSelector(e => e.productSlice, shallowEqual);

    const [pageData, setPageData] = useState([
        {
            product_id: '101',
            product_name: '官方直降Apple/苹果 Apple/苹果',
            price: '7999',
            member_price: '6999',
            sale: 12,
            num: '2',
            tags: [
                {
                    id: 1,
                    name: '20元券',
                },
                {
                    id: 1,
                    name: '补贴￥3元',
                },
            ]
        },
        {
            product_id: '102',
            product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
            price: '7999',
            member_price: '6999',
            sale: 33,
            num: '2',
            tags: [
                {
                    id: 1,
                    name: '20元券',
                },
                {
                    id: 1,
                    name: '补贴￥3元',
                },
            ]
        },
        {
            product_id: '103',
            product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
            price: '7999',
            member_price: '6999',
            sale: 9,
            num: '2',
            tags: [
                {
                    id: 1,
                    name: '20元券',
                },
                {
                    id: 1,
                    name: '补贴￥3元',
                },
            ]
        },
        {
            product_id: '101',
            product_name: '官方直降Apple/苹果 Apple/苹果',
            price: '7999',
            member_price: '6999',
            sale: 12,
            num: '2',
            tags: [
                {
                    id: 1,
                    name: '20元券',
                },
                {
                    id: 1,
                    name: '补贴￥3元',
                },
            ]
        },
        {
            product_id: '102',
            product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
            price: '7999',
            member_price: '6999',
            sale: 33,
            num: '2',
            tags: [
                {
                    id: 1,
                    name: '20元券',
                },
                {
                    id: 1,
                    name: '补贴￥3元',
                },
            ]
        },
        {
            product_id: '103',
            product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
            price: '7999',
            member_price: '6999',
            sale: 9,
            num: '2',
            tags: [
                {
                    id: 1,
                    name: '20元券',
                },
                {
                    id: 1,
                    name: '补贴￥3元',
                },
            ]
        },
        {
            product_id: '101',
            product_name: '官方直降Apple/苹果 Apple/苹果',
            price: '7999',
            member_price: '6999',
            sale: 12,
            num: '2',
            tags: [
                {
                    id: 1,
                    name: '20元券',
                },
                {
                    id: 1,
                    name: '补贴￥3元',
                },
            ]
        },
        {
            product_id: '102',
            product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
            price: '7999',
            member_price: '6999',
            sale: 33,
            num: '2',
            tags: [
                {
                    id: 1,
                    name: '20元券',
                },
                {
                    id: 1,
                    name: '补贴￥3元',
                },
            ]
        },
        {
            product_id: '103',
            product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
            price: '7999',
            member_price: '6999',
            sale: 9,
            num: '2',
            tags: [
                {
                    id: 1,
                    name: '20元券',
                },
                {
                    id: 1,
                    name: '补贴￥3元',
                },
            ]
        },
    ]);
    const [search, setSearch] = useState({
        value: '',
        index: 0,
        sort: 1
    });

    usePullDownRefresh(() => {
        ///
        stopPullDownRefresh();
    })

    return (
        <View className='product-list-wrap' style={!isWeapp && { minHeight: window.innerHeight + 'px' }}  >
            <View className='fc search' style={{ width: '100vw' }}>
                <Search width='96vw' text='搜索商品' />
                {/* <Text className='iconfont icon-dingdan'></Text> */}
            </View>
            {/* <View className='fb screen'>
                {
                    sortCate.map((cate) => (
                        <Text key={cate.key} className='item'>{cate.name}<Text className='iconfont icon-unfold' /></Text>
                    ))
                }
            </View> */}
            <Screen
                index={search.index}
                sort={search.sort}
                list={sortCate}
                cbScreen={(obj) => {
                    console.log(obj)
                    setSearch({ search, ...obj })
                }}
            />
            <ScrollView
                className='result-list'
                scrollY
                style={{ paddingBottom: `${getStorageSync('safeArea') * 2}rpx` }}
            // style={{ height: '100%' }}
            >
                {
                    pageData?.map((e, i) => <ProductItem
                        list={pageData}
                        key={e.product_id}
                        product={e}
                    />)
                }
            </ScrollView>
        </View>
    )
}
export default Index;
