/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useState } from 'react';
import { Input, Radio, Text, View } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, hideLoading, requestPayment, showLoading, showToast, stopPullDownRefresh, useDidShow, usePullDownRefresh } from '@tarojs/taro'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { actions as userActions } from '@/store/userSlice'
import WxPay from '@/utils/wxpay';
import './index.scss'
import Modal from '@/components/modal/Modal';
import FloatBottom from '@/components/float/FloatBottom';
import { systemInfo } from '@/common/publicFunc';

const Index = () => {
    const userStore = useSelector(e => e.userStore, shallowEqual);
    const userInfo = userStore.userInfo || null;
    const [money, setMoney] = useState('');

    const [modal, setModal] = useState(false);

    const [price, setPrice] = useState('')
    const [show, setShow] = useState(false)

    const dispatch = useDispatch();
    const init = async () => {

    }
    useDidShow(() => {
        init();
    })

    const ok = async (price) => {
        // showLoading();
        // WxPay.pay()
        console.log(price);
    }


    return (
        <View className='integral_wrap'>
            <NavBar back title='积分充值' background='rgb(250, 250, 250)' />

            <View className='head fb'>
                <View className=''>当前会员卡</View>
                <View className=''>账户余额</View>
            </View>
            <View className='head fb bold remaining'>
                <View className=''>9999999999</View>
                <View className=''>¥0.00</View>
            </View>

            <View className='info_wrap'>
                <View className='wx_pay'>
                    {/* <View className='title'>
                            <View className='left'>
                                <Text className='name'>充值金额：¥</Text>
                                <Input placeholder='输入充值金额' value={money} onInput={(e) => setMoney(e.detail.value)} />
                            </View>
                            <Text className='right'>当前余额：{userInfo?.card?.integral}</Text>
                        </View> */}
                    <View className='welfare_box'>
                        {
                            [
                                {
                                    price: '22',
                                    give_price: '5',
                                },
                                {
                                    price: '999',
                                    give_price: '5',
                                }, {
                                    price: '999',
                                    give_price: '5',
                                }
                            ].map((e, i) => {
                                return (
                                    <View className={modal == e.price ? 'act_welfare_item welfare_item fdc' : 'welfare_item fdc'} key={i}
                                        onClick={() => {
                                            ok(e.price)
                                        }}
                                    >
                                        <View className='theme-color'>
                                            <Text className='moneny'>¥</Text>{e.price}
                                        </View>
                                        <View className='welfare'>
                                            得{e.give_price}积分
                                        </View>
                                    </View>
                                )
                            })
                        }
                        <View className='welfare_item fdc'
                            onClick={() => {
                                // setModal(e.price.trim());
                                setShow(true)
                            }}
                        >
                            <View className='theme-color'>
                                自定义
                            </View>
                            <View className='welfare'>
                                请输入金额
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <FloatBottom bottom={0} className='pay-float' show={show} setShow={setShow} style={{ backgroundColor: '#fff', borderRadius: '40rpx 40rpx 0px 0px' }}>
                <Text className='iconfont icon-close' onClick={() => setShow(false)} />
                <View className='' >
                    <View className='title fc'>
                        自定义充值
                    </View>
                    <View className='_price fc bold'>
                        {price ? Number(price).toFixed(2) : '0.00'}元
                    </View>
                    <View className='input fc'>
                        <Input type='digit' value={price} onInput={(e) => setPrice(e.detail.value.trim())} placeholder='请输入充值金额' ></Input>
                    </View>
                    <View
                        onClick={() => ok(price)}
                        className='btn fc'
                        style={{ height: `calc(110rpx + ${systemInfo.safeArea.top / 2}px)` }}
                    >
                        立即充值
                    </View>
                </View>
            </FloatBottom>
        </View >
    )
}
export default Index;
