import qs from 'qs'
import { message } from 'antd'

import request from 'utils/request'
import { clientId, clientSecret } from 'configs/config'

/**
 * 拿 token
 */
export async function login(params) {
    params.grant_type = 'password'
    return request({
        url: '/oauth/token',
        method: 'post',
        data: qs.stringify(params),
        headers: {
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        // eslint-disable-next-line func-names
        errorCb: function (res) {
            if (Number(res.status) === 400) {
                message.error('用户名或密码错误!')
            } else if (Number(res.status) === 401) {
                message.error('用户已注销或锁定，不允许登陆！')
            }
        },
    })
}

/**
 * 获取用户信息
 */
export async function query(params) {
    return request({
        url: '/app/me',
        method: 'get',
        data: params,
    })
}

/**
 * 重置密码
 */
export async function password(params) {
    return request({
        url: `/app/password?password=${params.password}`,
        method: 'patch',
        data: params,
    })
}
