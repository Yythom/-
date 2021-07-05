/* eslint-disable no-unused-vars */
// import * as actionType from './contants'
import { createSlice } from '@reduxjs/toolkit'
import { getStorageSync, setStorageSync } from '@tarojs/taro'

/**
 * 初始化数据
 */
const initialState = {
    bar_h: getStorageSync('bar-h') || 50,
}
/**
 * reducers
 */
const reducers = {
    setBarHeight: (state, action) => {
        console.log(action.payload);
        state.bar_h = action.payload;
        setStorageSync('bar-h', action.payload)
    },
}

const userSlice = createSlice({
    name: 'common',
    initialState,
    reducers,
})


export const actions = {
    ...userSlice.actions,
};

export default userSlice.reducer;