/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { getStorageSync, setStorageSync, stopPullDownRefresh, useDidShow, usePullDownRefresh } from '@tarojs/taro'
import { shallowEqual, useSelector } from 'react-redux';
import Tabs from '@/components/tabs/Tabs';
import TestService from '@/services/test';
import NavBar from '@/components/navbar/NavBar';
import { navLinkTo, systemInfo } from '@/common/publicFunc';
import OrderService from '@/services/order';
import ProductItem from './product-item/ProductItem';
import make_type from '../type';
import order_type from '../orderType';
import './index.scss'



const Index = () => {
    const userStore = useSelector(store => store, shallowEqual);
    const query = Taro.getCurrentInstance().router.params;

    const [tabinit, setTabInit] = useState(false);
    const [pageData, setPageData] = useState(null);
    const [flag, setFLag] = useState(false);

    const [params, setParams] = useState({
        // page: 1,
        delivery_type: query.delivery_type ? Number(query.delivery_type) : 1, // 送货方式
        status: '',
    })
    const [defaultIndex, setDefaultIndex] = useState(query.defaultIndex || '0')

    const tabList = useMemo(() => {
        if (params.delivery_type == make_type.DeliveryType.SELF_MENTION) {
            return [
                { title: '全部', status: '' },
                { title: '备货中', status: order_type.UserOrderStatus.READY },
                { title: '配送中', status: order_type.UserOrderStatus.DELIVERING },
                { title: '已完成', status: order_type.UserOrderStatus.FINISH },
                // { title: '退款', status: order_type.UserOrderStatus },
            ]
        } else {
            return [
                { title: '全部', status: '' },
                { title: '待付款', status: order_type.UserOrderStatus.INIT },
                { title: '备货中', status: order_type.UserOrderStatus.READY },
                { title: '待取货', status: order_type.UserOrderStatus.WAIT_MOTION },
                { title: '已完成', status: order_type.UserOrderStatus.FINISH },
            ]
        }
    }, [params?.delivery_type])

    useEffect(() => {
        tabChange(query.defaultIndex);
    }, [])

    const changeParams = async (key, value) => {
        let newParams = { ...params };
        newParams[key] = value;
        setParams(newParams);
    };

    const tabChange = (i) => {
        if (i) {
            changeParams('status', tabList[i].status)
        }
    };

    useEffect(() => {
        if (params) {
            OrderService.getOrderList({
                ...params
            }).then(res => {
                setPageData(res)
                console.log(res);
            })
            // const newObj = {
            //     "condition": {
            //         "with_order_detail": 1,
            //         "with_order_address": 1,
            //         "with_order_discount": 1,
            //         "with_order_code": 1,
            //         "with_order_fee": 1
            //     },
            //     "search": {
            //         "shop_id": '1',
            //         "user_status": "integer"
            //     },
            //     "sort": {
            //         "create_at": "string"
            //     },
            //     "page": {
            //         "all": "integer",
            //         "total": "integer",
            //         "page": "integer",
            //         "page_size": "integer"
            //     }
            // }
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
                <View className={`tab fc ${params.delivery_type == make_type.DeliveryType.DELIVERY && 'act-tab'}`}
                    onClick={() => {
                        setParams({
                            ...params,
                            delivery_type: make_type.DeliveryType.DELIVERY,
                            status: ''
                        })
                        setTabInit(!tabinit);
                        setDefaultIndex('0');
                    }}
                >
                    配送</View>
                <View className={`tab fc ${params.delivery_type == make_type.DeliveryType.SELF_MENTION && 'act-tab'}`}
                    onClick={() => {
                        setParams({
                            ...params,
                            delivery_type: make_type.DeliveryType.SELF_MENTION,
                            status: ''
                        })
                        setTabInit(!tabinit);
                        setDefaultIndex('0');
                    }}
                >
                    自提</View>
            </View>
            <Tabs
                className='order_tab'
                tag_list={tabList}
                onChange={tabChange}
                defaultIndex={defaultIndex}
                // maxHeight={'300rpx'}
                maxHeight={`calc(100vh - ${getStorageSync('navHeight') * 2}rpx - 204rpx - ${systemInfo.safeArea.top / 2}px)`}
                // scalc='1.5'
                initTabs={tabinit}
                isSticy
                top='0'
                // notChildScroll
                request={{
                    params: { ...params, page: 1 },
                    http: OrderService.getOrderList
                }}
                onScrollBottom={(_newList) => {
                    // setParams()
                    // setContent([...content, ..._newList?.list])
                }}
            // init={(_newList) => {
            //     setContent(_newList?.list)
            // }}
            >
                {
                    pageData && pageData.list.map(e => {
                        return (
                            <View
                                className='fc bg'
                                key={e.order_id + e.shop_name}
                                onClick={() => {
                                    setStorageSync('order_id_detail', e.order_id)
                                    navLinkTo('order/order-detail/index', {});
                                }}
                            >
                                <ProductItem order={e} />
                            </View>
                        )
                    })
                }
            </Tabs>
        </ScrollView >
    )
}
export default Index;
