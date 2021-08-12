const make_type = {
    DeliveryType: {
        /**
          * @Message("门店自提")
          */
        SELF_MENTION: 1,

        /**
         * @Message("线上配送")
         */
        DELIVERY: 2,
    },
    OrderDiscountType: {
        /**
         * @Message("自提优惠")
         */
        SELF_MOTION_DISCOUNT: 1,

        /**
         * @Message("优惠券")
         */
        COUPON: 2,

        /**
         * @Message("优惠活动")
         */
        ACTIVITY: 3,

        /**
         * @Message("会员折扣")
         */
        MEMBER_DISCOUNT: 4,
    },
    OrderPayType: {
        /**
         * @Message("线下支付")
         */
        OFFLINE: 1,

        /**
         * @Message("线上支付")
         */
        ONLINE: 2,
    },
    OrderPayChannel: {
        /**
         * @Message("无")
         */
        UNKNOWN: 0,

        /**
         * @Message("微信")
         */
        WECHAT: 1,

        /**
         * @Message("支付宝")
         */
        ALIPAY: 2,
    },
    OrderPayMethod: {
        /**
         * @Message("无")
         */
        UNKNOWN: 0,

        /**
         * @Message("会员余额")
         */
        MEMBER_BALANCE: 1,

        /**
         * @Message("电子支付")
         */
        ONLINE_PAY: 2,
    }
}

export default make_type;