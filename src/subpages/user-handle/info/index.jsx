/* eslint-disable indent */
/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Input, Picker } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, hideLoading, removeStorageSync, showLoading, showModal, showToast, stopPullDownRefresh, useDidShow, usePullDownRefresh } from '@tarojs/taro'
import Avatar from '@/components/avatar/Avatar';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { actions } from '@/store/userSlice';
import UpImg from '@/components/upload-img/Uploadimg';
import { isPhoneNumber } from '@/common/public';
import './index.scss'

const Index = () => {
    const dispath = useDispatch();
    const userStore = useSelector(e => e.userStore, shallowEqual);
    const userInfo = userStore.userInfo || null;

    const changeInfo = async (type, value) => {
        const _info = JSON.parse(JSON.stringify(userInfo));
        switch (type) {
            case 'nickname':
                _info.nickname = value
                break;
            case 'mobile':
                if (!isPhoneNumber(value)) return showToast({ title: '请输入正确的手机号', icon: 'none' })
                _info.mobile = value
                break;
            default:
                break;
        }
        dispath(actions.userUpdata(_info))
    }


    useDidShow(() => {

    })

    return (
        <View className='info_wrap' style={{ paddingBottom: `${getStorageSync('safeArea') * 2 + getStorageSync('bar_height') * 2}rpx` }} >
            <NavBar back title='个人中心' background='#fff' color='#fff' />
            <View className='fd' style={{ background: '#fff' }} >
                <Avatar style={{ background: '#fff', }} size={200} />
                <UpImg
                    onOk={(url) => {
                        dispath(actions.setAvatar(url))
                    }}
                    className='theme-color'
                    style={{ background: '#fff', fontSize: '28rpx' }}
                    btn_text='更换头像'
                />
            </View>

            {/* handle */}
            <View className='flex handle'>
                <View className='left'>姓名</View>
                <View className='right'>
                    <Input className='theme-color' value={userInfo?.nickname} onBlur={(e) => { changeInfo('nickname', e.detail.value.trim()) }} />
                </View>
            </View>

            <View className='flex handle'>
                <View className='left'>手机号</View>
                <View className='right fb'>
                    <Input maxlength={11} className='theme-color' value={userInfo?.mobile} onBlur={(e) => { changeInfo('mobile', e.detail.value.trim()) }} />
                    <Text className='iconfont icon-right' style={{ color: '#9599A2', fontSize: '24rpx' }} />
                </View>
            </View>
        </View >
    )
}
export default Index;
