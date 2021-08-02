import { RefInfo } from '@/common/publicFunc';
import isWeapp from '@/utils/env';
import { View } from '@tarojs/components';
import { getStorageSync } from '@tarojs/taro';
import React, { memo, useEffect, useState } from 'react';
import './index.scss'

const Float = ({
    show,
    hide,
    setShow,
    className,
    bottom = 0,
    style,
    children
}) => {
    const hideFn = () => {
        if (show && typeof hide === 'function') {
            hide();
        }
    }
    const [top, setTop] = useState(-900);
    // useEffect(() => {
    //     setTop(initTop)
    // }, [])
    useEffect(() => {
        if (show) {
            // vibrateShort();
            setTop(-10 + bottom)
        } else {
            // setTop(-(700));
            if (!isWeapp) {
                console.log(document.querySelector('.' + className).offsetHeight + 10);
                setTop(-(document.querySelector('.' + className).offsetHeight + 10));
            } else {
                setTop(-(900));
                RefInfo(`${className}`).then(res => {
                    setTop(-(res.height + 10))
                })
            }
        }
    }, [show]);

    return (
        <>
            {/* { */}
            <View className='modal-mask' style={!show && { zIndex: '-999', opacity: 0 }} onClick={
                () => {
                    hideFn();
                    setShow(false);
                }
            } />
            {/* // } */}
            <View className={`float_bottom  ${className}`} style={{ ...style, bottom: top ? top + 'px' : '-3999rpx' }}>
                {children}
            </View>
        </>

    )
}
export default memo(Float);
