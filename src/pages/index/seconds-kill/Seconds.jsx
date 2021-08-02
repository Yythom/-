/* eslint-disable react/jsx-indent-props */
import { Image, Swiper, SwiperItem, Text, View } from '@tarojs/components';
import React, { memo, useMemo } from 'react';
import './seconds.scss'


const Seconds = memo(({
    data,
}) => {

    return (
        <View className='seconds-kills'>
            <View className='item'>
                <View className='title flex'>百亿
                    <View className='skew'>
                        <View className='bg'></View>
                        <Text className='tx'>补贴</Text>
                    </View>
                </View>
                <View className='flex'>
                    <View className='product fdc' style={{ marginRight: '45rpx' }}>
                        <Image className='img' mode='aspectFill' src='https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg' />
                        <View className='price'><Text className='_money'>¥</Text>9.00</View>
                        <View className='price del'><Text className='_money'>¥</Text>99.00</View>
                    </View>
                    <View className='product fdc'>
                        <Image className='img' mode='aspectFill' src='https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg' />
                        <View className='price'><Text className='_money'>¥</Text>9.00</View>
                        <View className='price del'><Text className='_money'>¥</Text>99.00</View>
                    </View>
                </View>
            </View>

            <View className='item'>
                <View className='title flex'>
                    京东秒杀
                    <View className='countdouwn flex'>
                        14:00场
                        <View className='price'>
                            ｜即将开始
                        </View>
                    </View>
                </View>
                <View className='flex'>
                    <View className='product fdc' style={{ marginRight: '45rpx' }}>
                        <Image className='img' mode='aspectFill' src='https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg' />
                        <View className='price'><Text className='_money'>¥</Text>9.00</View>
                        <View className='price del'><Text className='_money'>¥</Text>99.00</View>
                    </View>
                    <View className='product fdc'>
                        <Image className='img' mode='aspectFill' src='https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg' />
                        <View className='price'><Text className='_money'>¥</Text>9.00</View>
                        <View className='price del'><Text className='_money'>¥</Text>99.00</View>
                    </View>
                </View>
            </View>
        </View>

    )
})

export default Seconds;