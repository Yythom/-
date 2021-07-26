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
    style,
    children
}) => {
    const hideFn = () => {
        if (show && typeof hide === 'function') {
            hide();
        }
    }
    const [top, setTop] = useState('');
    // useEffect(() => {
    //     setTop(initTop)
    // }, [])
    useEffect(() => {
        if (show) {
            // vibrateShort();
            setTop(-10)
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

    useEffect(() => {
        if (!show) setTop(-(800));
    }, [])

    return (
        <>
            {
                show
                && <View className='modal-mask' onClick={
                    () => {
                        hideFn();
                        setShow(false);
                    }
                }
                />
            }
            <View className={`float_bottom  ${className}`} style={{ ...style, bottom: top ? top + 'px' : '-3999rpx' }}>
                {children}
            </View>
        </>

    )
}
export default memo(Float);
