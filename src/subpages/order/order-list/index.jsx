/* eslint-disable no-undef */
/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { getStorageSync, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'
import { shallowEqual, useSelector } from 'react-redux';
import Tabs from '@/components/tabs/Tabs';
import './index.scss'
import TestService from '@/services/test';
import ProductItem from './ProductItem';
import { lkGetUserInfo } from '@/common/publicFunc';


const Index = () => {
    const userStore = useSelector(store => store, shallowEqual);
    const query = Taro.getCurrentInstance().router.params;

    const [tabinit, setTabInit] = useState(false);
    const [content, setContent] = useState([
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
        {
            product_id: '103',
            product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
            price: '7999',
            sku: ['银色', '64G', '套餐一'],
            num: '2',
        },
    ]);

    const tabsList = [
        { title: '全部' },
        { title: '待支付' },
        { title: '待发货' },
        { title: '待收货' },
        { title: '待评价' },
    ]
    Taro.useDidShow(() => {
        Taro.showShareMenu();
    })
    Taro.useShareAppMessage(res => {
        console.log(res, 'res');
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }

        // return {
        //     title: '自定义转发标题',
        //     path: '/page/user?id=123'
        // }
    })
    usePullDownRefresh(() => {
        ///
        stopPullDownRefresh();
    })

    const tabChange = () => {

    };


    return (
        <View className='order-list-wrap'  >
            <Tabs
                tag_list={tabsList}
                onChange={tabChange}
                defaultIndex='2'
                // maxHeight={'300rpx'}
                isRefresh
                scalc='1.5'
                initTabs={tabinit}
                notChildScroll
                request={{
                    params: {
                        page: 1,
                        // brand: tabsList[index]
                        brand: '',
                    },
                    http: TestService.getTestList
                }}
                onScrollBottom={(_newList) => {
                    setContent([...content, ..._newList?.list])
                }}
                init={(_newList) => {
                    setContent(_newList?.list)
                }}
            >
                {
                    content[0] && content.map(e => {
                        return (
                            <View
                                className='fc bg'
                                key={e.shop_id + e.shop_name}
                            >
                                <ProductItem product={e} />
                            </View>
                        )
                    })
                }

            </Tabs>
        </View>
    )
}
export default Index;
