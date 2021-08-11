/* eslint-disable react/jsx-indent-props */
import React, { Fragment, useEffect, useState } from 'react';
import Taro, { getStorageSync, hideLoading, removeStorageSync, showLoading, useDidShow } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import Vtabs from '@/components/v-tabs/Vtabs';
import { shallowEqual, useSelector } from 'react-redux';
import { navLinkTo, systemInfo } from '@/common/publicFunc';
import Search from '@/components/search/Search';
import Banner from '@/components/page/banner/Banner';
import Skuhooks from '@/components/page/sku-hook/sku-hooks';
// import CouponFloat from '@/components/page/coupon/coupon';
import CouponList from '@/components/page/coupon/v-coupon';
import CateService from '@/services/cate';
import VtabList from './list/list-2';
import vtab_data from './tab';
import './index.scss';

function Index() {
    const commonStore = useSelector(e => e.commonStore, shallowEqual);
    const [tabIndex, setTabIndex] = useState(0);
    const [list, setList] = useState(vtab_data[0]);
    const [skushow, setskuShow] = useState(false);
    const [skuData, setSkuData] = useState(null);

    const [coupon, setCoupon] = useState([]);
    const [oneCate, setOneCate] = useState([])
    const [twoCate, setTwoCate] = useState([])

    const init = async () => {
        const on_cate = await CateService.getCateList();
        const tow_cate = await CateService.getChildrenList(on_cate.list[0].category_id);
        setOneCate(on_cate.list)
        setTwoCate(tow_cate.list)
        console.log(on_cate, 'on_cate');
    }

    useDidShow(() => {
        removeStorageSync('address_id')
        // console.log(userStore);
    })

    useEffect(() => {
        init()

    }, [])

    return (
        <View className='cate-wrap index' >
            <View className='fc search' style={{ width: '100vw' }}>
                <Search width='720rpx' text='搜索商品' />
            </View>
            <Banner w='100vw' className='cate-banner' custom />

            {/* 横向优惠券列表 */}
            {/* <CouponList /> */}

            {/* 分类列表 */}
            <View>
                <Vtabs
                    className='cate-vtabs'
                    windowTabsLength={11}
                    height={`calc(${100}vh - ${80}rpx - ${120}rpx - ${220}rpx - ${98}rpx - ${systemInfo.safeArea.top / 2}px)`}
                    list={oneCate?.map(e => { return { category: e.category_name } })}
                    onChange={async (i) => {
                        setTwoCate([]);
                        if (oneCate[0]) {
                            const tow_cate = await CateService.getChildrenList(oneCate[i].category_id);
                            setTwoCate(tow_cate.list);
                            console.log(tow_cate, 'tow_cate');
                        }


                        // setList([]);
                        // setTimeout(() => {
                        //     setList(vtab_data[i]);
                        // }, 600);
                        setTabIndex(i);
                    }}
                >
                    <View className='cate-content'>
                        {
                            twoCate[0] && <VtabList
                                twoCate={twoCate}
                                setskuShow={setskuShow}
                                skushow={skushow}
                                skuData={skuData}
                                setSkuData={setSkuData}
                            // list={list}
                            />
                        }
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