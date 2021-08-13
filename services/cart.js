import http from '../common/request';

class CartService {

    // 加入购物车
    static async add(shop_id = 1, product_id, sku_id, product_count) {
        const res = await http.post('/user/cart/create', {
            data: {
                shop_id,
                product_id,
                sku_id,
                product_count,
            }
        });
        return res;
    }

    // 购物车列表
    static async list(shop_id = '1') {
        const res = await http.post('/user/cart/list', { "search": { shop_id } });
        return res;
    }

    // 改变
    static async change(shop_id = '1', user_cart_id, product_id, sku_id, product_count) {
        const res = await http.post('/user/cart/modify', {
            user_cart_id,
            data: {
                shop_id,
                product_id,
                sku_id,
                product_count,
            }
        });
        return res;
    }

    // 详情
    static async detail(user_cart_id = '') {
        const res = await http.post('/user/cart/detail', { user_cart_id });
        return res;
    }


    // 删除
    static async delete(user_cart_id = []) {
        const res = await http.post('/user/cart/remove', { user_cart_id });
        return res;
    }

    // 删除
    static async totalPrice() {
        const res = await http.post('/user/cart/price', {});
        return res;
    }


}

export default CartService;