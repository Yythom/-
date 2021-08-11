/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import Taro, { getStorageSync, setTabBarStyle, showToast, useDidShow, useReachBottom } from '@tarojs/taro';
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
import HomeService from '@/services/index';

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
    const [pageData, setPageData] = useState(null);
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

    const init = async () => {
        const res = await HomeService.getHomeApi();
        setPageData(res)
        tabChange(0);
    }
    useDidShow(() => {
        Taro.showShareMenu();
        init();
        console.log(commonConfig);
    })
    const [page, setPage] = useState(1)

    useReachBottom(() => {
        tabChange(index, page + 1)
    });

    const [index, setIndex] = useState(0);
    const [noMore, setNoMore] = useState(false);

    const tabChange = async (i, _page) => {
        if (!_page) setList([])
        console.log(list, 'listlistlist');
        if (_page && noMore && !list[0]) return
        console.log(_page || 1);
        const res = await ProductService.getProductListApi({ category_id: i == 0 ? '' : pageData?.category.list[i - 1].category_id, page: _page || 1 });
        index !== i && setIndex(i);
        if (_page) {
            if (!res.list[0]) {
                setPage(_page + 1);
                setNoMore(true);
                showToast({ title: '没有更多了', icon: 'none' })
            }
            setList([...list, ...res.list])
        } else {
            if (!res.list[0]) setNoMore(true);
            else setNoMore(false);
            setList(res.list)
            setPage(1);
        }
        // setList
    }

    const showSku = async (product_id) => {
        const res = await ProductService.getProductDataApi(product_id);
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


            <Banner list={pageData?.top_banner?.list} w='100vw' className='index-banner' custom
                render={
                    (e) => <BlurImg mode='widthFix' className='img fc' src={e?.image} />
                }
            />
            {/* <Notice isShow content='当前为演示商城,当前为演示商城,当前为演示商城,当前为演示商城' background='rgb(255, 240, 217)' color='rgb(226, 150, 63)' /> */}
            {/* <Types list={types} /> */}

            {/* <Banner w='720rpx' className='recommended' custom /> */}

            {/* 秒杀 */}
            {/* <Seconds data={{}} /> */}
            {

                <Tabs
                    tag_list={pageData?.category?.list ? [{ title: '全部' }, ...pageData?.category?.list?.map(e => { return { title: e.category_name } })] : [{ title: '全部' },]}
                    onChange={tabChange}
                    defaultIndex='0'
                    padding='60'
                    isSticy
                    notChildScroll
                // request={}
                // init={(_newList) => {
                //     // setContent(_newList?.list)
                // }}
                >
                    <View className='pro-list fb'>
                        {
                            list[0] ? list.map((e, i) => {
                                return (
                                    <View key={e.product_id} className='pro-item fd' onClick={() => navLinkTo('product-detail/index', {})}>
                                        <BlurImg className='img' mode='heightFix' src={e.cover} />
                                        {/* <Image mode='heightFix' /> */}
                                        <View className='p-name'>
                                            {e.product_name}
                                        </View>
                                        <View className='price'>
                                            <Text style={{ fontWeight: 'bold', marginRight: '16rpx' }}>
                                                <Text className='_money'>¥</Text>{e.discount_price}
                                            </Text>
                                            <Text className='del'>
                                                <Text className='_money'>¥</Text>{e.market_price}
                                            </Text>
                                        </View>
                                        <View className='foot'>
                                            <View className='vip-price fc'>
                                                <Text className='_money'>¥</Text>{e.member_price}
                                            </View>
                                            <View className='show-sku' onClick={(event) => {
                                                event.stopPropagation();
                                                showSku(e.product_id)
                                            }}
                                            >+</View>
                                        </View>
                                    </View>
                                )
                            }) : <View className='fc' style={{ width: '100%' }}>
                                暂无数据
                            </View>
                        }
                    </View>
                </Tabs>
            }

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