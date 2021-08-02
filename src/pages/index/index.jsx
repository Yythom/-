import React, { useState } from 'react';
import Taro, { getStorageSync, useDidShow, useReachBottom } from '@tarojs/taro';
import { View, Button, Text, Image } from '@tarojs/components';
import Banner from '@/components/page/banner/Banner';
import NavBar from '@/components/navbar/NavBar';
import Search from '@/components/search/Search';
import Notice from '@/components/notice/Notice';
import BlurImg from '@/components/blur-img/BlurImg';
import { shallowEqual, useSelector } from 'react-redux';
import './index.scss';
import useCountdown from '../../../hooks/useCountDown';
import { navLinkTo, systemInfo } from '@/common/publicFunc';

function Index() {
    const store = useSelector(_store => _store, shallowEqual);
    const commonConfig = store.commonStore.themeConfig;
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
    ]);
    useDidShow(() => {
        Taro.showShareMenu();
        console.log(commonConfig);
    })
    useReachBottom(() => {
        console.log('doiddd');
    })
    return (
        <View className='index-wrap index' >
            <NavBar title='首页' />
            <View className='fc search'>
                <Search width='720rpx' isEditor text='搜索更多优惠商品' />
            </View>
            <Banner w='100vw' className='index-banner' custom />
            {/* <Notice isShow content='当前为演示商城,当前为演示商城,当前为演示商城,当前为演示商城' background='rgb(255, 240, 217)' color='rgb(226, 150, 63)' /> */}

            <View className='pro-title fc'>
                - 居家首选 -
            </View>
            <View className='pro-list fb'>
                {
                    list.map((e, i) => {
                        return (
                            <View key={e.product_id} className='pro-item fd' onClick={() => navLinkTo('product-detail/index', {})}>
                                <BlurImg className='img' src='https://img2.baidu.com/it/u=1336119765,2231343437&fm=26&fmt=auto&gp=0.jpg' />
                                {/* <Image mode='widthFix' /> */}
                                <View className='p-name'>
                                    {e.product_name}
                                </View>
                                <View className='p-price'>
                                    <Text className=''>
                                        <Text className='_money'>¥</Text>7888
                                    </Text>
                                    <Text className='old-price'>
                                        <Text className='_money'>¥</Text>7888
                                    </Text>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}
export default Index