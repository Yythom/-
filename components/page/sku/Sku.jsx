/* eslint-disable react/jsx-indent-props */
import React, { Fragment, useEffect, useLayoutEffect, useState, memo } from 'react';
import BlurImg from '@/components/blur-img/BlurImg';
import { View, Text, Input } from '@tarojs/components';
import { showLoading, showToast } from '@tarojs/taro';
import { data } from './data';
import SkuUtil from './sku_fn';
// import data_filter from './data_filter';
import './sku.scss'
import HandleInput from './handle-input/HandleInput';

const Sku = memo(({
    show = 1, // 1加入购物车 2 购买 3 all
    onChange = Function.prototype,
    product,
}) => {
    const [num, setNum] = useState(1); // 商品数量
    const [specList, setSpecList] = useState([]); // 规格列表
    const [specListData, setSpecListData] = useState([]); // 选中的规格属性数据对象
    // const [fil, setFil] = useState(''); // 剩余sku选择项的描述文字
    const skuObj = SkuUtil.getSelectObj(specListData, specList); // 选择完成之后的sku对象
    const [skuInit, setSkuInit] = useState(false); // 判断sku是否加载完成
    const [filterStr, setFilterStr] = useState('')

    function transPrice() {
        const price = SkuUtil.getPrice(specListData)
        if (!price) return null;
        if (price.maxPrice === price.minPrice) return `${price.maxPrice}`;
        return `${price.minPrice} - ${price.maxPrice}`
    }

    function transSpec(_list) { // sku描述
        return _list.filter(item => item).map(item => item.name).join(' ')
    }

    const selectSpec = transSpec(specListData);  // sku描述
    const selectPrice = transPrice();  // sku价格区间
    const stock = SkuUtil.getStock(specListData); // 库存

    useLayoutEffect(() => {
        SkuUtil.clear();
        setTimeout(() => {
            SkuUtil.initSku(data.skuList, setSkuInit);
        }, 2000);
        setSpecList(data.skuSpec);
        setFilterStr(data.skuSpec.map(e => e.specName).join(' '));
    }, []);

    function handleSpecAttr(item, index) { // sku选择
        // clearInterval(timmer);
        const list = SkuUtil.getActionSpecList(specListData, item, index);
        let str = filterStr;
        str.split(' ').forEach(el => {
            list.forEach(e => {
                if (el && e) {
                    if (e.parent_name == el) {
                        str = str.replace(el, '')
                    }
                }
            })
        })
        list && setSpecListData(list);
        onChange({
            sku_item: SkuUtil.getSelectObj(list, specList),
            desc: {
                str: str.trim().length > 0 ? str : filterStr,
                select: transSpec(list)
            },
            price: selectPrice
        });
    }

    return (
        <>
            {
                skuInit
                    ?
                    <View className='sku'>
                        <View className='iconfont icon-close' onClick={() => { }}></View>
                        <View className='title flex'>
                            <BlurImg className='img' src={skuObj ? skuObj.img : 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg'} />
                            <View className='content fd'>
                                <View className='price'>
                                    <Text className='_money'>¥</Text>
                                    {
                                        !selectPrice ? 1
                                            : (skuObj ? selectPrice : selectPrice)
                                    }
                                </View>
                                <View className='select'>
                                    {
                                        ((stock || stock === 0) && (!!skuObj)) &&
                                        <View className='stock'>
                                            {skuObj && '库存：' + stock}
                                        </View>
                                    }
                                </View>
                                {selectSpec && <View className='select'>
                                    已选：{selectSpec}
                                </View>}
                            </View>
                        </View>
                        <View className='spec-box' >
                            {
                                specList && specList.map((item, index) => (
                                    <Fragment key={item.id}>
                                        <View className='select_title'>{item.specName}</View>
                                        <View className='select_list flex' key={item.id}>
                                            {item.specAttrList.map(attrItem => {
                                                const disabled = SkuUtil.checkSpecAttrDisabled(specListData, attrItem.id, index);
                                                const active = SkuUtil.checkSpecAttrActive(specListData, attrItem.id);
                                                return (
                                                    <View
                                                        key={attrItem.id}
                                                        onClick={() => !disabled && handleSpecAttr({ ...attrItem, parent_name: item.specName }, index)}
                                                        className={`${disabled && ' disabled'} ${active && ' act_item'} item`}
                                                    >{attrItem.name}
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

export default Sku;