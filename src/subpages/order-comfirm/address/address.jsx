/* eslint-disable react/jsx-indent-props */
import React, { memo } from "react";
import { Text, View } from "@tarojs/components";
import { navLinkTo } from "@/common/publicFunc";
import './address.scss';

const Address = memo(({
    address,
}) => {
    return (
        <View className='address_wrap fb' onClick={() => navLinkTo('address/address-list/index', {})}>
            <View className='flex'>
                <Text className='iconfont icon-dingwei'></Text>
                <View className='s_address'>
                    {
                        address ? <>
                            <View>{address.username}<Text className='phone'>{address.mobile}</Text> </View>
                            <View className='address'>
                                <Text >
                                    {address.address}
                                </Text>
                            </View>
                        </> : <>
                            <View>选择收货地址</View>
                        </>
                    }
                </View>
            </View>
            <View className='iconfont icon-right'></View>
        </View>
    )
})

export default Address;