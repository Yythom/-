/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import Taro, { getStorageSync, useDidShow, useReachBottom } from '@tarojs/taro';
import { View, Button, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import Banner from '@/components/page/banner/Banner';
import NavBar from '@/components/navbar/NavBar';
import Search from '@/components/search/Search';
import Notice from '@/components/notice/Notice';
import BlurImg from '@/components/blur-img/BlurImg';
import { shallowEqual, useSelector } from 'react-redux';
import { navLinkTo, systemInfo } from '@/common/publicFunc';

import Tabs from '@/components/tabs/Tabs';
import FloatBottom from '@/components/float/FloatBottom';
import Skuhooks from '@/components/page/sku-hook/sku-hooks';
import { data, onlineData } from '../../../hooks/sku-utils/data';
import filter_data from '../../../hooks/sku-utils/data_filter';

// import useCountdown from '../../../hooks/useCountDown';
import Types from './types/types';
import Seconds from './seconds-kill/Seconds';
import './index.scss';
import ProductService from '@/services/product';

function Index() {
    const store = useSelector(_store => _store, shallowEqual);
    const commonConfig = store.commonStore.themeConfig;
    const [show, setShow] = useState(false);
    const [skuData, setSkuData] = useState(null);
    // const [countdown, setTargetDate, formattedRes] = useCountdown(
    //     {
    //         targetDate: '2021-08-31 24:00:00',
    //         interval: 1000,
    //         onEnd: () => { console.log('end'); }
    //     }
    // );
    // const { days, hours, minutes, seconds, milliseconds } = formattedRes;

    // console.log(formattedRes);

    const [tabIndex, setTabIndex] = useState(0);
    const [list, setList] = useState([
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
        {
            product_id: '104',
            product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
            price: '7999',
            sku: ['银色', '64G', '套餐一'],
            num: '2',
        },

        {
            product_id: '105',
            product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
            price: '7999',
            sku: ['银色', '64G', '套餐一'],
            num: '2',
        },
    ]);
    const [types, setTypes] = useState([
        {
            type: '9.9包邮',
            name: '9.9',
        },
        {
            type: '1元拼团',
            name: '1元',
        },
        {
            type: '拼刀刀爆品',
            name: '拼',
        },
        {
            type: '京东超市',
            name: '京',
        },
        {
            type: '唯品会',
            name: '唯',
        },
    ]);
    useDidShow(() => {
        Taro.showShareMenu();
        console.log(commonConfig);
    })
    useReachBottom(() => {
        console.log('doiddd');
    });

    const tabChange = async () => {

    }
    const showSku = async () => {
        const res = await ProductService.getProductDataApi();
        setSkuData({ ...filter_data(res) })
        // setSkuData({ ...filter_data(onlineData) }) // 测试数据
        setTimeout(() => {
            setShow(1);
        }, 100);
    }

    return (
        <View className='index-wrap index' >
            {/* <NavBar title='首页' /> */}
            <View className='fc search'>
                <Search width='720rpx' text='搜索更多优惠商品' />
            </View>


            <Banner list={[]} w='100vw' className='index-banner' custom />
            {/* <Notice isShow content='当前为演示商城,当前为演示商城,当前为演示商城,当前为演示商城' background='rgb(255, 240, 217)' color='rgb(226, 150, 63)' /> */}
            {/* <Types list={types} /> */}

            {/* <Banner w='720rpx' className='recommended' custom /> */}

            {/* 秒杀 */}
            {/* <Seconds data={{}} /> */}

            <Tabs
                tag_list={[
                    { title: '鲜花' },
                    { title: '蛋糕' },
                    { title: '咖啡' },
                    { title: '奶茶' },
                    { title: '果汁' },
                    { title: '可乐' },
                    { title: '香饽饽' },
                ]}
                onChange={tabChange}
                defaultIndex='2'
                padding='60'
                isSticy
                notChildScroll
                request={{
                    // params: {
                    //     page: 1,
                    //     // brand: tabsList[index]
                    //     brand: '',
                    // },
                    // http: TestService.getTestList
                }}
                init={(_newList) => {
                    // setContent(_newList?.list)
                }}
            >
                <View className='pro-list fb'>
                    {
                        list.map((e, i) => {
                            return (
                                <View key={e.product_id} className='pro-item fd' onClick={() => navLinkTo('product-detail/index', {})}>
                                    <BlurImg className='img' mode='heightFix' src='https://img2.baidu.com/it/u=1336119765,2231343437&fm=26&fmt=auto&gp=0.jpg' />
                                    {/* <Image mode='heightFix' /> */}
                                    <View className='p-name'>
                                        {e.product_name}
                                    </View>
                                    <View className='price'>
                                        <Text style={{ fontWeight: 'bold' }}>
                                            <Text className='_money'>¥</Text>7888
                                        </Text>
                                    </View>
                                    <View className='foot'>
                                        <View className='vip-price fc'>
                                            会员价格 <Text className='_money'>¥</Text>120
                                        </View>
                                        <View className='show-sku' onClick={(event) => {
                                            event.stopPropagation();
                                            showSku()
                                        }}
                                        >+</View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </Tabs>

            {/* sku弹框 */}

            <Skuhooks
                show={show}
                setShow={setShow}
                product={skuData}
            />

        </View>
    )
}
export default Index