/* eslint-disable react/jsx-indent-props */
import React, { useMemo, useState } from 'react';
import { View, Text, Map } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, request, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'
import { shallowEqual, useSelector } from 'react-redux';
import './index.scss'



const Index = () => {
    const store = useSelector(_store => _store, shallowEqual);
    const commonConfig = store.commonStore.themeConfig;
    const query = Taro.getCurrentInstance().router.params;

    const [markers, setMarkers] = useState([32.19523, 119.41134]);

    const normalCallout = useMemo(() => {
        return [
            {
                id: 1,
                latitude: markers[0],
                longitude: markers[1],
                callout: {
                    content: '文本内容',
                    color: '#ff0000',
                    fontSize: 14,
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: '#000000',
                    bgColor: '#fff',
                    padding: 5,
                    display: 'ALWAYS',
                    textAlign: 'center',
                }
            }
        ]
    }, [markers])

    return (
        <View className='index-wrap'  >
            <View className='' onClick={() => {
                setMarkers([32.19523, 119.41134])
            }} >shezhizuobiao</View>
            <Map
                className='map'
                longitude={119.41134}
                latitude={32.19523}
                scale={16}
                markers={normalCallout}
                showCompass
                showScale
                onEnd={async (e) => {
                    // const { centerLocation } = e.detail
                    // setMarkers([centerLocation.latitude, centerLocation.longitude])
                    // const res = await request({
                    //     url: 'http://49.234.41.182:8701/getLocation', //仅为示例，并非真实的接口地址
                    //     method: 'POST',
                    //     data: {
                    //         lat: `${centerLocation.latitude}`,
                    //         lng: `${centerLocation.longitude}`,
                    //     },
                    //     header: {
                    //         'content-type': 'application/json' // 默认值
                    //     },
                    // })
                    // console.log(res, 'detail');
                }}
                onBegin={(e) => {
                    console.log(e.detail);
                }}
            // onRegionChange={onRegionChange}
            ></Map>
        </View>
    )
}
export default Index;

