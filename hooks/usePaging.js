import { pageScrollTo, showToast, stopPullDownRefresh, useDidShow, usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { useCallback, useEffect, useMemo, useState } from 'react'



const usePaging = (params, http, init, callback = Function.prototype) => {
    const [page, setPage] = useState(1);
    const [no_more, setno_more] = useState(false);
    const [result, setResult] = useState(null);
    const [list, setList] = useState([]);

    const [load, setLoad] = useState(false);
    const [loading, setLoading] = useState(false);

    function initFn() {
        if (typeof init !== 'undefined') {
            console.log('params 改变init page--1');
            setPage(1);
            setno_more(false);
            paging(1, false);
            setList([]);
            pageScrollTo({
                scrollTop: 0,
                duration: 600
            });
            setLoad(true);
        }
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
        paging();
    })

    const paging = useCallback(async (_page, _no) => {
        if (typeof _no === 'boolean') {
            if (_no) return
        } else if (no_more) return;
        if (loading) return
        setLoading(true);
        const res = await http({ ...params, page: _page || page + 1 });
        if (res) {
            setResult(res);
            if (res?.total === list.length) {
                // showToast({ title: '没有更多', icon: 'none' });
                setno_more(true);
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
        setLoading(false);
        stopPullDownRefresh();
        // return res;
    }, [params, page, no_more, loading, list]);

    return [result, no_more, list];
}

export default usePaging;