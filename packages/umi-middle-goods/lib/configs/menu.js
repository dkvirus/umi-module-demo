'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var menus = [{
  id: 'goods',
  name: '商品管理',
  icon: 'octopus-skeleton-jiankong',
  router: '/goods',
  authorities: ['PRIVILEGE_GOODS_READ', 'PRIVILEGE_GOODS_WRITE'],
}]
var _default = menus
exports.default = _default