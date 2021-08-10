import http from '../common/request';

class HomeService {

    static async getHomeApi() {
        const res = await http.post('/home', {});
        return res;
    }

}

export default HomeService;