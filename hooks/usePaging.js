import { pageScrollTo, showToast, stopPullDownRefresh, useDidShow, usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { useCallback, useEffect, useMemo, useState } from 'react'



const usePaging = (params, http, init, callback = Function.prototype, isPag = true) => {
    const [page, setPage] = useState(1);
    const [no_more, setno_more] = useState(false);
    const [result, setResult] = useState(null);
    const [list, setList] = useState([]);

    const [load, setLoad] = useState(false);
    const [loading, setLoading] = useState(false);

    function initFn() {
        console.log('params 改变init page--1');
        setPage(1);
        paging(1);
        setList([]);
        pageScrollTo({
            scrollTop: 0,
            duration: 600
        });
        setLoad(true);
    }

    usePullDownRefresh(() => {
        initFn()
        // getList(params);
    });

    useDidShow(() => {
        console.log('useDidShow init');
        load && initFn()
    });

    useEffect(() => {
        initFn()
    }, [init]);


    useReachBottom(() => {
        console.log('到底了---' + no_more);
        console.log('loading---' + loading);
        if (no_more) return
        paging();
    })

    const paging = useCallback(async (_page) => {
        if (loading) return
        setLoading(true);
        const _params = { ...params };
        if (isPag) _params.page = _page || page + 1;
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
        setTimeout(() => {
            setLoading(false);
        }, 200);
        stopPullDownRefresh();
        // return res;
    }, [params, page, no_more, loading, list]);

    return [result, no_more, list];
}

export default usePaging;