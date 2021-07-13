/* eslint-disable react/jsx-indent-props */
import React, { Fragment, useState } from 'react';
import Taro, { getStorageSync, useDidShow } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import Vtabs from '@/components/v-tabs/Vtabs';
import BlurImg from '@/components/blur-img/BlurImg';
import { shallowEqual, useSelector } from 'react-redux';
import isWeapp from '@/utils/env';
import { navLinkTo } from '@/common/publicFunc';
import Search from '@/components/search/Search';
import VtabList from './list/list';
import vtab_data from './tab';
import './index.scss';

function Index() {
    const commonStore = useSelector(e => e.commonStore, shallowEqual);
    const [tabIndex, setTabIndex] = useState(0);
    const [list, setList] = useState(vtab_data[0]);

    useDidShow(() => {
        // console.log(userStore);
    })


    return (
        <View className='cate-wrap' >
            <View className='fc search' style={{ width: '100vw' }}>
                <Search width='84vw' text='搜索商品' />
                <Text className='iconfont icon-dingdan'></Text>
            </View>
            <View>
                <Vtabs
                    windowTabsLength={15}
                    height={isWeapp ? `calc(${100}vh - ${80}rpx)` : `calc(${window.innerHeight}px - ${commonStore?.bar_h}px )`}
                    list={vtab_data}
                    onChange={(i) => {
                        console.log(i);
                        setList(vtab_data[i]);
                        setTabIndex(i);
                    }}
                >
                    <View className='cate-content'>
                        <VtabList
                            list={list}
                            setList={setList}
                        />
                    </View>
                </Vtabs>
            </View >
        </View>
    )
}
export default Index