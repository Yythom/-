/* eslint-disable react/jsx-indent-props */
import { Image, Swiper, SwiperItem, View } from '@tarojs/components';
import React, { memo, useMemo } from 'react';
import './types.scss'


const Types = memo(({
    list = [],
}) => {
    const newArr = useMemo(() => {
        if (!list[0]) return []
        let num = 10
        let arr = JSON.parse(JSON.stringify(list))
        let times = Math.ceil(arr.length / num);
        let _newArr = [];
        for (let i = 0; i < times; i++) {
            _newArr.push(arr.slice(i * num, (i + 1) * num));
        }
        return _newArr;
    }, [list])

    return (
        <Swiper className='types' >
            {newArr.map((value, index) => (
                <SwiperItem key={'types' + index} className='swiper_item flex' >
                    {/**/}
                    {
                        value.map(item => {
                            return (
                                <View
                                    className='item fdc'
                                    onClick={() => { }}
                                    style={{ display: 'flex' }}
                                    key={'types' + item.name}
                                >
                                    <View className='img fc'>{item.name}</View>
                                    <View className='text'>{item.type}</View>
                                </View>
                            )
                        })
                    }
                </SwiperItem>
            ))}
        </Swiper>
    )
})

export default Types;