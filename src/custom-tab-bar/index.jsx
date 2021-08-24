import React, { memo, useEffect, useMemo, useState } from 'react'
import { setStorageSync, switchTab } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { systemInfo } from '@/common/publicFunc';
import { actions as userActions } from '@/store/userSlice'
import { actions } from './store/slice'

import './index.scss'

const bar_height = '60';

export default memo(() => {
    const dispatch = useDispatch();
    const tabbarState = useSelector(state => state.tabbar, shallowEqual);
    const cartSlice = useSelector(state => state.userStore, shallowEqual);
    //去除底部安全区
    useEffect(() => {
        dispatch(userActions.upcart_price());
        if (systemInfo.model.indexOf('iPhone X') !== -1 || systemInfo.model.indexOf('iPhone 11') !== -1 || systemInfo.model.indexOf('iPhone 12') !== -1) {
            setStorageSync('safeArea', systemInfo.safeArea.top);
        } else {
            setStorageSync('safeArea', 5);
        }
        setStorageSync('bar_height', bar_height);
    }, [])

    const price = useMemo(() => {
        return cartSlice.cart_price
    }, [cartSlice])

    const [tabBars] = useState([
        {
            pagePath: '/pages/index/index',
            text: '首页',
            icon: <Image style={{ width: '48rpx', height: '48rpx' }} src={require('../../assets/images/shouyeweixuan.png')} />,
            iconColor: '',
            activeIcon: <Image style={{ width: '48rpx', height: '48rpx' }} src={require('../../assets/images/shouyeyixuan.png')} />,
            activeIconColor: '',
        },
        {
            pagePath: '/pages/category/index',
            text: '分类',
            icon: <Image style={{ width: '48rpx', height: '48rpx' }} src={require('../../assets/images/fenleiweixuan.png')} />,
            iconColor: '',
            activeIcon: <Image style={{ width: '48rpx', height: '48rpx' }} src={require('../../assets/images/fenleiyixuan.png')} />,
            activeIconColor: '',
        },
        {
            pagePath: '/pages/cart/index',
            text: '购物车',
            icon: <Image style={{ width: '48rpx', height: '48rpx' }} src={require('../../assets/images/gouwuceweixuan.png')} />,
            iconColor: '',
            activeIcon: <Image style={{ width: '48rpx', height: '48rpx' }} src={require('../../assets/images/gouwuceyixuan.png')} />,
            activeIconColor: '',
        },
        {
            pagePath: '/pages/center/index',
            text: '我的',
            icon: <Image style={{ width: '48rpx', height: '48rpx' }} src={require('../../assets/images/wodeweixuan.png')} />,
            iconColor: '',
            activeIcon: <Image style={{ width: '48rpx', height: '48rpx' }} src={require('../../assets/images/wodeyixuan.png')} />,
            activeIconColor: '',
        },
        // {
        //     url: '/pages/test/index',
        //     text: '测试',
        //     icon: <Text className='iconfont icon-square' />,
        //     iconColor: '',
        //     activeIcon: <Text className='iconfont  icon-squarecheckfill' />,
        //     activeIconColor: '',
        // },
        // {
        //     url: '/pages/index/index',
        //     text: '首页',
        //     icon: <Text className='iconfont icon-square' />,
        //     iconColor: '',
        //     activeIcon: <Text className='iconfont icon-squarecheckfill' />,
        //     activeIconColor: '',
        // },
    ])

    const handleClick = (url, index) => {
        switchTab({
            url,
            // success: () => { /* 解决点击底部的tab的重复点击，页面没有重新刷新调用接口 */
            //     var page = getCurrentPages().pop();
            //     if (page == undefined || page == null) return;
            //     page.onLoad();
            // }
        })
        dispatch(actions.changetab(index))
    }

    return (
        <View className='tabbar-wrap' style={{ height: bar_height * 2 + 'rpx', paddingBottom: `calc(${systemInfo.safeArea.top / 2}px)` }}>
            {
                tabBars[0] && tabBars.map((item, index) => {
                    return (
                        <View key={item.url} className={`${index === tabbarState.active ? 'text-main _widthAuto' : '_widthAuto'}`} onClick={() => handleClick(item.pagePath, index)} >
                            <View className='icon_wrap' style={{ borderRadius: '50%', }}>
                                <View /* style={index === tabbarState.active && item.activeIcon ? { color: item.activeIconColor } : { color: item.iconColor }} */>
                                    {
                                        index === tabbarState.active && item.activeIcon ? item.activeIcon : item.icon
                                    }
                                </View>
                            </View>
                            <Text style={index === tabbarState.active && item.activeIcon ? { color: item.activeIconColor } : { color: item.iconColor }}>{item.text}</Text>
                        </View>
                    )
                })
            }
            {Number(price) ? <View className='dig'>¥{price}</View> : null}

        </View>
    )
})


