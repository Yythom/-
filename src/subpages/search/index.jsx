import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { getStorageSync, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'
import { shallowEqual, useSelector } from 'react-redux';
import HistorySearch from './histoty-search/HistorySearch';
import './index.scss'


const Index = () => {
    const userStore = useSelector(store => store, shallowEqual);
    const query = Taro.getCurrentInstance().router.params;

    return (
        <View className='search-wrap'  >
            <View className=''>
                <HistorySearch />
            </View>

        </View>
    )
}
export default Index;
