import React, { useState } from 'react';
import Taro, { getStorageSync, useDidShow } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import Banner from '@/components/page/banner/Banner';
import NavBar from '@/components/navbar/NavBar';
import Search from '@/components/search/Search';
import Notice from '@/components/notice/Notice';
import './index.scss';

function Index() {
    const [tabIndex, setTabIndex] = useState(0);
    useDidShow(() => {
        // console.log(userStore);
    })
    return (
        <View className='index-wrap' >
            <NavBar title='首页' />
            <View className='fc search'>
                <Search width='98vw' text='搜索商品' />
            </View>
            <Banner w='100vw' className='index-banner' />
            <Notice isShow content='当前为演示商城,当前为演示商城,当前为演示商城,当前为演示商城' background='rgb(255, 240, 217)' color='rgb(226, 150, 63)' />
        </View>
    )
}
export default Index