/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { Text, View, Radio } from '@tarojs/components';
import Taro, { getStorageSync, hideLoading, navigateBack, setStorageSync, showLoading, showModal, showToast, useDidShow } from '@tarojs/taro'
import { navLinkTo } from '@/common/publicFunc';
import AddressService from '@/services/address';
import './index.scss'

const AddressManage = () => {
    // const localStore = useSelector(e => e.userStore.localtion, shallowEqual);
    const [list, setList] = useState([
        // {
        //     "contact_name": "yyt",
        //     "mobile": "13273982729",
        //     "address": "江苏省镇江市润州区政泰路",
        //     "number": "```11",
        //     "location": {
        //         "lat": 32.19523,
        //         "lng": 119.41134
        //     },
        //     "remark": "公司",
        //     "is_default": 0
        // }
    ]);
    const [address_id, setAddressid] = useState(null)

    const init = async () => {
        // showLoading();
        let res = await AddressService.getAddressList();
        console.log(res, 'list');
        setList(res.list)
        // hideLoading();
    };

    useDidShow(() => {
        if (getStorageSync('address_id')) {
            setAddressid(getStorageSync('address_id'))
        }
        init();
    })
    const use_address = async (e) => {
        setStorageSync('address_id', e);
        setAddressid(e);
        setTimeout(() => {
            navigateBack({
                delta: 1
            })
        }, 200);
    }

    const del = async (e) => {
        const res = await AddressService.removeAddress(e.address_id)
        console.log(res);;
        init();
        if (res) {
            setTimeout(() => {
                showToast({ title: '删除成功', icon: 'none' })
            }, 200);
        }
    }


    return (
        <View className='address_manage_wrap' style={{ paddingBottom: `120rpx` }} >
            <View className='list_scroll' >
                {
                    list && list[0] && list.map((e) => {
                        return (
                            <View className='item' key={e.address_id} onClick={() => { use_address(e) }}>
                                <View className='user_info fb'>
                                    <View className='fb' >
                                        <View className='name flex'>
                                            {
                                                e.is_default != 0 && <View
                                                    className='select_icon fc'
                                                    style={{ marginRight: '10rpx' }}
                                                    onClick={async (event) => {
                                                        event.stopPropagation();
                                                        let obj = {
                                                            "contact_name": e.contact_name,
                                                            "mobile": e.mobile,
                                                            "address": e.address,
                                                            "number": e.number,
                                                            "location": {
                                                                lat: `${e.location.lat}`,
                                                                lng: `${e.location.lng}`
                                                            },
                                                            "remark": e.remark,
                                                            "is_default": Number(!e.is_default),
                                                            // area: selectAddress.toString().replace(/,/g, ' ')
                                                        }
                                                        // console.log(obj);
                                                        let res = await AddressService.editAddress(e.address_id, obj);
                                                        if (res) init()
                                                    }} >
                                                    默认
                                                </View>
                                            }
                                            <Text className=''>{e.contact_name}</Text>
                                        </View>
                                        <View className='phone'>{e.mobile}</View>
                                    </View>

                                    {
                                        e.address_id == address_id.address_id
                                            ? <Text className='iconfont icon-roundcheck' />
                                            : <Text className='iconfont icon-yuancircle46' />
                                    }
                                </View>

                                <View className='address_info' >
                                    {e.address}
                                </View>


                                <View className='footer fb'>
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
                                            onClick={async (event) => {
                                                event.stopPropagation();
                                                showModal({
                                                    title: '警告',
                                                    content: '确认删除该地址',
                                                    success: function (res) {
                                                        if (res.confirm) {
                                                            del(e)
                                                        }
                                                    }
                                                })
                                            }}
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
