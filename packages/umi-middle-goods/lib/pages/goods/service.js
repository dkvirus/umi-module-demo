"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = query;

var _request = _interopRequireDefault(require("utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 查询商品列表
 */
function query(record) {
  return (0, _request.default)({
    url: '/goods',
    method: 'get',
    params: record
  });
}