/* eslint-disable react/jsx-indent-props */
import React, { Fragment, memo, useEffect, useState } from "react";
import { Text, Textarea, View, Image, Radio } from "@tarojs/components";
import { getStorageSync, setStorageSync, useDidShow } from "@tarojs/taro";
import { shallowEqual, useSelector } from "react-redux";
import Drop from "@/components/drop/DropDwon";
import './pay-type.scss';
import make_type from "../../order/type";

const PayType = memo(({
    payType,
    setPayType,
    method = make_type.DeliveryType.DELIVERY,
}) => {
    const userStore = useSelector(e => e.userStore, shallowEqual);

    const [dropShow, setDropShow] = useState(false)

    useEffect(() => {
        setPayType(make_type.OrderPayChannel.WECHAT);
    }, [method])

    return (
        <Fragment>
            <View className='pay-type' style={{ marginTop: '20rpx' }} >
                {
                    method == make_type.DeliveryType.SELF_MENTION && <View className='handle fd' style={{ minHeight: '100rpx', height: 'auto' }}>
                        <View className='fb' >
                            <Text className=''>线下支付</Text>
                            <Radio color='#00D0BF' checked={payType == 'OFFLINE'} onClick={() => setPayType('OFFLINE')} />
                        </View>
                    </View>
                }

                <View className='handle fd' style={{ minHeight: '100rpx', height: 'auto' }}>
                    <View className='fb' >
                        <Text className=''>微信支付</Text>
                        <Radio color='#00D0BF' checked={payType == make_type.OrderPayChannel.WECHAT} onClick={() => setPayType(1)} />
                    </View>
                </View>
                {/* <View className='handle fb' onClick={() => setDropShow(!dropShow)} style={{ minHeight: '100rpx', height: 'auto' }}>
                    <View className='fb' >
                        <Text className=''>电子支付</Text>
                    </View>
                    {
                        dropShow ? <Text className='iconfont icon-fold'></Text> : <Text className='iconfont icon-unfold'></Text>
                    }
                </View> */}
                <Drop
                    spaceName='test'
                    itemHeight='auto'
                    show={dropShow}
                    mask={false}
                    setShow={setDropShow}
                    onChange={(type) => {
                        setPayType(type.value)
                        console.log('选择了=----', type);
                    }}
                    list={[
                        {
                            text: <View className='handle fd' style={{ minHeight: '100rpx', height: 'auto', alignItems: "flex-end" }}>
                                <View className='fb' style={{ width: '100%', height: '80rpx', fontSize: '28rpx' }}>
                                    <Text className=''>会员卡支付</Text>
                                    <Text >可用余额 <Text style={{ fontWeight: 'bold' }}>¥233.00</Text></Text>
                                    {/* 余额不足不展示 */}
                                    {/* <Radio checked={payType ==  make_type.OrderPayChannel.UNKNOWN}  onClick={() => setPayType( make_type.OrderPayChannel.UNKNOWN)} /> */}
                                </View>
                                <View style={{ color: '#999', fontSize: '28rpx' }}>
                                    余额不足 <Text className='theme-color '>充值</Text>
                                </View>
                            </View>,
                            value: make_type.OrderPayChannel.UNKNOWN

                        },
                        {
                            text: <View className='handle fd' style={{ minHeight: '100rpx', height: 'auto' }}>
                                <View className='fb' >
                                    <Text className=''>微信支付</Text>
                                    <Radio color='#00D0BF' checked={payType == make_type.OrderPayChannel.WECHAT} />
                                </View>
                            </View>,
                            value: make_type.OrderPayChannel.WECHAT
                        }
                    ]}
                />

            </View >
        </Fragment >
    )
})

export default PayType;