export const data2 = {
    skuList: {  // 所有可选列表
        // 4.7寸;16G;红色
        "101;201": {
            "img": 'https://img.alicdn.com/bao/uploaded/i2/O1CN01qJ8zzO24dezMvLpJV_!!2-juitemmedia.png_220x220q90.jpg',
            "price": 200,
            "stock": 10,
            'sku_id': '111',
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
    ]
}


