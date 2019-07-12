import { apiPrefixMock } from '@/configs/config'

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
     * 获取订单列表
     */
    [`GET ${apiPrefixMock}/order`]: getOrderList,
}
