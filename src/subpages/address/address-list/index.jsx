/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { Text, View, Radio } from '@tarojs/components';
import Taro, { getStorageSync, hideLoading, navigateBack, setStorageSync, showLoading, showToast, useDidShow } from '@tarojs/taro'
import { navLinkTo } from '@/common/publicFunc';
import './index.scss'

const AddressManage = () => {
    // const localStore = useSelector(e => e.userStore.localtion, shallowEqual);
    const [list, setList] = useState([
        {
            address: "2单元",
            area: "四川省 成都市 武侯区",
            is_default: "1",
            mobile: "13145216024",
            username: "拉",
        }
    ]);
    const [address_id, setAddressid] = useState(null)

    const init = async () => {
        // showLoading();
        // let res = await AddressService.getListApi();
        // setList(res.list)
        // hideLoading();
    }
    useDidShow(() => {
        init();
    })
    const use_address = async (e) => {
        // setStorageSync('address_id', e.user_address_id);
        // setAddressid(e.user_address_id);
        // setTimeout(() => {
        //     navigateBack({
        //         delta: 1
        //     })
        // }, 200);
    }

    const del = (e) => {

    }


    return (
        <View className='address_manage_wrap' style={{ paddingBottom: `120rpx` }} >
            <View className='list_scroll' >
                {
                    list && list[0] && list.map((e) => {
                        return (
                            <View className='item' key={e.user_address_id} onClick={() => { use_address(e) }}>
                                <View className='user_info fb'>
                                    <View className='name'>{e.username}</View>
                                    <View className='phone'>{e.mobile}</View>
                                </View>
                                <View className='address_info'>
                                    {e.address}
                                </View>
                                <View className='footer fb'>
                                    <View className='select_icon flex'>
                                        <Radio checked={e.is_default === 1} color='#eb472b' />
                                        默认
                                    </View>
                                    <View className='handle flex'>
                                        <View
                                            className='edit'
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setStorageSync('edit-address', e)
                                                navLinkTo('address/address-edit/index', {});
                                            }}
                                        >
                                            <Text className='iconfont icon-bianji1' />
                                            编辑
                                        </View>

                                        <View className='del'
                                            onClick={async (event) => { event.stopPropagation(); del(e) }}
                                        >
                                            <Text className='iconfont icon-delete' />
                                            删除
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
            <View className='foot_btn' style={{ height: ` 100rpx` }} onClick={(event) => { event.stopPropagation(); navLinkTo('address/address-add/index') }}>
                <View className='add'>添加新地址</View>
            </View>
        </View>
    )
}
export default AddressManage;
