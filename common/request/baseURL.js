import config from './config';

const getBaseURL = () => {
  let BASE_URL = '';
  if (config.OPEN_MOCK) {
    BASE_URL = 'http://localhost:3008';
    return BASE_URL;
  }

  // 开发环境
  if (process.env.NODE_ENV === 'development') {
    // BASE_URL = 'https://api.integral.haimeiyx.com'; // api
    // BASE_URL = 'http://47.108.88.248:9700/api/v1/applet'; // api
    BASE_URL = 'https://api-malicake-mall.fosuss.com/api/v1/applet';
  } else { // 生产环境
    BASE_URL = 'https://api-malicake-mall.fosuss.com/api/v1/applet';
  }
  return BASE_URL;
};

export default getBaseURL;
