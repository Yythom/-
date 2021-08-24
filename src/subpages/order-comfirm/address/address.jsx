/* eslint-disable react/jsx-indent-props */
import React, { Fragment, memo, useEffect, useState } from "react";
import { Text, Textarea, View, Image } from "@tarojs/components";
import { navLinkTo } from "@/common/publicFunc";
import Modal from "@/components/modal/Modal";
import { isPhoneNumber } from "@/common/public";
import { getStorageSync, setStorageSync, useDidShow } from "@tarojs/taro";
import AddressService from "@/services/address";
import make_type from "../../order/type";
import './address.scss';
import { shallowEqual, useSelector } from "react-redux";

const Address = memo(({
    address,
    setAddress,
    date,
    setDate,
    pre_data,
    setTell,
    method = make_type.DeliveryType.DELIVERY,
}) => {
    const userStore = useSelector(e => e.userStore, shallowEqual);

    const [msg, setMsg] = useState({
        oldmsg: userStore?.userInfo?.mobile || '',
        msg: userStore?.userInfo?.mobile || '',
    });
    const [modal, setModal] = useState(false);

    const init = async () => {
        if (method == make_type.DeliveryType.DELIVERY) {
            if (getStorageSync('address_id')) {
                console.log(getStorageSync('address_id'), 'adderss-id');
                setAddress(getStorageSync('address_id'))
            } else {
                AddressService.defaultAddress().then(res => {
                    if (res) {
                        setStorageSync('address_id', res);
                        setAddress(res)
                    }
                })
            }
        } else {
            // req 地址
            // AddressService.defaultAddress().then(res => {
            //     if (res) {
            //         setAddress(address)
            //     }
            // })
        }
    }

    useDidShow(() => {
        init()
    })

    useEffect(() => {
        console.log(method, address, 'methodmethodmethod');
        init()
        setDate({ date: '', show: false })
    }, [method]);

    if (!address) return method == make_type.DeliveryType.DELIVERY && <View className='address_wrap fd' onClick={() => navLinkTo('address/address-list/index', {})} ><View className='s_address' >
        <View>选择收货地址</View>
        <View className='iconfont icon-right'></View>
    </View>
    </View >
    return (
        <Fragment>
            <View className='address_wrap fd' style={!address?.address && { paddingBottom: '25rpx' }} >
                {
                    method == make_type.DeliveryType.DELIVERY
                        ? <View className='s_address' onClick={() => navLinkTo('address/address-list/index', {})}>
                            <View className='address flex'>
                                {/* <View className='flex'> */}
                                <Image src={require('../../../../assets/images/shouhuodizhilvse.png')} style={{ height: '34rpx', width: '34rpx', verticalAlign: 'middle', marginRight: '10rpx' }} />
                                {address.address || '请设置收货地址'}
                                {/* </View> */}
                            </View>
                            <View className='flex'>
                                {address.contact_name}<Text className='phone'>{address.mobile}</Text>
                            </View>
                            <View className='iconfont icon-right' style={!address?.address && { top: '12rpx' }}></View>
                        </View>
                        : <View className='shop-address fd'>
                            <View className='address'>
                                <Text className='tag'>商家</Text>
                                <Text>{address.address}</Text>
                            </View>
                            <View className='fd'>
                                <View className='flex' onClick={() => setModal(true)} >
                                    <View style={{ color: '#666' }}>
                                        预留电话：
                                    </View>
                                    <View style={{ marginRight: '13rpx' }}>{msg?.oldmsg}</View>
                                    <Image style={{ width: '26rpx', height: '26rpx' }} src={require('../../../../assets/images/shouhuodizhibianji.png')} />
                                    {/* <Text className='iconfont icon-edit' style={{ marginLeft: '15px' }} /> */}
                                </View>
                            </View>
                            {/* <View className='handle fb' onClick={() => setDate({ ...date, show: true })}>
                                <View className='left'>{
                                    method == make_type.DeliveryType.DELIVERY ? '送达时间' : '自取时间'
                                }</View>
                                <View className='right'>
                                    {date?.value || '请选择时间'}
                                    <Text className='iconfont icon-right'></Text>
                                </View>
                            </View> */}
                        </View>
                }
            </View>

            <Modal
                title='修改预留手机号'
                onOk={() => {
                    if (isPhoneNumber(msg.msg)) {
                        setMsg({ ...msg, oldmsg: msg.msg })
                        setTell(msg.msg)
                    }
                }}
                content={
                    <Textarea maxlength={11} autoFocus value={msg.msg} className='textarea' onInput={(e) => setMsg({ ...msg, msg: e.detail.value.trim() })} placeholder='' />
                } show={modal} setShow={setModal}
            />
        </Fragment>
    )
})

export default Address;