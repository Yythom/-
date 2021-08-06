/* eslint-disable react-hooks/exhaustive-deps */
import { View } from '@tarojs/components'
import React, { Component, memo, useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
// import { initErrorNet } from '../utils/wx-net_error';
// import { init, breadcrumb } from '../utils/wx';
import { actions } from '@/store/commonSlice';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import store from '../store';
import '../assets/icon.css';
import './app.scss';

dayjs.locale('zh-cn');
const InitStore = memo(() => {
    const dispatch = useDispatch();
    console.log('执行store');
    useEffect(() => {
        dispatch(actions.setThemeConfig({
            theme: '#333'
        }))
    }, [])
    return null
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
                <InitStore />
                {this.props.children}
            </Provider>
        )
    }
}

export default App
