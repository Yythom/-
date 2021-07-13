/* eslint-disable react/jsx-indent-props */
import React, { Fragment, memo, useState } from 'react';
import { View, Button, Text } from '@tarojs/components';
import BlurImg from '@/components/blur-img/BlurImg';
import { navLinkTo } from '@/common/publicFunc';
import vtab_data from '../tab';
import { showToast } from '@tarojs/taro';

function VtabList({ list }) {
    const [cate_child, setcate_child] = useState(null);
    const [renderChild, setRenderChild] = useState({
        cate: false,
        pro: [],
    });

    /**
     * 
     * @param {*} 
     *      [{
                child_cate: '分类1',
                pro: [
                    {
                        name: '3',
                        image,
                    }
                ]
            }], 
     * @returns 
     */
    const RenderList = ({ _list }) => {
        console.log(_list, '_list');
        return _list?.map((e, i) => {
            return (
                e.pro.map(product => {
                    return (
                        <View className='fd item' onClick={() => navLinkTo('product-list/index', {})} key={e.child_cate + product.name + '_product'}>
                            <BlurImg className='img' src={product.image} />
                            <View className='text'>{product.name}</View>
                        </View>
                    )
                })
            )
        })
    }


    const TabRenderList = memo(({ childList }) => {
        console.log(childList, 'childList------1');
        return <RenderList _list={childList} />
    })



    const IsTabsRenderList = () => {
        return list.child ?
            <>
                <View className='child-tab flex' >
                    {
                        list.child.map(el => <View
                            key={el.child_cate + '_cate_name'}
                            className={`other-cate fc ${cate_child === el && ' act_other-cate'}`}
                            onClick={() => {
                                let child_list = list.child.filter(e => e.child_cate === el.child_cate)[0];
                                console.log(child_list);
                                if (child_list?.pro[0]) {
                                    setRenderChild(child_list);
                                    setcate_child(el);
                                }
                                else showToast({ title: '该分类暂无商品', icon: 'none', })
                            }}
                        >
                            {el.child_cate}
                        </View>
                        )
                    }
                </View>
                <View className='flex item-box'>
                    <TabRenderList childList={renderChild.pro[0] ? [renderChild] : list.child} />
                </View>
            </> :
            <View className='flex item-box'>
                <TabRenderList _list={[list]} />
            </View>
    }

    return (
        <>
            <IsTabsRenderList />
        </>
    )
}
export default VtabList;