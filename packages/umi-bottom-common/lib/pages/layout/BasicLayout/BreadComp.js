"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _dva = require("dva");

var _antd = require("antd");

var _reactRouterDom = require("react-router-dom");

var _menu = _interopRequireDefault(require("configs/menu"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// tools：'aaa-bbb-ccc' 变成 ['aaa', 'aaa-bbb', 'aaa-bbb-ccc']
var strToArr = function strToArr(str) {
  var arr = str.split('-');
  var result = [];
  arr.forEach(function (item, index, array) {
    result.push(array.slice(0, index + 1).join('-'));
  });
  return result;
};

var breadSty = {
  height: '40px',
  lineHeight: '40px',
  paddingLeft: '24px',
  marginBottom: '-24px',
  overflow: 'hidden'
};
var breadItem = {
  marginTop: '10px'
};
var Bread = (_dec = (0, _dva.connect)(function (_ref) {
  var app = _ref.app;
  return {
    app: app
  };
}), _dec(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Bread, _React$Component);

  function Bread() {
    _classCallCheck(this, Bread);

    return _possibleConstructorReturn(this, _getPrototypeOf(Bread).apply(this, arguments));
  }

  _createClass(Bread, [{
    key: "getCurrentMenuArr",
    // 获取当前显示菜单以及它的父级菜单们
    value: function getCurrentMenuArr(menus) {
      // eslint-disable-next-line no-restricted-globals
      var pathname = location.pathname;
      var menuId = pathname.substr(1).split('/').join('-'); // 匹配与 location.pathname 相符的菜单

      var currentMenu = menus.find(function (item) {
        return item.id === menuId;
      }); // 没有匹配到菜单时面包屑显示 Not Found

      if (!currentMenu) {
        return [{
          id: 'xxxxxxx',
          name: ''
        }];
      } // 获取菜单及其父级菜单数组并返回


      var idArr = strToArr(currentMenu.id);
      var menuArr = menus.filter(function (item) {
        return idArr.includes(item.id);
      });
      return menuArr;
    } // 获取 bread Elements

  }, {
    key: "geneBreadElements",
    value: function geneBreadElements(menuArray) {
      return menuArray.map(function (item, key) {
        return _react.default.createElement(_antd.Breadcrumb.Item, {
          key: key
        }, item.router ? _react.default.createElement(_reactRouterDom.Link, {
          to: item.router
        }, _react.default.createElement("span", {
          style: {
            color: '#40A9FF'
          }
        }, item.name)) : _react.default.createElement("span", null, item.name));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var currentPathname = this.props.app.currentPathname; // 第一步：获取当前显示菜单以及它的父级菜单们

      var currentMenuArr = this.getCurrentMenuArr(_menu.default, currentPathname); // 第二步：获取 Elements

      var breadElements = this.geneBreadElements(currentMenuArr);
      return _react.default.createElement("div", {
        style: breadSty
      }, _react.default.createElement(_antd.Breadcrumb, {
        separator: ">",
        style: breadItem
      }, breadElements));
    }
  }]);

  return Bread;
}(_react.default.Component)) || _class);
var _default = Bread;
exports.default = _default;