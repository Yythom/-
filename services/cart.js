import http from '../common/request';

class CartService {

    // 加入购物车
    static async add(data) {
        const res = await http.post('/hb/v1/shop/cart/add', { ...data });
        return res;
    }

    // 购物车列表
    static async list() {
        const res = await http.post('/hb/v1/shop/cart/list');
        return res;
    }

    // 数量改变
    static async number(cart_id, number) {
        const res = await http.post('/hb/v1/shop/cart/update', { cart_id, number });
        return res;
    }

    // 删除
    static async delete(cart_id = []) {
        const res = await http.post('/hb/v1/shop/cart/remove', { cart_id });
        return res;
    }

}

export default CartService;