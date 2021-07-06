/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Label, Picker, Radio, Switch, Text, View } from '@tarojs/components';
import Taro, { getStorageSync, hideLoading, navigateBack, openLocation, showLoading, showToast, useDidShow } from '@tarojs/taro'
import { isPhoneNumber } from '@/common/public';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { actions } from '@/store/userSlice'
import './index.scss'



const EditAddress = () => {
    const [address, setAddress] = useState(null) // 
    const [is_default, setIs_default] = useState(false);
    const [selectAddress, setSelectAddress] = useState([]); // 手动修改地址

    const init = async () => {
        const initData = getStorageSync('edit-address');
        console.log(initData);
        setAddress(initData);

        // console.log(initData?.area.split(' '));
        setSelectAddress(initData?.area.split(' '))
        setIs_default(initData.is_default == 1);
    }
    useDidShow(() => {
        init();
    });

    const change_address = async (e) => {
        console.log(e);
        setSelectAddress(e.value);
        // setAddress({
        //     ...address, address: ''
        // })
    }

    console.log(address);

    const save = async (sub_obj) => {
        if (!sub_obj.username) { showToast({ title: '收货人不能为空', icon: 'none' }); return }
        if (!sub_obj.mobile) { showToast({ title: '手机号不能为空', icon: 'none' }); return }
        if (!isPhoneNumber(sub_obj.mobile)) {
            showToast({ title: '请输入正确的手机号', icon: 'none' });
            return
        }
        if (!sub_obj.address_desc) { showToast({ title: '详细地址不能为空', icon: 'none' }); return }
        let obj = {
            username: sub_obj.username,
            mobile: sub_obj.mobile,
            is_default: is_default ? '1' : '2',
            address: sub_obj.address_desc,
            area: selectAddress.toString().replace(/,/g, ' ')
        }
        console.log(obj);
        // let res = await AddressService.addressAddApi(obj);
        // if (res) {
        navigateBack({
            delta: 1
        })
        // }
    }

    return (
        <View className='edit_address_wrap'>
            <Form onSubmit={(e) => save(e.detail.value)} className='fdc'>
                <View className='edit_box'>
                    <View className='name'>
                        <Label> 姓名：</Label>
                        <Input name='username' value={address?.username} onInput={(e) => setAddress({ ...address, username: e.detail.value })} maxlength={18} type='text' placeholder='请输入收货人姓名' />
                    </View>
                    <View className='phone'>
                        <Label>手机号：</Label>
                        <Input name='mobile' value={address?.mobile} onInput={(e) => setAddress({ ...address, mobile: e.detail.value })} maxlength={11} type='number' placeholder='请输入收货人手机号' />
                    </View>
                    <Picker
                        mode='region'
                        value={selectAddress}
                        onChange={((e) => { change_address(e.detail) })}
                    >
                        <View className='address' >
                            <Label>地区</Label>
                            <View className='picker'>
                                {
                                    selectAddress[0]
                                        ? selectAddress.toString().replace(/,/g, '/')
                                        : '请选择省/市/区'
                                }
                                {/* <Text className='iconfont icon-dingwei' style={{ color: '#999', marginLeft: '6px' }} /> */}
                            </View>
                        </View>
                    </Picker>
                    <View className='address_desc'>
                        <Label>详细地址：</Label>
                        <Input name='address_desc'
                            value={address?.address}
                            onInput={(e) => setAddress({ ...address, address: e.detail.value })}
                            disabled={!selectAddress}
                            onClick={() => {
                                if (!selectAddress) {
                                    showToast({ title: '请先选择区域', icon: 'none' });
                                    return
                                }
                            }} type='text' placeholder='如道路、门牌号、小区、单元号等' />
                    </View>
                    <View className='is_default'>
                        <View >设为默认地址</View>
                        <Switch name='is_default' checked={is_default} onChange={(e) => { setIs_default(e.detail.value); }} />
                    </View>
                </View>
                <Button formType='submit' className='foot_address_btn fc' style={{ bottom: `12rpx` }} onClick={(event) => { event.stopPropagation(); }}>保存</Button>
            </Form>
        </View>
    )
}
export default EditAddress;
