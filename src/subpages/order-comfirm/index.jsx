/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { View, Text, Input, Textarea, Radio, ScrollView } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, navigateBack, removeStorageSync, setStorageSync, showActionSheet, stopPullDownRefresh, useDidShow, usePullDownRefresh } from '@tarojs/taro'
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
import OrderService from '@/services/order';
import AddressService from '@/services/address';
import make_type from '../order/type';

const itemList = [{ text: '送货上门', value: '1' }, { text: '自提', value: '1' }];
const params = {  // 预下单数据结构
    "shop_id": "string",
    "config": {
        "delivery_type": "integer",
        "pay_type": "integer",
        "pay_method": "integer",
        "pay_channel": "integer",
        "user_addressId": "string"
    },
    "sku_items": [
        {
            "sku_id": "string",
            "count": "integer"
        }
    ]
}
// 
const Index = () => {
    const store = useSelector(_store => _store, shallowEqual);
    // const [otherDat]
    const [pageData, setPageData] = useState(
        null
        // {
        //     "shop_id": "1",
        //     "shop_name": "海底捞八佰伴店",
        //     "product": [
        //         {
        //             "product_id": "4",
        //             "product_count": 1,
        //             "shop_name": "海底捞八佰伴店",
        //             "product_name": "美味金枕榴莲",
        //             "spec": "精美盒装;2KG",
        //             market_price: '98000',
        //             discount_price: '88000',
        //             member_price: '68000',
        //             "sale_rice": 16,
        //         }
        //     ],
        //     "product_price": "16.00",
        //     "price": "16.00",
        //     "freight": "0.00",
        //     "shop_coupon": [],
        //     "coupon": [],
        //     "address_id": "",
        //     "coupon_price": "0.00",
        //     "select_coupon": [],
        // }
    );
    const [pre, setPre] = useState(null); // 预下单商品
    const commonConfig = store.commonStore.themeConfig;
    const query = Taro.getCurrentInstance().router.params;

    /* 信息配置 */
    const [address, setAddress] = useState(null); // 收货地址
    const [payType, setPayType] = useState(1) // 1 余额 2 wx 3zfb

    const [date, setDate] = useState({ // 指定时间
        show: false,
        value: ''
    }); // 送达时间
    const [deliveryMethod, setDeliveryMethod] = useState(1) // 送货方式
    const [msg, setMsg] = useState({  // 留言
        oldmsg: '',
        msg: ''
    });

    // 预下单数据结构
    const PreData = useMemo(() => {
        return {
            ...pre,
            // "shop_id": "1",
            "config": {
                "delivery_type": deliveryMethod, // deliveryMethod
                "pay_type": make_type.OrderPayType.OFFLINE,
                "pay_method": make_type.OrderPayMethod.UNKNOWN,
                "pay_channel": make_type.OrderPayChannel.UNKNOWN, // 1 wx 2 zfb
                "user_address_id": address?.address_id || '',
            },
            // "sku_items": [
            //     {
            //         "sku_id": "string",
            //         "count": "integer"
            //     }
            // ]
        }

    }, [address, payType, date, deliveryMethod, pre]);


    const preRequest = async (preData) => {
        const res = await OrderService.preOrder(preData);
        if (res) {
            setPageData(res);
        }
    }

    useEffect(() => {
        console.log(PreData, 'params 下单数据改变');
        if (pre) {
            preRequest(PreData)
        }
    }, [PreData])

    const [modal, setModal] = useState(false);
    const [couponShow, setCouponShow] = useState(false);
    const [vpShow, setVpShow] = useState(false);

    const init = async () => {

    }

    useDidShow(() => {
        if (getStorageSync('pre-data')) setPre(getStorageSync('pre-data'));
    }, [])

    useLayoutEffect(() => {
        if (getStorageSync('back')) {
            navigateBack({
                delta: 1,
                success: () => {
                    removeStorageSync('back');
                }
            })
        }
    })

    const pay = async () => {
        const res = await OrderService.makeOrder({ ...PreData, remark: msg.oldmsg });
        if (res) {
            removeStorageSync('pre-data')
            removeStorageSync('address_id')
            setStorageSync('order_id_detail', res.order_id)
            setStorageSync('back', 2)
            navLinkTo('order/order-detail/index', {});
        }
    }

    return (
        <View className='order_confirm_wrap'>
            <ScrollView className='scrollview' scrollY >
                <View className='' style={{ background: 'linear-gradient(360deg, #FF8C48 0%, #FF6631 100%)' }}>
                    <NavBar back title='确认订单' color='#fff' iconColor='#fff' background='transparent' />
                    <View className='deliveryMethod flex'>
                        <View className={`tab fc ${deliveryMethod == make_type.DeliveryType.DELIVERY && 'act-tab'}`} onClick={() => setDeliveryMethod(make_type.DeliveryType.DELIVERY)}>配送</View>
                        <View className={`tab fc ${deliveryMethod == make_type.DeliveryType.SELF_MENTION && 'act-tab'}`} onClick={() => setDeliveryMethod(make_type.DeliveryType.SELF_MENTION)}>自提</View>
                    </View>
                </View>

                <Address setAddress={setAddress} method={deliveryMethod} address={address} date={date} setDate={setDate} />

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
                <View className='fb' onClick={() => setPayType(2)}>
                    <Text className=''>微信支付</Text>
                    <Radio checked={payType == 2} />
                </View>
                <View className='fb' onClick={() => setPayType(1)}>
                    <Text className=''>余额支付</Text>
                    <Radio checked={payType == 1} />
                </View>
            </View> */}


                <View className='footer flex'>
                    <View className='price-box fd'>
                        <View className='all'>总价：<Text className='price'>¥{pageData?.order_amount}</Text></View>
                        <View className='dis'>已优惠：<Text>¥TODO:</Text></View>
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
