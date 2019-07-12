const menus = [
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
]

export default menus