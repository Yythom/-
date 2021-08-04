/* eslint-disable no-unused-vars */
// import * as actionType from './contants'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {

} from '@/services/product';

/**
 * 初始化数据
 */
const initialState = {

}

/**
 * reducers
 */
const reducers = {

}

/**
 * 异步action
 * 第二个参数 payloadCreator 应返回包含一些异步逻辑结果的promise
 * thunkAPI:
 * dispatch
 * getState
 * extra
 * signal
 * rejectWithValue
 */

/**
 * 获取分类列表
 */
// const getActiveListActionAsync = createAsyncThunk(
//   'index/getActiveListActionAsync',
//   async (data, thunkAPI) => {
//     const res = await getActiveList(data);
//     return res;
//   }
// )


/**
 * 其它reducers，异步及其公共recuders
 * @param {*} builder 
 */
const extraReducers = builder => {
  // builder.addCase(getExamListActionAsync.fulfilled, (state, action) => {
  //   state.exam_list = action.payload;
  // })
}

const productSlice = createSlice({
  name: 'product-list',
  initialState,
  reducers,
  extraReducers
})


export const actions = {
  ...productSlice.actions,
};
export default productSlice.reducer;