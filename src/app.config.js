export default {
  pages: [
    'pages/index/index',
    'pages/cart/index',
    'pages/category/index',
    'pages/center/index',
  ],
  subpackages: [
    {
      root: 'subpages/',
      pages: [
        'create_pages_demo/index',
        'product-detail/index',
        'product-list/index',
        'search/index', // 搜索
        'user-handle/info/index',// 个人信息
      ],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    // custom: true,
    color: '#C2C2C2',
    selectedColor: '#FF8106',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'icon/home.png',
        selectedIconPath: 'icon/act-home.png',
      },
      {
        pagePath: 'pages/category/index',
        text: '分类',
        iconPath: 'icon/cate.png',
        selectedIconPath: 'icon/act-cate.png',
      },
      {
        pagePath: 'pages/cart/index',
        text: '购物车',
        iconPath: 'icon/cart.png',
        selectedIconPath: 'icon/act-cart.png',
      },
      {
        pagePath: 'pages/center/index',
        text: '我的',
        iconPath: 'icon/user.png',
        selectedIconPath: 'icon/act-user.png',
      },
    ],
  },
  permission: {
    "scope.userLocation": {
      "desc": "你的位置信息将用于小程序位置接口的效果展示" // 高速公路行驶持续后台定位
    }
  },
}
