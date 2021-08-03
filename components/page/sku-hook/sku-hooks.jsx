/* eslint-disable react/jsx-indent-props */
import React, { Fragment, useEffect, useLayoutEffect, useState, memo } from 'react';
import BlurImg from '@/components/blur-img/BlurImg';
import { View, Text, Input } from '@tarojs/components';
import { getStorageSync, setStorageSync, showLoading, showToast } from '@tarojs/taro';
import { navLinkTo, systemInfo } from '@/common/publicFunc';
import HandleInput from '@/components/page/sku/handle-input/HandleInput';
import FloatBottom from '@/components/float/FloatBottom';
import useSku from '../../../hooks/useSku';
import './sku.scss'

const Skuhooks = memo(({
    bottom = Number(getStorageSync('bar_height')) + systemInfo?.safeArea?.top / 2,
    show = 1, // 1加入购物车 2 购买 3 all
    setShow = Function.prototype,
    onChange = Function.prototype,
    onOk = Function.prototype,
    product,
}) => {
    const [num, setNum] = useState(1); // 商品数量
    const [option, load, { sku, desc }, specList, setSku] = useSku(product);

    useEffect(() => {
        console.log(sku, desc);
        onChange({ sku, desc })
    }, [sku, desc]);

    useEffect(() => {
        if (load && specList) { // 如果sku没有可选择的默认设置
            if (specList.length < 1) {
                setSku({
                    sku: {
                        "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',
                        "price": 200,
                        "stock": 10,
                        'sku_id': '222',
                    },
                    desc: {
                        // str: _sku ? desc : (str.trim().length > 0 ? str : filterStr), // 主页面展示 描述
                        // filterStr: desc,
                        price: 200,
                    },
                })
            }

            // 默认选中
            specList.forEach((item, index) => {
                if (index == 0) {
                    option.handleSpecAttr({ id: 101, name: '4.7寸', parent_name: '尺寸' }, 0)
                } else if (index == 1) {
                    option.handleSpecAttr({ id: 201, name: '16G', parent_name: '内存' }, 1)
                } else {
                    option.handleSpecAttr({ id: 302, name: '红色', parent_name: '颜色' }, 2)
                }
            })

        }
    }, [load]);

    // 预下单
    const preOrder = () => {
        if (!sku?.sku) return
        let pre = {
            pre_order: {
                product: [
                    {
                        product_id: product.product_id,
                        sku_id: sku.sku_id,
                        promotion_id: sku?.activity ? '0' : sku.promotion_id,
                        number: num
                    },
                ]
            },
        };
        setStorageSync('pre-data', pre.pre_order);
        navLinkTo('order-comfirm/index', {});
    };

    const addCart = () => {
        if (!sku?.sku) return
    };

    return (
        <FloatBottom bottom={bottom} className='sku-float' show={show} setShow={setShow} style={{ backgroundColor: '#fff' }}>
            {
                load
                    ?
                    <View className='sku'>
                        <View className='iconfont icon-close' onClick={() => { setShow(false) }}></View>
                        <View className='title flex'>
                            <BlurImg className='img' src={sku ? sku.img : 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg'} />
                            <View className='content fd'>
                                <View className='price'>
                                    <Text className='_money'>¥</Text>
                                    {desc?.price ? desc?.price : 'min-price - max-price'}
                                </View>
                                <View className='select'>
                                    {
                                        sku?.stock && <View className='stock'> 库存： {sku?.stock} </View>
                                    }
                                </View>
                                {
                                    desc?.filterStr && <View className='select'>已选：{desc?.filterStr}</View>
                                }
                            </View>

                        </View>
                        <View className='spec-box' >
                            {
                                specList && specList.map((item, index) => (
                                    <Fragment key={item.id}>
                                        <View className='select_title'>{item.specName}</View>
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

                        <View className='buy_number'>
                            <View className='number_title'>数量</View>
                            <HandleInput num={num} onChange={(value) => {
                                // if (!skuObj) return showToast({ title: '请选择规格', icon: 'none', })
                                console.log(num > value, value);
                                // if (num > value ) { // 减
                                //     return
                                // }
                                // if (num < value) { // 加

                                // }
                                setNum(value)
                            }} />
                        </View>
                        <View className='btn_wrap'>
                            {show == 1 && <View className='btn cart-btn normal' onClick={() => { addCart() }}>加入购物车</View>}
                            {show == 2 && <View className='btn buy-btn normal' onClick={() => { preOrder() }}>立即购买</View>}
                            {show == 3 && <>
                                <View className='btn cart-btn' onClick={() => { addCart() }}>加入购物车</View>
                                <View className='btn buy-btn' onClick={() => { preOrder() }}>立即购买</View>
                            </>
                            }
                            {show == 4 && <View className='btn cart-btn normal' onClick={() => { onOk({ ...sku, ...desc }) }}>确定</View>}


                        </View>
                    </View>
                    : <View className='fc' style={{ height: '100vh', background: 'rgba(9, 44, 76, 0.1)' }}>
                        模拟加载中...
                    </View>
            }
        </FloatBottom>
    )
})

export default Skuhooks;