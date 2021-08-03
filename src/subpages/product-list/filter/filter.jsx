/* eslint-disable react/jsx-indent-props */
import React, { useState, memo } from 'react'
import FloatRight from '@/components/float/FloatRight'
import { View } from '@tarojs/components'


import './style.scss'

const FilterSearch = memo(({
    show,
    setShow,
}) => {

    return (
        <FloatRight
            width='80vw'
            className='right-search'
            show={show}
            setShow={setShow}
            style={{ background: '#fff' }}
        >
            <View className='' >
                <View className='title'>

                </View>

            </View>
        </FloatRight>
    )
})

export default FilterSearch;