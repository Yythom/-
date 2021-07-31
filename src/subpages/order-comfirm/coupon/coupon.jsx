/* eslint-disable react/jsx-indent-props */
import React, { memo } from "react";
import FloatBottom from "@/components/float/FloatBottom";
import { Text, View } from "@tarojs/components";

const Coupon = memo(({
    coupon_list = [
        {
            "activity_coupon_id": "47",
            "activity_coupon_name": "小美团满减10-0.25",
            "shop_id": "2",
            "take_start_time": 1627524849,
            "take_end_time": 1627697543,
            "use_start_time": 1627524922,
            "use_end_time": 1627784005,
            "scope": 1,
            "type": 2,
            "price": 10,
            "deduction": 0.25,
            "take_type": 3,
            "type_message": "满减券",
            "disable": 0
        }, {
            "activity_coupon_id": "47",
            "activity_coupon_name": "小美团满减10-0.25",
            "shop_id": "2",
            "take_start_time": 1627524849,
            "take_end_time": 1627697543,
            "use_start_time": 1627524922,
            "use_end_time": 1627784005,
            "scope": 1,
            "type": 2,
            "price": 10,
            "deduction": 0.25,
            "take_type": 3,
            "type_message": "满减券",
            "disable": 0
        }
    ],
    show = false,
    setShow = Function.prototype,
}) => {
    return (
        <FloatBottom
            className='coupon-list'
            style={{ backgroundColor: '#fff' }}
            show={show}
            setShow={setShow}
        >
            <View className='coupons_wrap' style={{ height: '900rpx' }}>
                <View className='iconfont icon-close' onClick={() => { console.log(1231); setShow(false) }}></View>
                <View className='title fc'>选择优惠券</View>
                <View className='scroll_wrap'>
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
            </View>
        </FloatBottom>
    )
})

export default Coupon;