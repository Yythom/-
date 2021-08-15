import { navLinkTo } from "@/common/publicFunc";
import OrderService from "@/services/order";
import { setStorageSync, showModal } from "@tarojs/taro";

const showInfo = (content, cb) => {
    showModal({
        title: '提示',
        content: content || '这是一个模态弹窗',
        success: function (btn) {
            if (btn.confirm) {
                cb()
            }
        }
    })
};

const againOrder = (order) => {
    const pro_arr = order.order_detail.map(e => {
        return {
            "sku_id": e.sku_id,
            "count": e.sku_count
        }
    })
    console.log(pro_arr);
    let pre = {
        "shop_id": "1",
        "sku_items": pro_arr
    };
    setStorageSync('pre-data', pre);
    setTimeout(() => {
        navLinkTo('order-comfirm/index', {})
    }, 200);
}



export {
    showInfo,
    againOrder
}