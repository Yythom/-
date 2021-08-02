/* eslint-disable react/jsx-indent-props */
import React, { Fragment, useState } from 'react';
import Taro, { getStorageSync, hideLoading, showLoading, useDidShow } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import Vtabs from '@/components/v-tabs/Vtabs';
import BlurImg from '@/components/blur-img/BlurImg';
import { shallowEqual, useSelector } from 'react-redux';
import isWeapp from '@/utils/env';
import { navLinkTo, systemInfo } from '@/common/publicFunc';
import Search from '@/components/search/Search';
import Banner from '@/components/page/banner/Banner';
import VtabList from './list/list';
import vtab_data from './tab';
import './index.scss';
import Skuhooks from '@/components/page/sku-hook/sku-hooks';

function Index() {
    const commonStore = useSelector(e => e.commonStore, shallowEqual);
    const [tabIndex, setTabIndex] = useState(0);
    const [list, setList] = useState(vtab_data[0]);
    const [skushow, setskuShow] = useState(false);
    const [skuData, setSkuData] = useState(null);

    const [coupon, setCoupon] = useState([
        {
            coupon_id: '101',
            price: '100',
            scpoe: '500'
        },
        {
            coupon_id: '102',
            price: '100',
            scpoe: '0'
        }
    ]);

    useDidShow(() => {
        // console.log(userStore);
    })


    return (
        <View className='cate-wrap index' >
            <View className='fc search' style={{ width: '100vw' }}>
                <Search width='720rpx' text='搜索商品' />
            </View>
            <Banner w='100vw' className='cate-banner' custom />
            <View className='coupon flex'>
                {
                    coupon.map((e, i) => {
                        return (
                            <View className='item flex' key={e.coupon_id}>
                                <View className='left flex'>
                                    <View className='square' />
                                    <Text style={{ zIndex: '1', marginRight: '36rpx' }} >优惠</Text>
                                    <View style={{ zIndex: '1', fontSize: '28rpx' }} >
                                        <Text className='_money'>¥</Text>{e.price}
                                    </View>
                                    <View className='line'></View>
                                </View>
                                <View className='right fc'>
                                    {e.scpoe == 0
                                        ? <Text >满{e.scpoe}可用</Text>
                                        : <Text >可领</Text>
                                    }
                                </View>
                            </View>
                        )
                    })
                }
            </View>

            {/* 分类列表 */}
            <View>
                <Vtabs
                    windowTabsLength={11}
                    height={`calc(${100}vh - ${80}rpx - ${120}rpx - ${220}rpx - ${98}rpx - ${systemInfo.safeArea.top / 2}px)`}
                    list={vtab_data}
                    onChange={(i) => {
                        console.log(vtab_data[i]);
                        showLoading();
                        setList([]);
                        setTimeout(() => {
                            hideLoading();
                            setList(vtab_data[i]);
                        }, 600);
                        setTabIndex(i);
                    }}
                >
                    <View className='cate-content'>
                        <VtabList
                            setskuShow={setskuShow}
                            skushow={skushow}
                            skuData={skuData}
                            setSkuData={setSkuData}
                            list={list}
                        />
                    </View>
                </Vtabs>
            </View >

            {/* sku弹框 */}

            <Skuhooks
                show={skushow}
                setShow={setskuShow}
                product={skuData}
                onChange={(e) => {
                    // if (e) setSku(e);
                }}
            />
        </View>
    )
}
export default Index