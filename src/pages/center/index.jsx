/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { getStorageSync, setBackgroundColor, stopPullDownRefresh, useDidShow, usePullDownRefresh } from '@tarojs/taro'
import WithUserVerify from '@/components/auth/UserVerify';
import { navLinkTo, systemInfo } from '@/common/publicFunc';
import Avatar from '@/components/avatar/Avatar';
import { hideMobile } from '@/common/public';
import { shallowEqual, useSelector } from 'react-redux';
import NavBar from '@/components/navbar/NavBar';
import './index.scss';

const Index = () => {
    const userStore = useSelector(store => store.userStore, shallowEqual);
    const { userInfo } = userStore;
    const [flag, setFLag] = useState(false);

    console.log(userInfo);

    return (
        <ScrollView
            refresherEnabled
            refresherTriggered={flag}
            onRefresherRefresh={() => {
                setFLag(true)
                setTimeout(() => {
                    setFLag(false)
                }, 1000);
            }}
            scrollY
            style={{ height: `calc(100vh - ${Number(getStorageSync('bar_height')) + systemInfo?.safeArea?.top / 2}px)` }}
            className='center_wrap'
        >
            <NavBar background='rgb(250,245,235)' />
            <View className='user'>
                <WithUserVerify isVerifyPhone onClick={() => { navLinkTo('user-handle/info/index', {}) }}>
                    <View className='userinfo flex' >
                        <Avatar style={{ background: '#fff', }} />
                        <View className='fb info'>
                            <View className='left fd'>
                                <View className='nickname'>{userInfo?.nickname || '请登入'}</View>
                                {userInfo?.nickname && <View className='mobile'>{hideMobile(userInfo?.mobile) || (userInfo?.nickname && '请绑定手机号')}</View>}
                            </View>
                            {/* <Text className='iconfont icon-right' /> */}
                        </View>
                    </View>
                </WithUserVerify>
            </View>

            <View className='handle'>
                {/* 钱包 */}
                <View className='wallet fb wallet-common ' >
                    <View className='fdc'>
                        <Text className='price'>0.00</Text>
                        <View className='text'>账户余额</View>
                    </View>
                    <View className='fdc'>
                        <Text className='price'>0.00</Text>
                        <View className='text'>积分</View>
                    </View>
                    <View className='fdc'>
                        <Text className='price'>0.00</Text>
                        <View className='text'>优惠券</View>
                    </View>
                    <View className='fdc line'>
                        <Text className='iconfont icon-ziyuan'></Text>
                        <View className='text'>我的钱包</View>
                    </View>
                </View>

                {/* 订单 */}
                <View className='order-card fb wallet-common ' onClick={() => navLinkTo('order/order-list/index', {})} >
                    <View className='fdc'>
                        <Text className='iconfont icon-ziyuan'></Text>
                        <View className=''>全部订单</View>
                    </View>
                    <View className='fdc'>
                        <Text className='iconfont icon-ziyuan'></Text>
                        <View className=''>待支付</View>
                    </View>
                    <View className='fdc'>
                        <Text className='iconfont icon-ziyuan'></Text>
                        <View className=''>待发货</View>
                    </View>
                    <View className='fdc'>
                        <Text className='iconfont icon-ziyuan'></Text>
                        <View className=''>待收货</View>
                    </View>
                </View>
                {/* 服务 */}
                <View className='fb my-server wallet-common'>
                    <View className='title flex'>我的服务</View>
                    <View className='fdc' onClick={() => navLinkTo('address/address-list/index', {})}>
                        <Text className='iconfont icon-ziyuan'></Text>
                        <View className=''>收货地址</View>
                    </View>
                    <View className='fdc'>
                        <Text className='iconfont icon-ziyuan'></Text>
                        <View className=''>我的积分</View>
                    </View>
                    <View className='fdc'>
                        <Text className='iconfont icon-ziyuan'></Text>
                        <View className=''>退款/售后</View>
                    </View>
                    <View className='fdc'>
                        <Text className='iconfont icon-ziyuan'></Text>
                        <View className=''>我的帮助</View>
                    </View>
                    <View className='fdc'>
                        <Text className='iconfont icon-ziyuan'></Text>
                        <View className=''>在线客服</View>
                    </View>
                </View>
            </View>

        </ScrollView>
    )
}
export default Index;
