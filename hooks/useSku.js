import { useEffect, useMemo, useState } from "react";
import {
    combInFlags, getActionSpecList,
    getSelectObj,
    skuOptionAttrResult,
    transPrice,
    checkSpecAttrDisabled,
} from "./sku-utils/utils";

/**
 * @param {*} data { skuList:[], skuSpec:[] }
 * @returns 
 */
const useSku = (data) => {
    const [skuResult, setskuResult] = useState(null); // 所有sku组合数组
    const [specList, setspecList] = useState([]); // 页面渲染列表
    const [filterStr, setFilterStr] = useState(''); // 剩余选择的描述文字
    const [specListData, setSpecListData] = useState([]); // 选中的规格属性数据对象
    const [sku, setSku] = useState({
        sku: false,
        desc: {
            str: data.skuSpec.map(e => e.specName).join(' ')
        }
    })
    const [load, setload] = useState(false);

    useEffect(() => {
        if (data) option.init(data)
    }, [])

    const option = useMemo(() => {
        const clear = () => {
            if (Object.keys(skuResult)[0]) {
                setskuResult(null);
                setspecList([]);
                setFilterStr('');
                setSpecListData([]);
                setSku({});
                setload(false)
            }
        }
        const init = ({ skuList, skuSpec }) => {
            const newskuResult = {}
            const skuKeys = Object.keys(skuList);
            skuKeys.forEach(skuKey => {
                const _sku = skuList[skuKey];
                const skuKeyAttrs = skuKey.split(";");
                const combArr = combInFlags(skuKeyAttrs);
                combArr.forEach(item => {
                    // 给每个可选属性组合设置对应的sku数据
                    skuOptionAttrResult(item, _sku, newskuResult);
                })
                // 将原始库存组合也加到结果集里面
                // this.skuResult[skuKey] = sku;
            });

            setskuResult(newskuResult);
            setspecList(skuSpec);
            setFilterStr(skuSpec.map(e => e.specName).join(' '));
            setTimeout(() => {
                setload(true);

            }, 100);
        }

        function handleSpecAttr(item, index) { // sku选择
            // clearInterval(timmer);
            const list = getActionSpecList(specListData, item, index);
            let str = filterStr;
            str.split(' ').forEach(el => {
                list.forEach(e => {
                    if (el && e) {
                        if (e.parent_name == el) {
                            str = str.replace(el, '')
                        }
                    }
                })
            })
            list && setSpecListData(list);
            const _sku = getSelectObj(skuResult, list, specList);
            const { price, desc } = transPrice(skuResult, specListData);
            setSku({
                sku: _sku,
                desc: {
                    str: _sku ? desc : (str.trim().length > 0 ? str : filterStr), // 主页面展示 描述
                    filterStr: desc,
                    price: price,
                },
            })
        }

        return {
            clear,
            init,
            handleSpecAttr,
            checkSpecAttrDisabled: (id, index) => checkSpecAttrDisabled(specListData, id, index, skuResult),
        }
    }, [skuResult, specList]);

    return [option, load, sku, specList, setSku]
}

export default useSku
