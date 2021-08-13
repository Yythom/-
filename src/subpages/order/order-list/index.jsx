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

const Index = () => {
    const userStore = useSelector(store => store, shallowEqual);
    const query = Taro.getCurrentInstance().router.params;

    const [tabinit, setTabInit] = useState(false);
    const [initHeight, setinitHeight] = useState(false);
    const [pageData, setPageData] = useState(null);

    const [page, setPage] = useState(1);
    const [params, setParams] = useState({
        // page: 1,
        delivery_type: query.delivery_type ? Number(query.delivery_type) : make_type.DeliveryType.DELIVERY, // 送货方式
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


    const changeParams = async (key, value) => {
        let newParams = { ...params };
        newParams[key] = value;
        // console.log(newParams, 'newParamsnewParamsnewParams');
        setParams(newParams);
    };

    const tabChange = (i) => {
        if (!isNaN(i)) {
            setPageData(null)
            changeParams('status', tabList[i].status)
        }
    };

    const getList = useCallback(async (data, _page,) => {
        const _data = data || params
        const res = await OrderService.getOrderList({ ..._data, page: _page })
        if (res) {
            setLoad(true)
            setTimeout(() => {
                removeStorageSync('order-status-index')
                removeStorageSync('top');
            }, 200);

            if (_page) {
                if (!res.list[0]) {
                    showToast({ title: '没有更多', icon: 'none' });
                    return
                }
                setPage(_page);
                setPageData({ ...pageData, list: [...pageData.list, ...res.list] });

            } else {
                setPage(1);
                setPageData(res);
            }
            setinitHeight(!initHeight)
        }
    }, [pageData, initHeight, params]) // 不需要依赖更新



    const [load, setLoad] = useState(false)

    useLayoutEffect(() => {
        tabChange(query.defaultIndex)
    }, [])


    useDidShow(() => {
        load && getList(params)
    })

    useEffect(() => {
        if (params) {
            getList(params);
        }
        console.log(params, '。。。。。。数据改变重新请求列表');
    }, [params])


    useReachBottom(() => {
        console.log(page + 1, '到底了');
        getList(params, page + 1);
    })

    return (
        <View
            // scrollY
            className='order-list-wrap'
        >
            <View className='' style={{ position: 'sticky', top: '0', zIndex: '2' }}>
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
            </View>
            <Tabs
                className='order_tab'
                tag_list={tabList}
                onChange={tabChange}
                defaultIndex={defaultIndex}
                notChildScroll
                // maxHeight={'300rpx'}
                // maxHeight={`calc(100vh - ${getStorageSync('navHeight') * 2}rpx - 204rpx - ${systemInfo.safeArea.top / 2}px)`}
                initTabs={tabinit}
                initHeight={initHeight}
                isRefresh
                isSticy
                top={`calc(${getStorageSync('navHeight')}px + 94rpx)`}
            // request={{
            //     params: { ...params, page: 1 },
            //     http: OrderService.getOrderList
            // }}
            // onScrollBottom={(_newList) => {
            //     if (_newList) {
            //         setPageData({ ...pageData, list: [...pageData.list, ..._newList.list] })
            //     }
            // }}
            // init={(_newList) => {
            //     if (_newList) {
            //         setPageData({ ...pageData, list: _newList.list })
            //     }
            // }}
            >
                {
                    pageData && (
                        pageData.list[0] ? pageData.list.map(e => {
                            return (
                                <View
                                    className='fc bg'
                                    key={e.order_id + e.shop_name}
                                    onClick={() => {
                                        setStorageSync('order_id_detail', e.order_id)
                                        navLinkTo('order/order-detail/index', {});
                                    }}
                                >
                                    <ProductItem order={e} getList={getList} />
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
