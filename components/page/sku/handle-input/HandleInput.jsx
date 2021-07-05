/* eslint-disable react/jsx-indent-props */
import React from 'react'
import { View, Text, Input } from '@tarojs/components';

const HandleInput = ({
    num,
    onChange = Function.prototype,
}) => {
    return (
        <View className='handle_input'>
            <View
                className='minus btn'
                onClick={(e) => {
                    e.stopPropagation();
                    if (num > 1) onChange(num - 1)
                    else onChange(1)
                }}
            >
                -
            </View>
            <Input type='number' className={`num ${window && 'fc'}`} placeholderStyle='color:#333' placeholder={num}
                onInput={(e) => {
                    e.stopPropagation();
                    onChange(e.detail.value)
                }}
            />
            <View
                className='add btn'
                onClick={(e) => {
                    e.stopPropagation();
                    onChange(Number(num) + 1)
                }}
            >
                +
            </View>
        </View>
    )
}

export default HandleInput;