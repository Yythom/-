/* eslint-disable react/jsx-indent-props */
import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { getStorageSync, removeStorageSync, setStorageSync, showModal, showShareMenu, showToast, useDidShow, useShareAppMessage } from '@tarojs/taro'
import FloatBottom from '@/components/float/FloatBottom';
import BlurImg from '@/components/blur-img/BlurImg';
import Banner from '@/components/page/banner/Banner';
import { callPhone } from '@/common/public';
import { navLinkTo } from '@/common/publicFunc';
import CouponList from '@/components/page/coupon/v-coupon';
import Sku from '@/components/page/sku-hook/sku-hooks';
import ProductService from '@/services/product';
import CartService from '@/services/cart';
import { actions } from '@/store/userSlice';
import { useDispatch } from 'react-redux';
import ProductInfo from './product-info/ProductInfo';
import filter_data from '../../../hooks/sku-utils/data_filter';
import './index.scss'

const Index = () => {
    const dispatch = useDispatch();
    // sku相关
    const [show, setShow] = useState(false);
    const [service, setService] = useState(false);
    const [pageData, setPageData] = useState(null);
    const [sku, setSku] = useState(null)
    const query = Taro.getCurrentInstance().router.params;

    const init = async () => {
        removeStorageSync('address_id')
        console.log(query.product_id, 'product_id');
        const res = await ProductService.getProductDataApi(query.product_id);
        setPageData({ ...filter_data(res) })
    }

    useDidShow(() => {
        showShareMenu();
    })

    useEffect(() => {
        init()
    }, [])

    return (
        <View className='product-detail'>
            <ScrollView scrollY className='scrollview'>
                {/* <View className='' onClick={() => {
                    setPageData({
                        ...pageData,
                        ...data2
                    });
                    setTimeout(() => {
                        setShow(1)
                    }, 100);
                }}>测试猜你喜欢选择</View> */}

                {/* 商品图片 */}
                <Banner
                    list={pageData?.product_images}
                    custom
                    h='520rpx'
                    render={
                        (e) => <BlurImg mode='widthFix' className='img fc' src={e?.url} />
                    }
                ></Banner>

                {/* 商品基本信息 */}
                <ProductInfo className='p-16' product={pageData} />

                {/* 打开sku */}
                {/* <View className='act-sku p-16 fb' onClick={() => setShow(1)}>
                    <View>
                        选择：<Text className='desc'>{sku?.desc?.str}</Text>
                    </View>
                    <Text className='iconfont icon-right' />
                </View> */}

                {/* <CouponList bottom='0' /> */}

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
                    {pageData?.product_description.description
                        ? <mp-html
                            container-style='white-space:nowrap;'
                            content={pageData?.product_description.description.trim()}
                        /> : null
                    }

                    {/* <View className='img fdc'>
                    {/* <Image mode='widthFix' src={pageData?.product_description?.description_image} /> */}
                    {/* </View> */}
                </View>
            </ScrollView>

            {/* sku弹框 */}
            {
                pageData && <Sku
                    bottom={0}
                    show={show}
                    setShow={setShow}
                    product={pageData}
                    onChange={(e) => {
                        if (e) setSku(e);
                    }}
                />
            }


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
                    <View className='item' style={{ position: 'relative' }} onClick={() => navLinkTo('cart/index', {})}>
                        <Image style={{ width: '48rpx', height: '48rpx' }} src={require('../../../assets/images/gouwuceweixuan.png')} />
                        <Text className='cart' >
                            购物车
                        </Text>
                        {/* <View className='cart_dig' style={{ background: 'red', zIndex: '1', width: '.7rem', height: '.7rem', borderRadius: '50%', position: 'absolute', top: '0', right: '-0.5rem' }}></View> */}
                    </View>
                </View>
                <View className='handle' >
                    <View className='add_cart fc' onClick={async () => {
                        setShow(1)
                    }}>加入购物车</View>
                    {/* <View className='buy fc' onClick={() => setShow(2)}>立即购买</View> */}
                </View>
            </View>


        </View >
    )
}
export default Index;
