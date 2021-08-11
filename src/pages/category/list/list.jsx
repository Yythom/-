/* eslint-disable react/jsx-indent-props */
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, Button, Text, Image, ScrollView } from '@tarojs/components';
import { navLinkTo, RefInfo } from '@/common/publicFunc';
import { createSelectorQuery, getStorageSync, showToast } from '@tarojs/taro';
import { data, onlineData } from '../../../../hooks/sku-utils/data';
import filter_data from '../../../../hooks/sku-utils/data_filter';
import ProductService from '@/services/product';


/**
 * 
 * @param {*} 
 *      [{
            child_cate: '分类1',
            pro: [
                {
                    name: '3',
                    image,
                }
            ]
        }], 
 * @returns 
 */
const RenderList = memo(({ _list, skuOption }) => {
    const { show, setShow, setSkuData, skuData } = skuOption;
    const showSku = async () => {
        const res = await ProductService.getProductDataApi();
        setSkuData({ ...filter_data(res) })
        setTimeout(() => {
            setShow(1);
        }, 100);
    }


    return _list?.map((e, i) => {
        return (
            <Fragment key={e?.child_cate + 'cate-title' + i}>
                {/* 迭代 */}
                {
                    e?.child_cate && <View
                        style={{ position: 'sticky', top: '0', zIndex: '1', background: 'pink' }}
                        className='nodes' id={`catetitle${i}`}
                    >
                        {e.child_cate}
                    </View>
                }
                {
                    e?.pro?.map(product => {
                        return (
                            /* 迭代样式 */
                            // <View className='fd item' onClick={() => navLinkTo('product-list/index', {})} key={e.child_cate + product.name + '_product'}>
                            //     <BlurImg className='img' src={product.image} />
                            //     <View className='text'>{product.name}</View>
                            // </View>
                            <View className='flex item' onClick={() => navLinkTo('product-list/index', {})} key={e.child_cate + product.name + '_product'}>
                                <Image className='img' mode='aspectFill' src={product.image}></Image>
                                <View className='content fd'>
                                    <View className='name'>{product.name}</View>
                                    <View className='desc flex'>
                                        <View className='desc-item fc'>20元券</View>
                                        <View className='desc-item fc'>补贴¥0.31</View>
                                    </View>
                                    <View className='price-box fb'>
                                        <View className='price'>
                                            <Text className='_money'>¥</Text>59.90
                                        </View>
                                        <View className='sale'>月售{12877}</View>
                                    </View>
                                    <View className='foot fb'>
                                        <View className='vip-price fc'>会员价格 ¥1239</View>
                                        <View className='show-sku' onClick={(event) => {
                                            event.stopPropagation();
                                            showSku()
                                        }}>+</View>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </Fragment>
        )
    })
});

// 二级分类渲染数组
const ChildCate = memo(({ list, child_cate, onClick }) => {
    return (
        <>
            {
                list?.child.map((el, index) => <View
                    key={el.child_cate + '_cate_name'}
                    className={`child-cate  ${child_cate === el && ' act_child-cate  price'}`}
                    onClick={() => { onClick(el, index) }}
                >
                    {el.child_cate}
                </View>)
            }
        </>
    )
})

function VtabList({
    list,
    skushow,
    setskuShow,
    setSkuData,
    skuData,
}) {
    const [child_cate, setchild_cate] = useState(null);

    const [renderChild, setRenderChild] = useState({
        cate: false,
        pro: [],
    });

    const [arr, setArr] = useState([])

    function autoInfos() {
        let heightArray = []
        setTimeout(() => {
            let query = createSelectorQuery()//创建节点查询器
            query.selectAll('.nodes').boundingClientRect(function (rect) {
                rect.forEach(function (value) {
                    heightArray.push(value.top)
                })
                setArr(heightArray);
            }).exec()
        }, 1000);
    }


    function autoInfos(delay = 600) {
        let heightArray = [];
        setScrollTo(0);
        setTimeout(() => {
            let query = createSelectorQuery()//创建节点查询器
            query.selectAll('.nodes').boundingClientRect(function (rect) {
                rect.forEach(function (value) {
                    heightArray.push(value.top)
                })
                setArr(heightArray);
            }).exec()
        }, delay);
    }

    useEffect(() => {
        if (list) {
            if (list[0]) {
                autoInfos(400);
            } else {
                autoInfos();
            }
        }
    }, [list])

    // 展开子分类
    const [show, setShow] = useState(false);
    const [scrollTo, setScrollTo] = useState('');

    // const selectChild = async (item, index) => {
    //     setScrollTo(arr[index] - arr[0] > 0 ? arr[index] - arr[0] : 0)
    //     setchild_cate(item);
    // };

    const [i, setI] = useState(2);
    const selectChild = async (item, index) => {
        console.log(arr[index] - arr[0], scrollTo, 'scrollTo');
        setI(i - 1);
        let top = arr[index] - arr[0] + 0.0001
        if (scrollTo == top) top = scrollTo + 0.0001
        setScrollTo(top);
        setchild_cate(item);
    };

    return (
        <>
            <>
                {show && <View className='mask' />}
                <View className='child-tab flex' >
                    <View className='child-wrap flex'>
                        <ChildCate list={list} child_cate={child_cate} onClick={selectChild} />
                    </View>
                    <View className='square fc' onClick={() => setShow(!show)}>
                        ^
                    </View>
                </View>
                {show && <View className='show-cate flex'><ChildCate list={list} child_cate={child_cate} onClick={selectChild} /></View>}
                <ScrollView
                    scrollWithAnimation
                    scrollAnchoring
                    scrollY
                    scrollTop={scrollTo}
                    onScroll={scroll}
                    // scrollIntoView={scrollTo}
                    className='fd item-box '
                    style={{ height: `calc(100% - 88rpx)` }}
                >
                    <View style={{ position: 'relative' }}>
                        <RenderList
                            _list={renderChild?.pro[0] ? [renderChild] : list.child}
                            skuOption={
                                { show: skushow, setShow: setskuShow, skuData, setSkuData }
                            }
                        />
                    </View>
                </ScrollView>

            </> :
            <View className='flex item-box'>
                <RenderList _list={[list]} skuOption={
                    { show: skushow, setShow: setskuShow, skuData, setSkuData }
                }
                />
            </View>
        </>
    )
}
export default memo(VtabList);