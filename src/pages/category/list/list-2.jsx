/* eslint-disable react/jsx-indent-props */
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, Button, Text, Image, ScrollView } from '@tarojs/components';
import { navLinkTo, RefInfo } from '@/common/publicFunc';
import { createSelectorQuery, getStorageSync, showToast } from '@tarojs/taro';
import ProductService from '@/services/product';
import SkewText from '@/components/page/skew-text/SkewText';
import { min_max_price_format } from '@/common/utils';
// import { data, onlineData } from '../../../../hooks/sku-utils/data';
import filter_data from '../../../../hooks/sku-utils/data_filter';

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
const RenderList = memo(({ twoCate, _list, skuOption }) => {
    const { show, setShow, setSkuData, skuData } = skuOption;
    const showSku = async (product_id) => {
        const res = await ProductService.getProductDataApi(product_id);
        setSkuData({ ...filter_data(res) })
        setTimeout(() => {
            setShow(1);
        }, 100);
    }
    return twoCate?.map((cate, i) => {
        return (
            <Fragment key={cate?.category_id + 'cate-title' + i}>
                <View
                    style={{ position: 'sticky', top: '0', height: cate.category_name ? '80rpx' : '20rpx', zIndex: '1', background: '#fff', boxSizing: 'border-box', paddingLeft: '20rpx' }}
                    className='nodes flex' id={`catetitle${i}`}
                >
                    {cate.category_name}
                </View>
                {
                    cate?.products?.map(product => {
                        return (
                            /* 迭代样式 */
                            // <View className='fd item' onClick={() => navLinkTo('product-list/index', {})} key={e.child_cate + product.name + '_product'}>
                            //     <BlurImg className='img' src={product.image} />
                            //     <View className='text'>{product.name}</View>
                            // </View>
                            <View className='flex item' onClick={() => navLinkTo('product-detail/index', { product_id: product.product_id })} key={cate.category_id + product.product_name + '_product'}>
                                <Image className='img' mode='aspectFill' src={product.cover}></Image>
                                <View className='content fd'>
                                    <View className='name'>{product.product_name}</View>

                                    {product.tags && <View className='desc flex'>
                                        {
                                            product.tags.map(tag => {
                                                return (<View className='desc-item fc' key={tag}>{tag.name}</View>)
                                            })
                                        }
                                    </View>}

                                    <View className='price-box fb'>
                                        <View className='price flex'>
                                            <View style={{ marginRight: '20rpx' }}>{min_max_price_format(product?.max_discount_price, product?.discount_price)}</View>
                                            {product?.market_price !== '0.00' && <View className='del'>{product?.market_price}</View>}
                                        </View>

                                    </View>
                                    <View className='foot fb'>
                                        <SkewText
                                        // text={['会员价格', '¥' +  min_max_price_format(product?.max_member_price, product?.member_price)]}
                                        />
                                        {/* <View className='vip-price fc'>¥{product.member_price + '起'}</View> */}
                                        {/* <View className='sale'>月售{'TODO:'}</View> */}
                                        <View className='show-sku' onClick={(event) => {
                                            event.stopPropagation();
                                            showSku(product.product_id)
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
const ChildCate = memo(({ twoCate, child_cate, onClick }) => {
    return (
        <>
            {
                twoCate.map((el, index) => <View
                    key={el.category_id + '_cate_name'}
                    className={`child-cate  ${child_cate === el && ' act_child-cate  price'}`}
                    onClick={() => { onClick(el, index) }}
                >
                    {el.category_name}
                </View>)
            }
        </>
    )
})

function VtabList({
    twoCate,
    // list,
    skushow,
    setskuShow,
    setSkuData,
    skuData,
}) {
    const [child_cate, setchild_cate] = useState(null);
    const [arr, setArr] = useState([])

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
        if (twoCate) {
            if (twoCate[0]) {
                autoInfos(400);
                setchild_cate(twoCate[0])
            } else {
                autoInfos();
            }
        }
    }, [twoCate])

    const scroll = (e) => {
        if (arr[0]) {
            let indexArr = []
            let initTop = arr[0];
            let scrollTop = e.detail.scrollTop;
            arr.forEach((el, index) => {
                let top = el - initTop
                if (top - scrollTop < 40) {
                    // console.log(index, 'index');
                    // if(i>index)
                    indexArr.push(index)
                }
            })
            // selectChild(twoCate[indexArr[indexArr.length - 1]], indexArr.length - 1)
            setchild_cate(twoCate[indexArr[indexArr.length - 1]]);
        }

        // console.log(;
    }

    // 展开子分类
    const [show, setShow] = useState(false);
    const [scrollTo, setScrollTo] = useState(0);
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
            {
                twoCate[0] ?
                    <>
                        {show && <View className='mask' />}
                        <View className='child-tab flex' >
                            <View className='child-wrap flex'>
                                <ChildCate twoCate={twoCate} child_cate={child_cate} onClick={selectChild} />
                            </View>
                            <View className='square fc' onClick={() => setShow(!show)}>
                                {show ? <Text className='iconfont icon-fold'></Text> : <Text className='iconfont icon-unfold'></Text>}
                            </View>
                        </View>
                        {show && <View className='show-cate flex'><ChildCate twoCate={twoCate} child_cate={child_cate} onClick={selectChild} /></View>}
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
                                    twoCate={twoCate}
                                    skuOption={
                                        { show: skushow, setShow: setskuShow, skuData, setSkuData }
                                    }
                                />
                                {/* <View className='' style={{ position: 'sticky', top: '0', zIndex: '1', height: '1200rpx', width: '100%', background: '#ccc' }}>测试滚动的</View> */}

                            </View>
                        </ScrollView>
                    </>
                    :
                    <ScrollView
                        scrollY
                        className='fd item-box '
                        style={{ height: `100%` }}
                    >
                        <RenderList
                            twoCate={[{
                                category_id: "282567792807702528",
                                category_name: "",
                                image: "",
                                products: twoCate[0].products
                            }]}
                            skuOption={
                                { show: skushow, setShow: setskuShow, skuData, setSkuData }
                            }
                        />
                    </ScrollView>
            }
        </>
    )
}
export default memo(VtabList);