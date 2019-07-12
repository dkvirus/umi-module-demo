"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTitle = getTitle;
exports.handleRestful = handleRestful;
exports.privButton = privButton;
exports.tableArg = exports.colLayout = exports.formLayout = void 0;

var _localStorage = require("./localStorage");

/**
 * 目录：
 * > 表单基础布局 obj
 * > 响应式布局 obj
 * > 表格公共参数 obj
 * > 生成模态框标题 method
 * > 处理 restful 接口 method
 * > 按钮权限公共方法 method
 */
// 表单基础布局
var formLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  } // 响应式布局

};
exports.formLayout = formLayout;
var colLayout = {
  xs: 24,
  // < 576px
  sm: 24,
  // >= 576px
  md: 24,
  // >= 768px
  xl: 8 // >= 1200px
  // 表格公共参数

};
exports.colLayout = colLayout;
var tableArg = {
  bordered: true,
  scroll: {
    x: 1000
  }
  /**
   * 查询标题
   * 
   * @param {*} modalType create/update/check 
   */

};
exports.tableArg = tableArg;

function getTitle(modalType) {
  var titles = {
    create: '新增',
    update: '编辑',
    check: '查看'
  };
  return titles[modalType] || '';
}
/**
 * 处理 restful 接口
 * 
 * @param {*} url 请求地址
 * @param {*} data 请求参数
 * @param {*} isRemove 设置为 true 时删除参数中重复的字段，默认为 false
 * 
 * eg:
 * 
 * url = '/user/{id}'
 * data = { id: 1 }
 * isRemove = true
 * 
 * const { url, data } = handleRestful(url, data, isRemove)
 * > url = '/user/1'
 * > data = {}
 */


function handleRestful(url, data) {
  var isRemove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  for (var i in data) {
    if (url.indexOf("{".concat(i, "}")) !== -1) {
      url = url.replace("{".concat(i, "}"), data[i]);

      if (isRemove === true) {
        delete data[i];
      }
    }
  }

  return {
    url: url,
    data: data
  };
}
/**
 * 按钮权限公共方法
 * 
 * @param {*} currentPriv 当前菜单需要的权限
 * @param {*} excludeCallback 用户没有该权限时执行的回调函数
 * @param {*} includeCallback 用户有该权限时执行的回调函数
 */


function privButton() {
  var currentPriv = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var excludeCallback = arguments.length > 1 ? arguments[1] : undefined;
  var includeCallback = arguments.length > 2 ? arguments[2] : undefined;
  var privs = (0, _localStorage.getItem)('privs');

  if (privs.indexOf(currentPriv) === -1) {
    // 不存在
    return typeof excludeCallback === 'function' && excludeCallback();
  } else {
    return typeof includeCallback === 'function' && includeCallback();
  }
}