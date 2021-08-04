/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { View, ScrollView, Text } from '@tarojs/components';
import Taro, { getStorageSync, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro';
import Search from '@/components/search/Search';
import Screen from '@/components/screen';
import { actions } from '../../../store';
import ProductItem from './pruduct/ProductItem';
import FilterSearch from './filter/filter';
import './index.scss'

const sortCate = [
    {
        key: 'uni',
        name: '排序'
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

    const [sort, setSort] = useState({
        value: '',
        index: '',
        sort: 0,
    });

    const [search, setSearch] = useState({

    })

    const [show, setShow] = useState(true)
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
    ]);

    const changeSearch = async (key, value) => {
        let newSearch = { ...search };
        newSearch[key] = value;
        setSearch(newSearch);
        console.log(newSearch, 'newSearch');
    }
    usePullDownRefresh(() => {
        ///
        stopPullDownRefresh();
    })

    return (
        <View className='product-list-wrap' >
            <View className='fc search' style={{ width: '100vw' }}>
                <Search width='84vw' isEditor text='搜索商品' onBlur={(e) => {
                    console.log(e);
                }} />
                <Text className='iconfont icon-dingdan' onClick={() => setShow(true)} />
            </View>
            {/* <View className='fb screen'>
                {
                    sortCate.map((cate) => (
                        <Text key={cate.key} className='item'>{cate.name}<Text className='iconfont icon-unfold' /></Text>
                    ))
                }
            </View> */}
            <Screen
                index={sort.index}
                sort={sort.sort}
                list={sortCate}
                cbScreen={(obj) => {
                    changeSearch(sortCate[obj.index].key, obj.sort);
                    console.log(obj);
                    setSort({ sort, ...obj })
                }}
            />
            <ScrollView
                className='result-list'
                scrollY
                style={{ paddingBottom: `${getStorageSync('safeArea') * 2}rpx` }}
            >
                {
                    pageData?.map((e, i) => <ProductItem
                        list={pageData}
                        key={e.product_id}
                        product={e}
                    />)
                }
            </ScrollView>

            <FilterSearch show={show} setShow={setShow} search={search} onChange={changeSearch} />
        </View >
    )
}
export default Index;
