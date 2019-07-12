"use strict";

var _localStorage = require("./utils/localStorage");

var _request = require("./utils/request");

var common = _interopRequireWildcard(require("./utils/common"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var pkg = require('../package.json'); // 封装 localStorage


exports.getItem = _localStorage.getItem;
exports.setItem = _localStorage.setItem; // 封装请求库

exports.getRequest = _request.getRequest; // 封装通用方法及属性

exports.formLayout = common.formLayout;
exports.colLayout = common.colLayout;
exports.tableArg = common.tableArg;
exports.getTitle = common.getTitle;
exports.handleRestful = common.handleRestful;
exports.privButton = common.privButton; // 封装页面路径字符串

exports.getPagePath = function () {
  var relaPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '../../';
  relaPath = relaPath.substr(-1) === '.' ? "".concat(relaPath, "/") : relaPath;
  var pkgPath = "node_modules/".concat(pkg.name, "/lib/pages");
  var pagePath = {
    layoutPath: '/layout/index',
    dashboardPath: '/dashboard/index',
    exception403Path: '/exception/403',
    exception404Path: '/exception/404',
    exception500Path: '/exception/500'
  };

  for (var page in pagePath) {
    pagePath[page] = "".concat(relaPath).concat(pkgPath).concat(pagePath[page]);
  }

  return pagePath;
};