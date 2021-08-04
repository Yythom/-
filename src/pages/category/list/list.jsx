/* eslint-disable react/jsx-indent-props */
import React, { Fragment, memo, useCallback, useMemo, useState } from 'react';
import { View, Button, Text, Image, ScrollView } from '@tarojs/components';
import { navLinkTo } from '@/common/publicFunc';
import { getStorageSync, showToast } from '@tarojs/taro';
import { data } from '../../../../hooks/sku-utils/data';
import { data2 } from '../../../../hooks/sku-utils/data2';

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
const RenderList = memo(({ _list, skuOption, i, setI }) => {
    const { show, setShow, setSkuData, skuData } = skuOption;
    console.log(skuOption, 'skuOption');
    const showSku = async () => {
        if (i == 10) {
            setSkuData({
                banner: [
                    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Frms.zhubajie.com%2Fresource%2Fredirect%3Fkey%3Dtianpeng%2F2015-11%2F14%2Fproduct%2F5646e9d57392f.jpg&refer=http%3A%2F%2Frms.zhubajie.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627814294&t=e6cb81b058f3d72d7010bf9807454ca6',
                    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0199a155c4790f32f8755e6604d4d5.jpg%402o.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627814294&t=14fc2c22a65d51c914e0da8788a59445'
                ],
                product_id: '101',
                price: '11',
                sale_price: '22',
                sale: '80',
                product_name: '【6期免息 学生领券至高减300】一加OnePlus 9手机骁龙888旗舰120Hz屏幕游戏智能拍照一加丨哈苏手机影像系统',
                service: [
                    {
                        text: '七天无理由退货',
                        is_true: 1,
                    }, {
                        text: '48小时发货',
                        is_true: 0,
                    }
                ],
                ...data2
            })
        } else {
            setSkuData({
                banner: [
                    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Frms.zhubajie.com%2Fresource%2Fredirect%3Fkey%3Dtianpeng%2F2015-11%2F14%2Fproduct%2F5646e9d57392f.jpg&refer=http%3A%2F%2Frms.zhubajie.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627814294&t=e6cb81b058f3d72d7010bf9807454ca6',
                    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0199a155c4790f32f8755e6604d4d5.jpg%402o.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627814294&t=14fc2c22a65d51c914e0da8788a59445'
                ],
                product_id: '101',
                price: '6999',
                sale_price: '5999',
                sale: '80',
                product_name: '【6期免息 学生领券至高减300】一加OnePlus 9手机骁龙888旗舰120Hz屏幕游戏智能拍照一加丨哈苏手机影像系统',
                service: [
                    {
                        text: '七天无理由退货',
                        is_true: 1,
                    }, {
                        text: '48小时发货',
                        is_true: 0,
                    }
                ],
                ...data
            })
        }
        setTimeout(() => {
            setShow(3);
            setI(10)
        }, 100);
    }

    return _list?.map((e, i) => {
        return (
            <Fragment key={e?.child_cate + 'cate-title' + i}>
                {/* 迭代 */}
                {/* {e?.child_cate && <View id={`catetitle${i}`}>{e.child_cate}</View>} */}
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
                                        }}></View>
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
    const [i, setI] = useState(1) // 测试用

    const [renderChild, setRenderChild] = useState({
        cate: false,
        pro: [],
    });

    // 展开子分类
    const [show, setShow] = useState(false);
    // const [scrollTo, setScrollTo] = useState(0);

    const selectChild = useCallback(async (item, index) => {
        // setScrollTo(`catetitle${index}`)
        let child_list = list.child.filter(e => e.child_cate === item.child_cate)[0];
        if (child_cate == item) {
            console.log(list.child);
            setRenderChild(null);
            setchild_cate(null);
            return
        }
        if (child_list?.pro[0]) {
            console.log(child_list, 'child_list');
            setRenderChild(child_list);
            setchild_cate(item);
        } else showToast({ title: '该分类暂无商品', icon: 'none', });

    }, [child_cate, list]);

    const IsTabsRenderList = () => {
        return list.child ?
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
                    // scrollIntoView={scrollTo}
                    className='fd item-box '
                    style={{ height: `calc(100% - 88rpx)` }}
                >
                    <RenderList
                        _list={renderChild?.pro[0] ? [renderChild] : list.child}
                        skuOption={
                            { show: skushow, setShow: setskuShow, skuData, setSkuData }
                        }
                        i={i}
                        setI={setI}
                    />
                </ScrollView>

            </> :
            <View className='flex item-box'>
                <RenderList _list={[list]} skuOption={
                    { show: skushow, setShow: setskuShow, skuData, setSkuData }
                }
                    i={i}
                    setI={setI}
                />
            </View>
    }

    return (
        <>
            <IsTabsRenderList />
        </>
    )
}
export default memo(VtabList);