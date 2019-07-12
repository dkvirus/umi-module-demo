"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _dva = require("dva");

var _antd = require("antd");

var _router = require("dva/router");

var _menu = _interopRequireDefault(require("configs/menu"));

var _config = require("configs/config");

var _localStorage = require("../../../utils/localStorage");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * iconfont 的 js 使用
 */
var IconFont = _antd.Icon.createFromIconfontCN({
  scriptUrl: _config.iconfontJs || '/iconfont/iconfont.js'
});
/**
 * tools：获取两个数组的差集
 */


function arrDiff() {
  var arg1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var arg2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var arr1;
  var arr2;

  if (arg1.length < arg2.length) {
    arr1 = arg2;
    arr2 = arg1;
  } else {
    arr1 = arg1;
    arr2 = arg2;
  }

  var a1 = new Set(arr1);
  var a2 = new Set(arr2);
  var difference = new Set(_toConsumableArray(a1).filter(function (x) {
    return !a2.has(x);
  }));
  return _toConsumableArray(difference);
}

;
/**
 * tools：'aaa-bbb-ccc' 变成 ['aaa', 'aaa-bbb', 'aaa-bbb-ccc']
 */

function strToArr(str) {
  var arr = str.split('-');
  var result = [];
  arr.forEach(function (item, index, array) {
    result.push(array.slice(0, index + 1).join('-'));
  });
  return result;
}

;
var MenuComp = (_dec = (0, _dva.connect)(function (_ref) {
  var app = _ref.app;
  return {
    app: app
  };
}), _dec(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MenuComp, _React$Component);

  function MenuComp() {
    _classCallCheck(this, MenuComp);

    return _possibleConstructorReturn(this, _getPrototypeOf(MenuComp).apply(this, arguments));
  }

  _createClass(MenuComp, [{
    key: "handleOpenChange",

    /**
     * 点击 subMenu 触发事件
     */
    value: function handleOpenChange(openKeys, navOpenKeys) {
      // 当前点击那个 SubMenu
      var currentSubMenu = arrDiff(openKeys, navOpenKeys);
      var nextOpenKeys;

      if (navOpenKeys.includes(currentSubMenu[0])) {
        // 点击当前已经打开的 SubMenu，即折叠该 SubMenu
        nextOpenKeys = navOpenKeys.filter(function (item) {
          return item !== currentSubMenu[0];
        });
      } else {
        // 点击的 SubMenu 并没有打开，对 id 进行解析
        nextOpenKeys = strToArr(currentSubMenu[0]);
      }

      this.props.dispatch({
        type: 'app/saveNavOpenKeys',
        payload: {
          navOpenKeys: nextOpenKeys
        }
      });
    }
    /**
     * 点击 MenuItem 触发事件
     */

  }, {
    key: "handleClickMenu",
    value: function handleClickMenu(_ref2) {
      var key = _ref2.key;
      this.props.dispatch({
        type: 'app/updateMenuItemIds',
        payload: {
          menuItemIds: [key]
        }
      });
    }
    /**
     * 根据用户权限过滤菜单
     */

  }, {
    key: "handleFilterPermissionMenus",
    value: function handleFilterPermissionMenus() {
      // 没有登录或登录用户没有权限
      if (!(0, _localStorage.getItem)('privs')) {
        return [];
      }

      var authorities = (0, _localStorage.getItem)('privs'); // 获取菜单数组的复制份，接下来所有操作都对它处理，并最终返回它

      var menuArr = JSON.parse(JSON.stringify(_menu.default)); // 过滤需要隐藏的菜单。菜单属性 hide = true

      menuArr = menuArr.filter(function (item) {
        return !item.hide;
      }); // 判断当前登录用户拥有权限与菜单的 authorities 权限数组是否有交集，没有交集就在菜单数组中删除该菜单

      var noMenus = [];

      for (var i = 0; i < menuArr.length; i++) {
        if (menuArr[i].authorities.filter(function (leaf) {
          return authorities.includes(leaf.trim());
        }).length === 0) {
          noMenus.push(menuArr[i].id);
        }
      }

      menuArr = menuArr.filter(function (item) {
        return !noMenus.includes(item.id);
      });
      return menuArr;
    }
    /**
     * 将列表数据转换为树形结构的数据
     */

  }, {
    key: "handleArrayToTree",
    value: function handleArrayToTree(array) {
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
      var pid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'mpid';
      var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'children';
      var data = JSON.parse(JSON.stringify(array));
      var result = [];
      var hash = {};
      data.forEach(function (item, index) {
        hash[data[index][id]] = data[index];
      });
      data.forEach(function (item) {
        var hashVP = hash[item[pid]];

        if (hashVP) {
          if (!hashVP[children]) hashVP[children] = [];
          hashVP[children].push(item);
        } else {
          result.push(item);
        }
      });
      return result;
    }
    /**
     * 递归将树形结构数据转换为菜单的 <Menu> 标签用于渲染页面
     */

  }, {
    key: "handleGeneMenuElements",
    value: function handleGeneMenuElements(menuTreeN, sliderFoldN, menuTree) {
      var _this = this;

      return menuTreeN.map(function (item) {
        if (item.children) {
          return _react.default.createElement(_antd.Menu.SubMenu, {
            key: item.id,
            title: _react.default.createElement("span", null, item.icon && _react.default.createElement(IconFont, {
              type: item.icon
            }), (!sliderFoldN || !menuTree.includes(item)) && item.name)
          }, _this.handleGeneMenuElements(item.children, sliderFoldN, menuTree));
        }

        return _react.default.createElement(_antd.Menu.Item, {
          key: item.id
        }, _react.default.createElement(_router.Link, {
          to: item.router
        }, item.icon && _react.default.createElement(IconFont, {
          type: item.icon
        }), (!sliderFoldN || !menuTree.includes(item)) && item.name));
      });
    }
    /**
     * 获取被选中的菜单 id
     */

  }, {
    key: "handleGetSelectedKeys",
    value: function handleGetSelectedKeys() {
      // eslint-disable-next-line no-restricted-globals
      var pathname = location.pathname;
      var menuId = pathname.substr(1).split('/').join('-');

      var currentMenu = _menu.default.find(function (item) {
        return item.id === menuId;
      });

      if (!currentMenu) return [];
      return [currentMenu.id];
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // 返回菜单 Elements
      // 第一步：接收父组件传递参数
      // sliderFold：为 true 表示左边菜单树折叠，为 false 表示展开
      // navOpenKeys：菜单树默认展开项 id 数组
      // menuItemIds：被选中菜单项数组，背景高亮
      var app = this.props.app;
      var sliderFold = app.sliderFold,
          _app$navOpenKeys = app.navOpenKeys,
          navOpenKeys = _app$navOpenKeys === void 0 ? [] : _app$navOpenKeys,
          darkTheme = app.darkTheme,
          menuItemIds = app.menuItemIds,
          currentPathname = app.currentPathname; // 获取选中菜单 id 

      var selectedKeys = this.handleGetSelectedKeys(menuItemIds, currentPathname); // 第二步：过滤权限数组

      var permissonMenu = this.handleFilterPermissionMenus(); // 第三步：将菜单列表数据转换为树状结构的数据

      var menuTree = this.handleArrayToTree(permissonMenu); // 第四步：获得 Menu Elements

      var menuItems = this.handleGeneMenuElements(menuTree, sliderFold, menuTree); // sliderFold 为 true 表示菜单被折叠，为 false 表示菜单被打开

      var getExpandObj = function getExpandObj() {
        if (sliderFold) {
          return {};
        }

        return {
          onOpenChange: function onOpenChange(keys) {
            return _this2.handleOpenChange(keys, navOpenKeys);
          },
          openKeys: navOpenKeys
        };
      };

      var menuProps = getExpandObj();
      return _react.default.createElement(_antd.Menu, _extends({}, menuProps, {
        mode: sliderFold ? 'vertical' : 'inline',
        theme: darkTheme ? 'dark' : 'light',
        selectedKeys: selectedKeys,
        onClick: function onClick(_ref3) {
          var key = _ref3.key;
          return _this2.handleClickMenu({
            key: key
          });
        }
      }), menuItems);
    }
  }]);

  return MenuComp;
}(_react.default.Component)) || _class);
var _default = MenuComp;
exports.default = _default;