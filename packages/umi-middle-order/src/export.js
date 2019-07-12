const pkg = require('../package.json')

exports.getPagePath = function (relaPath = '../../') {
    relaPath = relaPath.substr(-1) === '.' ? `${relaPath}/` : relaPath

    const pkgPath = `node_modules/${pkg.name}/lib/pages`
    let pagePath = {
        orderPath: '/order/index.js',
    }

    for (let page in pagePath) {
        pagePath[page] = `${relaPath}${pkgPath}${pagePath[page]}`
    }

    return pagePath
}
