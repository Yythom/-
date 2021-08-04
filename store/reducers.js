import { combineReducers } from '@reduxjs/toolkit'

import tabbar from '../src/custom-tab-bar/store/slice'
import userSlice from './userSlice'
import commonSlice from './commonSlice'
import productSlice from '../src/subpages/product-list/store/slice'

/**
 * 合并reducers
 */
const reducers = {
    userStore: userSlice,
    tabbar,
    commonStore: commonSlice,
    productSlice,
}

const reducer = combineReducers(reducers)
export default reducer;