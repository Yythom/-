/* eslint-disable react/jsx-indent-props */
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { getStorageSync, removeStorageSync, setStorageSync, showToast, stopPullDownRefresh, useDidShow, usePullDownRefresh, useReachBottom } from '@tarojs/taro'
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
import usePaging from '../../../../hooks/usePaging';

const Index = () => {
    const userStore = useSelector(store => store, shallowEqual);
    const query = Taro.getCurrentInstance().router.params;

    const [tabinit, setTabInit] = useState(false);
    const [initHeight, setinitHeight] = useState(false);

    const [params, setParams] = useState({
        // page: 1,
        delivery_type: query.delivery_type ? Number(query.delivery_type) : make_type.DeliveryType.DELIVERY,  // 送货方式
        status: '',
    })
    const [init, setInit] = useState(false);

    const [result, no_more, __list] = usePaging(params, OrderService.getOrderList, init, () => {
        setinitHeight(!initHeight);
        if (getStorageSync('order-handle')) removeStorageSync('order-handle');
    })

    const [defaultIndex, setDefaultIndex] = useState(query.defaultIndex || '0')

    const tabList = useMemo(() => {
        if (params.delivery_type == make_type.DeliveryType.SELF_MENTION) {
            return [
                { title: '全部', status: '' },
                { title: '备货中', status: order_type.UserOrderStatus.READY },
                { title: '待取货', status: order_type.UserOrderStatus.WAIT_MOTION },
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


    const changeParams = async (key, value) => {
        let newParams = { ...params };
        newParams[key] = value;
        setParams(newParams);
        // console.log(newParams, 'newParamsnewParamsnewParams');
    };

    const tabChange = (i) => {
        if (!isNaN(i)) {
            // setPageData(null)
            setInit(!init)
            changeParams('status', tabList[i].status)
        }
    };

    useLayoutEffect(() => {
        tabChange(query.defaultIndex);
    }, [])

    const changeMethod = (delivery_type) => {
        setParams({
            ...params,
            delivery_type,
            status: ''
        })
        setInit(!init);
        setTabInit(!tabinit);
        setDefaultIndex('0');
    }
    useDidShow(() => {
        if (getStorageSync('order-handle')) {
            setInit(!init);
        }
        setinitHeight(!initHeight);
    })

    return (
        <View
            // scrollY
            className='order-list-wrap'
        >
            <View className='' style={{ position: 'sticky', top: '0', zIndex: '3' }}>
                <NavBar back title='订单' color='#fff' iconColor='#fff' background='#00D0BF' />
                <View className='deliveryMethod flex'>
                    <View className={`tab fc ${params.delivery_type == make_type.DeliveryType.DELIVERY && 'act-tab'}`}
                        onClick={() => { changeMethod(make_type.DeliveryType.DELIVERY,) }}
                    >
                        配送</View>
                    <View className={`tab fc ${params.delivery_type == make_type.DeliveryType.SELF_MENTION && 'act-tab'}`}
                        onClick={() => { changeMethod(make_type.DeliveryType.SELF_MENTION); }}
                    >
                        自提</View>
                </View>
            </View>
            <Tabs
                className='order_tab'
                tag_list={tabList}
                onChange={tabChange}
                defaultIndex={defaultIndex}
                notChildScroll
                // maxHeight={`calc(100vh - ${getStorageSync('navHeight') * 2}rpx - 204rpx - ${systemInfo.safeArea.top / 2}px)`}
                initTabs={tabinit}
                initHeight={initHeight}
                isRefresh
                isSticy
                top={`calc(${getStorageSync('navHeight')}px + 90rpx)`}
            >
                {
                    __list && (
                        __list[0] ? __list.map(e => {
                            return (
                                <View
                                    className='fc bg'
                                    key={e.order_id + e.shop_name}
                                    onClick={() => {
                                        setStorageSync('order_id_detail', e.order_id)
                                        navLinkTo('order/order-detail/index', {});
                                    }}
                                >
                                    <ProductItem order={e} getList={() => {
                                        setInit(!init)
                                    }} />
                                </View>
                            )
                        }) : <View className='empty fc'>
                            暂无数据
                        </View>
                    )
                }
            </Tabs>
        </View >
    )
}
export default Index;
