/* eslint-disable react/jsx-indent-props */
import React, { useState, memo } from 'react'
import FloatRight from '@/components/float/FloatRight'
import { Input, Text, View } from '@tarojs/components'


import './style.scss'
import { Fragment } from 'react'

const FilterSearch = memo(({
    show,
    setShow,
    search,
    onChange = Function.prototype
}) => {
    const [list, setList] = useState(
        {
            service: [
                {
                    name: '服务名称',
                    id: 101,
                },
                {
                    name: '服务名称',
                    id: 102,
                },
            ],
            product_tag: [
                {
                    name: '商品标签',
                    id: 101,
                }
            ],
            cate: [
                {
                    name: '分类1',
                    id: 101,
                },
                {
                    name: '分类2',
                    id: 102,
                }
            ],
            spec_1: [
                {
                    name: '规格1',
                    id: 101,
                },
            ],
            spec_1: [
                {
                    name: '规格2--',
                    id: 101,
                },
            ]
        }
    )
    return (
        <FloatRight
            width='80vw'
            className='right-search'
            show={show}
            setShow={setShow}
            style={{ background: '#fff' }}
        >
            <View className='wrap' >
                {
                    list ? Object.keys(list).map((e, i) => {
                        if (e !== 'cate') {
                            return (
                                <View className='item fd' key={e}>
                                    <View className='title'>
                                        享受服务
                                    </View>
                                    <View className='flex'>
                                        {
                                            list[e]?.map((_item, i) => {
                                                const act = search[e]?.length > 0 ? search[e].findIndex((_finditem) => {
                                                    return _finditem == _item.id
                                                }) : -1;

                                                return (
                                                    <View className={`'_item fc ${act !== -1 && 'act'}`}
                                                        key={_item.id}
                                                        onClick={() => {
                                                            if (act !== -1) {
                                                                let value = JSON.parse(JSON.stringify(search[e]))
                                                                value.splice(act, 1);
                                                                onChange(e, value)
                                                                console.log(value);
                                                            } else {
                                                                onChange(
                                                                    e,
                                                                    search[e]?.length > 0 ? [...search[e], _item.id] : [_item.id]
                                                                )
                                                            }
                                                        }}
                                                    >
                                                        {_item.name}
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            )
                        } else {
                            return (
                                <Fragment>
                                    <View className='item fb cate'>
                                        <View className='left'>分类</View>
                                        <View className=''>
                                            全部分类 <Text className='iconfont icon-right'></Text>
                                        </View>
                                    </View>
                                    <View className='item fd cate'>
                                        <View className='fb cate'>
                                            <View className='left'>分类</View>
                                            <View className=''>
                                                全部分类 <Text className='iconfont icon-right'></Text>
                                            </View>
                                        </View>
                                        <View className='fc'>
                                            <Input placeholder='最低价' />
                                            <Text className='margin'> - </Text>
                                            <Input placeholder='最高价' />
                                        </View>
                                    </View>
                                </Fragment>
                            )
                        }
                    }) : '暂无数据'
                }

            </View>
        </FloatRight >
    )
})

export default FilterSearch;