/* eslint-disable no-unused-vars */
// import * as actionType from './contants'
import { createSlice } from '@reduxjs/toolkit'
import { getStorageSync, setStorageSync } from '@tarojs/taro'

/**
 * 初始化数据
 */
const initialState = {
    bar_h: getStorageSync('bar-h') || 50,
    themeConfig: {

    }
}
/**
 * reducers
 */
const reducers = {
    setThemeConfig: (state, action) => {
        state.themeConfig = action.payload
    },
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers,
})


export const actions = {
    ...commonSlice.actions,
};

export default commonSlice.reducer;