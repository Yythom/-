/* eslint-disable react/jsx-indent-props */
import React, { memo, useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import isWeapp from '@/utils/env';
import { lkGetSystemInfo, systemInfo } from '@/common/publicFunc';
import './move.scss'

const scalc = (isWeapp ? systemInfo.windowWidth : window.screen.width) / 100;

const Move = memo(({
    className,
    children,
    onClick = Function.prototype,
    padding, //  px ->vw
    value = 100, // 隐藏容器宽度 px ->vw
    style // example  width：`calc(100% + ${value * 2}rpx)`
}) => { // 宽度一定要大于父级宽度 position布局
    const [startX, setStartX] = useState('')
    const [left, setLeft] = useState('')

    return (
        <View className={`move_wrap ${className} flex`}
            onTouchStart={(event) => {
                event.stopPropagation();
                let coordinates = event.changedTouches[0];
                setStartX(coordinates.clientX);
            }}
            onTouchMove={(event) => {
                event.stopPropagation();
                let coordinates = event.changedTouches[0];
                let leftX = startX - coordinates.clientX;
                if (leftX < -value / 5) {
                    setLeft(value + leftX);
                } else if (leftX >= value || left >= value) {
                    return
                } else {
                    setLeft(leftX);
                }
            }}
            onTouchEnd={(event) => {
                event.stopPropagation();
                let coordinates = event.changedTouches[0];
                let leftX = startX - coordinates.clientX;
                if (leftX > value / 2) {
                    setLeft(value);
                } else if (leftX < -value / 5) {
                    setLeft(0);
                }
                else {
                    setLeft(0);
                }
            }}
            style={{
                transform: `translateX(-${left / scalc}vw)`,
                width: `calc(${100 + value / scalc}vw - ${padding * 100 / (isWeapp ? systemInfo.windowWidth : window.screen.width)}vw)`,
                ...style
            }}
        >
            <View className='content flex'>
                {children}
            </View>
            <View className='move_square'>
                <View
                    className='btn fc'
                    style={{ width: `${value / scalc}vw` }}
                    onClick={async (event) => {
                        event.stopPropagation();
                        onClick();
                    }}
                >
                    删除
                </View>
            </View>
        </View >
    )
})
export default Move;
