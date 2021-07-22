/* eslint-disable react/jsx-indent-props */
import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro, { getStorageSync, showModal } from '@tarojs/taro'
import FloatBottom from '@/components/float/FloatBottom';
import Sku from '@/components/page/sku/Sku';
import BlurImg from '@/components/blur-img/BlurImg';
import Banner from '@/components/page/banner/Banner';
import isWeapp from '@/utils/env';
import ProductInfo from './product-info/ProductInfo';
import { callPhone } from '@/common/public';
import { navLinkTo } from '@/common/publicFunc';
import './index.scss'


const Index = () => {
    // sku相关
    const [show, setShow] = useState(false);
    const [service, setService] = useState(false);
    const [pageData, setPageData] = useState(null);
    const [sku, setSku] = useState(null)

    return (
        <View className='product-detail'>
            {/* 商品图片 */}
            <Banner
                h='50vh'
                render={
                    (e) => <BlurImg mode='widthFix' className='img fc' src={e} />
                }
            ></Banner>
            {/* 商品基本信息 */}
            <ProductInfo className='p-16' product={pageData} />

            {/* 打开sku */}
            <View className='act-sku p-16 fb' onClick={() => setShow(3)}>
                <View>
                    选择：<Text className='desc'>{sku?.str || '尺寸 内存 颜色'}</Text>
                </View>
                <Text className='iconfont icon-right' />
            </View>

            {/* 服务详情 */}
            <View className='service fb p-16' onClick={() => setService(true)}>
                <View >
                    <Text className='item'>七天无理由退货</Text>
                    <Text className='item'>48小时发货</Text>
                </View>
                <Text className='iconfont icon-right' />
            </View>

            {/* sku弹框 */}
            <FloatBottom className='sku-float' show={show} setShow={setShow} style={{ backgroundColor: '#fff' }}>
                <Sku show={show} product={pageData} onChange={(e) => {
                    console.log(e, 'sku');
                    if (e) setSku(e);
                }} />
            </FloatBottom>

            {/* 服务弹框 */}
            <FloatBottom className='service-float' show={service} setShow={setService} style={{ backgroundColor: '#fff' }}>
                <View className='service-list'>
                    <View className='title fc' >服务</View>
                    <View className='service-item flex' style={{ alignItems: 'flex-start' }}>
                        <Text className='iconfont icon-shijian' style={{ marginRight: '4%' }}></Text>
                        <View>
                            <View className='service-name'>七天无理由退货</View>
                            <View className='service-spec'>满足条件</View>
                        </View>
                    </View>
                    <View className='service-item flex' style={{ alignItems: 'flex-start' }}>
                        <Text className='iconfont icon-shijian' style={{ marginRight: '4%' }}></Text>
                        <View>
                            <View className='service-name'>48小时发货</View>
                            <View className='service-spec'>满足条件</View>
                        </View>
                    </View>
                </View>
            </FloatBottom>

            <View className='product-desc'>
                <View className='title flex p-16'>
                    商品描述
                </View>
                <BlurImg src={'https://img2.baidu.com/it/u=2790689811,54471194&fm=26&fmt=auto&gp=0.jpg'} />
            </View>

            {/* 底部 */}
            <View className='footer fb'>
                <View className='user'>
                    <View className='item' onClick={(e) => {
                        showModal({
                            title: '提示', content: '确认拨打客服电话',
                            success: (res) => res.confirm && callPhone(e, '213123'),
                        })
                    }}
                    >
                        <Text className='iconfont icon-kefu' />
                        <Text
                            className='QA'
                        >客服</Text>
                    </View>
                    <View className='item' style={{ position: 'relative' }} onClick={() => navLinkTo('cart/index', {}, false)}>
                        <Text className='iconfont icon-gouwucheman'></Text>
                        <Text className='cart' >购物车</Text>
                        <View className='cart_dig' style={{ background: 'red', zIndex: '1', width: '.7rem', height: '.7rem', borderRadius: '50%', position: 'absolute', top: '0', right: '-0.5rem' }}></View>
                    </View>
                </View>
                <View className='handle' >
                    <View className='add_cart' onClick={() => setShow(1)}>加入购物车</View>
                    <View className='buy' onClick={() => setShow(2)}>立即购买</View>
                </View>
            </View>
        </View>
    )
}
export default Index;
