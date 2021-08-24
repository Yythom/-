/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image } from '@tarojs/components';
import Taro, { getStorageSync, reLaunch, removeStorageSync, setBackgroundColor, showToast, stopPullDownRefresh, useDidShow, usePullDownRefresh } from '@tarojs/taro'
import WithUserVerify from '@/components/auth/UserVerify';
import { navLinkTo, systemInfo } from '@/common/publicFunc';
import Avatar from '@/components/avatar/Avatar';
import { callPhone, hideMobile } from '@/common/public';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { actions as userActions } from '@/store/userSlice';
import { actions as tabActions } from '@/src/custom-tab-bar/store/slice';
import NavBar from '@/components/navbar/NavBar';
import ShopService from '@/services/shop'
import './index.scss';
import OrderType from './compont/order';

const Index = () => {
    const dispatch = useDispatch();
    const userStore = useSelector(store => store.userStore, shallowEqual);
    const { userInfo } = userStore;
    const [flag, setFLag] = useState(true);
    const [shop, setShop] = useState({})

    const init = async (refresh) => {
        console.log('refresh', refresh)
        dispatch(tabActions.changetab(3));
        const res = await ShopService.shopDetail({ shop_id: '1' });
        res && setShop(res);
        if (refresh) setFLag(true)
        setTimeout(() => {
            setFLag(false)
        }, 1000);
        if (getStorageSync('relogin')) {
            dispatch(userActions.clear());
            // showToast({ title: getStorageSync('relogin'), icon: 'none' });
            removeStorageSync('relogin')
        } else if (getStorageSync('token')) {
            dispatch(userActions.userUpdata(setFLag));
        }
    }

    useDidShow(() => {
        init()
    })

    return (
        <ScrollView
            refresherEnabled
            refresherTriggered={flag}
            onRefresherRefresh={() => {
                // setFLag(true)
                init(true);
                // setTimeout(() => {
                //     setFLag(false)
                // }, 1000);
            }}
            scrollY
            style={{ height: `calc(100vh - ${Number(getStorageSync('bar_height')) + systemInfo?.safeArea?.top / 2}px)`, }}
            className='center_wrap'
        >
            <View className='user' style={{ background: '#00D0BF' }}>
                <NavBar title='个人中心' color='#fff' iconColor='#fff' background='#00D0BF' />
                <WithUserVerify isVerifyPhone onClick={() => { navLinkTo('user-handle/info/index', {}) }}>
                    <View className='userinfo flex' >
                        <Avatar style={{ background: '#fff', borderRadius: '50%' }} size='110rpx' />
                        <View className='fb info'>
                            <View className='left fd'>
                                <View className='nickname'>{userInfo?.nickname || '请登入'}</View>
                                {userInfo?.nickname &&
                                    <View className='mobile fb'>
                                        <Text className=''>{userInfo?.mobile ? '手机号：' + hideMobile(userInfo?.mobile) : (userInfo?.nickname && '获取手机号')}</Text>
                                        <Text className='iconfont icon-right'></Text>
                                    </View>
                                }
                            </View>
                            {/* <Text className='iconfont icon-right' /> */}
                        </View>
                    </View>
                </WithUserVerify>
                <View className='cardpay'>
                    <View className='vip-img'>
                        <Image mode='widthFix' style={{ width: '190rpx', marginLeft: '20rpx' }} src={require('../../../assets/images/VIP.png')} />
                    </View>
                    <View className='flex fb card-info'>
                        <View>储值卡余额</View>
                        <View>
                            <Text style={{ fontSize: '24rpx' }}>¥</Text>
                            <Text style={{ fontSize: '40rpx', fontWeight: 'bold' }}>0.00</Text>
                        </View>
                        <View>
                            <Button className='btn-pay fc'>充值</Button>
                        </View>
                    </View>
                </View>
            </View>
            {/* <View className='' onClick={() => reLaunch({ url: '/pages/center/index' })} >重载入页面</View> */}
            <View className='handle'>
                {/* 钱包 */}
                {/* <View className='wallet fb wallet-common ' >
                    <View className='fdc'>
                        <Text className='price'>0.00</Text>
                        <View className='text'>账户余额</View>
                    </View>
                    <View className='fdc'>
                        <Text className='price'>0.00</Text>
                        <View className='text'>积分</View>
                    </View>
                    <View className='fdc'>
                        <Text className='price'>0.00</Text>
                        <View className='text'>优惠券</View>
                    </View>
                    <View className='fdc line'>
                        <Text className='iconfont icon-ziyuan'></Text>
                        <View className='text'>我的钱包</View>
                    </View>
                </View> */}

                {/* 订单 */}
                <OrderType />

                <View className='flex-handle fb' onClick={() => navLinkTo('address/address-list/index', { is_center: true })}>
                    <View className='flex item'>
                        <Text className='iconfont icon-dingwei' />
                        <Text className=''>收货地址</Text>
                    </View>
                    <View className='flex'>
                        {/* <Text className=''>查看</Text> */}
                        <Text className='iconfont icon-right' />
                    </View>
                </View>
                <View className='flex-handle fb' onClick={(e) => callPhone(e, shop?.customer_phone || '暂未设置')}>
                    <View className='flex item'>
                        <Text className='iconfont iconlianxishangjia' />
                        <Text className=''>联系商家</Text>
                    </View>
                    <View className='flex'>
                        {/* <Text className=''>查看</Text> */}
                        <Text className='iconfont icon-right' />
                    </View>
                </View>

                <View className='flex-handle fb' onClick={() => navLinkTo('wx-code/index', {})}>
                    <View className='flex item'>
                        <Text className='iconfont iconweixin' />
                        <Text className=''>商家微信</Text>
                    </View>
                    <View className='flex'>
                        {/* <Text className=''>查看</Text> */}
                        <Text className='iconfont icon-right' />
                    </View>
                </View>

                {
                    process.env.NODE_ENV === 'development'
                    && <Button onClick={() => navLinkTo('test-yyt/index', {})} >测试入口</Button>
                }

                {/* 服务 */}
                {/* <View className='fb my-server wallet-common'>
                    <View className='title flex'>我的服务</View>
                    <View className='fdc'>
                        <Text className='iconfont icon-ziyuan'></Text>
                        <View className=''>我的积分</View>
                    </View>
                    <View className='fdc'>
                        <Text className='iconfont icon-ziyuan'></Text>
                        <View className=''>退款/售后</View>
                    </View>
                    <View className='fdc'>
                        <Text className='iconfont icon-ziyuan'></Text>
                        <View className=''>我的帮助</View>
                    </View>
                    <View className='fdc'>
                        <Text className='iconfont icon-ziyuan'></Text>
                        <View className=''>在线客服</View>
                    </View>
                </View> */}
            </View>

        </ScrollView>
    )
}
export default Index;
