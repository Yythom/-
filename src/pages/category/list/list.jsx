/* eslint-disable react/jsx-indent-props */
import React, { Fragment, memo, useState } from 'react';
import { View, Button, Text } from '@tarojs/components';
import BlurImg from '@/components/blur-img/BlurImg';
import { navLinkTo } from '@/common/publicFunc';
import vtab_data from '../tab';
import { showToast } from '@tarojs/taro';

function VtabList({ list, child, setList, tabIndex }) {
    const [cate_child, setcate_child] = useState(null);

    const RenderList = () =>
        list?.pro?.map((e, i) => {
            return (
                <View className='fd item' key={i} onClick={() => navLinkTo('product-list/index', {})}>
                    <BlurImg className='img' src={e.image} />
                    <View className='text'>{e.name}</View>
                </View>
            )
        })

    const TabRenderList = () =>
        child.map((e, i) => {
            return (
                <Fragment key={i + '_parent-cate'}>
                    {
                        e.pro.map(product => {
                            return (
                                <View className='fd item' onClick={() => navLinkTo('product-list/index', {})} key={e.child_cate + product.name + '_product'}>
                                    <BlurImg className='img' src={product.image} />
                                    <View className='text'>{product.name}</View>
                                </View>
                            )
                        })
                    }
                </Fragment>
            )
        })

    const IsTabsRenderList = () => {
        console.log(cate_child, 'cate_child');
        return child ?
            <>
                <View className='child-tab flex' >
                    {
                        child.map(el => <View
                            key={el.child_cate + '_cate_name'}
                            className={`other-cate fc ${cate_child === el && ' act_other-cate'}`}
                            onClick={() => {
                                let child_list = vtab_data[tabIndex].child.filter(e => e.child_cate === el.child_cate)[0];
                                console.log(child_list);
                                if (child_list?.pro[0]) {
                                    console.log(el);
                                    setList(child_list);
                                    setcate_child(el);
                                }
                                else showToast({
                                    title: '该分类暂无商品',
                                    icon: 'none',
                                })

                            }}
                        >
                            {el.child_cate}
                        </View>
                        )
                    }
                </View>
                <View className='flex item-box'>
                    {
                        list?.pro
                            ? <RenderList /> :
                            <TabRenderList />
                    }
                </View>
            </> :
            <View className='flex item-box'>
                <RenderList />
            </View>
    }

    return (
        <>
            <IsTabsRenderList />
        </>
    )
}
export default VtabList;