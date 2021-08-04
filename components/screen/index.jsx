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
    const [act, setAct] = useState({});
    const [sortContent, setSortContent] = useState([])

    useEffect(() => {
        let obj = {}
        list.forEach((e, i) => {
            obj[list[i].key] = ''
            setAct(obj)
        });
    }, [])

    useEffect(() => {
        if (index == 0) {
            setSortContent([
                {
                    text: '升序',
                    value: 1
                },
                {
                    text: '降序',
                    value: 2
                }
            ]);
        } else if (index == 1) {
            setSortContent([
                {
                    text: '升序',
                    value: 1
                },
                {
                    text: '降序',
                    value: 2
                }
            ]);
        } else {
            setSortContent([
                {
                    text: '213121',
                    value: 1
                },
                {
                    text: '213123',
                    value: 2
                }
            ]);
        }
        console.log(index, '执行');
    }, [index])

    const handleScreenClick = (i) => {
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
                            handleScreenClick(i)
                        }}
                    >
                        {act[list[i].key]?.text || cate.name}
                        {
                            index === i
                                ?
                                <Text className='iconfont icon-fold' />
                                : <Text className='iconfont icon-unfold' />
                        }

                    </Text>
                ))
            }
            {
                typeof index === 'number' && <Fragment>
                    <View className='sort-content' >
                        <View
                            className=''
                            onClick={() => {
                                const actObj = {}
                                const key = list[index].key
                                actObj[key] = '';
                                const newObj = { ...act, ...actObj };
                                Object.keys(newObj).forEach((item) => {
                                    if (item !== key) newObj[item] = ''
                                });
                                setAct(newObj);
                                onClick(newObj);
                                setIndex('')
                            }}
                        >
                            全部
                        </View>
                        {
                            sortContent.map((e, i) => {
                                return (
                                    <View
                                        className=''
                                        key={e.text + e.value} style={act[list[index].key]?.value == e.value && { color: 'red' }}
                                        onClick={() => {
                                            const actObj = {}
                                            const key = list[index].key
                                            actObj[key] = e;

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