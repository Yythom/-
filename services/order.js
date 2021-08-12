import http from '../common/request';

class OrderService {
    static async getOrderDetailApi(order_id) {
        const res = await http.post('/order/detail', {
            "condition": {
                "with_order_detail": 1,
                "with_order_discount": 1,
                "with_order_fee": 1,
                "with_order_address": 1,
                "with_order_code": 1
            },
            order_id
        });
        return res;
    }




    static async getOrderList(data) {
        const res = await http.post('/order/list', {
            ...data,
            "condition": {
                "with_order_detail": 0,
                "with_order_discount": 0,
                "with_order_fee": 0,
                "with_order_address": 0,
                "with_order_code": 0,
                "search": {
                    "shop_id": "string",
                    "user_status": "integer"
                },
                "sort": {
                    "create_at": "desc"
                },
                "page": {
                    "all": 0,
                    "total": 1,
                    "page": data.page || 1,
                    "page_size": 10
                }
            },
        });
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