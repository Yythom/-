/* eslint-disable react/jsx-indent-props */
import React, { useEffect, useState } from 'react';
import { Text, View } from '@tarojs/components';
import { lkHideLoading, lkShowLoading, navLinkTo } from '@/common/publicFunc';
import { getStorageSync, removeStorageSync, setStorageSync, showToast, useDidShow, } from '@tarojs/taro';
import Search from '@/components/search/Search';
import './history_search.scss'

const HistorySearch = ({
    storage_logkey = 'search-log', // 本地设置的stroge key名
    className,
    isShowHot, // 热门列表
    api, // 搜索api接口
    renderCenter, // 筛选jsx
    text
    // list, // 嵌套时可由外层控制
    // setList,
}) => {
    // const [list, setList] = useState([
    //     {
    //         product_id: '101',
    //         product_name: '官方直降Apple/苹果 Apple/苹果',
    //         price: '7999',
    //         member_price: '6999',
    //         sale: 12,
    //         num: '2',
    //         tags: [
    //             {
    //                 id: 1,
    //                 name: '20元券',
    //             },
    //             {
    //                 id: 1,
    //                 name: '补贴￥3元',
    //             },
    //         ]
    //     },
    //     {
    //         product_id: '102',
    //         product_name: '官方直降Apple/苹果 Apple/苹果 iPhone SE (第二代)旗舰se2手机',
    //         price: '7999',
    //         member_price: '6999',
    //         sale: 33,
    //         num: '2',
    //         tags: [
    //             {
    //                 id: 1,
    //                 name: '20元券',
    //             },
    //             {
    //                 id: 1,
    //                 name: '补贴￥3元',
    //             },
    //         ]
    //     },
    // ]);
    const [log, setLog] = useState([]); // 历史记录
    const [item, setItem] = useState('')

    useDidShow(() => {
        if (getStorageSync(storage_logkey)) {
            setLog(getStorageSync(storage_logkey))
        }
    })

    // useEffect(() => {
    //     searchFn(item) // 筛选内容改变重搜索
    // }, [api?.params?.sort])

    const searchFn = async (_text) => {
        if (!_text) {
            // setList([]);
            setItem('');
            showToast({
                title: '请填写搜索内容',
                icon: 'none',
            })
            return;
        }
        if (!log.includes(_text)) { // 并且 历史不存在当前 输入框的值
            const $log = [_text, ...log];
            console.log($log, '$log');
            setStorageSync(storage_logkey, $log); // 添加新的历史
            setLog($log);
        }
        setItem(_text)



        setTimeout(() => {
            navLinkTo('product-list/index', { search_text: encodeURIComponent(_text) });
        }, 100);

        // let _list = await api.api({ ...api.params });
        // console.log(api.params);
        // if (_list) {
        //     hideLoading();
        //     if (_list.list[0]) {
        //         setPage(1);
        //         setTotal(_list.total)
        //         setList(_list.list)
        //     } else {
        //         showToast({ title: '暂无数据', icon: 'none' })
        //     }
        // }
    }

    // 分页相关
    // const [page, setPage] = useState('');
    // const [total, setTotal] = useState('');

    // const [req, setReq] = useState(false);
    // const paging = async () => {
    //     if (total > 10 && list.length !== total && !req) {
    //         if (total === list.length) {
    //             showToast({ title: '到底了', icon: 'none' });
    //             return
    //         }
    //         showLoading('加载中...')
    //         setReq(true)
    //         let res = await api.api({ ...api.params, page: page + 1 });
    //         if (res) {
    //             console.log(res, 'res----------paging');
    //             setPage(page + 1);
    //             setList([...list, ...res.list])
    //             if (total != res.total) {
    //                 setTotal(res.total);
    //             }
    //         }
    //         setReq(false)
    //         hideLoading();
    //     }
    // }

    // useReachBottom(() => {
    //     paging()
    // })
    const clear = () => {
        setLog('');
        // setList([]);
        removeStorageSync(storage_logkey);
    }

    return (
        <View className={`history_search_wrap ${className}`}  >
            <View className='fc search'>
                <Search onClick={() => {
                    searchFn(item)
                }} isEditor width='720rpx' value={item} text='搜索更多优惠商品' onBlur={searchFn} height='34px' style={{ top: getStorageSync('navHeight') + 'px' }} />
            </View>
            {/* {
                list[0] && renderCenter
            } */}

            {
                isShowHot && <View className='hot_box'>
                    <View className='hot_title'>
                        <View className='text'>热门搜索</View>
                    </View>
                    <View className='hot_list'>
                        {[0, 1, 3].map(e => {
                            return (
                                <View className='item' key={'his' + e} >
                                    {e}
                                </View>
                            )
                        })}
                    </View>
                </View>
            }

            {
                log[0] ?
                    //  &&!list[0] 
                    <View className='history_box'>
                        <View className='history_title'>
                            <View className='text'>历史搜索</View>
                            <View className='iconfont icon-delete' onClick={() => { clear() }} ></View>
                        </View>
                        <View className='history_list'>
                            {log.map(e => {
                                return (
                                    <View className='item' key={'his' + e} onClick={() => searchFn(e)}>
                                        {e}
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    : <View className='history_box' style={{ marginTop: '12px', textAlign: 'center', color: '#555' }}>暂无搜索记录</View>
            }

            {/* {
                <View className='list'>
                    {
                        list[0] && list.map(e => {
                            return (
                                <ProductItem
                                    list={list}
                                    key={e.product_id}
                                    product={e}
                                />
                            )
                        })
                    }
                </View>
            } */}
        </View >
    )
}
export default HistorySearch;
