import np from 'number-precision';

const useSummary = (list) => {
    const newList = JSON.parse(JSON.stringify(list));
    const summaryShop = {}; // 每个店铺 汇总数据
    let isAll = false;
    let price = 0;
    let selectArr = []
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
                next.sale_price || next.price, next.num
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
        prev, np.times(next.price, 1),
    ), 0);

    if (newList.length === Object.values(summaryShop).length) {
        isAll = Object.values(summaryShop).filter(e => e.checked).length === newList.length
    }

    return [newList, summaryShop, isAll, price, selectArr]
}

export default useSummary