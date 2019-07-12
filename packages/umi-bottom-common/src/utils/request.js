import axios from 'axios'
import NProgress from 'nprogress'
import { notification, message } from 'antd'
import qs from 'qs'
import { getItem } from './localStorage'
import { apiPrefix } from '../configs/config'

/**
 * 封装网络请求库
 * 特性：
 *      - 统一请求前缀  getRequest({ baseURL })
 *      - 设置响应超时时间  getRequest({ timeout })
 *      - 处理下载/导出文件   request({ type: "download" })
 *      - 支持用户自定义错误响应函数   request({ errorCb: function (error) {} })
 *      - get/delete请求支持传参数组，无需参数，自动处理
 *      - 请求时页面顶部加进度条表示请求正在进行中，无需传参，自动处理
 *      - 统一处理错误响应码，跳转不同的处理页面，无需传参，自动处理
 *      - 统一添加请求 token
 *      - 统一响应数据类型 { code: '', data: {} }
 */
function getRequest ({ baseURL = '', timeout = 30000, ...rest }) {
    // 状态码错误信息
    const codeMessage = {
        200: '服务器成功返回请求的数据。',
        201: '新建或修改数据成功。',
        202: '一个请求已经进入后台排队（异步任务）。',
        204: '删除数据成功。',
        400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
        401: '用户没有权限（令牌、用户名、密码错误）。',
        403: '用户得到授权，但是访问是被禁止的。',
        404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
        406: '请求的格式不可得。',
        410: '请求的资源被永久删除，且不会再得到的。',
        422: '当创建一个对象时，发生一个验证错误。',
        500: '服务器发生错误，请检查服务器。',
        502: '网关错误。',
        503: '服务不可用，服务器暂时过载或维护。',
        504: '网关超时。',
    }

    // 创建 axios 实例对象
    const instance = axios.create({
        baseURL,
        timeout,
        withCredentials: true,
        ...rest,
    })

    // 添加一个请求拦截器
    instance.interceptors.request.use((config) => {
        NProgress.start()
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    // 添加一个响应拦截器
    instance.interceptors.response.use((response) => {
        NProgress.done()
        return response
    }, (error) => {
        NProgress.done()
        return Promise.reject(error)
    })

    /**
     * 处理成功时响应
     */
    function handleSucc (response, opt) {
        // 下载/导出文件响应处理
        if (opt.type === 'download') {
            const blob = response.data
            const downloadElement = document.createElement('a')
            const href = window.URL.createObjectURL(blob) // 创建下载的链接
            downloadElement.href = href
            downloadElement.download = response.headers['content-disposition'].split('=').pop() // 下载后文件名
            document.body.appendChild(downloadElement)
            downloadElement.click() // 点击下载
            document.body.removeChild(downloadElement) // 下载完成移除元素
            window.URL.revokeObjectURL(href) // 释放掉blob对象
            return
        }

        console.log(`【${opt.method} ${opt.url}】请求成功，响应数据：%o`, response)

        if (!response.data.code) {   // 获取 token
            return { code: '0000', data: response.data }
        }

        if (response.data.code !== '0000') {  // 打印业务错误提示
            message.error(response.data.message)
        }

        return { ...response.data }
    }

    /**
     * 处理失败时响应
     */
    function handleFail (error, opt) {
        /**
         * 错误处理拦截器，如果有 errorCb 回调函数，
         * 就不会再执行下面的错误通用处理
         */
        if (typeof opt.errorCb === 'function') {
            opt.errorCb(error.response)
            return { code: '9999' }
        }

        // 请求配置发生的错误
        if (!error.response) {
            return console.log('Error', error.message)
        }

        // 响应时状态码处理 
        const status = error.response.status
        const errortext = codeMessage[status] || error.response.statusText

        notification.error({
            message: `请求错误 ${status}`,
            description: errortext,
        })

        if (status === 401) {
            localStorage.clear()
            window.location.pathname = '/user'
        } else if (status === 403) {
            window.location.pathname = '/exception/403'
        } else if (status <= 504 && status >= 500) {
            window.location.pathname = '/exception/500'
        } else if (status >= 404 && status < 422) {
            window.location.pathname = '/exception/404'
        }

        // 开发时使用，上线时删除
        console.log(`【${opt.method} ${opt.url}】请求失败，响应数据：%o`, error.response)

        return { code: status, message: errortext }
    }

    return function request (opt) {
        // 每次请求都需要携带 token
        if (!opt.headers || !opt.headers.Authorization) {
            const token = getItem('token') || ''
            instance.defaults.headers = { Authorization: `Bearer ${token}` }
        }

        // 下载/导出文件时设置响应类型为字节流(blob)
        if (opt.type === 'download') {
            opt.responseType = 'blob'
        }

        // 传参序列化，主要支持传递数组
        if (opt.params) {
            opt.paramsSerializer = params => {
                return qs.stringify(params, { indices: false })
            }
        }

        // 调用 axios api，统一拦截
        return instance(opt)
            .then((response) => handleSucc(response, opt))
            .catch((error) => handleFail(error, opt))
    }

}

export {
    getRequest,
}

const request = getRequest({
    baseURL: apiPrefix,
})

export default request
