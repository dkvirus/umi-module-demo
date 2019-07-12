import { apiPrefixMock } from '@/configs/config'

const getGoodsList = {
    code: '0000',
    data: {
        content: [
            {
                id: 1,
                name: '苹果',
                price: 10,
            },
            {
                id: 2,
                name: '香蕉',
                price: 20,
            },
        ],
    },
}

const getOrderList = {
    code: '0000',
    data: {
        content: [
            {
                orderId: 'fadsfa12131231',
                desc: '买了一个苹果',
            },
            {
                orderId: 'jkjljkjl312931',
                desc: '买了两个香蕉',
            },
        ],
    },
}

export default {
    /**
     * 获取商品列表
     */
    [`GET ${apiPrefixMock}/goods`]: getGoodsList,

    /**
     * 获取订单列表
     */
    [`GET ${apiPrefixMock}/order`]: getOrderList,
}
