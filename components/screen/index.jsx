/* eslint-disable react/jsx-indent-props */
/**
 * list: [{key: '', name: ''}]筛选列表
 * sort: 1, -1, 0;正序/倒序/
 * index: 当前排序字段index
 */
import React, { memo, Fragment, useCallback, useEffect, useState } from 'react';
import { View, Navigator, Text, Input } from '@tarojs/components';
import { navLinkTo } from '@/common/publicFunc';
import './style.scss'

const Screen = memo(({ list, onShow, onClick }) => {
    const [index, setIndex] = useState('');
    const [act, setAct] = useState({});  // sort的对象 { key:{} }
    const [sortContent, setSortContent] = useState([])

    const init = () => {
        let obj = {}
        list.forEach((e, i) => {
            obj[list[i].key] = ''
            setAct(obj)
        });
        return obj
    }

    useEffect(() => {
        setAct(init())
    }, [])

    useEffect(() => {
        if (index === 0) {
            setSortContent([
                {
                    text: '全部',
                    value: ''
                },
                {
                    text: '升序',
                    value: 1
                },
                {
                    text: '降序',
                    value: 2
                }
            ]);
        }
    }, [index])

    const handleScreenClick = (cate, i) => {
        if (cate.noMore) { // b不需要展开项直接赋值
            setSortContent([])
            // const newObj = { ...act, };
            const newObj = init();
            if (newObj[cate.key]) {
                newObj[cate.key] = ''
            } else {
                newObj[cate.key] = '自定义的'
            }
            // console.log(newObj);

            setAct(newObj);
            onClick(newObj);
        }
        setIndex(i);

        if (i === index) {
            setIndex('');
        }
    }

    return (
        <View className='fb screen'>
            {
                list.map((cate, i) => (
                    <Text
                        key={cate.key} className={['item', act[list[i].key] ? 'item-active' : ''].join(' ')}
                        onClick={() => {
                            // setSort
                            handleScreenClick(cate, i)
                        }}
                    >
                        {act[list[i].key]?.text || cate.name}
                        {
                            act[list[i].key]
                                ?
                                <Text className='iconfont icon-fold' />
                                : <Text className='iconfont icon-unfold' />
                        }

                    </Text>
                ))
            }
            {
                (typeof index === 'number' && sortContent[0]) && <Fragment>
                    <View className='sort-content' >
                        {
                            sortContent.map((e, i) => {
                                return (
                                    <View
                                        className='item_sort'
                                        key={e.text + e.value}
                                        style={act[list[index].key]?.value == e.value && { color: '#EF5F00' }}
                                        onClick={() => {
                                            const actObj = {}
                                            const key = list[index].key
                                            actObj[key] = e; // 值
                                            const newObj = { ...act, ...actObj };
                                            Object.keys(newObj).forEach((item) => {
                                                if (item !== key) newObj[item] = ''
                                            });
                                            setAct(newObj);
                                            onClick(newObj);
                                            setIndex('');
                                        }}
                                    >
                                        {e.text}
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View className='modal-mask' onClick={() => {
                        setIndex('')
                    }} />
                </Fragment>
            }

        </View>
    )
})

export default Screen;