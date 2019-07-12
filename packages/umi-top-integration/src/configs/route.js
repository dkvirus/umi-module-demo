const middleOrderPagePath = require('umi-middle-order').getPagePath()
const middleGoodsPagePath = require('umi-middle-goods').getPagePath()

const routes = [
    {
        path: '/', component: './layout/index', routes: [
            { path: '/', component: './dashboard/index' },
            { path: '/dashboard', component: './dashboard/index' },

            // 商品模块
            { path: '/goods', component: middleGoodsPagePath.goodsPath },

            // 订单模块
            { path: '/order', component: middleOrderPagePath.orderPath },

            { path: '/exception/403', component: './exception/403' },
            { path: '/exception/404', component: './exception/404' },
            { path: '/exception/500', component: './exception/500' },
            { component: './exception/404' },
        ]
    },
];

module.exports = routes;