import React from 'react';
import { View, Text } from '@tarojs/components';
import './notice.scss'

const Notice = (props) => { //rolling notice 横向滚动公告
    const { isShow, content, background, color } = props;
    return (
        <>
            {
                isShow && <View className='notice-wrap' style={{ background }}>
                    <View className='iconfont fc icon-dianhua' style={{ color, background }} ></View>
                    <Text className='content' style={{ color }}>{content}</Text>
                </View>
            }
        </>
    )
}

export default Notice;
