import React from 'react'
import { Text } from "@tarojs/components";
/**
 * @param {jsx绑定函数} func 
 * @param {延迟} threshold 
 * @param {是否直接执行} immediate
 */
export function debounce(func, threshold = 500, immediate = false) {
    if (typeof func !== 'function') {
        throw new Error('First argument of debounce function should be a function');
    }
    let timer = null;
    return function debounced(...args) {
        const context = this;
        const callNow = immediate && !timer;
        const later = () => {
            timer = null;
            if (!immediate) func.apply(context, args);
        };
        ////console.log('please wait');
        clearTimeout(timer);
        timer = setTimeout(later, threshold);
        if (callNow) func.apply(context, args);
        // console.log(func);

    };
}

export function throttle(fn, wait = 500, isImmediate = false) {
    var flag = true;
    // eslint-disable-next-line no-unused-vars
    var timer = null;
    if (isImmediate) {
        return function () {
            if (flag) {
                fn.apply(this, arguments);
                flag = false;
                timer = setTimeout(() => {
                    flag = true
                }, wait)
            }
        }
    }
    return function () {
        if (flag == true) {
            flag = false
            // eslint-disable-next-line 
            var timer = setTimeout(() => {
                fn.apply(this, arguments)
                flag = true
            }, wait)
        }
    }
}


export const min_max_price_format = (max, min,) => {
    if (Number(min || 0) == 0) return null
    console.log('max', max, 'min', min, 'max - min', max - min )
    if (max - min == 0) {
        return `${min}`
    } else {
        return <Text>
            <Text className='_money'>¥</Text>
            {min}
            <Text class='_money'>起</Text>
        </Text>
    }
}