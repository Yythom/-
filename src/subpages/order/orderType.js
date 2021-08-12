const order_type = {
    UserOrderStatus: {
        /**
         * @Message("待支付")
         */
        INIT: 100,

        /**
         * @Message("备货中")
         */
        READY: 200,

        /**
         * @Message("待取货")
         */
        WAIT_MOTION: 301,

        /**
         * @Message("配送中")
         */
        DELIVERING: 311,

        /**
         * @Message("待签收")
         */
        WAITING_SIGN: 312,


        /**
         * @Message("已发货") TODO:
        */
        dev: 313,

        /**
         * @Message("已完成")
         */
        FINISH: 400,

        /**
         * @Message("订单关闭")
         */
        CANCEL: 500,

        /**
         * @Message("退款中")
         */
        REFUNDING: 600,

        /**
         * @Message("退款成功")
         */
        REFUNDED: 601,

        /**
         * @Message("退款失败")
         */
        REFUND_FAIL: 602,
    },
    OrderPayStatus: {
        /**
         * @Message("不需要支付")
         */
        NONE: 0,

        /**
         * @Message("待支付")
         */
        INIT: 1,

        /**
         * @Message("支付中")
         */
        PAYING: 2,

        /**
         * @Message("支付成功")
         */
        SUCCESS: 3,

        /**
         * @Message("支付失败")
         */
        FAIL: 4,
    }
}

export default order_type;