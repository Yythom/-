/* eslint-disable react/jsx-indent-props */
import React, { memo, useEffect, useState } from "react";
import { Radio, Text, View } from "@tarojs/components";
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
    datarr = ['18:00', '10:00', '24:00'],
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
            <Text className='iconfont iconguanbi1' onClick={() => setShow(false)}></Text>
            <View className='date_picker' >
                <View className='title fc'>请选择送达时间</View>
                <Vtabs
                    isScroll
                    className='date-tabs'
                    list={vtablist}
                    isBottom
                    onChange={(i) => { setVtabindex(i) }}
                    height='700rpx'
                    windowTabsLength='7'
                >
                    {
                        vtablist[vtabindex]?.pro[0] && vtablist[vtabindex]?.pro?.sort((a, b) => Number(a.split(':')[0]) - Number(b.split(':')[0])).map((e, index) => {
                            let str = vtablist[vtabindex]?.time + ' ' + vtablist[vtabindex]?.pro[index];
                            let show_time = vtablist[vtabindex]?.category + ' ' + vtablist[vtabindex]?.pro[index]
                            let didTime = str
                            let dis_no = dayjs(didTime).unix() < dayjs().unix() + `1` * 3600;
                            let isSelect = date == show_time;
                            return (
                                <View
                                    className={isSelect ? 'act_item item' : 'item'}
                                    onClick={() => {
                                        if (!dis_no) {
                                            // console.log(date, str);
                                            setDate(show_time);
                                        }
                                    }} key={e}
                                >
                                    <View className='text' style={dis_no && { color: '#ccc !important' }}>
                                        {e}
                                    </View>
                                    <Radio disabled={dis_no} checked={isSelect} color='#00D0BF' />
                                </View>
                            )
                        })
                    }
                </Vtabs>
            </View>
        </FloatBottom>
    )
})

export default Date;