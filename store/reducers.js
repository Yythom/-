import { combineReducers } from '@reduxjs/toolkit'

import tabbar from '../src/custom-tab-bar/store/slice'
import userSlice from './userSlice'
import commonSlice from './commonSlice'

/**
 * 合并reducers
 */
const reducers = {
    userStore: userSlice,
    tabbar,
    commonStore: commonSlice,
}

const reducer = combineReducers(reducers)
export default reducer;