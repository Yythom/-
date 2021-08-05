/* eslint-disable no-undef */
/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { getStorageSync, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'
import { shallowEqual, useSelector } from 'react-redux';
import Tabs from '@/components/tabs/Tabs';
import './index.scss'
import TestService from '@/services/test';
import ProductItem from './product-item/ProductItem';


const Index = () => {
    const userStore = useSelector(store => store, shallowEqual);
    const query = Taro.getCurrentInstance().router.params;

    const [tabinit, setTabInit] = useState(false);
    const [pageData, setPageData] = useState([
        {
            order_id: '101',
            products: [
                {
                    product_id: '101',
                    product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
                    price: '7999',
                    sku: ['银色', '64G', '套餐一'],
                    num: '2',
                },
                {
                    product_id: '102',
                    product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
                    price: '7999',
                    sku: ['银色', '64G', '套餐一'],
                    num: '2',
                },
            ]
        }, {
            order_id: '102',
            products: [
                {
                    product_id: '101',
                    product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
                    price: '7999',
                    sku: ['银色', '64G', '套餐一'],
                    num: '2',
                },
                {
                    product_id: '102',
                    product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
                    price: '7999',
                    sku: ['银色', '64G', '套餐一'],
                    num: '2',
                },
            ]
        }
    ]);

    const tabsList = [
        { title: '全部' },
        { title: '待支付' },
        { title: '待发货' },
        { title: '待收货' },
        { title: '待评价' },
    ]
    usePullDownRefresh(() => {
        ///
        stopPullDownRefresh();
    })

    const tabChange = () => {

    };


    return (
        <View className='order-list-wrap'  >
            <Tabs
                className='order_tab'
                tag_list={tabsList}
                onChange={tabChange}
                defaultIndex='2'
                // maxHeight={'300rpx'}
                // scalc='1.5'
                // initTabs={tabinit}
                isSticy
                top='0'
                notChildScroll
            // request={{
            //     params: {
            //         page: 1,
            //         // brand: tabsList[index]
            //         brand: '',
            //     },
            //     http: TestService.getTestList
            // }}
            // onScrollBottom={(_newList) => {
            //     setContent([...content, ..._newList?.list])
            // }}
            // init={(_newList) => {
            //     setContent(_newList?.list)
            // }}
            >
                {
                    pageData[0] && pageData.map(e => {
                        return (
                            <View
                                className='fc bg'
                                key={e.order_id + e.shop_name}
                            >
                                <ProductItem products={e.products} />
                            </View>
                        )
                    })
                }
            </Tabs>
        </View>
    )
}
export default Index;
