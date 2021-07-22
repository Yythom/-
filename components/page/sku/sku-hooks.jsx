/* eslint-disable react/jsx-indent-props */
import React, { Fragment, useEffect, useLayoutEffect, useState, memo } from 'react';
import BlurImg from '@/components/blur-img/BlurImg';
import { View, Text, Input } from '@tarojs/components';
import { showLoading, showToast } from '@tarojs/taro';
// import { data } from './data';
import SkuUtil from './sku_fn';
// import data_filter from './data_filter';
import './sku.scss'
import HandleInput from './handle-input/HandleInput';
import useSku from './useSku';

const Skuhooks = memo(({
    show = 1, // 1加入购物车 2 购买 3 all
    onChange = Function.prototype,
    product,
    data,
}) => {
    const [num, setNum] = useState(1); // 商品数量
    const [option, load, { sku, desc }, specList] = useSku(data);
    useEffect(() => {
        console.log(sku, desc);
        onChange({ sku, desc })
    }, [sku, desc])

    return (
        <>
            {
                load
                    ?
                    <View className='sku'>
                        <View className='iconfont icon-close' onClick={() => { }}></View>
                        <View className='title flex'>
                            <BlurImg className='img' src={sku ? sku.img : 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg'} />

                            <View className='content fd'>
                                <View className='price'>
                                    <Text className='_money'>¥</Text>
                                    {desc.price ? desc.price : 'min-price - max-price'}
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
                            {show == 1 && <View className='btn cart-btn normal' onClick={() => { }}>加入购物车</View>}
                            {show == 2 && <View className='btn buy-btn normal' onClick={() => { }}>立即购买</View>}
                            {show == 3 && <>
                                <View className='btn cart-btn' onClick={() => { }}>加入购物车</View>
                                <View className='btn buy-btn' onClick={() => { }}>立即购买</View>
                            </>
                            }

                        </View>
                    </View>
                    : <View className='fc' style={{ height: '100vh', background: 'rgba(9, 44, 76, 0.1)' }}>
                        模拟加载中...
                    </View>
            }
        </>
    )
})

export default Skuhooks;