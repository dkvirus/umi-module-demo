"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _dva = require("dva");

var _antd = require("antd");

var _router = _interopRequireDefault(require("umi/router"));

var _glamor = require("glamor");

var _menu = _interopRequireDefault(require("configs/menu"));

var _localStorage = require("../../../utils/localStorage");

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

var searchSty = (0, _glamor.css)({
  width: '130px',
  transition: 'all 0.5s',
  '& input': {
    borderRadius: '15px!important',
    padding: '0 20px!important'
  },
  '&:hover': {
    width: '200px'
  }
}); // 菜单过滤框

var HeaderSearchMenuComp = (_dec = (0, _dva.connect)(function (_ref) {
  var app = _ref.app;
  return {
    app: app
  };
}), _dec(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HeaderSearchMenuComp, _React$Component);

  function HeaderSearchMenuComp() {
    var _this;

    _classCallCheck(this, HeaderSearchMenuComp);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HeaderSearchMenuComp).call(this));
    _this.state = {
      menuSelect: []
    };
    return _this;
  }
  /**
   * 点击选项 Option 触发事件
   */


  _createClass(HeaderSearchMenuComp, [{
    key: "handleSearch",
    value: function handleSearch(value) {
      // 过滤隐藏的菜单，菜单配置有 hide: true 属性时，菜单不显示
      var menuArr = _menu.default.filter(function (item) {
        return !item.hide;
      }); // 判断当前登录用户拥有权限与菜单的 authorities 权限数组是否有交集，没有交集就在菜单数组中删除该菜单


      var authorities = (0, _localStorage.getItem)('privs');
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
      }); // 过滤菜单数组，只要有 route 属性的菜单

      var menuFilter = menuArr.filter(function (item) {
        return item.router && ~item.name.indexOf(value);
      });
      this.setState({
        menuSelect: menuFilter
      });
    }
    /**
     * 搜索框中值变化触发事件
     */

  }, {
    key: "handleSelect",
    value: function handleSelect(value) {
      this.props.dispatch({
        type: 'app/updateState',
        payload: {
          currentPathname: value
        }
      });

      _router.default.push(value);
    }
    /**
     * 处理菜单重名的情形，在每个菜单后面显示小标题，内容为该菜单的父级菜单
     */

  }, {
    key: "handleSmallTitile",
    value: function handleSmallTitile(id) {
      var idArr = id.split('-');

      if (idArr.length === 1) {
        return '';
      }

      var result = '';

      if (idArr.length === 2) {
        idArr.pop();

        var menuItem = _menu.default.filter(function (item) {
          return item.id === idArr.join('-');
        });

        result = menuItem[0] && menuItem[0].name;
      }

      if (idArr.length === 3) {
        idArr.pop();

        var secondMenu = _menu.default.filter(function (item) {
          return item.id === idArr.join('-');
        });

        idArr.pop();

        var firstMenu = _menu.default.filter(function (item) {
          return item.id === idArr.join('-');
        });

        result = "".concat(firstMenu[0].name, " - ").concat(secondMenu[0].name);
      }

      return "(".concat(result, ")");
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state$menuSelec = this.state.menuSelect,
          menuSelect = _this$state$menuSelec === void 0 ? [] : _this$state$menuSelec; // 渲染下拉框选项

      var renderOption = function renderOption(item) {
        return _react.default.createElement(_antd.AutoComplete.Option, {
          key: item.router,
          text: item.name
        }, item.name, " \xA0\xA0", _react.default.createElement("small", null, _this2.handleSmallTitile(item.id)));
      };

      return _react.default.createElement(_antd.AutoComplete, {
        className: "".concat(searchSty),
        placeholder: "\u8BF7\u8F93\u5165\u83DC\u5355\u540D\u79F0",
        onSearch: function onSearch(value) {
          return _this2.handleSearch(value);
        },
        onSelect: function onSelect(value) {
          return _this2.handleSelect(value);
        },
        optionLabelProp: "text"
      }, menuSelect.map(renderOption));
    }
  }]);

  return HeaderSearchMenuComp;
}(_react.default.Component)) || _class);
var _default = HeaderSearchMenuComp;
exports.default = _default;