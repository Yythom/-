/* eslint-disable react/jsx-indent-props */
import React, { memo } from "react";
import FloatBottom from "@/components/float/FloatBottom";
import { Text, View } from "@tarojs/components";
import Tabs from "@/components/tabs/Tabs";

const VipCard = memo(({
    coupon_list = [
        {
            "activity_coupon_id": "47",
        }, {
            "activity_coupon_id": "47",
        }
    ],
    show = false,
    setShow = Function.prototype,
}) => {
    const tabChange = (i) => {
        console.log(i, 'change');
    }
    return (
        <FloatBottom
            className='vp-list'
            style={{ backgroundColor: '#fff' }}
            show={show}
            setShow={setShow}
        >
            <View className='coupons_wrap' style={{ height: '900rpx' }}>
                <View className='iconfont icon-close' onClick={() => { console.log(1231); setShow(false) }}></View>
                <View className='title fc'>选择余额或卡</View>
                <Tabs
                    className='vp-tabs'
                    tag_list={[
                        { title: '可用' },
                        { title: '不可用' }]}
                    onChange={tabChange}
                    defaultIndex='0'
                    // maxHeight='calc(100% - 32rpx - 100rpx);'
                    padding='16'
                    notChildScroll
                >
                    <View className='scroll_wrap' >
                        {
                            !coupon_list[0]
                                ? <View className='empty fd'>
                                    <Text className='icon-kaquan iconfont'></Text>
                                    <View className=''>暂无优惠券</View>
                                </View>
                                : coupon_list.map((e, i) => {
                                    return <View className='item' key={i + 'coupon'}>
                                        优惠券
                                    </View>
                                })
                        }
                    </View>
                </Tabs>
            </View>
        </FloatBottom>
    )
})

export default VipCard;