"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = require("@/configs/config");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getGoodsList = {
  code: '0000',
  data: {
    content: [{
      id: 1,
      name: '苹果',
      price: 10
    }, {
      id: 2,
      name: '香蕉',
      price: 20
    }]
  }
};

var _default = _defineProperty({}, "GET ".concat(_config.apiPrefixMock, "/goods"), getGoodsList);

exports.default = _default;