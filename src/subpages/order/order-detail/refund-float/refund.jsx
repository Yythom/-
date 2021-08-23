/* eslint-disable react/jsx-indent-props */
import React, { memo, useEffect, useMemo, useState } from "react";
import { Radio, Text, View } from "@tarojs/components";
import { navLinkTo, systemInfo } from "@/common/publicFunc";
import FloatBottom from "@/components/float/FloatBottom";
import BlurImg from "@/components/blur-img/BlurImg";
import HandleInput from "@/components/page/handle-input/HandleInput";
import np from 'number-precision';
import './refund.scss';

const Refund = memo(({
    setShow = Function.prototype,
    show = true,
}) => {
    const [select, setSelect] = useState([]);
    const [all, setAll] = useState(false)
    const [productList, setProductList] = useState([
        {
            "user_cart_id": "285818215262453760",
            "shop_id": "1",
            price: 999,
            "product_id": "284720805907734531",
            "sku_id": "284720806025175040",
            "product_count": 1,
            "sku": {
                "sku_id": "284720806025175040",
                "number": "011",
                "cover": "https://ryq-mall-ml.oss-cn-chengdu.aliyuncs.com/ryq/e9aba14153471759b4ccc34ab8483169.png",
                "market_price": "14.00",
                "discount_price": "10.00",
                "member_price": "8.00",
                "stock": 100,
                "sku_default_value": [
                    {
                        "value_id": "285813786656247808",
                        "value": "原味"
                    }
                ]
            },
            "product": {
                "product_id": "284720805907734531",
                "product_name": "安慕希",
                "cover": "https://ryq-mall-ml.oss-cn-chengdu.aliyuncs.com/ryq/e9aba14153471759b4ccc34ab8483169.png",
                "enable": 1,
                "status": 2
            },
            "is_buy": 1
        }
    ])
    useEffect(() => {

    }, []);

    const refund_price = useMemo(() => {
        select.length === productList.length ? setAll(true) : setAll(false);
        return select.reduce((prev, next) => np.plus( // 总价
            prev, np.times(
                next.price, next.product_count
            ),
        ), 0);
    }, [select])

    return (
        <FloatBottom show={show} setShow={setShow} className='refund_float' style={{ borderRadius: '40rpx 40rpx 0px 0px', }}>
            <Text className='iconfont icon-close' onClick={() => setShow(false)}></Text>
            <View className='title fc'>申请退款</View>
            {
                productList?.map((product, index) =>
                    <View className='card flex' key={product?.product_id} >
                        <View className='check fc'
                            onClick={() => {
                                const copy = JSON.parse(JSON.stringify(productList));
                                let item = copy[index];
                                item.checked = !copy[index].checked;
                                setProductList(copy);
                                setSelect(copy.filter(e => e.checked));
                            }}
                        >
                            <Radio className='radio' color='#00D0BF' checked={product.checked} />
                        </View>
                        <View className='product flex' onClick={(e) => { navLinkTo('product-detail/index', { product_id: product.product_id }); e.stopPropagation(); }}>
                            <BlurImg className='img' mode='aspectFill' src={product?.sku.cover} />
                            {/* <Image mode='aspectFill' /> */}

                            <View className='desc fd'>
                                <Text className='p-name'>{product?.product.product_name || '空'}</Text>
                                <Text className='sku-str'>{product?.sku?.sku_default_value.map(e => e?.value + ' ').toString()}</Text>
                                <View className='p-num fb' style={{}}>
                                    <Text className='price'><Text className='_money'>¥</Text>{product?.sku.discount_price}</Text>
                                    <HandleInput
                                        // list={list}
                                        num={product.product_count}
                                        onChange={(value) => {
                                            const copy = JSON.parse(JSON.stringify(productList));
                                            let item = copy[index];
                                            item.product_count = value;
                                            setProductList(copy);
                                            setSelect(copy.filter(e => e.checked));
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                )
            }
            <View className='footer-handle fb' style={{ height: `calc(120rpx + ${systemInfo.safeArea.top / 2}px)` }}>
                <View className='fc' onClick={() => {
                    const copy = JSON.parse(JSON.stringify(productList));
                    copy.forEach(e => {
                        e.checked = !all
                    });
                    setProductList(copy);
                    setSelect(copy.filter(e => e.checked));
                }}>
                    <Radio color='#00D0BF' checked={all} /> <Text className=''>全选</Text>
                </View>
                <View className='right flex'>
                    <View className='refund-info fd'>
                        <View className='flex' style={{ fontSize: '32rpx', color: '#333', marginBottom: '5rpx' }}>
                            <Text className=''>退款金额：</Text>
                            <Text className='price'>¥{refund_price}</Text>
                        </View>
                        <View className='flex' style={{ fontSize: '24rpx', color: '#666' }}>
                            <Text>订单金额：</Text>
                            <Text>¥999</Text>
                        </View>
                    </View>
                    <View className='refunt-btn fc'>申请退款</View>
                </View>
            </View>

        </FloatBottom >
    )
})

export default Refund;