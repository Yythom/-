/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-indent-props */
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { View, Text, Radio, ScrollView, Image } from '@tarojs/components';
// import NavBar from '@/components/navbar/NavBar';
import Taro, { getStorageSync, removeStorageSync, setStorageSync, showToast, startPullDownRefresh, stopPullDownRefresh, useDidShow, usePullDownRefresh } from '@tarojs/taro'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { navLinkTo, systemInfo } from '@/common/publicFunc';
import Skuhooks from '@/components/page/sku-hook/sku-hooks';
import CouponFloat from '@/components/page/coupon/coupon';
import ProductService from '@/services/product';
import { actions } from '@/store/userSlice';
import { actions as tabActions } from '@/src/custom-tab-bar/store/slice';
import CartService from '@/services/cart';
import filter_data from '../../../hooks/sku-utils/data_filter';
import useSummary from '../../../hooks/useSummary';
import ProductItem from './product-item/ProductItem';
import './index.scss'
import WithUserVerify from '@/components/auth/UserVerify';

const Index = () => {
    const commonStore = useSelector(e => e.commonStore, shallowEqual);
    const cartPrice = useSelector(e => e.userStore.cart_price, shallowEqual);
    const dispatch = useDispatch();
    const [skushow, setskuShow] = useState(false);
    const [skuData, setSkuData] = useState(null);
    const [couponshow, setCouponshow] = useState(false)
    const [pageData, setPageData] = useState([]);

    const [edit, setEdit] = useState(false);
    const [list, summaryShop, isAll, price, discount_price, selectArr] = useSummary(pageData);

    console.log(list, summaryShop);

    // 用户操作成功回调内容
    const success = async (item, shop_id, cb) => {
        const res = await CartService.change(
            shop_id,
            item.user_cart_id,
            item.product_id,
            item.sku.sku_id,
            item.product_count
        )
        if (res) {
            // 重新获取发生修改的product数据
            const detail_item = await CartService.detail(res.user_cart_id);
            if (detail_item) {
                cb(detail_item, res.delete_user_cart_id, res.user_cart_id);
            }
        }
    }

    const handle = async (index, shop_id, type, value) => {
        const newList = JSON.parse(JSON.stringify(list));
        const shopIndex = newList.findIndex(e => e.shop_id == shop_id);
        let shop = newList[shopIndex]       // 查找到某个店铺
        let item = shop.products[index];  // 查找到某个店铺下的该商品
        switch (type) {
            case 'delete':
                const res = await CartService.delete([item.user_cart_id]);
                if (res) {
                    shop.products.splice(index, 1);
                    if (!shop.products[0]) newList.splice(shopIndex, 1);
                    onChange(newList);
                }
                break;
            case 'number':
                item.product_count = value || (value?.length == 0 ? 1 : item.sku.stock); // 修改当前商品数量
                if (value) {
                    success(item, shop_id, (newItem) => {
                        dispatch(actions.upcart_price()); setPageData(newList);
                    })
                }
                break;
            case 'check':
                item.checked = !item.checked; // 修改当前商品选择状态
                onChange(newList, 'no_refresh_cart_price'); // 静态改变不需要刷新全局购物车价格
                break;
            case 'sku':
                item.product_count = value.product_count;  // 修改当前商品sku
                item.sku.sku_id = value.sku_id;
                success(item, shop_id, (newItem, del_id, current_id) => {
                    // item.sku = newItem.sku;
                    // item.product_count = newItem.product_count;
                    if (del_id) {
                        // 同商品修改选择同sku 删除旧数据
                        const del_index = shop.products.findIndex(e => e.user_cart_id === del_id)
                        if (del_index !== -1) {
                            shop.products.splice(del_index, 1);
                        }
                    }
                    if (current_id) {
                        // 替换新product数据
                        const current_index = shop.products.findIndex(e => e.user_cart_id === current_id)
                        if (current_index !== -1) {
                            shop.products[current_index] = { ...shop.products[current_index], ...newItem };
                        }
                        if (!shop.products[0]) newList.splice(shopIndex, 1);
                    }
                    onChange(newList);
                    setskuShow(false);
                })
                break;
        }
    }

    const init = async () => {
        const res = await CartService.list();
        stopPullDownRefresh();
        if (!res) return
        if (res.list) setPageData([{ shop_id: '1', products: res.list }])
        console.log(res, 'res');
    }

    const pay = async () => {
        if (!selectArr[0]) {
            showToast({ title: '请选择商品', icon: 'none' });
            return;
        }
        const pre_data = {
            shop_id: pageData[0].shop_id,
            sku_items: summaryShop[pageData[0].shop_id].products.map(e => {
                return {
                    sku_id: `${e.sku_id}`,
                    count: e.product_count,
                }
            })
        }
        console.log(pre_data, 'pre_data');
        setStorageSync('pre-data', pre_data)
        setTimeout(() => {
            navLinkTo('order-comfirm/index', {})
        }, 200);
    }

    const del = async () => {
        const res = await CartService.delete(selectArr.map(e => e.user_cart_id));
        if (res) {
            init();
        }
        setEdit(false)
    }

    const onChange = useCallback(async (newList, no_refresh_cart_price) => {
        setPageData(newList);
        if (!no_refresh_cart_price) dispatch(actions.upcart_price());
    }, [list])

    const [sku_index, setSku_index] = useState({
        index: '',
        shop_id: '',
    });
    const [default_sku, setDefault_sku] = useState([]);

    const showSku = useCallback(async (product, index, shop_id) => {
        const res = await ProductService.getProductDataApi(product.product_id);
        // 设置sku初始化数据
        setSkuData({ ...filter_data(res), product_count: product.product_count });
        const default_sku_list = product?.sku?.sku_default_value?.map(e => { return { id: e.value_id, name: e.value } });
        /** 
         * 设置默认选中的sku数组对象
         * [
         *   {
         *     id: "283038145040498689",
         *     name: '原道型'
         *   },
         * ]
         */
        if (default_sku_list[0]) setDefault_sku(default_sku_list)

        setTimeout(() => {
            setskuShow(4);
        }, 100);
        setSku_index({ index, shop_id, })
    }, [list])

    const onOk = async (sku) => {
        if (!sku) return showToast({ title: 'x', icon: 'none' })
        if (sku) {
            console.log(sku, 'on ok');
            handle(sku_index.index, sku_index.shop_id, 'sku', sku)
        }
    }

    usePullDownRefresh(() => {
        console.log('刷新');
        init();
    });

    useDidShow(() => {
        dispatch(tabActions.changetab(2))
        removeStorageSync('address_id')
        if (!getStorageSync('addcart-subpages')) {

        } else {
            setEdit(false);
            init();
            removeStorageSync('addcart')
        }
    })

    useEffect(() => {
        init();
    }, [])


    return (
        <View className='subpage-cart-wrap index' >
            <ScrollView scrollY className='scrollview'>
                <View className='cart-title fb' style={{ top: 0 + 'px' }}>
                    <View className='total'>支付成功生成取货码，持码到店取货</View>
                    <View className='header_edit flex' >
                        {/* <View className='price' onClick={() => setCouponshow(true)} >领券</View> */}
                        {
                            !edit ?
                                <View className='fc' onClick={() => { setEdit(!edit) }} >
                                    {/* <Text style={{ fontWeight: 'bold', color: '#DEDEDE' }}>｜</Text> */}
                                    管理
                                </View>
                                : <View className='fc' onClick={() => { setEdit(!edit) }} ><Text style={{ fontWeight: 'bold', color: '#DEDEDE' }}>｜</Text> 完成</View>
                        }
                    </View>
                </View>
                <View className='list' >
                    {pageData[0]?.products[0] ?
                        pageData.map((e, i) =>
                            <View className='shop_wrap' key={e.shop_id}>
                                {/* <View className='shopname flex'  style={{ height: '80rpx' }} >
                                    <Radio className='radio' color='#eb472b' checked={summaryShop[e.shop_id]?.checked} onClick={() => {
                                        const newList = JSON.parse(JSON.stringify(pageData));
                                        newList.forEach(shop => {
                                            if (shop.shop_id == e.shop_id) {
                                                shop.products.forEach(el => {
                                                    el.checked = !summaryShop[e.shop_id]?.checked
                                                })
                                            }
                                        });
                                        setPageData(newList);
                                    }} />{e.shop_id}
                                </View> */}
                                {
                                    e.products.map((product_item, index) =>
                                        <ProductItem
                                            key={product_item.product_id}
                                            list={pageData}
                                            shop_id={e.shop_id}
                                            handle={handle}
                                            index={index}
                                            product={product_item}
                                            showSku={showSku}
                                        />
                                    )
                                }
                            </View>
                        ) : <View className='empty fc' style={{ minHeight: '60vh' }}>
                            <View>
                                <Image mode='widthFix' style={{ width: '400rpx', height: '400rpx' }} src={require('../../../assets/images/购物车.png')} />
                                <View className='fc' style={{ fontSize: '28rpx', color: '#999' }}>购物车暂无商品哦～</View>
                            </View>
                        </View>

                    }
                </View>
                <View className='footer fb'  >
                    <View className='pay fb'>
                        <View className='left flex' onClick={() => {
                            const newList = JSON.parse(JSON.stringify(pageData));
                            console.log(isAll, 'isAll');
                            newList.forEach(e => {
                                e.products.forEach(el => {
                                    el.checked = !isAll
                                })
                            });
                            setPageData(newList);
                        }}>
                            <Radio className='radio' color='#00D0BF' checked={pageData[0] ? isAll : false} />
                            {!isAll ? "全选" : (pageData[0] ? "全不选" : '全选')}
                        </View>

                        <View className='p_wrap fc'>
                            <View className='price-box' onClick={(event) => { }} >
                                <View className='fc'>
                                    合计：<Text className='price'><Text className='_money'>¥</Text>{price}</Text>
                                </View>
                                {/* <View className='price'>
                                    已优惠 ¥{discount_price}
                                </View> */}
                            </View>
                            <WithUserVerify isVerifyPhone >
                                <View
                                    className='btn  fc'
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        if (Object.keys(summaryShop).length == 0) return showToast({ title: '请先选择商品', icon: 'none', })
                                        if (!edit) pay();
                                        else del()
                                    }}
                                >
                                    {!edit && `结算`}
                                    {edit && '删除'}
                                </View>
                            </WithUserVerify>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* sku弹框 */}
            <Skuhooks
                bottom={0}
                show={skushow}
                setShow={setskuShow}
                product={skuData}
                default_sku={default_sku}
                initNumber={skuData?.product_count}
                onOk={(e) => {
                    onOk(e)
                    // if (e) setSku(e);
                }}
            />

            {/* 优惠券弹框 */}
            <CouponFloat
                show={couponshow}
                //    coupon={}
                setShow={setCouponshow}
            />
        </View >
    )
}
export default Index;
