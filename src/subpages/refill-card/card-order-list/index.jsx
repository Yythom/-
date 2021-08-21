import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, stopPullDownRefresh, usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { shallowEqual, useSelector } from 'react-redux';
import { systemInfo } from '@/common/publicFunc';
import usePaging from '../../../../hooks/usePaging';
import ProductService from '@/services/product';
import './index.scss'

const order_type = [{
    text: '线上充值',
    type: 1,
}, {
    text: '后台充值',
    type: 2,
}, {
    text: '后台消费',
    type: 3,
}]

const Index = () => {
    const store = useSelector(_store => _store, shallowEqual);
    // const commonConfig = store.commonStore.themeConfig;
    // const query = Taro.getCurrentInstance().router.params;
    const [type, settype] = useState(null);
    const [result, no_more, list] = usePaging({}, ProductService.getProductListApi, type)

    const [_list, setlist] = useState([
        {
            order_id: '101',
            msg: '失败',
            date: '2020-01-23',
            price: '105',
            pay_price: '100',
            giving_price: '5',
        }, {
            order_id: '101',
            msg: '失败',
            date: '2020-01-23',
            price: '105',
            pay_price: '100',
            giving_price: '5',
        }, {
            order_id: '101',
            msg: '失败',
            date: '2020-01-23',
            price: '105',
            pay_price: '100',
            giving_price: '5',
        }, {
            order_id: '101',
            msg: '失败',
            date: '2020-01-23',
            price: '105',
            pay_price: '100',
            giving_price: '5',
        }, {
            order_id: '101',
            msg: '失败',
            date: '2020-01-23',
            price: '105',
            pay_price: '100',
            giving_price: '5',
        }, {
            order_id: '101',
            msg: '失败',
            date: '2020-01-23',
            price: '105',
            pay_price: '100',
            giving_price: '5',
        }, {
            order_id: '101',
            msg: '失败',
            date: '2020-01-23',
            price: '105',
            pay_price: '100',
            giving_price: '5',
        }
    ]);

    const init = async () => {
        stopPullDownRefresh();
    }
    useEffect(() => {
        console.log(result);
    }, [result])

    usePullDownRefresh(() => {
        ///

    })

    return (
        <View className='card-order-list' style={{ paddingBottom: `calc(${systemInfo.safeArea.top / 2}px)` }} >
            <NavBar back title='储值卡订单' />
            <View className='header flex' style={{ top: `${getStorageSync('navHeight')}px` }} >
                {
                    order_type.map(e => {
                        return (
                            <View key={e.text} className={`item  fc ${e == type && 'act-item'}`} onClick={() => settype(e)} >
                                {e.text}
                            </View>
                        )
                    })
                }
            </View>
            <View className='list'>
                {
                    _list.map(e => {
                        return (
                            <View className='item' key={e.order_id}>
                                <View className='title fb'>
                                    <Text className='date'>下单时间：{e.date}</Text>
                                    <Text className={`msg ${e.msg === '失败' && 'fail_msg'}`}>失败</Text>
                                </View>
                                <View className='info fd'>
                                    {
                                        type?.type !== 3 && <>
                                            <Text>充值金额：¥{e.pay_price}</Text>
                                            <Text>赠送金额：¥{e.giving_price}</Text>
                                            <Text>实际到账：¥{e.price}</Text>
                                        </>
                                    }

                                    {
                                        type?.type == 2 && <>
                                            <Text className='remake'>充值备注：{e.price}</Text>
                                        </>
                                    }

                                    {
                                        type?.type == 3 && <>
                                            <Text>消费金额：¥{e.price}</Text>
                                            <Text className='remake'>消费备注：{e.price}</Text>
                                        </>
                                    }




                                </View>
                            </View>
                        )
                    })
                }

            </View>
        </View>
    )
}
export default Index;
