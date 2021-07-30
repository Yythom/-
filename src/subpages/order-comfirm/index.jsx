/* eslint-disable react/jsx-indent-props */
import React, { useLayoutEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'
import { shallowEqual, useSelector } from 'react-redux';
import { navLinkTo } from '@/common/publicFunc';
import BlurImg from '@/components/blur-img/BlurImg';
import FloatBottom from '@/components/float/FloatBottom';
import './index.scss'


const Index = () => {
    const store = useSelector(_store => _store, shallowEqual);
    const [pageData, setPageData] = useState(
        {
            "shop_id": "1",
            "shop_name": "海底捞八佰伴店",
            "product": [
                {
                    "product_id": "4",
                    "sku_id": "496659177565979648",
                    "promotion_id": "0",
                    "number": 1,
                    "stock": "350",
                    "original_price": 16,
                    "promotion_price": "0.00",
                    "activity_promotion_product_id": 0,
                    "shop_name": "海底捞八佰伴店",
                    "product_name": "美味金枕榴莲",
                    "spec": "精美盒装;2KG",
                    "sale_rice": 16,
                    "image": "https://haoshengri-produce.oss-cn-shanghai.aliyuncs.com/admin/2021-07-27/4d06190a529e9075c054a1336b596223.png",
                    "total_price": "16.00"
                }
            ],
            "product_price": "16.00",
            "price": "16.00",
            "freight": "0.00",
            "shop_coupon": [],
            "coupon": [],
            "address_id": "",
            "coupon_price": "0.00",
            "select_coupon": [],
        }
    );
    const [address, setAddress] = useState(null);
    const [pre, setPre] = useState(null);
    const commonConfig = store.commonStore.themeConfig;
    const query = Taro.getCurrentInstance().router.params;
    const [couponShow, setCouponShow] = useState(false);

    const init = async () => {
        if (getStorageSync('pre-data')) setPre(getStorageSync('pre-data'));
        else return
        console.log(getStorageSync('pre-data'));
        setAddress({
            "user_address_id": "496678785819739136",
            "username": "yy",
            "mobile": "13145216024",
            "address": "江苏省镇江市润州区213",
            "is_default": 1
        })
    }

    useLayoutEffect(() => {
        init();
    }, [])

    const pay = async () => {

    }

    return (
        <View className='order_confirm_wrap'>
            {/* <NavBar back title='确认订单' /> */}
            <View className='address_wrap fb' onClick={() => navLinkTo('address/address-list/index', {})}>
                <View className='flex'>
                    <Text className='iconfont icon-dingwei'></Text>
                    <View className='s_address'>
                        {
                            address ? <>
                                <View>{address.username}<Text className='phone'>{address.mobile}</Text> </View>
                                <View className='address'>
                                    <Text >
                                        {address.address}
                                    </Text>
                                </View>
                            </> : <>
                                <View>选择收货地址</View>
                            </>
                        }

                    </View>
                </View>

                <View className='iconfont icon-right'></View>
            </View>

            <View className='pruduct_wrap'>
                <View className='shop_name' onClick={() => navLinkTo('/subpages/online_shop_product_list/index', { shop_id: pageData?.shop_id })}><Text className='iconfont icon-shangpu' />{pageData?.shop_name} <Text className='iconfont icon-right' style={{ color: '#999', fontSize: '32rpx' }}></Text></View>
                {
                    (pageData && pageData.product.length > 0) && pageData.product.map(e => {
                        return <View key={e.product_id + '__product'} className='product_item'>
                            <BlurImg className='img' src={e.image} />
                            <View className='center fd'>
                                <View className='product_name'>{e.product_name}</View>
                                <View className='desc'>
                                    <View className='product_sku'>{e.spec}</View>
                                    <View className='product_price'><Text className='moneny'>¥</Text>{e.activity_promotion_product_id != 0 ? e.promotion_price : e.sale_rice}</View>
                                </View>
                            </View>
                            <View className='num'>x{e.number}</View>
                        </View>
                    })
                }
                <View className='fb'>
                    <View className='left'>商品金额</View>
                    <View className='right'>¥{pageData?.product_price}</View>
                </View>
                <View className='fb'>
                    <View className='left'>运费</View>
                    <View className='right'>¥{pageData?.freight}</View>
                </View>



            </View>

            <View className='get_coupon fb' onClick={() => setCouponShow(true)}>
                <View className='left' >优惠券</View>
                <View className='right'>
                    {
                        pageData?.select_coupon?.shop?.activity_coupon_id ? (
                            pageData?.select_coupon?.shop?.type == 2 ? `-¥${pageData?.select_coupon?.shop?.deduction}` : `-¥${pageData?.select_coupon?.shop?.price}`
                        ) :
                            pageData?.shop_coupon.filter(e => e.disable == 0).length + '张可用'
                    }<Text className='iconfont icon-right' />
                </View>
            </View>

            <View className='footer flex'>
                <Text className='price'> 实付金额 <Text className='price'><Text className='monent'>¥</Text>
                    <Text className='p'>{pageData?.price}</Text></Text></Text>
                <View className='btn'
                    onClick={() => {
                        pay();
                    }}
                >提交订单</View>
            </View>

            {/* couponList -get */}
            {
                // pageData?.coupon[0] &&
                <FloatBottom
                    className='coupon-list'
                    style={{ backgroundColor: '#fff' }}
                    show={couponShow}
                    setShow={setCouponShow}
                    hideFn={() => {

                    }}
                >
                    <View className='coupons_wrap' style={{ height: '900rpx' }}>
                        <View className='iconfont icon-close' onClick={() => { setCouponShow(false) }}></View>
                        <View className='title fc'>选择优惠券</View>
                        <View className='scroll_wrap'>
                            {
                                !pageData?.coupon[0]
                                    ? <View className='empty fd'>
                                        <Text className='icon-kaquan iconfont'></Text>
                                        <View className=''>暂无优惠券</View>
                                    </View>
                                    : pageData?.coupon.map((e, i) => {
                                        return <View className='item' key={i + 'coupon'}>
                                            优惠券
                                        </View>
                                    })
                            }
                        </View>
                    </View>
                </FloatBottom>
            }
        </View >
    )
}
export default Index;
