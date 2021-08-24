/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, stopPullDownRefresh, usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { shallowEqual, useSelector } from 'react-redux';
import { systemInfo } from '@/common/publicFunc';
import usePaging from '../../../../hooks/usePaging';
import ProductService from '@/services/product';
import './index.scss'
import Tabs from '@/components/tabs/Tabs';

const order_type = [{
    title: '线上充值',
    type: '1',
}, {
    title: '后台充值',
    type: '2',
}, {
    title: '后台消费',
    type: '3',
}]

const Index = () => {
    const store = useSelector(_store => _store, shallowEqual);
    // const commonConfig = store.commonStore.themeConfig;
    // const query = Taro.getCurrentInstance().router.params;
    const [type, settype] = useState(order_type[0]);
    const [init, setInit] = useState(false);
    const [initHeight, setinitHeight] = useState(false);
    const [params, setParams] = useState({
        category_id: ''
    })
    const [result, no_more, list] = usePaging(params, ProductService.getProductListApi, init, () => {
        setinitHeight(!initHeight)
    })

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
        },
    ]);


    useEffect(() => {
        console.log('result', list);
    }, [result])

    const tabChange = (i) => {
        setInit(!init);
        setParams({ ...params, category_id: order_type[i].type });
    }

    return (
        <View className='card-order-list' style={{ paddingBottom: `calc(${systemInfo.safeArea.top / 2}px)` }} >
            <Tabs
                tag_list={order_type}
                onChange={tabChange}
                defaultIndex='0'
                padding='60'
                minHeight='calc(100vh - 80rpx)'
                initHeight={initHeight}
                isSticy
                top='0'
                notChildScroll
            // request={}
            // init={(_newList) => {
            //     // setContent(_newList?.list)
            // }}
            >
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
                                                <View className='fb info-item'>
                                                    <View>充值金额</View>
                                                    <View className='info-item-color'>¥{e.pay_price}</View>
                                                </View>
                                                <View className='fb info-item'>
                                                    <View>赠送金额</View>
                                                    <View className='info-item-color'>¥{e.giving_price}</View>
                                                </View>
                                                <View className='fb info-item'>
                                                    <View>实际到账</View>
                                                    <View className='info-item-color'>¥{e.price}</View>
                                                </View>
                                            </>
                                        }

                                        {
                                            type?.type == 2 && <>
                                                <View className='remake fb info-item'>
                                                    <View>充值备注</View>
                                                    <View className='info-item-color'>{e.price}</View>
                                                </View>
                                            </>
                                        }

                                        {
                                            type?.type == 3 && <>
                                                <View className='fb info-item'>
                                                    <View>消费金额</View>
                                                    <View className='info-item-color'>¥{e.price}</View>
                                                </View>
                                                <View className='remake fb info-item'>
                                                    <View>消费备注</View>
                                                    <View className='info-item-color'>¥{e.price}</View>
                                                </View>
                                            </>
                                        }




                                    </View>
                                </View>
                            )
                        })
                    }

                </View>
            </Tabs>


            {/* <View className='header flex' style={{ top: `${getStorageSync('navHeight')}px` }} >
                {
                    order_type.map(e => {
                        return (
                            <View key={e.text} className={`item  fc ${e == type && 'act-item'}`} onClick={() => {
                                setInit(!init);
                                settype(e)
                            }}
                            >
                                <View>{e.text}</View>
                                <View className={`${e == type && 'act-item-line'}`}></View>
                            </View>
                        )
                    })
                }
            </View> */}

        </View>
    )
}
export default Index;
