import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import { useSelector, shallowEqual } from 'react-redux';
import WithUserVerify from '../auth/UserVerify';
import './avatar.scss';
import BlurImg from '../blur-img/BlurImg';

const Avatar = ({ size }) => {
    const userStore = useSelector(e => e.userStore, shallowEqual);
    const userInfo = userStore.userInfo || null;

    return (
        <View className='avatar-wrap' style={size && { width: size, height: size }}>
            {
                !userInfo && !userInfo?.avatar
                    ? <Text class='iconfont icon-wode' style={{ fontSize: size }} />
                    : (userInfo && userInfo.avatar
                        && <BlurImg className='img' src={userInfo.avatar} />)
            }
        </View>
    )
}
export default Avatar;
