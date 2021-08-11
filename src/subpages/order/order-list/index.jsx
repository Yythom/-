/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { getStorageSync, stopPullDownRefresh, useDidShow, usePullDownRefresh } from '@tarojs/taro'
import { shallowEqual, useSelector } from 'react-redux';
import Tabs from '@/components/tabs/Tabs';
import './index.scss'
import TestService from '@/services/test';
import ProductItem from './product-item/ProductItem';
import NavBar from '@/components/navbar/NavBar';
import { systemInfo } from '@/common/publicFunc';

const tabsList = [
    { title: '全部', status: '' },
    { title: '待付款', status: '1' },
    { title: '待发货', status: '2' },
    { title: '已发货', status: '3' },
    { title: '已完成', status: '4' },
]
const tabs_use = [
    { title: '全部', status: '' },
    { title: '待付款', status: '1' },
    { title: '待取货', status: '2' },
    { title: '已完成', status: '4' },
]

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
            ]
        }
    ]);
    const [flag, setFLag] = useState(false);

    const [params, setParams] = useState({
        // page: 1,
        delivery_type: query.delivery_type || 0, // 送货方式
        status: '1'
    })
    const [defaultIndex, setDefaultIndex] = useState(query.defaultIndex || '0')
    const [load, setload] = useState(false)

    useEffect(() => {
        tabChange(query.defaultIndex);
    }, [])

    const tabChange = (i) => {
        if (params?.delivery_type != 1) setParams({ ...params, status: tabsList[i].status })
        else setParams({ ...params, status: tabs_use[i].status });
    };

    useEffect(() => {
        if (params) {
            console.log(params, '。。。。。。数据改变重新请求列表');
        }
    }, [params])

    return (
        <ScrollView
            refresherEnabled
            refresherTriggered={flag}
            onRefresherRefresh={() => {
                setFLag(true)
                setTimeout(() => {
                    setFLag(false)
                }, 1000);
            }}
            scrollY
            className='order-list-wrap'
        >
            <NavBar back title='订单' color='#fff' iconColor='#fff' background='linear-gradient(360deg, #FF8C48 0%, #FF6631 100%)' />
            <View className='deliveryMethod flex'>
                <View className={`tab fc ${params.delivery_type == 0 && 'act-tab'}`}
                    onClick={() => {
                        setParams({ ...params, delivery_type: 0 }); setTabInit(!tabinit); setDefaultIndex('0')
                    }}
                >
                    配送</View>
                <View className={`tab fc ${params.delivery_type == 1 && 'act-tab'}`}
                    onClick={() => {
                        setParams({ ...params, delivery_type: 1 }); setTabInit(!tabinit); setDefaultIndex('0')
                    }}
                >
                    自提</View>
            </View>
            <Tabs
                className='order_tab'
                tag_list={params?.delivery_type != 1 ? tabsList : tabs_use}
                onChange={tabChange}
                defaultIndex={defaultIndex}
                // maxHeight={'300rpx'}
                maxHeight={`calc(100vh - ${getStorageSync('navHeight') * 2}rpx - 204rpx - ${systemInfo.safeArea.top / 2}px)`}
                // scalc='1.5'
                initTabs={tabinit}
                isSticy
                top='0'
                // notChildScroll
                // request={{
                //     params: { ...params, page: 1 },
                //     http: TestService.getTestList
                // }}
                onScrollBottom={(_newList) => {
                    // setParams()
                    // setContent([...content, ..._newList?.list])
                }}
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
        </ScrollView>
    )
}
export default Index;
