import React from 'react';
import { View, Text } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'
import { shallowEqual, useSelector } from 'react-redux';
import './index.scss'
import OssImg from '@/components/upload-img/oss-img';


const Index = () => {
    return (
        <View className='oss-wrap'  >
            <OssImg />
        </View>
    )
}
export default Index;
