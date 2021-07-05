/* eslint-disable react/jsx-indent-props */
import React from 'react';
import { View, Text } from '@tarojs/components';

import Taro, { getStorageSync, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'
import WithUserVerify from '@/components/auth/UserVerify';
import { navLinkTo } from '@/common/publicFunc';
import Avatar from '@/components/avatar/Avatar';
import { hideMobile } from '@/common/public';
import { shallowEqual, useSelector } from 'react-redux';
import NavBar from '@/components/navbar/NavBar';
import './index.scss'


const Index = () => {
    const userStore = useSelector(store => store.userStore, shallowEqual);
    const { userInfo } = userStore;
    usePullDownRefresh(() => {
        ///
        stopPullDownRefresh();
    })
    console.log(userInfo);

    return (
        <View className='center_wrap' style={{ paddingBottom: `${getStorageSync('safeArea') * 2 + getStorageSync('bar_height') * 2}rpx` }} >
            <NavBar title='个人中心' background='#5290FF' color='#fff' />
            <View style={{ background: '#5290FF' }} >
                <WithUserVerify
                    isVerifyPhone
                    onClick={() => {
                        navLinkTo('user-handle/info/index', {})
                        console.log('跳到用户详情');
                    }}
                >
                    <View className='userinfo flex' >
                        <Avatar style={{ background: '#fff', }} size='16vw' />
                        <View className='fb info'>
                            <View className='left'>
                                <View className='nickname'>{userInfo?.nickname || '请登入'}</View>
                                <View className='mobile'>{hideMobile(userInfo?.mobile) || (userInfo?.nickname && '请绑定手机号')}</View>
                            </View>
                            <Text className='iconfont icon-right' />
                        </View>
                    </View>
                </WithUserVerify>
                <View className='line' />

                <View className='other_info fb' style={{ color: '#fff', justifyContent: 'space-around' }}>
                    <View style={{ fontSize: '28rpx' }} >
                        1
                    </View>
                    <View className='line-w ab-center' />
                    <View style={{ fontSize: '28rpx' }} >
                        2
                    </View>
                </View>
            </View>

            {/* handle */}
            <View className='fb handle'>
                <View className='left' style={{ fontSize: '32rpx' }}>1</View>
                <View className='right fc'>
                    <Text className='theme-color'>2</Text>
                    <Text className='iconfont icon-right' style={{ color: '#9599A2', fontSize: '24rpx' }} />
                </View>
            </View>
        </View>
    )
}
export default Index;
