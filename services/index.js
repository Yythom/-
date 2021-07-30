import http from '../common/request';

class TestService {

    static async getTestList(params) {
        const res = await http.post('/hb/v1/home/online', { ...params });
        return res;
    }

}

export default TestService;