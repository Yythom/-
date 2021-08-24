import { navLinkTo } from '@/common/publicFunc';
import { showToast, hideLoading, requestPayment, redirectTo } from '@tarojs/taro'
import requset from '../common/request';

class WxPay {
    static async getPayOrderParams(order_id, pay_order_type = 1) {
        const res = await requset.post('/order/handle', {
            order_id,
            action: 1,
            params: {
                pay_order_type: pay_order_type
            }
        });
        return res;
    }
}

async function payment(
    data,
    callback = Function.prototype,
) {
    if (!data?.result) return console.log('支付参数错误');
    const res = data.result;
    console.log(res, '支付签名');
    let result = await requestPayment({
        timeStamp: res.timeStamp,
        nonceStr: res.nonceStr,
        package: res.package,
        signType: res.signType,
        paySign: res.paySign,
    })
    if (result?.errMsg === "requestPayment:ok") {
        return true
    } else {
        return false
    }
}

export { payment }
export default WxPay;