"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _dva = require("dva");

var _antd = require("antd");

var _localStorage = require("../../../utils/localStorage");

var _HeaderUpdatePwModalComp = _interopRequireDefault(require("./HeaderUpdatePwModalComp"));

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

var HeaderSelectMenuComp = (_dec = (0, _dva.connect)(function (_ref) {
  var app = _ref.app;
  return {
    app: app
  };
}), _dec(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HeaderSelectMenuComp, _React$Component);

  function HeaderSelectMenuComp(props) {
    var _this;

    _classCallCheck(this, HeaderSelectMenuComp);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HeaderSelectMenuComp).call(this, props));
    _this.state = {
      modalVisible: false
    };
    return _this;
  }

  _createClass(HeaderSelectMenuComp, [{
    key: "handleClickMenu",
    value: function handleClickMenu(key) {
      switch (key) {
        case 'updatePw':
          this.props.dispatch({
            type: 'app/showPwModal'
          });
          break;

        case 'logout':
          this.props.dispatch({
            type: 'app/logout'
          });
          break;

        default:
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var pwModalVisible = this.props.app.pwModalVisible;
      return _react.default.createElement(_antd.Menu, {
        mode: "horizontal",
        onClick: function onClick(e) {
          return _this2.handleClickMenu(e.key);
        },
        style: {
          zIndex: 100
        }
      }, _react.default.createElement(_antd.Menu.SubMenu, {
        style: {
          float: 'right',
          marginRight: 20
        },
        title: _react.default.createElement("span", null, " ", _react.default.createElement(_antd.Icon, {
          type: "user"
        }), " ", (0, _localStorage.getItem)('name'), " ")
      }, _react.default.createElement(_antd.Menu.Item, {
        key: "updatePw"
      }, "\u4FEE\u6539\u5BC6\u7801"), _react.default.createElement(_antd.Menu.Item, {
        key: "logout"
      }, "\u6CE8\u9500")), pwModalVisible && _react.default.createElement(_HeaderUpdatePwModalComp.default, {
        visible: pwModalVisible
      }));
    }
  }]);

  return HeaderSelectMenuComp;
}(_react.default.Component)) || _class);
var _default = HeaderSelectMenuComp;
exports.default = _default;