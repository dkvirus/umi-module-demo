import request from './utils/request'

export function afterLogin () {
    request({
        url: '/app/me',
        method: 'get',
    }).then(res => {
        console.log('res')
    })
}