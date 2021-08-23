/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useState } from 'react';
import Taro, { getImageInfo } from '@tarojs/taro';
import { View, Image, } from '@tarojs/components';
import isWeapp from '@/utils/env';
import './blur_img.scss';

function BlurImg(props) {
    const {
        src,
        className,
        mode,
        onClick = Function.prototype,
    } = props;

    // const [w, setW] = useState(false);
    // const [h, setH] = useState(false);
    const [load, setLoad] = useState(false)


    // useEffect(() => {
    //     console.log(src);
    //     setTimeout(() => {
    //         getImageInfo({
    //             src,
    //             // eslint-disable-next-line no-shadow
    //             success: (res) => {
    //                 console.log('图片信息', res);
    //                 setW(res.width);
    //                 setH(res.height);
    //             }
    //         })
    //     }, 400);
    // }, [src])

    return (
        <View className={`blur_wrap ${className}`} >
            {
                !isWeapp
                    ? <img
                        onLoad={() => {
                            setLoad(true)
                        }}
                        className={load ? 'image_mohu' : 'image_mohu image--not-loaded'}
                        src={src} alt='err'
                    />
                    : <Image
                        className={load ? 'image_mohu weapp' : 'image_mohu image--not-loaded'}
                        src={src}
                        onClick={onClick}
                        onLoad={() => { setLoad(true) }}
                        mode={mode || 'aspectFill'}
                    />
            }
        </View>
    )
}
export default BlurImg