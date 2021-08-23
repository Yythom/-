import { showToast, hideLoading, requestPayment } from '@tarojs/taro'
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

    /**
     * 
     * @param {*} money  金额
     * @param {*} callback 支付成功回调
     */
    static async pay(
        data,
        callback = Function.prototype,
    ) {
        if (!data) return console.log('支付参数错误');
        const res = data.result;
        console.log(res, '支付签名');
        requestPayment({
            timeStamp: res.timeStamp,
            nonceStr: res.nonceStr,
            package: res.package,
            signType: res.signType,
            paySign: res.paySign,
            success: function () {
                setTimeout(() => {
                    showToast({
                        title: '支付成功',
                        icon: 'success',
                        duration: 2000
                    })
                }, 300);
                callback();
            },
            fail: function (_res) {
                setTimeout(() => {
                    showToast({
                        title: '支付失败',
                        icon: 'none',
                        duration: 2000
                    })
                }, 300);
                console.log(_res, 'err 支付失败');
            },
            complete: () => {
                hideLoading();
            }
        })
    }
}

export default WxPay;