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

        'cart/index',
        'user-handle/info/index',// 个人信息

        /** 订单 */
        'order/order-detail/index', // 订单详情
        'order/order-list/index', // 订单列表
        'order-comfirm/index', // 订单列表


        /** 地址 */
        'address/address-list/index',
        'address/address-add/index',
        'address/address-edit/index',

        // 迭代
        'refill-card/card-full/index',
        'refill-card/card-order-list/index',

        // 测试入口
        'test-yyt/index'
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
    custom: true,
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
