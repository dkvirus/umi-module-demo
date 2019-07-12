import { getItem, setItem } from './utils/localStorage'
import { getRequest } from './utils/request'
import * as common from './utils/common'

const pkg = require('../package.json')

// 封装 localStorage
exports.getItem = getItem
exports.setItem = setItem

// 封装请求库
exports.getRequest = getRequest

// 封装通用方法及属性
exports.formLayout = common.formLayout
exports.colLayout = common.colLayout
exports.tableArg = common.tableArg
exports.getTitle = common.getTitle
exports.handleRestful = common.handleRestful
exports.privButton = common.privButton

// 封装页面路径字符串
exports.getPagePath = function (relaPath = '../../') {
    relaPath = relaPath.substr(-1) === '.' ? `${relaPath}/` : relaPath

    const pkgPath = `node_modules/${pkg.name}/lib/pages`
    const pagePath = {
        layoutPath: '/layout/index',
        dashboardPath: '/dashboard/index',
        exception403Path: '/exception/403',
        exception404Path: '/exception/404',
        exception500Path: '/exception/500',
    }

    for (let page in pagePath) {
        pagePath[page] = `${relaPath}${pkgPath}${pagePath[page]}`
    }

    return pagePath
}