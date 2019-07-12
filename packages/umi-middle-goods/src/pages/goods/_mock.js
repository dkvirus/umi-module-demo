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

export default {
    /**
     * 获取商品列表
     */
    [`GET ${apiPrefixMock}/goods`]: getGoodsList,
}
