export const data = {
    skuList: {  // 所有可选列表
        // 4.7寸;16G;红色
        "101;201;302": {
            "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',
            "price": 200,
            "stock": 10,
            'sku_id': '111',
            'sale_price': 999
        },
        // 4.7寸;16G;黄色
        "101;201;303": {
            "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',   // sku主图
            "price": 150, // 价格
            "stock": 6,// 库存
            'sku_id': '222',
            'sale_price': 200
        },
        // 5.5寸;16G;红色
        "102;201;302": {
            "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',
            "price": 101,
            "stock": 10,
            'sku_id': '333',
            'sale_price': 100
        },
        // 5.5寸;16G;黑色
        "102;201;301": {
            "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',
            "price": 200,
            "stock": 2,
            'sku_id': '444',
            'sale_price': 130
        },
        // 5.5寸;64G;黄色
        "102;203;303": {
            "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',
            "price": 110,
            "stock": 6,
            'sku_id': '555',
            'sale_price': 140
        },
        // 5.5寸;32G;黑色
        "201;202;301": {
            "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',
            "price": 300,
            "stock": 16,
            'sku_id': '666',
            'sale_price': 340
        },
        "103;202;301": {
            "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',
            "price": 300,
            "stock": 16,
            'sku_id': '777',
            'sale_price': 440
        },
    },
    skuSpec: [ // sku规范
        {
            "id": 262,
            "goodsId": 13,
            "specName": "尺寸",
            "specAttrList": [
                { id: 101, specId: 262, name: '4.7寸' },
                { id: 102, specId: 262, name: '5.5寸' },
                { id: 103, specId: 262, name: '6.0寸' },
            ]
        },
        {
            "id": 263,
            "goodsId": 13,
            "specName": "内存",
            "specAttrList": [
                { id: 201, specId: 263, name: '16G' },
                { id: 202, specId: 263, name: '32G' },
                { id: 203, specId: 263, name: '64G' },
            ]
        },
        {
            "id": 264,
            "goodsId": 13,
            "specName": "颜色",
            "specAttrList": [
                { id: 301, specId: 264, name: '黑色' },
                { id: 302, specId: 264, name: '红色' },
                { id: 303, specId: 264, name: '黄色' },
            ]
        }
    ]
}


export const onlineData = {
    "product_id": "282335091152424960",
    "shop_id": "1",
    "first_cate_id": "282254847611502592",
    "sec_cate_id": "282255251321651200",
    "brand_id": "0",
    "product_name": "男鞋",
    "cover": "https://fish-pay.oss-cn-chengdu.aliyuncs.com/https://picsum.photos/id/104/300/300",
    "market_price": "100.00",
    "discount_price": "80.00",
    "member_price": "75.00",
    "is_member": 0,
    "status": 1,
    "audit_status": 1,
    "create_at": "1628273931",
    "update_at": "1628281479",
    "enable": 1,
    "first_cate": {
        "category_id": "282254847611502592",
        "category_name": "百货售卖"
    },
    "sec_cate": {
        "category_id": "282255251321651200",
        "category_name": "皮鞋专卖"
    },
    "images": [{
        "image_id": "282335091286642690",
        "product_id": "282335091152424960",
        "type": 1,
        "url": "https://fish-pay.oss-cn-chengdu.aliyuncs.com/https://picsum.photos/id/104/300/300"
    }],
    "specs": [{
        "spec_id": "282335091278254080",
        "product_id": "282335091152424960",
        "spec_name": "尺码",
        "status": 1,
        "spec_values": [{
            "value_id": "282335091278254081",
            "spec_id": "282335091278254080",
            "value": "40"
        },
        {
            "value_id": "282335091278254082",
            "spec_id": "282335091278254080",
            "value": "41"
        }]
    },
    {
        "spec_id": "282335091282448384",
        "product_id": "282335091152424960",
        "spec_name": "配色",
        "status": 1,
        "spec_values": [{
            "value_id": "282335091282448385",
            "spec_id": "282335091282448384",
            "value": "黑色"
        },
        {
            "value_id": "282335091282448386",
            "spec_id": "282335091282448384",
            "value": "白色"
        }]
    }],
    "skus": {
        "282335091278254081;282335091282448385": {
            "sku_id": "282335091282448387",
            "product_id": "282335091152424960",
            "market_price": 10000,
            "discount_price": 8000,
            "member_price": 7500,
            "stock": "100"
        },
        "282335091278254081;282335091282448386": {
            "sku_id": "282335091282448391",
            "product_id": "282335091152424960",
            "market_price": 20000,
            "discount_price": 18000,
            "member_price": 17500,
            "stock": "100"
        },
        "282335091278254082;282335091282448385": {
            "sku_id": "282335091282448395",
            "product_id": "282335091152424960",
            "market_price": 30000,
            "discount_price": 38000,
            "member_price": 37500,
            "stock": "100"
        },
        "282335091278254082;282335091282448386": {
            "sku_id": "282335091282448399",
            "product_id": "282335091152424960",
            "market_price": 40000,
            "discount_price": 45000,
            "member_price": 40000,
            "stock": "100"
        }
    },
    "other_prices": [{
        "other_price_id": "282335091286642689",
        "product_id": "282335091152424960",
        "type": 1,
        "price": "10.00"
    }],
    "detail": {
        "product_id": "282335091152424960",
        "description_image": "https://picsum.photos/id/1010/300/300",
        "introduction": "123"
    },
    "tags": [{
        "product_id": "282335091152424960",
        "name": "时尚"
    }],
    "status_msg": "待上架"
}

