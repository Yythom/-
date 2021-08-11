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

    // 删除
    static async delete(cart_id = []) {
        const res = await http.post('/hb/v1/shop/cart/remove', { cart_id });
        return res;
    }

}

export default CartService;