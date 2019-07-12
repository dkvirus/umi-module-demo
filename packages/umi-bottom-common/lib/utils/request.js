"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequest = getRequest;
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _nprogress = _interopRequireDefault(require("nprogress"));

var _antd = require("antd");

var _qs = _interopRequireDefault(require("qs"));

var _localStorage = require("./localStorage");

var _config = require("../configs/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
 *      - 统一添加请求 token
 *      - 统一响应数据类型 { code: '', data: {} }
 */
function getRequest(_ref) {
  var _ref$baseURL = _ref.baseURL,
      baseURL = _ref$baseURL === void 0 ? '' : _ref$baseURL,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? 30000 : _ref$timeout,
      rest = _objectWithoutProperties(_ref, ["baseURL", "timeout"]);

  // 状态码错误信息
  var codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。' // 创建 axios 实例对象

  };

  var instance = _axios.default.create(_objectSpread({
    baseURL: baseURL,
    timeout: timeout,
    withCredentials: true
  }, rest)); // 添加一个请求拦截器


  instance.interceptors.request.use(function (config) {
    _nprogress.default.start();

    return config;
  }, function (error) {
    return Promise.reject(error);
  }); // 添加一个响应拦截器

  instance.interceptors.response.use(function (response) {
    _nprogress.default.done();

    return response;
  }, function (error) {
    _nprogress.default.done();

    return Promise.reject(error);
  });
  /**
   * 处理成功时响应
   */

  function handleSucc(response, opt) {
    // 下载/导出文件响应处理
    if (opt.type === 'download') {
      var blob = response.data;
      var downloadElement = document.createElement('a');
      var href = window.URL.createObjectURL(blob); // 创建下载的链接

      downloadElement.href = href;
      downloadElement.download = response.headers['content-disposition'].split('=').pop(); // 下载后文件名

      document.body.appendChild(downloadElement);
      downloadElement.click(); // 点击下载

      document.body.removeChild(downloadElement); // 下载完成移除元素

      window.URL.revokeObjectURL(href); // 释放掉blob对象

      return;
    }

    console.log("\u3010".concat(opt.method, " ").concat(opt.url, "\u3011\u8BF7\u6C42\u6210\u529F\uFF0C\u54CD\u5E94\u6570\u636E\uFF1A%o"), response);

    if (!response.data.code) {
      // 获取 token
      return {
        code: '0000',
        data: response.data
      };
    }

    if (response.data.code !== '0000') {
      // 打印业务错误提示
      _antd.message.error(response.data.message);
    }

    return _objectSpread({}, response.data);
  }
  /**
   * 处理失败时响应
   */


  function handleFail(error, opt) {
    /**
     * 错误处理拦截器，如果有 errorCb 回调函数，
     * 就不会再执行下面的错误通用处理
     */
    if (typeof opt.errorCb === 'function') {
      opt.errorCb(error.response);
      return {
        code: '9999'
      };
    } // 请求配置发生的错误


    if (!error.response) {
      return console.log('Error', error.message);
    } // 响应时状态码处理 


    var status = error.response.status;
    var errortext = codeMessage[status] || error.response.statusText;

    _antd.notification.error({
      message: "\u8BF7\u6C42\u9519\u8BEF ".concat(status),
      description: errortext
    });

    if (status === 401) {
      localStorage.clear();
      window.location.pathname = '/user';
    } else if (status === 403) {
      window.location.pathname = '/exception/403';
    } else if (status <= 504 && status >= 500) {
      window.location.pathname = '/exception/500';
    } else if (status >= 404 && status < 422) {
      window.location.pathname = '/exception/404';
    } // 开发时使用，上线时删除


    console.log("\u3010".concat(opt.method, " ").concat(opt.url, "\u3011\u8BF7\u6C42\u5931\u8D25\uFF0C\u54CD\u5E94\u6570\u636E\uFF1A%o"), error.response);
    return {
      code: status,
      message: errortext
    };
  }

  return function request(opt) {
    // 每次请求都需要携带 token
    if (!opt.headers || !opt.headers.Authorization) {
      var token = (0, _localStorage.getItem)('token') || '';
      instance.defaults.headers = {
        Authorization: "Bearer ".concat(token)
      };
    } // 下载/导出文件时设置响应类型为字节流(blob)


    if (opt.type === 'download') {
      opt.responseType = 'blob';
    } // 传参序列化，主要支持传递数组


    if (opt.params) {
      opt.paramsSerializer = function (params) {
        return _qs.default.stringify(params, {
          indices: false
        });
      };
    } // 调用 axios api，统一拦截


    return instance(opt).then(function (response) {
      return handleSucc(response, opt);
    }).catch(function (error) {
      return handleFail(error, opt);
    });
  };
}

var request = getRequest({
  baseURL: _config.apiPrefix
});
var _default = request;
exports.default = _default;