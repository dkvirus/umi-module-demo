import request from 'utils/request'

/**
 * 查询订单列表
 */
export function query() {
    console.log('yyyyyy')
    return request({
        url: '/order',
        method: 'get',
    })
}