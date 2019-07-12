const menus = [
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
]

export default menus