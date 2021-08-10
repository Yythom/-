/* eslint-disable react/jsx-indent-props */
import React, { Fragment, useState } from 'react';
import Taro, { getStorageSync, hideLoading, showLoading, useDidShow } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import Vtabs from '@/components/v-tabs/Vtabs';
import BlurImg from '@/components/blur-img/BlurImg';
import { shallowEqual, useSelector } from 'react-redux';
import { navLinkTo, systemInfo } from '@/common/publicFunc';
import Search from '@/components/search/Search';
import Banner from '@/components/page/banner/Banner';
import Skuhooks from '@/components/page/sku-hook/sku-hooks';
import CouponFloat from '@/components/page/coupon/coupon';
import CouponList from '@/components/page/coupon/v-coupon';
import VtabList from './list/list';
import vtab_data, { vtab_data22 } from './tab';
import './index.scss';

function Index() {
    const commonStore = useSelector(e => e.commonStore, shallowEqual);
    const [tabIndex, setTabIndex] = useState(0);
    const [list, setList] = useState(vtab_data[0]);
    const [skushow, setskuShow] = useState(false);
    const [skuData, setSkuData] = useState(null);

    const [coupon, setCoupon] = useState([]);

    useDidShow(() => {
        // console.log(userStore);
    })


    return (
        <View className='cate-wrap index' >
            <View className='fc search' style={{ width: '100vw' }}>
                <Search width='720rpx' text='搜索商品' />
            </View>
            <Banner w='100vw' className='cate-banner' custom />

            {/* 横向优惠券列表 */}
            <CouponList />

            {/* 分类列表 */}
            <View>
                <Vtabs
                    className='cate-vtabs'
                    windowTabsLength={11}
                    height={`calc(${100}vh - ${80}rpx - ${120}rpx - ${220}rpx - ${98}rpx - ${systemInfo.safeArea.top / 2}px)`}
                    list={vtab_data22}
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
                    console.log(e, 'sku data');
                    // if (e) setSku(e);
                }}
            />


        </View>
    )
}
export default Index