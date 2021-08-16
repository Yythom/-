/* eslint-disable react/jsx-indent-props */
import React, { Fragment, useEffect, useLayoutEffect, useState, memo } from 'react';
import BlurImg from '@/components/blur-img/BlurImg';
import { View, Text, Input, ScrollView } from '@tarojs/components';
import { getStorageSync, hideLoading, setStorageSync, showLoading, showToast } from '@tarojs/taro';
import { navLinkTo, systemInfo } from '@/common/publicFunc';
import HandleInput from '@/components/page/handle-input/HandleInput';
import FloatBottom from '@/components/float/FloatBottom';
import CartService from '@/services/cart';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { actions } from '@/store/userSlice';
import np from 'number-precision'
import useSku from '../../../hooks/useSku';
import './sku.scss'


const Skuhooks = memo(({
    bottom = Number(getStorageSync('bar_height')) + systemInfo?.safeArea?.top / 2,
    show = 1, // 1加入购物车 2 购买 3 all
    setShow = Function.prototype,
    onChange = Function.prototype,
    onOk = Function.prototype,
    initNumber,
    default_sku = [
        // { id: 101, name: '4.7寸', parent_name: '尺寸' },
        // { id: 201, name: '16G', parent_name: '内存' },
        // { id: 302, name: '红色', parent_name: '颜色' }
    ],
    product,
}) => {
    const dispatch = useDispatch();
    const cartSlice = useSelector(state => state.userStore, shallowEqual);
    const [num, setNum] = useState(1); // 商品数量
    const [option, load, { sku, desc }, specList, setSku, specListData] = useSku(product, show, default_sku);

    useEffect(() => {
        // console.log(sku, desc);
        onChange({ sku, desc })
    }, [sku, desc]);

    useEffect(() => {
        console.log(initNumber, 'initNumberinitNumberinitNumber');
        if (initNumber) setNum(initNumber);
        else setNum(1)
    }, [product])

    useEffect(() => {
        console.log(load, 'sku---load');
        if (load && specList) { // 如果sku没有可选择的默认设置
            if (specList.length < 1) {
                // setSku({
                //     sku: {
                //         "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',
                //         "price": 200,
                //         "stock": 10,
                //         'sku_id': '222',
                //     },
                //     desc: {
                //         // str: _sku ? desc : (str.trim().length > 0 ? str : filterStr), // 主页面展示 描述
                //         // filterStr: desc,
                //         price: 200,
                //     },
                // })
            }
            hideLoading();
        }
    }, [load]);

    // useEffect(() => {
    //     if (show && !load) showLoading();
    // }, [show])

    // 预下单
    const preOrder = () => {
        if (!sku?.sku) return
        let pre = {
            "shop_id": "string",
            "sku_items": [
                {
                    "sku_id": "string",
                    "count": "integer"
                }
            ]
        };
        setStorageSync('pre-data', pre);
        navLinkTo('order-comfirm/index', {});
    };

    const addCart = async () => {
        // console.log(sku, 'sku');
        // return
        if (sku) {
            const res = await CartService.add('1', product.product_id, `${sku.sku_id}`, num);
            if (res) {
                console.log(res);

                setTimeout(() => {
                    setShow(false)
                    showToast({ title: `加入成功`, icon: 'none' })
                }, 200);
            }
            dispatch(actions.upcart_price());
            setStorageSync('addcart', true)
            setStorageSync('addcart-subpages', true)
            console.log(sku, 'addcart');
        } else {
            showToast({ title: `请选择${desc ? desc.str : ''}`, icon: 'none' })
        }
    };

    return (
        <FloatBottom bottom={bottom} className='sku-float' show={show} setShow={setShow} style={{ backgroundColor: '#fff' }}>
            {
                load
                    ?
                    <View className='sku'>
                        <View className='iconfont icon-roundclose' onClick={() => { setShow(false) }}></View>
                        <View className='title flex'>
                            <BlurImg className='img' src={sku ? sku.cover : product?.cover} />
                            <View className='content fd'>
                                {/* <View className='price'>
                                    <Text className='_money'>¥</Text>
                                    {desc?.price ? desc?.price : 'min-price - max-price'}
                                </View> */}
                                <View className='price-box'>
                                    <View className='price'>
                                        <Text className='new price-color'>
                                            <Text className='_moneny'>¥</Text>
                                            {desc?.price ? desc?.discount_price : product?.discount_price}
                                            <Text className='_moneny'>起</Text>
                                        </Text>
                                        <Text className='old'>
                                            <Text className='_moneny'>¥</Text>
                                            {desc?.price ? desc?.price : product?.market_price + '起'}
                                        </Text>
                                    </View>
                                    <View className='extra-price fb'>
                                        <View className='flex price-l'>
                                            {/* <View className='vip-price fc'>￥{desc?.price ? desc?.member_price : product?.member_price + '起'}</View> */}
                                            {/* <View className='p-item2 fc'>20元券</View> */}
                                        </View>
                                        {/* <View className='sale fc'>月售 {product?.sale}</View> */}
                                    </View>

                                </View>
                                {/*
                                </View>
                                {
                                    desc?.filterStr && <View className='select'>已选：{desc?.filterStr}</View>
                                } */}
                            </View>
                        </View>
                        <ScrollView
                            scrollY
                            style={{ maxHeight: '30vh' }}
                        >
                            <View className='spec-box' >
                                {
                                    specList && specList.map((item, index) => (
                                        <Fragment key={item.id}>
                                            <View className='select_title flex'>{item.specName}</View>
                                            <View className='select_list flex' key={item.id}>
                                                {item.specAttrList.map(attrItem => {
                                                    const { disabled, active } = option.checkSpecAttrDisabled(attrItem.id, index);
                                                    return (
                                                        <View
                                                            key={attrItem.id}
                                                            onClick={() => !disabled && option.handleSpecAttr({ ...attrItem, parent_name: item.specName }, index)}
                                                            className={`${disabled && ' disabled'} ${active && ' act_item'} item`}
                                                        >
                                                            {attrItem.name}
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        </Fragment>
                                    ))
                                }
                            </View>
                        </ScrollView>

                        <View className='buy_number fb'>
                            <View className='number_title flex'>
                                <View>购买数量</View>
                                {
                                    sku?.stock && <View className='stock'> 库存： {sku?.stock} </View>
                                }

                            </View>
                            <HandleInput num={num} onChange={(value) => {
                                if (!sku) return showToast({ title: '请选择规格', icon: 'none', })
                                if (value > sku?.stock) {
                                    setNum(sku?.stock)
                                    return showToast({ title: '超过库存上限', icon: 'none' })
                                }
                                setNum(value)
                            }} />
                        </View>
                        <View className='btn_wrap flex'>
                            {show == 1 && <View className='btn fc cart-btn normal' onClick={() => { addCart() }}>加入购物车</View>}
                            {show == 2 && <View className='btn fc buy-btn normal' onClick={() => { preOrder() }}>立即购买</View>}
                            {show == 3 && <>
                                <View className='btn fc cart-btn' onClick={() => { addCart() }}>加入购物车</View>
                                <View className='btn fc buy-btn' onClick={() => { preOrder() }}>立即购买</View>
                            </>
                            }
                            {show == 4 && <View className='btn fc cart-btn normal' onClick={() => {
                                if (sku) {
                                    onOk({ ...sku, ...desc, product_count: num, specListData })
                                } else {
                                    showToast({ title: `请选择${desc ? desc.str : ''}`, icon: 'none' })
                                }
                            }}>确定</View>}
                        </View>
                    </View>

                    : <View className='fc' style={{ height: '60vh', }}>
                        加载中...
                    </View>
            }

        </FloatBottom>
    )
})

export default Skuhooks;