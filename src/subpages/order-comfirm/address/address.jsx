/* eslint-disable react/jsx-indent-props */
import React, { memo, useState } from "react";
import { Text, Textarea, View } from "@tarojs/components";
import { navLinkTo } from "@/common/publicFunc";
import './address.scss';
import { Fragment } from "react";
import Modal from "@/components/modal/Modal";
import { isPhoneNumber } from "@/common/public";

const Address = memo(({
    address,
    date,
    setDate,
    method = 1,
}) => {
    const [msg, setMsg] = useState({
        oldmsg: '13145216024',
        msg: ''
    });
    const [modal, setModal] = useState(false);
    if (!address) return <View>选择收货地址</View>
    return (
        <Fragment>
            <View className='address_wrap fd' >
                {
                    method == 1
                        ? <View className='s_address' onClick={() => navLinkTo('address/address-list/index', {})}>
                            <View className='address flex'>
                                <View className='flex'>
                                    <Text className='iconfont icon-dingwei'></Text>
                                    {address.address}
                                </View>
                            </View>
                            <View className='flex'>
                                {address.username}<Text className='phone'>{address.mobile}</Text>
                            </View>
                            <View className='iconfont icon-right'></View>
                        </View>
                        : <View className='shop-address fd'>
                            <View className='address'>
                                {address.address}
                            </View>
                            <View className='fd'>
                                <View className='' style={{ marginBottom: '10px', color: '#666' }}>
                                    预留电话
                                </View>
                                <View className='' onClick={() => setModal(true)} >
                                    {msg?.oldmsg}<Text className='iconfont icon-edit' style={{ marginLeft: '15px' }} />
                                </View>
                            </View>
                            {/* <View className='handle fb' onClick={() => setDate({ ...date, show: true })}>
                                <View className='left'>指定时间</View>
                                <View className='right'>
                                    {date?.value}
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