import { showToast, hideLoading, requestPayment } from '@tarojs/taro'

class WxPay {

    /**
     * 
     * @param {*} money  金额
     * @param {*} callback 支付成功回调
     */
    static async pay(
        money,
        callback = Function.prototype,
    ) {
        console.log(money);
        let res = {}
        // res = await WxPayService.pay(money);
        // 
        if (!res) return
        requestPayment({
            timeStamp: res.timeStamp,
            nonceStr: res.nonceStr,
            package: res.package,
            signType: 'MD5',
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