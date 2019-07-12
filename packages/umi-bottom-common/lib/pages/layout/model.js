"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _antd = require("antd");

var _router = _interopRequireDefault(require("umi/router"));

var _config = require("configs/config");

var _localStorage = require("../../utils/localStorage");

var appService = _interopRequireWildcard(require("./service"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  namespace: 'app',
  state: {
    user: null,
    // 用户信息
    pwModalVisible: false,
    // Header > 修改密码模态框状态值
    menuProver: false,
    // Header > 浏览器窗口很窄时显示水平菜单
    menuSelect: [],
    // Header > 菜单过滤框，输入 '管理' 在所有菜单中过滤包含关键字的数组 ['用户管理', '角色管理']
    navOpenKeys: [],
    // 左边菜单打开数组
    sliderFold: false,
    // 值为 true 表示左边菜单树被折叠，为 false 表示被打开
    darkTheme: false,
    // 值为 true 表示黑色，为 false 表示白色
    menuItemIds: [],
    // 被选中菜单项数组，不包括 subMenu
    isNavbar: document.body.clientWidth < 769,
    // 值为 true 表示浏览器宽度小于 769，为 false 表示浏览器宽度大于 769
    currentPathname: ''
  },
  effects: {
    /**
     * 登录
     */
    login:
    /*#__PURE__*/
    regeneratorRuntime.mark(function login(_ref, _ref2) {
      var payload, call, put, result, userResult, _require, afterLogin;

      return regeneratorRuntime.wrap(function login$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              payload = _ref.payload;
              call = _ref2.call, put = _ref2.put;
              localStorage.clear(); // 第一步：获取 token

              _context.next = 5;
              return call(appService.login, payload);

            case 5:
              result = _context.sent;

              if (!(result.code !== '0000')) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return");

            case 8:
              // 保存 token 
              (0, _localStorage.setItem)('token', result.data.access_token); // 第二步：存在，查询用户相关信息，包含权限信息

              _context.next = 11;
              return call(appService.query);

            case 11:
              userResult = _context.sent;

              if (!(userResult.code !== '0000')) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return");

            case 14:
              try {
                _require = require('../../../src/hook'), afterLogin = _require.afterLogin;

                if (typeof afterLogin === 'function') {
                  afterLogin();
                }
              } catch (e) {
                console.log('hook.js is not found!');
              } // 保存用户权限信息，放到 localStorage 中


              (0, _localStorage.setItem)('privs', userResult.data.authorities);
              (0, _localStorage.setItem)('id', userResult.data.id);
              _context.next = 19;
              return put({
                type: 'saveUserInfo',
                payload: {
                  user: userResult.data
                }
              });

            case 19:
              _antd.message.success('登录成功。'); // 跳转到 / 路由，之后会跳转默认首页


              _router.default.push("".concat(_config.initRouter));

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, login);
    }),

    /**
     * 注销
     */
    // eslint-disable-next-line require-yield
    logout:
    /*#__PURE__*/
    regeneratorRuntime.mark(function logout() {
      return regeneratorRuntime.wrap(function logout$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              localStorage.clear(); // 跳转路由，刷新页面，此时 dva 中 state 数据也会在内存中重新刷新

              window.location.pathname = '/';

              _antd.message.success('注销成功。');

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, logout);
    }),

    /**
     * 修改用户密码
     */
    updatePw:
    /*#__PURE__*/
    regeneratorRuntime.mark(function updatePw(_ref3, _ref4) {
      var payload, call, put, newPw, againPw, result;
      return regeneratorRuntime.wrap(function updatePw$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              payload = _ref3.payload;
              call = _ref4.call, put = _ref4.put;
              newPw = payload.newPw, againPw = payload.againPw;

              if (!(String(newPw) !== String(againPw))) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", _antd.message.error('新密码与再次输入密码不相等，请重新输入'));

            case 5:
              _context3.next = 7;
              return call(appService.password, {
                password: newPw
              });

            case 7:
              result = _context3.sent;

              if (!(result.code !== '0000')) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt("return");

            case 10:
              _context3.next = 12;
              return put({
                type: 'hidePwModal'
              });

            case 12:
              _context3.next = 14;
              return put({
                type: 'logout'
              });

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, updatePw);
    }),

    /**
     * 根据用户拖动浏览器宽度，实时改变 isNavbar 值
     */
    changeNavbar:
    /*#__PURE__*/
    regeneratorRuntime.mark(function changeNavbar(__, _ref5) {
      var put, select, app, isNavbar;
      return regeneratorRuntime.wrap(function changeNavbar$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              put = _ref5.put, select = _ref5.select;
              _context4.next = 3;
              return select(function (_) {
                return _.app;
              });

            case 3:
              app = _context4.sent;
              isNavbar = document.body.clientWidth < 769;

              if (!(isNavbar !== app.isNavbar)) {
                _context4.next = 8;
                break;
              }

              _context4.next = 8;
              return put({
                type: 'updateIsNavbar',
                payload: {
                  isNavbar: isNavbar
                }
              });

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, changeNavbar);
    })
  },
  reducers: {
    // 保存用户信息
    saveUserInfo: function saveUserInfo(state, _ref6) {
      var payload = _ref6.payload;
      return _objectSpread({}, state, {}, payload);
    },
    // 根据用户拖动浏览器宽度，实时改变 isNavbar 值
    updateIsNavbar: function updateIsNavbar(state, _ref7) {
      var payload = _ref7.payload;
      return _objectSpread({}, state, {}, payload);
    },
    // Slider > 菜单点击
    saveNavOpenKeys: function saveNavOpenKeys(state, _ref8) {
      var payload = _ref8.payload;
      return _objectSpread({}, state, {}, payload);
    },
    // Header > 修改密码，显示模态框
    showPwModal: function showPwModal(state) {
      return _objectSpread({}, state, {
        pwModalVisible: true
      });
    },
    // Header > 修改密码，隐藏模态框
    hidePwModal: function hidePwModal(state) {
      return _objectSpread({}, state, {
        pwModalVisible: false
      });
    },
    // Header > 菜单过滤框
    updateMenuSelect: function updateMenuSelect(state, _ref9) {
      var payload = _ref9.payload;
      return _objectSpread({}, state, {}, payload);
    },
    // Header > 左边菜单是否折叠
    updateSliderFold: function updateSliderFold(state, _ref10) {
      var payload = _ref10.payload;
      return _objectSpread({}, state, {}, payload);
    },
    // Header > 当浏览器宽度小于 769 时头部小图标显示水平菜单标识 
    updateMenuProver: function updateMenuProver(state, _ref11) {
      var payload = _ref11.payload;
      return _objectSpread({}, state, {}, payload);
    },
    // Menu > 更新被选中菜单项
    updateMenuItemIds: function updateMenuItemIds(state, _ref12) {
      var payload = _ref12.payload;
      return _objectSpread({}, state, {}, payload);
    },

    /**
     * 更新变量
     */
    updateState: function updateState(state, _ref13) {
      var payload = _ref13.payload;
      return _objectSpread({}, state, {}, payload);
    }
  },
  subscriptions: {
    setup: function setup(_ref14) {
      var dispatch = _ref14.dispatch,
          history = _ref14.history;
      var tid;

      window.onresize = function () {
        clearTimeout(tid);
        tid = setTimeout(function () {
          dispatch({
            type: 'changeNavbar'
          });
        }, 300);
      };

      if (history.location.pathname.substring(0, 5) === '/user') {
        localStorage.clear();
      }
    }
  }
};
exports.default = _default;