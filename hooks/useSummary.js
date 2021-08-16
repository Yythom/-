import np from 'number-precision';

const useSummary = (list) => {
    const newList = JSON.parse(JSON.stringify(list));
    const summaryShop = {}; // 每个店铺 汇总数据
    let isAll = false;
    let price = 0;
    let discount_price = 0;
    let selectArr = [];
    newList.forEach(shop => {  // 过滤汇总数据
        const shopData = {  // 单个店铺数据 临时初始化
            checked: false,
            price: 0,
            count: 0,
            products: [],
        }
        const select = shop.products.filter(e => e.checked);
        selectArr = [...selectArr, ...select]
        shopData.price = select.reduce((prev, next) => np.plus( // 总价
            prev, np.times(
                (next.member_price || (next.sku.discount_price || next.market_price)), next.product_count
            ),
        ), 0);

        shopData.discount_price = select.reduce((prev, next) => np.plus( // 优惠价格
            prev, np.times(
                np.minus(
                    next.sku.discount_price || 0, next.sku.market_price || 0 //TODO: 目前没有会员价
                ),
                next.product_count
            ),
        ), 0);

        // 修改店铺选择状态
        select.length === shop.products.length ? shopData.checked = true : shopData.checked = false;
        shopData.count = select.length;
        shopData.products = select;
        if (select.length) {
            summaryShop[shop.shop_id] = shopData;
        }
    });
    price = Object.values(summaryShop).reduce((prev, next) => np.plus( // 总价
        prev, np.times(next.price || 0, 1),
    ), 0);

    discount_price = Object.values(summaryShop).reduce((prev, next) => np.plus( // 总价
        prev, np.times(next.discount_price || 0, 1),
    ), 0);

    if (newList.length === Object.values(summaryShop).length) {
        isAll = Object.values(summaryShop).filter(e => e.checked).length === newList.length
    }

    return [newList, summaryShop, isAll, price, discount_price, selectArr]
}

export default useSummary