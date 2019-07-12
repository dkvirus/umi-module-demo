const menus = [
    {
        id: 'dashboard',
        name: '控制台',
        icon: 'octopus-skeleton-normal',
        router: '/dashboard',
        authorities: [
            'PRIVILEGE_DBD_BIZ_READ',
            'PRIVILEGE_DBD_BIZ_WRITE',
            'PRIVILEGE_DBD_TEC_READ',
            'PRIVILEGE_DBD_TEC_WRITE',
        ],
    },
    {
        id: 'goods',
        name: '商品管理',
        icon: 'octopus-skeleton-jiankong',
        router: '/goods',
        authorities: [
            'PRIVILEGE_GOODS_READ',
            'PRIVILEGE_GOODS_WRITE',
        ],
    },
    {
        id: 'order',
        name: '订单管理',
        icon: 'octopus-skeleton-jiankong',
        router: '/order',
        authorities: [
            'PRIVILEGE_ORDER_READ',
            'PRIVILEGE_ORDER_WRITE',
        ],
    },
];

export default menus;
