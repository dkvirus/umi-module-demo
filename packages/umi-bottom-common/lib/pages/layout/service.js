"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.query = query;
exports.password = password;

var _qs = _interopRequireDefault(require("qs"));

var _antd = require("antd");

var _request = _interopRequireDefault(require("utils/request"));

var _config = require("configs/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * 拿 token
 */
function login(_x) {
  return _login.apply(this, arguments);
}
/**
 * 获取用户信息
 */


function _login() {
  _login = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(params) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params.grant_type = 'password';
            return _context.abrupt("return", (0, _request.default)({
              url: '/oauth/token',
              method: 'post',
              data: _qs.default.stringify(params),
              headers: {
                Authorization: "Basic ".concat(btoa("".concat(_config.clientId, ":").concat(_config.clientSecret))),
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              // eslint-disable-next-line func-names
              errorCb: function errorCb(res) {
                if (Number(res.status) === 400) {
                  _antd.message.error('用户名或密码错误!');
                } else if (Number(res.status) === 401) {
                  _antd.message.error('用户已注销或锁定，不允许登陆！');
                }
              }
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _login.apply(this, arguments);
}

function query(_x2) {
  return _query.apply(this, arguments);
}
/**
 * 重置密码
 */


function _query() {
  _query = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(params) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", (0, _request.default)({
              url: '/app/me',
              method: 'get',
              data: params
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _query.apply(this, arguments);
}

function password(_x3) {
  return _password.apply(this, arguments);
}

function _password() {
  _password = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(params) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", (0, _request.default)({
              url: "/app/password?password=".concat(params.password),
              method: 'patch',
              data: params
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _password.apply(this, arguments);
}