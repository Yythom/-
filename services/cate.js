
import http from '../common/request';

class CateService {

    static async getCateList() {
        const res = await http.post('/product/category/list', {});
        return res;
    }
    static async getChildrenList(pid) {
        const res = await http.post('/product/category/children', {
            "search": {
                "pid": pid
            }
        });
        return res;
    }


}

export default CateService;