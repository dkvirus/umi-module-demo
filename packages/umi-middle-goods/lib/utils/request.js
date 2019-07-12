"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _umiBottomCommon = require("umi-bottom-common");

var _config = require("configs/config");

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
 *      - 统一响应数据类型 { code: '', data: {} }
 *      - 统一添加请求 token
 */
var request = (0, _umiBottomCommon.getRequest)({
  baseURL: _config.apiPrefix
});
var _default = request;
exports.default = _default;