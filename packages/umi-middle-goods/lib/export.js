'use strict'

var pkg = require('../package.json')

exports.getPagePath = function () {
  var relaPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '../../'
  relaPath = relaPath.substr(-1) === '.' ? ''.concat(relaPath, '/') : relaPath
  var pkgPath = 'node_modules/'.concat(pkg.name, '/lib/pages')
  var pagePath = {
    goodsPath: '/goods/index.js',
  }

  for (var page in pagePath) {
    pagePath[page] = ''.concat(relaPath).concat(pkgPath).concat(pagePath[page])
  }

  return pagePath
}