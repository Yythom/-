
import http from '../common/request';

class ShopService {

    static async shopDetail(params) {
        const res = await http.post('/shop/detail', params);
        return res;
    }

}

export default ShopService;