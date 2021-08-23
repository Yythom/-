/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, previewImage, stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'
import { shallowEqual, useSelector } from 'react-redux';
import OssImg from '@/components/upload-img/oss-img';
import BlurImg from '@/components/blur-img/BlurImg';
import './index.scss'


const Index = () => {
    const [imgList, setImgList] = useState([]);
    return (
        <View className='oss-wrap'>
            <NavBar back title='上传照片' iconColor='#fff' color='#fff' background='#00D0BF' />

            <View className='flex' style={{ flexShrink: '0', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <View className='img-list flex' style={{ alignItems: 'flex-start', flexShrink: '0' }}>
                    {
                        imgList.map((e, i) => {
                            return (
                                <BlurImg
                                    className='img'
                                    src={e}
                                    key={e}
                                    onClick={() => {
                                        previewImage({
                                            current: '', // 当前显示图片的http链接
                                            urls: [imgList[i]],
                                        });
                                    }}
                                />
                            )
                        })
                    }
                </View>
                {
                    (imgList.length < 9 && imgList[0]) &&
                    <> <OssImg
                        onOk={(url) => {
                            setImgList([...imgList, url])
                        }}
                        btn_text={<Text className='iconfont iconxinzeng'></Text>}
                    />
                        <View className='btns fb'>
                            <View className='cancel fc'>取消</View>
                            <View className='ok fc'>确认</View>
                        </View>
                    </>
                }
                {
                    !imgList[0] && <View className='empty-box fdc'>
                        <OssImg
                            onOk={(url) => {
                                setImgList([...imgList, url])
                            }}
                            btn_text={<Text className='iconfont iconxinzeng'></Text>}
                        />
                        <View className='text'>暂无照片，请上传</View>
                    </View>
                }

            </View>

        </View>
    )
}
export default Index;
