/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { Text, View, Radio } from '@tarojs/components';
import Taro, { getStorageSync, hideLoading, navigateBack, setStorageSync, showLoading, showModal, showToast, useDidShow } from '@tarojs/taro'
import { navLinkTo } from '@/common/publicFunc';
import AddressService from '@/services/address';
import './index.scss'

const AddressManage = () => {
    const query = Taro.getCurrentInstance().router.params;
    // const localStore = useSelector(e => e.userStore.localtion, shallowEqual);
    const [list, setList] = useState([
        //  {
        //     address: "武侯区人民政府(武侯祠大街南)"
        //     address_id: "283562606491791360"
        //     contact_name: "wangyueyue"
        //     is_default: 1
        //     location: {lat: "30.64242", lng: "104.04311"}
        //     mobile: "13315161819"
        //     number: "2层2001"
        //     remark: "公司"
        //     user_id: "1"
        //  }
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
            console.log('address_id', getStorageSync('address_id'))
            setAddressid(getStorageSync('address_id'))
        }
        init();
    })
    const use_address = async (e) => {
        setStorageSync('address_id', e);
        setStorageSync('edit-address', e)
        setAddressid(e);
        // 
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
                            <View className='item'
                                key={e.address_id}
                                onClick={() => {
                                    setStorageSync('edit-address', e);
                                    navLinkTo('address/address-edit/index', {});
                                }}
                            >
                                {/* 选择使用地址 */}
                                {!query?.is_center && <View className='iconfont-vertical fc'
                                    style={{ width: '80rpx', height: '100%', justifyContent: 'flex-end' }}
                                    onClick={(event) => { event.stopPropagation(); use_address(e) }}
                                >
                                    {
                                        (address_id?.address_id ? (e?.address_id == address_id?.address_id) : (e.is_default != 0))
                                            ? <Text className='iconfont icon-roundcheck ' />
                                            : <Text className='iconfont icon-yuancircle46 ' />
                                    }
                                </View>}
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
                                            <Text className='name'>{e.address} &nbsp;{e.number}</Text>
                                        </View>

                                    </View>


                                </View>

                                <View className='flex adress-content'>
                                    <View className='address_info' >
                                        {e.contact_name}
                                    </View>
                                    <View className='phone'>
                                        {e.mobile}
                                    </View>
                                </View>

                                {/* <View className='footer fb'>
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

                                        <View className='del1'
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
                                </View> */}
                            </View>
                        )
                    })
                }
            </View>
            <View className='foot_btn' style={{ height: `110rpx` }} onClick={(event) => { event.stopPropagation(); navLinkTo('address/address-add/index') }}>
                <View className='foot_content'>
                    <View className='add_icon'>+</View>
                    <View className='add'>添加新地址</View>
                </View>
            </View>
        </View>
    )
}
export default AddressManage;
