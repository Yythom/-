/* eslint-disable react-hooks/exhaustive-deps */
import { View } from '@tarojs/components'
import React, { Component, memo, useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
// import { initErrorNet } from '../utils/wx-net_error';
// import { init, breadcrumb } from '../utils/wx';
import { actions } from '@/store/commonSlice';
import { setStorageSync } from '@tarojs/taro';
import '../assets/icon.css';
import store from '../store';
import './app.scss';
import isWeapp from '@/utils/env';

const InitStore = memo(() => {
    const dispatch = useDispatch();
    console.log('执行store');
    useEffect(() => {
        function query() {
            if (!document.querySelector('.weui-tabbar')) {
                setTimeout(() => {
                    query()
                }, 200);
            } else {
                dispatch(actions.setBarHeight(document.querySelector('.weui-tabbar').clientHeight))
            }
        }
        query();
    }, [])
    return (
        <> </>
    )
});

class App extends Component {

    componentWillMount() {

    }
    componentDidMount() {
        // init({ // 不可在异步执行
        //     silentConsole: false,
        //     // debug: true,
        //     maxBreadcrumbs: 30
        // });
        // initErrorNet(breadcrumb);

    }
    componentDidShow() {

        // getLocal().then(res => { // 获取当前位置
        //     setStorageSync('location_address', res)
        // })
    }

    componentDidHide() { }


    // this.props.children 是将要会渲染的页面
    render() {
        return (
            <Provider store={store}>
                {!isWeapp && <InitStore />}
                {this.props.children}
            </Provider>
        )
    }
}

export default App
