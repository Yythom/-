import React, { useEffect, useState } from 'react';
import { Input, Radio, Text, View } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, hideLoading, requestPayment, showLoading, showToast, stopPullDownRefresh, useDidShow, usePullDownRefresh } from '@tarojs/taro'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { actions as userActions } from '@/store/userSlice'
import './index.scss'
import WxPay from '../wxpay';

const Index = () => {
    const userStore = useSelector(e => e.userStore, shallowEqual);
    const userInfo = userStore.userInfo || null;
    const [type, setType] = useState(2);
    const [money, setMoney] = useState('');
    const dispatch = useDispatch();
    const init = async () => {

    }
    useDidShow(() => {
        init();
    })

    const ok = async () => {
        showLoading();
        switch (Number(type)) {
            case 2:
                WxPay.pay(money, () => {

                    setMoney('')
                })
                break;
            default:
                break;
        }

    }


    return (
        <View className='integral_wrap'>
            <NavBar back title='积分充值' background='rgb(250, 250, 250)' />
            <View className='type_wrap'>
                <View className='title'>充值方式</View>
                <View className='pay_type'>
                    <View className='type' onClick={() => setType(2)}>
                        <View className='type_name'>
                            <Text className='iconfont icon-weixinzhifu' />
                            <Text className='pay_name'>微信支付</Text>
                        </View>
                        <View className='select'>
                            <Radio className='radio' color='#00D0BF' checked={type == 2} />
                        </View>
                    </View>
                </View>
            </View>

            {type && <View className='center_title'>请输入相关信息</View>}
            {
                type && <View className='info_wrap'>
                    <View className='wx_pay'>
                        <View className='title'>
                            <View className='left'>
                                <Text className='name'>充值金额：¥</Text>
                                <Input placeholder='输入充值金额' value={money} onInput={(e) => setMoney(e.detail.value)} />
                            </View>
                            <Text className='right'>当前余额：{userInfo?.card?.integral}</Text>
                        </View>
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
                                    }
                                ].map((e, i) => {
                                    return (
                                        <View className={money == e.price ? 'act_welfare_item welfare_item' : 'welfare_item'} key={i} onClick={() => { setMoney(e.price); }}>
                                            <View className='price'>
                                                <Text className='moneny'>¥</Text>{e.price}
                                            </View>
                                            <View className='welfare'>
                                                得{e.give_price}积分
                                            </View>
                                        </View>
                                    )
                                })
                            }

                        </View>
                    </View>

                </View>

            }


            {type && <View className='foot_address_btn' style={{ bottom: `${getStorageSync('safeArea') * 2 + 10}rpx` }} onClick={() => ok()}>立即充值</View>}
        </View >
    )
}
export default Index;
