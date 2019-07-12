"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _dva = require("dva");

var _antd = require("antd");

var _glamorous = _interopRequireDefault(require("glamorous"));

var _config = require("configs/config");

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

var WrapDiv = _glamorous.default.div({
  position: 'absolute',
  top: '50%',
  left: '50%',
  margin: '-160px 0 0 -160px',
  width: '320px',
  height: '320px',
  padding: '36px',
  boxShadow: '0 0 100px rgba(0, 0, 0, .08)',
  '& button': {
    width: '100%'
  }
});

var LogoWrap = _glamorous.default.div({
  textAlign: 'center',
  height: '40px',
  lineHeight: '40px',
  cursor: 'pointer',
  marginBottom: '24px',
  display: 'flex',
  justifyContent: 'center',
  '& img': {
    width: '40px',
    marginRight: '8px'
  },
  '& span': {
    verticalAlign: 'text-bottom',
    fontSize: '16px',
    textTransform: 'uppercase',
    display: 'inline-block'
  }
});

var LoginPage = (_dec = (0, _dva.connect)(function (_ref) {
  var app = _ref.app;
  return {
    app: app
  };
}), _dec(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoginPage, _React$Component);

  function LoginPage() {
    _classCallCheck(this, LoginPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoginPage).apply(this, arguments));
  }

  _createClass(LoginPage, [{
    key: "handleOkBtn",

    /**
     * 登录按钮
     */
    value: function handleOkBtn() {
      var _this = this;

      this.props.form.validateFieldsAndScroll(function (errors, values) {
        if (errors) return;

        _this.props.dispatch({
          type: 'app/login',
          payload: values
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var getFieldDecorator = this.props.form.getFieldDecorator;
      return _react.default.createElement(WrapDiv, null, _react.default.createElement(LogoWrap, null, _react.default.createElement("img", {
        alt: 'logo',
        src: _config.logo
      }), _react.default.createElement("span", null, _config.name)), _react.default.createElement(_antd.Form, null, _react.default.createElement(_antd.Form.Item, {
        hasFeedback: true
      }, getFieldDecorator('username', {
        rules: [{
          required: true,
          message: '用户名不能为空'
        }]
      })(_react.default.createElement(_antd.Input, {
        size: "large",
        onPressEnter: function onPressEnter() {
          return _this2.handleOkBtn();
        },
        placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D"
      }))), _react.default.createElement(_antd.Form.Item, {
        hasFeedback: true
      }, getFieldDecorator('password', {
        rules: [{
          required: true,
          message: '密码不能为空'
        }]
      })(_react.default.createElement(_antd.Input, {
        size: "large",
        type: "password",
        onPressEnter: function onPressEnter() {
          return _this2.handleOkBtn();
        },
        placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801"
      }))), _react.default.createElement(_antd.Row, null, _react.default.createElement(_antd.Button, {
        type: "primary",
        size: "large",
        onClick: function onClick() {
          return _this2.handleOkBtn();
        }
      }, "\u767B\u5F55"))));
    }
  }]);

  return LoginPage;
}(_react.default.Component)) || _class);

var _default = _antd.Form.create({})(LoginPage);

exports.default = _default;