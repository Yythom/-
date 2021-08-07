
import http from '../common/request';

class AddressService {

    static async getAddressList() {
        const res = await http.post('/user/address/list', {});
        return res;
    }

    static async createAddress(params) {
        const res = await http.post('/user/address/create', { data: params });
        return res;
    }
    static async editAddress(address_id, params) {
        const res = await http.post('/user/address/edit', { address_id, data: params });
        return res;
    }

    static async removeAddress(address_id) {
        const res = await http.post('/user/address/remove', { address_id });
        return res;
    }
    static async defaultAddress() {
        const res = await http.post('/user/address/default', {});
        return res;
    }

}

export default AddressService;