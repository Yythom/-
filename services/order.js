import http from '../common/request';

class OrderService {
    static async getOrderList(data) {
        const res = await http.post('/trade/order/list', data);
        return res;
    }

    static async getOrderDataApi(mobile = '1314521602') {
        const res = await http.post('/shop/v1/login/send', { mobile });
        return res;
    }

    static async makeOrder(data) {
        const res = await http.post('/trade/make', { ...data });
        return res;
    }
    static async preOrder(data) {
        const res = await http.post('/trade/preview', { ...data });
        return res;
    }
}

export default OrderService;