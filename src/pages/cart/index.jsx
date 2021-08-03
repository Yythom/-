/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-indent-props */
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { View, Text, Radio, ScrollView } from '@tarojs/components';

// import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, setStorageSync, showToast, startPullDownRefresh, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'
import { shallowEqual, useSelector } from 'react-redux';
import FloatBottom from '@/components/float/FloatBottom';
import np from 'number-precision'
import isWeapp from '@/utils/env';
import ProductItem from './product-item/ProductItem';
import './index.scss'
import useSummary from '../../../hooks/useSummary';
import { systemInfo } from '@/common/publicFunc';
import Skuhooks from '@/components/page/sku-hook/sku-hooks';
import { data } from '../../../hooks/sku-utils/data';
import { data2 } from '../../../hooks/sku-utils/data2';

let fn = Function.prototype

const Index = () => {
    const commonStore = useSelector(e => e.commonStore, shallowEqual);
    const [skushow, setskuShow] = useState(false);
    const [skuData, setSkuData] = useState(null);
    const [i, setI] = useState(0);
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
    const [list, summaryShop, isAll, price, selectArr] = useSummary(pageData);

    console.log(list, summaryShop);

    const handle = (index, shop_id, type, value) => {
        const newList = JSON.parse(JSON.stringify(list));
        const shopIndex = newList.findIndex(e => e.shop_id == shop_id);
        let shop = newList[shopIndex]       // 查找到某个店铺
        let item = shop.products[index];  // 查找到某个店铺下的该商品
        switch (type) {
            case 'delete':
                shop.products.splice(index, 1);
                if (!shop.products[0]) newList.splice(shopIndex, 1);
                break;
            case 'number':
                item.num = value; // 修改当前商品选择状态
                onChangeNumber(newList);
                break;
            case 'check':
                item.checked = !item.checked; // 修改当前商品选择状态
                console.log('check', newList);
                break;
            case 'sku':
                item.sku = value; // 修改当前商品选择状态
                console.log('sku', newList);
                break;
        }
        type !== 'number' && onChange(newList)
    }

    const init = async () => {

    }

    const pay = async () => {

    }

    const del = async () => {
        console.log('11321');
        console.log(selectArr);
    }

    const onChange = useCallback(async (newList) => {
        setPageData(newList)
    }, [list])

    const onChangeNumber = useCallback(async (newList) => {
        setPageData(newList)
    }, [list])

    const [sku_index, setSku_index] = useState({
        index: '',
        shop_id: '',
    });
    const [default_sku, setDefault_sku] = useState([])
    const showSku = useCallback(async (product, index, shop_id) => {
        if (i == 10) {
            setSkuData({
                ...product,
                ...data2
            })
            setDefault_sku([
                { id: '101', name: '4.7寸', parent_name: '尺寸' },
                { id: '201', name: '16G', parent_name: '内存' },
            ])
        } else {
            setSkuData({
                ...product,
                ...data
            })
            setDefault_sku([
                { id: 101, name: '4.7寸', parent_name: '尺寸' },
                { id: 201, name: '16G', parent_name: '内存' },
                { id: 302, name: '红色', parent_name: '颜色' }
            ])
        }
        setTimeout(() => {
            setskuShow(4);
            setI(10)
        }, 100);
        setSku_index({ index, shop_id, })
    }, [list])

    const onOk = async (sku) => {
        if (!sku) return showToast({ title: 'x', icon: 'none' })
        if (sku) {
            console.log(sku, 'on ok');
            handle(sku_index.index, sku_index.shop_id, 'sku', sku.str)
        }
    }

    usePullDownRefresh(() => {
        console.log('刷新');
        init();
        ///
        setTimeout(() => {
            stopPullDownRefresh();
        }, 1000);
    });


    return (
        <View className='cart-wrap index' >
            <ScrollView scrollY className='scrollview'>
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
                                            handle={handle}
                                            index={index}
                                            product={product_item}
                                            showSku={showSku}
                                        />
                                    )
                                }
                            </View>
                        )

                    }
                </View>
                <View className='footer fb' style={{ bottom: `calc(${systemInfo.safeArea.top / 2}px + ${60 * 2}rpx)` }} >
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
                                    if (!edit) pay();
                                    else del()
                                }}
                            >
                                {!edit && `结算`}
                                {edit && '删除'}
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* sku弹框 */}
            <Skuhooks
                show={skushow}
                setShow={setskuShow}
                product={skuData}
                default_sku={default_sku}
                onOk={(e) => {
                    onOk(e)
                    console.log(e, 'sku data');
                    // if (e) setSku(e);
                }}
            />
        </View>
    )
}
export default Index;
