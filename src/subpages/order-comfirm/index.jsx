/* eslint-disable react/jsx-indent-props */
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Input, Textarea, Radio, ScrollView } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, showActionSheet, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'
import { shallowEqual, useSelector } from 'react-redux';
import { navLinkTo } from '@/common/publicFunc';
import BlurImg from '@/components/blur-img/BlurImg';
import Modal from '@/components/modal/Modal';
import Coupon from '@/components/page/coupon/coupon';
import VipCard from './vip-card/vipCard';
import Address from './address/address';
import './index.scss'
import Date from './date/date';
import ProductItem from './product-item/product-item';

const itemList = [{ text: '送货上门', value: '1' }, { text: '自提', value: '1' }];

const Index = () => {
    const store = useSelector(_store => _store, shallowEqual);
    const [payType, setPayType] = useState(1) // 1 微信 2 余额
    // const [otherDat]
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
    const [pre, setPre] = useState(null);
    const commonConfig = store.commonStore.themeConfig;
    const query = Taro.getCurrentInstance().router.params;

    /* 信息配置 */
    const [address, setAddress] = useState(null);
    const [couponShow, setCouponShow] = useState(false);
    const [vpShow, setVpShow] = useState(false);
    const [date, setDate] = useState({
        show: false,
        value: ''
    }); // 送达时间
    const [deliveryMethod, setDeliveryMethod] = useState('2') // 送货方式
    const [modal, setModal] = useState(false);
    const [msg, setMsg] = useState({
        oldmsg: '',
        msg: ''
    });


    const init = async () => {
        // if (getStorageSync('pre-data')) setPre(getStorageSync('pre-data'));
        // else return
        // console.log(getStorageSync('pre-data'));
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
        console.log(date.value,);

    }

    return (
        <View className='order_confirm_wrap'>
            <ScrollView className='scrollview' scrollY >
                <NavBar back title='确认订单' color='#fff' iconColor='#fff' background='linear-gradient(360deg, #FF8C48 0%, #FF6631 100%)' />
                <View className='deliveryMethod flex'>
                    <View className={`tab fc ${deliveryMethod == 1 && 'act-tab'}`} onClick={() => setDeliveryMethod(1)}>配送</View>
                    <View className={`tab fc ${deliveryMethod == 2 && 'act-tab'}`} onClick={() => setDeliveryMethod(2)}>自提</View>
                </View>
                <Address method={deliveryMethod} address={address} date={date} setDate={setDate} />



                <ProductItem pageData={pageData} />
                <ProductItem pageData={pageData} />

                {/* <View className='handle fb' onClick={() => setCouponShow(true)}>
                <View className='left' >优惠券</View>
                <View className='right'>
                    {
                        pageData?.select_coupon?.shop?.activity_coupon_id ? (
                            pageData?.select_coupon?.shop?.type == 2 ? `-¥${pageData?.select_coupon?.shop?.deduction}` : `-¥${pageData?.select_coupon?.shop?.price}`
                        ) :
                            pageData?.shop_coupon.filter(e => e.disable == 0).length + '张可用'
                    }<Text className='iconfont icon-right' />
                </View>
            </View> */}

                {/* <View className='handle fb' onClick={() => setVpShow(true)}>
                <View className='left' >余额/卡</View>
                <View className='right'>
                    {
                        pageData?.select_coupon?.shop?.activity_coupon_id ? (
                            pageData?.select_coupon?.shop?.type == 2 ? `-¥${pageData?.select_coupon?.shop?.deduction}` : `-¥${pageData?.select_coupon?.shop?.price}`
                        ) :
                            pageData?.shop_coupon.filter(e => e.disable == 0).length + '张可用'
                    }<Text className='iconfont icon-right' />
                </View>
            </View> */}
                <View className='handle fb' style={{ height: '100rpx' }} onClick={() => setModal(true)} >
                    <View className='left' >温馨提示</View>
                    <View className='right' style={{ color: '#333' }}>
                        支付成功生成取货码，尺码到店取货
                    </View>
                </View>
                <View className='handle fb' style={{ height: '100rpx' }} onClick={() => setModal(true)} >
                    <View className='left' >买家留言</View>
                    <View className='right'>
                        {msg?.oldmsg || <Text style={{ color: '#999' }}>请输入</Text>}
                    </View>
                </View>

                {/* <View className='handle fd' style={{ height: 'auto' }}>
                <View className='fb' onClick={() => setPayType(1)}>
                    <Text className=''>微信支付</Text>
                    <Radio checked={payType == 1} />
                </View>
                <View className='fb' onClick={() => setPayType(2)}>
                    <Text className=''>余额支付</Text>
                    <Radio checked={payType == 2} />
                </View>
            </View> */}


                <View className='footer flex'>
                    <View className='price-box fd'>
                        <View className='all'>总价：<Text className='price'>¥{pageData?.price}</Text></View>
                        <View className='dis'>已优惠：<Text>¥900</Text></View>
                    </View>
                    <View className='btn fc'
                        onClick={() => {
                            pay();
                        }}
                    >
                        提交订单
                    </View>
                </View>

                {/* couponList -get */}
                {/* <Coupon show={couponShow} setShow={setCouponShow} /> */}
                <Coupon show={couponShow} buttom='0' setShow={setCouponShow} />

                {/* vip card -get */}
                <VipCard show={vpShow} setShow={setVpShow} />

                {/* date */}
                <Date date={date?.value} setDate={(value) => { setDate({ ...date, value }) }} show={date?.show} setShow={() => setDate({ ...date, show: !date?.show })} />

                <Modal
                    title='备注'
                    onOk={() => {
                        setMsg({ ...msg, oldmsg: msg.msg })
                    }}
                    content={
                        <Textarea autoFocus value={msg.msg} className='textarea' onInput={(e) => setMsg({ ...msg, msg: e.detail.value.trim() })} placeholder='' />
                    } show={modal} setShow={setModal}
                />

            </ScrollView>
        </View >
    )
}
export default Index;
