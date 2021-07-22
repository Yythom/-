export default (obj) => {
    let copy = JSON.parse(JSON.stringify(obj));
    if (!copy.skuSpec) {
        copy.skuSpec = copy.sku_spec; // 大规格列表
        delete copy.sku_spec
    }
    if (!copy.skuList) {
        copy.skuList = copy.sku_list; // 可选规格列表
        delete copy.sku_list
    }

    let str = '';
    copy.skuSpec.forEach(e => {

        if (!e.id) {
            e.id = e.spec_id; // 大规格id
            delete e.spec_id;
        }
        // if (!e.goodsId) {
        //     e.goodsId = e.product_id; // 商品id
        //     delete e.product_id;
        // }
        if (!e.specName) {
            e.specName = e.spec_name; // 大规格名字
            delete e.spec_name;
        }
        if (!e.specAttrList) {
            e.specAttrList = e.children; // 大规格列表
            delete e.children;
        }
        str += e.specName + ' '
        e.specAttrList.forEach(el => {
            if (!el.id) {
                el.id = el.spec_item_id; // 用于匹配子规格的id
                delete el.spec_item_id;
            }
            if (!el.specId) {
                el.specId = el.spec_id // 当前大规格id
                delete el.spec_id
            }
            if (!el.name) {
                el.name = el.spec_item_name; // 每个子规格的名字
                delete el.spec_item_name;
            }
            el.parent_name = e.specName
        })
    })
    if (copy.skuList) {
        Object.values(copy.skuList).forEach(e => {
            if (!e.img) {
                e.img = e.image;
                delete e.image;
            }
            if (!e.price) {
                e.price = e.sale_price;
                delete e.sale_price;
            }
        })
    }
    return { ...copy, str }
}