import { combineReducers } from '@reduxjs/toolkit'

import userSlice from './userSlice'
import commonSlice from './commonSlice'

/**
 * 合并reducers
 */
const reducers = {
    userStore: userSlice,
    commonStore: commonSlice
}

const reducer = combineReducers(reducers)
export default reducer;