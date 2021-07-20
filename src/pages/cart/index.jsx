/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-indent-props */
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { View, Text, Radio } from '@tarojs/components';

// import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, showToast, startPullDownRefresh, stopPullDownRefresh, usePageScroll, usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { shallowEqual, useSelector } from 'react-redux';
import FloatBottom from '@/components/float/FloatBottom';
import np from 'number-precision'
import isWeapp from '@/utils/env';
import ProductItem from './product-item/ProductItem';
import './index.scss'
import useSummary from './useSummary';



const Index = () => {
    const commonStore = useSelector(e => e.commonStore, shallowEqual);
    const [pageData, setPageData] = useState([
        {
            shop_id: '1',
            products: [
                {
                    product_id: '101',
                    product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
                    price: '7999',
                    sale_price: '888',
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
            ]
        }, {
            shop_id: '2',
            products: [
                {
                    product_id: '201',
                    product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
                    price: '7999',
                    sale_price: '888',
                    sku: ['银色', '64G', '套餐一'],
                    num: '2',
                },
                {
                    product_id: '202',
                    product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
                    price: '7999',
                    sku: ['银色', '64G', '套餐一'],
                    num: '2',
                },
            ]
        }
    ]);

    const [edit, setEdit] = useReducer((state) => !state, false);
    const [list, summaryShop, isAll, price] = useSummary(pageData);

    console.log(list, summaryShop, isAll);

    const init = async () => {

    }

    const pay = async () => {

    }
    const del = async () => {

    }

    usePullDownRefresh(() => {
        console.log('刷新');
        init();
        ///
        setTimeout(() => {
            stopPullDownRefresh();
        }, 1000);
    });

    useReachBottom(() => {
        console.log('到底了');
    });

    return (
        <View className='cart-wrap' style={!isWeapp && { minHeight: window.innerHeight + 'px' }}>
            <View className='cart-title fb' style={{ top: 0 + 'px' }}>
                <View className='total'>共2件商品</View>
                <View className='header_edit' onClick={() => { setEdit(!edit) }} >
                    {
                        !edit ?
                            <View className='fc'>
                                <Text className='iconfont icon-edit'></Text> 编辑</View>
                            : '完成'
                    }
                </View>
            </View>
            <View className='list' >
                {
                    pageData?.map((e, i) =>
                        <View className='shop_wrap' key={e.shop_id}>
                            <View className='shopname flex'
                                style={{ height: '80rpx' }}
                            >
                                <Radio className='radio' color='#eb472b' checked={summaryShop[e.shop_id]?.checked} onClick={() => {
                                    const newList = JSON.parse(JSON.stringify(pageData));
                                    newList.forEach(shop => {
                                        if (shop.shop_id == e.shop_id) {
                                            shop.products.forEach(el => {
                                                el.checked = !summaryShop[e.shop_id]?.checked
                                            })
                                        }
                                    });
                                    setPageData(newList);
                                }} />{e.shop_id}
                            </View>
                            {
                                e.products.map((product_item, index) =>
                                    <ProductItem
                                        key={product_item.product_id}
                                        list={pageData}
                                        shop_id={e.shop_id}
                                        index={index}
                                        product={product_item}
                                        onChange={(newList) => {
                                            setPageData(newList);
                                            console.log(newList);
                                        }}
                                        onChangeNumber={(number) => {
                                            console.log(number, 'req');
                                        }}
                                    />
                                )
                            }
                        </View>
                    )

                }
            </View>
            <View className='footer fb' style={!isWeapp && { bottom: commonStore?.bar_h + 'px' }} >
                <View className='pay fb'>
                    <View className='left flex' onClick={() => {
                        const newList = JSON.parse(JSON.stringify(pageData));
                        console.log(isAll, 'isAll');
                        newList.forEach(e => {
                            e.products.forEach(el => {
                                el.checked = !isAll
                            })
                        });
                        setPageData(newList);
                    }}>
                        <Radio className='radio' color='#eb472b' checked={isAll} />
                        {!isAll ? "全选" : "全不选"}
                    </View>

                    <View className='p_wrap fc'>
                        <View className='price' onClick={(event) => { }} >
                            <View className='fc'>
                                合计：<Text className='price-color'><Text className='_money'>¥</Text>{price}</Text>
                            </View>
                            {/* <View style={{ fontSize: '0.5rem', color: 'rgb(255, 91, 41)' }}>
                                已优惠 ¥{22}
                                <Text style={{ marginLeft: '0.2rem' }}>优惠明细 <Text style={{ fontSize: '0.5rem' }} className='iconfont icon-unfold'></Text></Text>
                            </View> */}
                        </View>
                        <View
                            className='btn'
                            onClick={(event) => {
                                event.stopPropagation();
                                if (Object.keys(summaryShop).length == 0) return showToast({ title: '请先选择商品', icon: 'none', })
                                if (edit) pay();
                                else del()
                            }}
                        >
                            {!edit && `结算`}
                            {edit && '删除'}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default Index;
