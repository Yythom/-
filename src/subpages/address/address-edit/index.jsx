/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Form, Input, Label, Picker, Radio, Switch, Text, View } from '@tarojs/components';
import Taro, { chooseLocation, getStorageSync, hideLoading, navigateBack, openLocation, showLoading, showToast, useDidShow } from '@tarojs/taro'
import { isPhoneNumber } from '@/common/public';
import './index.scss'
import AddressService from '@/services/address';



const EditAddress = () => {
    const [address, setAddress] = useState(null) // 
    const [is_default, setIs_default] = useState(false);
    const [init_default, setInitDefault] = useState(false)
    const [tag, setTag] = useState('')

    const init = async () => {
        const initData = getStorageSync('edit-address');
        console.log(initData);
        setAddress(initData);
        setTag(initData.remark);
        setIs_default(initData.is_default == 1);
        setInitDefault(initData.is_default == 1);
    }
    useLayoutEffect(() => {
        init();
    }, []);

    const save = async (sub_obj) => {
        if (!sub_obj.username) { showToast({ title: '收货人不能为空', icon: 'none' }); return }
        if (!sub_obj.mobile) { showToast({ title: '手机号不能为空', icon: 'none' }); return }
        if (!isPhoneNumber(sub_obj.mobile)) {
            showToast({ title: '请输入正确的手机号', icon: 'none' });
            return
        }
        if (!sub_obj.address_desc) { showToast({ title: '详细地址不能为空', icon: 'none' }); return }

        let obj = {
            "contact_name": sub_obj.username,
            "mobile": sub_obj.mobile,
            "address": address.address,
            "number": sub_obj.address_desc,
            "location": {
                lat: `${address.location.lat}`,
                lng: `${address.location.lng}`
            },
            "remark": tag,
            "is_default": is_default ? 1 : 0,
            // area: selectAddress.toString().replace(/,/g, ' ')
        }
        // console.log(obj);
        let res = await AddressService.editAddress(address.address_id, obj);
        console.log(res, 'save');
        if (res) {
            navigateBack({
                delta: 1
            })
        }
    }

    return (
        <View className='edit_address_wrap'>
            <Form onSubmit={(e) => save(e.detail.value)} className='fdc'>
                <View className='edit_box'>
                    <View className='name'>
                        <Label> 姓名：</Label>
                        <Input name='username' value={address?.contact_name} onInput={(e) => setAddress({ ...address, contact_name: e.detail.value })} maxlength={18} type='text' placeholder='请输入收货人姓名' />
                    </View>
                    <View className='phone'>
                        <Label>手机号：</Label>
                        <Input name='mobile' value={address?.mobile} onInput={(e) => setAddress({ ...address, mobile: e.detail.value })} maxlength={11} type='number' placeholder='请输入收货人手机号' />
                    </View>
                    <View className='tag'>
                        <Label>标签：</Label>
                        <View className='flex'>
                            {
                                ['家', '公司', '学校'].map(e => {
                                    return <View key={e} className={`item ${tag == e && 'act-item'}`} onClick={() => setTag(e)} >
                                        {e}
                                    </View>
                                })
                            }
                        </View>
                    </View>

                    <View className='address' onClick={() => {
                        chooseLocation().then(res => {
                            setAddress({
                                ...address, address: res.name, location: {
                                    latitude: res.latitude,
                                    longitude: res.longitude
                                }
                            })
                            console.log(res);
                        })
                    }} >
                        <Label>地址</Label>
                        <View className='picker'>
                            {
                                address?.address || '请选择地址'
                            }
                            <Text className='iconfont icon-dingwei' style={{ color: '#999', marginLeft: '6px' }} />
                        </View>
                    </View>

                    <View className='address_desc'>
                        <Label>门牌号：</Label>
                        <Input value={address?.number} onInput={(e) => setAddress({ ...address, number: e.detail.value })} name='address_desc' type='text' placeholder='填写详细地址，例：1层1001' />
                    </View>
                    <View className='is_default'>
                        <View >设为默认地址</View>
                        <Switch name='is_default' onClick={() => { if (init_default) showToast({ title: '必须有一个默认地址', icon: 'none' }) }} disabled={init_default} checked={is_default} onChange={(e) => {
                            setIs_default(!!e.detail.value);
                        }}
                        />
                    </View>
                </View>
                <Button formType='submit' className='foot_address_btn fc' style={{ bottom: `12rpx` }} onClick={(event) => { event.stopPropagation(); }}>保存</Button>
            </Form>
        </View>
    )
}
export default EditAddress;
