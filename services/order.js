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

    // {
    //     "config": {
    //       "shop_id": "string",
    //       "delivery_type": "integer",
    //       "pay_type": "integer",
    //       "pay_method": "integer",
    //       "pay_channel": "integer",
    //       "user_addressId": "string"
    //     },
    //     "sku_items": [
    //       {
    //         "sku_id": "string",
    //         "count": "integer"
    //       }
    //     ]
    // }
    static async makeOrder(data) {
        const res = await http.post('/trade/make', { data });
        return res;
    }

}

export default OrderService;