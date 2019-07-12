"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.afterLogin = afterLogin;

var _request = _interopRequireDefault(require("./utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function afterLogin() {
  (0, _request.default)({
    url: '/app/me',
    method: 'get'
  }).then(function (res) {
    console.log('res');
  });
}