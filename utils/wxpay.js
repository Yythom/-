import { navLinkTo } from '@/common/publicFunc';
import { showToast, hideLoading, requestPayment, redirectTo, showLoading } from '@tarojs/taro'
import requset from '../common/request';

class WxPay {
    static async getPayOrderParams(order_id, pay_order_type = 1, action = 1) {
        const res = await requset.post('/order/handle', {
            order_id,
            action,
            params: {
                pay_order_type,
            }
        });
        return res;
    }
    static async pay_notify(order_id, callback = Function.prototype) {
        let that = this;
        // showLoading()
        let i = 0;
        let count = 10;
        function countdown(delay) {
            showLoading()
            i++;
            setTimeout(async () => {
                console.log('执行', i);
                const res = await that.getPayOrderParams(order_id, '', 10)
                if (res?.result.pay_status == 3 || i >= count) {
                    hideLoading();
                    setTimeout(() => {
                        callback();
                    }, 200);
                    return console.log('结束了');
                } else {
                    countdown(1000);
                    showToast({ title: '状态查询失败', icon: 'none' });
                }
            }, delay);
        }
        // const res = await requset.post('/export/wechat/pay_notify', {
        //     pay_order_id,
        // });
        countdown(100);
        // return res;
    }
}



async function payment(data, callback, failCallback) {
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
        callback();
        return true;
    } else {
        failCallback();
        showToast({ title: '支付失败', icon: 'none' });
        return false
    }
}

export { payment }
export default WxPay;