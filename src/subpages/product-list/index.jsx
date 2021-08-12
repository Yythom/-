/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from '@tarojs/components';
import Taro, { getStorageSync, setStorageSync, stopPullDownRefresh, useDidShow, usePullDownRefresh } from '@tarojs/taro';
import Search from '@/components/search/Search';
import Screen from '@/components/screen';
import { actions } from '../../../store';
import ProductItem from './pruduct/ProductItem';
import FilterSearch from './filter/filter';
import './index.scss'
import ProductService from '@/services/product';

const sortCate = [
    // {
    //     key: 'create_at',
    //     name: '时间'
    // },
    {
        key: 'discount_price',
        noMore: true,
        name: '价格'
    },
    // {
    //     key: 'sale',
    //     noMore: true,
    //     name: '销量'
    // },
]


const Index = () => {
    const query = Taro.getCurrentInstance().router.params;

    const [sort, setSort] = useState({
        value: '',
        index: '',
        sort: 0,
    });

    const [search, setSearch] = useState({
        keywords: ''
    })

    const [show, setShow] = useState(false)
    const [pageData, setPageData] = useState(null);

    const changeSearch = async (key, value) => {
        let newSearch = { ...search };
        newSearch[key] = value;
        setSearch(newSearch);
    };

    const init = async () => {
        // TODO:
        if (query?.search_text) changeSearch('keywords', decodeURIComponent(query.search_text || ''))
    };

    useDidShow(() => {
        init()
    });

    const findSearch = async (data) => {
        const res = await ProductService.getProductListApi({
            keywords: search.keywords,
            ...data
        })
        setPageData(res);
        console.log(res);
    }

    useEffect(() => {
        console.log(search, 'newSearch requese');
        if (search) {
            findSearch(search);
        }
    }, [search])

    usePullDownRefresh(() => {
        ///
        stopPullDownRefresh();
    })

    return (
        <View className='product-list-wrap' >
            <View className='fc search' style={{ width: '100vw' }}>
                <Search width='720rpx' value={search?.keywords} text='搜索商品' onBlur={(value) => {
                    // changeSearch('keywords', value);
                    // let log = getStorageSync('search-log') || []
                    // const $log = [value, ...log];
                    // setStorageSync('search-log', $log); // 添加新的历史
                }} />
                {/* <Text className='iconfont icon-dingdan' onClick={() => setShow(true)} /> */}
            </View>
            <Screen
                list={sortCate}
                onShow={(obj) => {
                    setSort({ sort, ...obj })
                }}
                onClick={(newObj) => {
                    changeSearch('sort', { ...newObj })
                    // setSearch({ ...search, ...newObj })
                }}
            />
            <ScrollView
                className='result-list'
                scrollY
                style={{ paddingBottom: `${getStorageSync('safeArea') * 2}rpx` }}
            >
                {
                    pageData?.list[0] ? pageData?.list.map((e, i) => <ProductItem
                        key={e.product_id}
                        product={e}
                    />) : <View className='empty fc' style={{ marginTop: '20rpx', color: '#666' }}>
                        暂无数据
                    </View>
                }
            </ScrollView>

            <FilterSearch show={show} setShow={setShow} search={search} onChange={changeSearch} />
        </View >
    )
}
export default Index;
