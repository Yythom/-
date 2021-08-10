/* eslint-disable no-unused-vars */
// import * as actionType from './contants'
import UserService from '@/services/user'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getStorageSync, setStorageSync, login, removeStorageSync, hideLoading, setStorage } from '@tarojs/taro'
import TestService from '../services/test'
/**
 * 初始化数据
 */
const initialState = {
    token: getStorageSync('token') || null,
    userInfo: getStorageSync('info') || null,
    localtion: null,
}
/**
 * reducers
 */
const reducers = {
    changeTokenAction: (state, action) => {
        state.token = action.payload
    },
    setUserInfo: (state, action) => {
        state.userInfo = action.payload
        setStorageSync('info', state.userInfo)
    },
    setPhone: (state, action) => {
        state.userInfo.mobile = action.payload
        setStorageSync('info', state.userInfo)
    },
    setAvatar: (state, action) => {
        state.userInfo.avatar = action.payload
        setStorageSync('info', state.userInfo)
    },
    clear: (state, action) => {
        state.userInfo = null;
        removeStorageSync('info');
        removeStorageSync('token');
        setTimeout(() => {
            hideLoading();
        }, 300);
    }
}
// 更新用户信息
const userUpdata = createAsyncThunk(
    'user/user_updata',
    async (data, thunkAPI) => {
        const userStore_requesut = await UserService.getUserInfoApi();
        hideLoading();
        if (userStore_requesut) {
            userStore_requesut.phone = userStore_requesut.mobile;
            console.log(userStore_requesut, 'user_updata -- - --- - -- ');
            setStorage({ key: 'info', data: { ...userStore_requesut } })
            return { ...userStore_requesut }
        } else {
            return {}
        }
    }
)

/**
 * 异步action
 * 应返回包含一些异步逻辑结果的promise 通过extraReducers空间处理
 */
const changeTokenActionAsync = createAsyncThunk(
    'user/changeTokenActionAsync',
    async (data, thunkAPI) => {
        delete data?.gender
        const Tlogin = await login();
        const res = await UserService.getLogin(Tlogin.code, {
            avatar: '',
            nickname: '',
            ...data,
            mobile: ''
        }); // 通过微信登入获取code取接口token
        setStorageSync('token', res?.token || '');
        const user_info = await UserService.getUserInfoApi();
        const info = { ...data, ...user_info, }
        console.log(info, res, data, 'user_info');

        return { info, token: res?.token };
    }
)
/**
 * 其它reducers，异步及其公共recuders
 * @param {*} builder 
 */
const extraReducers = builder => {
    builder.addCase(changeTokenActionAsync.fulfilled, (state, action) => {
        setStorageSync('info', action.payload.info)
        state.userInfo = action.payload.info
    }),
        builder.addCase(userUpdata.fulfilled, (state, action) => {
            state.userInfo = { ...action.payload }
            setStorageSync('info', action.payload)
        })
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers,
    extraReducers
})


export const actions = {
    ...userSlice.actions,
    changeTokenActionAsync,
    userUpdata,
};
export default userSlice.reducer;