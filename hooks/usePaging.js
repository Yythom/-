import { pageScrollTo, showToast, stopPullDownRefresh, useDidShow, usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { useCallback, useEffect, useMemo, useState } from 'react'



const usePaging = (
    params,
    http,
    init,  // 控制是否初始化分页
    callback = Function.prototype, // 请求成功回调
    isPag = true, // 是否开启分页
    isWindow = true, // 是否开启窗口触底 默认窗口触底
    is_bottom = false, // scrollview触底 i++
) => {
    const [page, setPage] = useState(1);
    const [no_more, setno_more] = useState(false);
    const [result, setResult] = useState(null);
    const [list, setList] = useState([]);

    const [load, setLoad] = useState(false);
    const [loading, setLoading] = useState(false);

    const initFn = useCallback((is_init) => {
        console.log('params 改变init page--1');
        setPage(1);
        setList([]);
        paging(1, true);
        isWindow && pageScrollTo({
            scrollTop: 0,
            duration: 600
        });
        setLoad(true);
    }, [params, isWindow]);

    usePullDownRefresh(() => {
        console.log('刷新', isWindow);
        isWindow && initFn(true);
    });

    // useDidShow(() => {
    //     console.log('useDidShow init');
    //     load && initFn()
    // });

    useEffect(() => {
        initFn()
    }, [init]);

    useEffect(() => {
        if (is_bottom) {
            console.log('scrollview到底---' + no_more, isWindow);
            if (no_more && !isWindow) return
            paging();
        }
    }, [is_bottom]);

    useReachBottom(() => {
        console.log('window到底---' + no_more, isWindow);
        if (no_more && isWindow) return
        paging();
    });

    const paging = useCallback(async (_page, is_init) => {
        if (loading && !is_init) return
        setLoading(true);
        const _params = { ...params };
        if (isPag) _params.page = _page || page + 1;
        console.log(page, '_params_params_params');
        const res = await http(_params);
        if (res) {
            setResult(res);
            if (res?.list) {
                if (res?.total === (_page ? res?.list?.length : [...list, ...res?.list]?.length)) {
                    console.log('没有更多');
                    setno_more(true);
                } else {
                    setno_more(false);
                }
                if (res?.list[0]) {
                    console.log(res, 'res -- paging');
                    callback();
                    setList(
                        _page
                            ? res.list
                            : [...list, ...res?.list]
                    )
                    setPage(_page || page + 1);
                }
            }
        }
        setLoading(false);
        isWindow && stopPullDownRefresh();
    }, [params, page, no_more, loading, list]);

    return [result, no_more, list];
}

export default usePaging;