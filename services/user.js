import { getStorageSync } from '@tarojs/taro';
import http from '../common/request';

class UserService {
    static async getLogin(code, rawData) { // 登入
        const res = await http.post('/hb/v1/login', { code, rawData });
        return res;
    }
    static async getRegister(code, rawData) { // 注册
        const res = await http.post('/hb/v1/register', { code, rawData });
        return res;
    }
    static async bindPhone(iv, encryptedData, code) { // 绑定手机号
        const res = await http.post('/hb/v1/user/user/mobile', { iv, encryptedData, code });
        return res;
    }
    static async refreshToken() { // 刷新token
        const res = await http.post('/hb/v1/refreshToken', { refreshToken: getStorageSync('refreshToken') });
        return res;
    }

    static async getUserInfoApi() { // 获取用户信息
        const res = await http.post('/hb/v1/user/user');
        return res;
    }

    static async sendSMS(mobile) { // sms发送
        const res = await http.post('/hb/v1/user/user/send', { mobile });
        return res;
    }

}

export default UserService;