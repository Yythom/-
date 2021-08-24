/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { View, Text, Input, Textarea, Radio, ScrollView } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, navigateBack, navigateTo, redirectTo, reLaunch, removeStorageSync, setStorageSync, showActionSheet, showToast, stopPullDownRefresh, useDidShow, usePullDownRefresh } from '@tarojs/taro'
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
import np from 'number-precision'
import make_type from '../order/type';
import Drop from '@/components/drop/DropDwon';
import PayType from './pay-type/pay-type';
import WxPay, { payment } from '@/utils/wxpay';

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
    const [tell, setTell] = useState(getStorageSync('info').mobile)

    /* 信息配置 */
    const [address, setAddress] = useState(null); // 收货地址
    const [payType, setPayType] = useState(make_type.OrderPayChannel.WECHAT) //  // 0 余额 1 wx 2 zfb  OFFLINE 线下

    const [date, setDate] = useState({ // 指定时间
        show: true,
        value: ''
    }); // 送达时间
    const [deliveryMethod, setDeliveryMethod] = useState(make_type.DeliveryType.DELIVERY) // 送货方式
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
                "pay_type": (payType === 'OFFLINE' && deliveryMethod == make_type.DeliveryType.SELF_MENTION)
                    ? make_type.OrderPayType.OFFLINE
                    : make_type.OrderPayType.ONLINE,
                "pay_method": typeof payType === 'number' ? (payType == make_type.OrderPayChannel.UNKNOWN
                    ? make_type.OrderPayMethod.MEMBER_BALANCE
                    : make_type.OrderPayMethod.ONLINE_PAY) : 0,
                "pay_channel": typeof payType === 'number' ? payType : 0, // 0余额 1 wx 2 zfb  OFFLINE 线下
                "user_address_id": address?.address_id || '',
            },
            self_mention: make_type.DeliveryType.DELIVERY != deliveryMethod ? {
                name: getStorageSync('info').nickname,
                mobile: tell,
                date: ''
            } : {
                name: '',
                mobile: '',
                date: ''
            }
            // "sku_items": [
            //     {
            //         "sku_id": "string",
            //         "count": "integer"
            //     }
            // ]
        }

    }, [address, payType, date, deliveryMethod, pre, tell]);


    const preRequest = async (preData) => {
        const res = await OrderService.preOrder(preData);
        if (res) {
            setPageData(res);
            // setAddress({address: res.shop.shop_address + res.shop.shop_address_number})
        }
    }

    useEffect(() => {
        console.log(PreData, 'params 下单数据改变');
        if (pre) {
            if (deliveryMethod == make_type.DeliveryType.DELIVERY) {
                if (address) preRequest(PreData);
            } else {
                preRequest(PreData)
            }
        }
    }, [PreData])

    const [modal, setModal] = useState(false);
    const [couponShow, setCouponShow] = useState(false);
    const [vpShow, setVpShow] = useState(false);

    const init = async () => {

    }

    useDidShow(() => {
        if (getStorageSync('back')) {
            navigateBack({
                delta: 1,
                success: () => {
                    removeStorageSync('back');
                }
            })
        }
        if (getStorageSync('pre-data')) setPre(getStorageSync('pre-data'));
    })

    function pay_clear(order_id) {
        // removeStorageSync('pre-data')
        removeStorageSync('address_id')
        setStorageSync('order_id_detail', order_id)
        setStorageSync('back', 2);
        setTimeout(() => {
            navLinkTo('order/order-detail/index', {})
        }, 200);
    }

    const pay = async () => {
        const res = await OrderService.makeOrder({ ...PreData, remark: msg.oldmsg, });
        if (!res) return
        if (payType == 1) {
            const pay_params = await WxPay.getPayOrderParams(res.order_id, 1)
            if (pay_params) {
                let result = await payment(pay_params)
                if (result) {
                    setTimeout(() => {
                        showToast({ title: '支付成功', icon: 'success' })
                    }, 400);
                } else {
                    showToast({ title: '支付失败', icon: 'none' })
                }
                // pay_clear(res.order_id)
            }
        } else { }
        pay_clear(res.order_id)

    }

    return (
        <View className='order_confirm_wrap' >
            <ScrollView className='scrollview' scrollY >
                <View className='' style={{ background: '#00D0BF', paddingBottom: '20rpx' }}>
                    <NavBar back title='确认订单' color='#fff' iconColor='#fff' background='#00D0BF' />
                    <View className='deliveryMethod flex'>
                        <View className='deliveryMethod-bg'>
                            <View className={`tab fc ${deliveryMethod == make_type.DeliveryType.DELIVERY && 'act-tab'}`} onClick={() => setDeliveryMethod(make_type.DeliveryType.DELIVERY)}>配送</View>
                            <View className={`tab fc ${deliveryMethod == make_type.DeliveryType.SELF_MENTION && 'act-tab'}`} onClick={() => setDeliveryMethod(make_type.DeliveryType.SELF_MENTION)}>自提</View>
                        </View>
                    </View>
                    <Address
                        setTell={setTell}
                        pre_data={pageData}
                        setAddress={setAddress} method={deliveryMethod} address={
                            deliveryMethod == make_type.DeliveryType.DELIVERY ? address : {
                                address: pageData?.shop?.shop_address + pageData?.shop?.shop_address_number
                            }
                        }
                        date={date}
                        setDate={setDate}
                    />
                </View>
                <ProductItem pageData={pageData} />
                <View style={{ background: '#fff' }}>
                    <View className='order-desc'>
                        {pageData?.order_fee?.map((item) => {
                            return <View key={item.fee_type_msg} className='item fb'>{item.fee_type_msg}：<Text >&nbsp;¥{np.times(item.fee || 0, 1)}</Text> </View>
                        })}
                        {pageData?.order_discount?.map((item) => {
                            return <View key={item.fee_type_msg} className='item fb'>{item.detail}：<Text >-&nbsp;¥{np.times(item.amount || 0, 1)}</Text> </View>
                        })}
                    </View>
                </View>


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

                {/* <View className='handle fb' style={{ marginTop: '20rpx' }}>
                    <View className='left' >活动优惠</View>
                    <View className='right'>
                        <Text className='price-color'>
                            ¥{pageData?.order_discount_amount}
                        </Text>
                    </View>
                </View> */}
                {/* <View className='handle fb' onClick={() => setCouponShow(true)}>
                    <View className='left' >优惠券</View>
                    <View className='right' style={{ color: '#999' }}>
                        {
                            // pageData?.select_coupon?.shop?.activity_coupon_id ? (
                            //     pageData?.select_coupon?.shop?.type == 2 ? `-¥${pageData?.select_coupon?.shop?.deduction}` : `-¥${pageData?.select_coupon?.shop?.price}`
                            // ) :
                            //     pageData?.shop_coupon?.filter(e => e.disable == 0).length + '张可用'
                        }
                        暂无 <Text className='iconfont icon-right' />
                    </View>
                </View> */}

                <View className='handle fb' style={{ height: '100rpx', marginTop: '20rpx' }} onClick={() => setModal(true)} >
                    <View className='left' >备注</View>
                    <View className='right'>
                        {msg?.oldmsg || <Text style={{ color: '#999' }}>请输入</Text>}
                    </View>
                </View>
                {
                    deliveryMethod === make_type.DeliveryType.SELF_MENTION && <View className='handle fb' style={{ height: '100rpx' }} onClick={() => setModal(true)} >
                        <View className='left' >温馨提示</View>
                        <View className='right' style={{ color: '#333' }}>
                            支付成功生成取货码，持码到店取货
                        </View>
                    </View>
                }

                <PayType payType={payType} setPayType={setPayType} method={deliveryMethod} />


                {/* couponList -get */}
                {/* <Coupon show={couponShow} setShow={setCouponShow} /> */}
                {/* <Coupon show={couponShow} bottom={0} setShow={setCouponShow} /> */}

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
            <View className='footer flex'>
                <View className='price-box fd'>
                    <View className='all'>总价：<Text className='price'>¥{np.times(pageData?.order_amount || 0, 1)}</Text></View>
                    <View className='dis'>已优惠：<Text>¥{np.times(pageData?.order_discount_amount || 0, 1)}</Text></View>
                </View>
                <View className='btn fc'
                    onClick={() => {
                        pay();
                    }}
                >
                    提交订单
                </View>
            </View>
        </View >
    )
}
export default Index;
