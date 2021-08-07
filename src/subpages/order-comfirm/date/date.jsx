/* eslint-disable react/jsx-indent-props */
import React, { memo, useEffect, useState } from "react";
import { Text, View } from "@tarojs/components";
import { navLinkTo } from "@/common/publicFunc";
import FloatBottom from "@/components/float/FloatBottom";
import Vtabs from "@/components/v-tabs/Vtabs";
import dayjs from "dayjs";
import { funDate } from "./utils";
import './date.scss'

const Date = memo(({
    setShow = Function.prototype,
    show = true,
    setDate = Function.prototype,
    date,
    datarr = ['16:00~18:00', '9:00~10:00', '10:00~24:00'],
}) => {
    const [vtablist, setVtablist] = useState([]);
    const [vtabindex, setVtabindex] = useState(0);

    const init = () => {
        let vTab = [];
        Array.from(new Array(7).keys()).forEach(e => {
            vTab.push({
                category: funDate(e).str, // { str , time }
                time: funDate(e).time,
                pro: datarr
            })
        })
        setVtablist(vTab)
    }
    useEffect(() => {
        init()
    }, []);


    return (
        <FloatBottom show={show} setShow={setShow} className='data_float'>
            <View className='date_picker' style={{ height: '61vh' }}>
                <Text className='iconfont icon-close' onClick={() => setShow(false)}></Text>
                <View className='title'>请选择送达时间</View>
                <Vtabs isScroll list={vtablist} onChange={(i) => { setVtabindex(i) }} height='65vh' windowTabsLength='6' >
                    {
                        vtablist[vtabindex]?.pro[0] && vtablist[vtabindex]?.pro?.sort((a, b) => Number(a.split(':')[0]) - Number(b.split(':')[0])).map((e, index) => {
                            let str = vtablist[vtabindex]?.time + ' ' + vtablist[vtabindex]?.pro[index];
                            let didTime = vtablist[vtabindex]?.time + ' ' + str.trim().split('~')[1];
                            let dis_no = dayjs(didTime).unix() < dayjs().unix() + `1` * 3600;
                            console.log(dis_no, didTime, str, 'dis_no');
                            return (
                                <View style={dis_no && { color: '#ccc' }} className={date == str ? 'act_item item' : 'item'} onClick={() => {
                                    if (!dis_no) {
                                        console.log(date, str);
                                        setDate(str);
                                    }
                                }} key={e}>{
                                        e
                                    }</View>
                            )
                        })
                    }
                </Vtabs>
            </View>
        </FloatBottom>
    )
})

export default Date;