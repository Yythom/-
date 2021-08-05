/* eslint-disable react/jsx-indent-props */
import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { getStorageSync, showModal } from '@tarojs/taro'
import FloatBottom from '@/components/float/FloatBottom';
import BlurImg from '@/components/blur-img/BlurImg';
import Banner from '@/components/page/banner/Banner';
import { callPhone } from '@/common/public';
import { navLinkTo } from '@/common/publicFunc';

import Sku from '@/components/page/sku-hook/sku-hooks';
import { data } from '../../../hooks/sku-utils/data';
import { data2 } from '../../../hooks/sku-utils/data2';
import ProductInfo from './product-info/ProductInfo';
import './index.scss'
import CouponList from '@/components/page/coupon/v-coupon';


const Index = () => {
    // sku相关
    const [show, setShow] = useState(false);
    const [service, setService] = useState(false);
    const [pageData, setPageData] = useState({
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
    });
    const [sku, setSku] = useState(null)

    return (
        <View className='product-detail'>
            <ScrollView scrollY className='scrollview'>
                {/* <View className='' onClick={() => {
                    setPageData({
                        ...pageData,
                        ...data2
                    });
                    setTimeout(() => {
                        setShow(3)
                    }, 100);
                }}>测试猜你喜欢选择</View> */}

                {/* 商品图片 */}
                <Banner
                    list={pageData?.banner}
                    custom
                    h='520rpx'
                    render={
                        (e) => <BlurImg mode='widthFix' className='img fc' src={e} />
                    }
                ></Banner>

                {/* 商品基本信息 */}
                <ProductInfo className='p-16' product={pageData} />

                {/* 打开sku */}
                {/* <View className='act-sku p-16 fb' onClick={() => setShow(3)}>
                    <View>
                        选择：<Text className='desc'>{sku?.desc?.str}</Text>
                    </View>
                    <Text className='iconfont icon-right' />
                </View> */}

                <CouponList bottom='0' />

                {/* 服务详情 */}
                {/* <View className='service fb p-16' onClick={() => setService(true)}>
                    <View>{pageData?.service?.map(e => <Text key={e} className='item'>{e.text}</Text>)} </View>
                    <Text className='iconfont icon-right' />
                </View> */}


                <View className='product-desc'>
                    <View className='title fc'>
                        <View className='v-line' />
                        <Text className='text'>商品信息</Text>
                        <View className='v-line' />
                    </View>
                    <View className='img fdc'>
                        <Image mode='widthFix' src='https://img2.baidu.com/it/u=2790689811,54471194&fm=26&fmt=auto&gp=0.jpg' />
                    </View>
                    .........
                </View>
            </ScrollView>

            {/* sku弹框 */}
            <Sku
                bottom={0}
                show={show}
                setShow={setShow}
                product={pageData}
                onChange={(e) => {
                    if (e) setSku(e);
                }}
            />

            {/* 服务弹框 */}
            {/* <FloatBottom className='service-float' show={service} setShow={setService} style={{ backgroundColor: '#fff' }}>
                <View className='service-list'>
                    <View className='title fc' >服务</View>
                    <View>
                        {pageData?.service?.map(e => <View key={e.text + e.is_true} className='service-item flex' style={{ alignItems: 'flex-start' }}>
                            <Text className='iconfont icon-shijian' style={{ marginRight: '4%' }}></Text>
                            <View>
                                <View className='service-name'>{e.text}</View>
                                <View className='service-spec'>{e.is_true ? '满足条件' : '不满足条件'}</View>
                            </View>
                        </View>)}
                    </View>
                </View>
            </FloatBottom> */}


            {/* 底部 */}
            <View className='footer fb'>
                <View className='user'>
                    <View className='item' style={{ position: 'relative' }} onClick={() => navLinkTo('cart/index', {}, false)}>
                        <Text className='iconfont icon-gouwucheman'></Text>
                        <Text className='cart' >购物车</Text>
                        {/* <View className='cart_dig' style={{ background: 'red', zIndex: '1', width: '.7rem', height: '.7rem', borderRadius: '50%', position: 'absolute', top: '0', right: '-0.5rem' }}></View> */}
                    </View>
                </View>
                <View className='handle' >
                    <View className='add_cart fc' onClick={() => setShow(1)}>加入购物车</View>
                    {/* <View className='buy fc' onClick={() => setShow(2)}>立即购买</View> */}
                </View>
            </View>
        </View >
    )
}
export default Index;
