import request from 'utils/request'

/**
 * 查询商品列表
 */
export function query(record) {
    return request({
        url: '/goods',
        method: 'get',
        params: record,
    })
}