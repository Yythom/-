import React from 'react';
import { View, Text } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, setClipboardData, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'
import './index.scss'


const Index = () => {
    return (
        <View className='wx-code-wrap'  >
            <View className='title fb'>
                <Text className='left'>商家微信号</Text>
                <View className='right flex'>
                    <Text>99999</Text>
                    <Text className='copy' onClick={() => {
                        setClipboardData({
                            data: 'data',
                            success: function (res) {
                                Taro.getClipboardData({
                                    success: function (res) {
                                        console.log(res.data) // data
                                    }
                                })
                            }
                        })
                    }} >复制</Text>
                </View>
            </View>

            <View className='img'>

            </View>
        </View>
    )
}
export default Index;
