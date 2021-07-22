
export default class SkuUtil {
    static skuResult = {};

    static clear() {
        if (Object.keys(this.skuResult)[0]) {
            console.log(this.skuResult, 'this.skuResult');
            this.skuResult = {}
            return this.skuResult
        }

    }

    /**
     * 初始化sku
     * @param {Array} data 
     */
    static initSku(data, cb) {
        const skuKeys = Object.keys(data);
        skuKeys.forEach(skuKey => {
            const sku = data[skuKey];
            const skuKeyAttrs = skuKey.split(";");

            const combArr = this.combInFlags(skuKeyAttrs);
            // console.log('combArr', combArr)

            combArr.forEach(item => {
                // 给每个可选属性组合设置对应的sku数据
                this.skuOptionAttrResult(item, sku);
            })
            // 将原始库存组合也加到结果集里面
            // this.skuResult[skuKey] = sku;
        })
        cb(true)
        return this.skuResult;
    }

    /**
     * 返回所有可选的规格属性数组
     * @param {Array} skuKeyAttrs 单个被 ; 分割的数组 ['5.5寸','16G','红色']
     * @return Array
     */
    static combInFlags(skuKeyAttrs) {
        if (!skuKeyAttrs || skuKeyAttrs.length <= 0) return [];
        const len = skuKeyAttrs.length;
        const result = [];
        for (let n = 1; n <= len; n++) {
            const flags = this.getCombFlags(len, n);
            // console.log('flags', flags)
            flags.forEach(flag => {
                let comb = [];
                flag.forEach((item, index) => {
                    if (item === 1) {
                        comb.push(skuKeyAttrs[index])
                    }
                })
                result.push(comb);
            })
        }
        return result;
    }

    /**
     * 重点算法 从 m 个不同元素中取出 n 个元素的组合数 （给所有可选属性组合数添加1，0标记）
     * @param m 可选规格类别数量
     * @param n 1 - 可选规格类别最多数
     * @return Array
     */
    static getCombFlags(m, n) {
        let flagArrs = [];
        let flagArr = [];
        let isEnd = false;
        for (let i = 0; i < m; i++) {
            flagArr[i] = i < n ? 1 : 0;
        }
        flagArrs.push(flagArr.concat());
        // 当n不等于0并且m大于n的时候进入
        if (n && m > n) {
            while (!isEnd) {
                let leftCnt = 0;
                for (let i = 0; i < m - 1; i++) {
                    if (flagArr[i] === 1 && flagArr[i + 1] === 0) {
                        for (let j = 0; j < i; j++) {
                            flagArr[j] = j < leftCnt ? 1 : 0;
                        }
                        flagArr[i] = 0;
                        flagArr[i + 1] = 1;
                        let aTmp = flagArr.concat();
                        flagArrs.push(aTmp);
                        if (aTmp.slice(-n).join('').indexOf('0') === -1) {
                            isEnd = true;
                        }
                        break;
                    }
                    flagArr[i] === 1 && leftCnt++;
                }
            }
        }
        return flagArrs;
    }

    /**
     * 添加所有可选属性数据集合
     * @param {*} combArrItem
     * @param {*} sku
     */
    static skuOptionAttrResult(combArrItem, sku) {
        const key = combArrItem.join(';');
        if (this.skuResult[key]) {
            const prevPrice = this.skuResult[key].price
            const curPrice = [sku.price];
            this.skuResult[key] = {
                ...sku,
                price: prevPrice.concat(curPrice).sort(), // 上一个价格合并当前的，算出区间价格
                stock: this.skuResult[key].stock
                // + sku.stock, // 相同可选属性组合的库存累计
            }
        } else {
            this.skuResult[key] = { ...sku, price: [sku.price] };
        }
    }

    /**
     * 筛选掉数组存在空的情况并返回规格属性名数组
     * @param {Array} arr
     */
    static filterValidArr(arr) {
        return arr.filter(item => item).map(item => item.id);
    }

    /**
     * 判断该属性是否可选
     * @param {Array} selectSpecList
     * @param {String} name
     * @param {Number} _index 当前sku对象所在规格列表的 index
     */
    static checkSpecAttrDisabled(selectSpecList, id, index) {
        // 初始化筛选出不可选的规格属性
        if (!this.skuResult[id]) return true;
        // 根据当前选中的规格数组，筛选出不可选的规格属性
        const newSelectList = selectSpecList.map(item => item);
        // 给每个数组元素初始化一个id属性
        newSelectList[index] = {
            id: '',
            ...newSelectList[index]
        }
        // *重点* 遍历规格属性，处理同级选择和跨级选择的组合后，去查处理后的数据集匹配是否存在
        if (newSelectList[index].id !== id) {
            newSelectList[index].id = id;
            // 筛选出已选中的数据属性 通过name去找数据集
            const hitAttrKey = this.filterValidArr(newSelectList).join(';');
            return !this.skuResult[hitAttrKey];
        }
    }

    /**
     * 判断该属性是否active状态
     * @param {Array} selectSpecList
     * @param {String} name
     * @return {Boolean} 
     */
    static checkSpecAttrActive(selectSpecList, name) {
        return this.filterValidArr(selectSpecList).indexOf(name) !== -1;
    }

    /**
     * 获取点击规格属性后返回当前已选择的规格数组
     * @param {Array} selectSpecList 当前选择的data
     * @param {Object} item sku对象
     * @param {Number} index 当前sku对象所在规格列表的 index
     */
    static getActionSpecList(selectSpecList, item, index) {
        // 选中及反选
        if (selectSpecList[index] && selectSpecList[index].id === item.id) {
            selectSpecList[index] = null
        } else {
            selectSpecList[index] = item
        }
        if (selectSpecList.length) {
            return selectSpecList.slice()
        } else {
            return [];
        }
    }

    /**
     * 获取选中的规格价格区间
     * @param {Array} selectSpecList
     */
    static getPrice(selectSpecList) {
        const skukey = this.filterValidArr(selectSpecList).join(';');
        const hitSpecObj = this.skuResult[skukey]
        if (!hitSpecObj) return null;
        const priceArr = hitSpecObj.price;
        const maxPrice = Math.max.apply(Math, priceArr);
        const minPrice = Math.min.apply(Math, priceArr);
        return {
            minPrice,
            maxPrice
        }
    }

    /**
     *  获取选中的规格库存
     */
    static getStock(selectSpecList) {
        const skukey = this.filterValidArr(selectSpecList).join(';');
        const hitSpecObj = this.skuResult[skukey]
        if (!hitSpecObj) return null;
        return hitSpecObj.stock;
    }

    /**
     *  获取选中的规格对象
     */
    static getSelectObj(selectSpecList, sku_list) {
        if (!selectSpecList || !sku_list) return false
        const skukey = this.filterValidArr(selectSpecList);
        if (skukey.length === sku_list.length) {
            const hitSpecObj = this.skuResult[skukey.join(';')]
            return hitSpecObj
        } else {
            return false
        }
    }
}




export const filter_data = (obj) => {
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
                delete e.spec_item_id;
            }
            if (!el.specId) {
                el.specId = e.spec_id // 当前大规格id
                delete e.spec_id
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