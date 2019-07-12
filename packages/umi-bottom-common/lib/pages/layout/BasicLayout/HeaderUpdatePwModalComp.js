"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _dva = require("dva");

var _antd = require("antd");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HeaderUpdatePwModalComp = (_dec = (0, _dva.connect)(function (_ref) {
  var app = _ref.app;
  return {
    app: app
  };
}), _dec(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HeaderUpdatePwModalComp, _React$Component);

  function HeaderUpdatePwModalComp() {
    _classCallCheck(this, HeaderUpdatePwModalComp);

    return _possibleConstructorReturn(this, _getPrototypeOf(HeaderUpdatePwModalComp).apply(this, arguments));
  }

  _createClass(HeaderUpdatePwModalComp, [{
    key: "handleOkBtn",

    /**
     * 确定按钮
     */
    value: function handleOkBtn() {
      var _this = this;

      this.props.form.validateFields(function (err) {
        if (err) return;

        var data = _objectSpread({}, _this.props.form.getFieldsValue());

        _this.props.dispatch({
          type: 'app/updatePw',
          payload: data
        });
      });
    }
    /**
     * 取消按钮
     */

  }, {
    key: "handleCancelBtn",
    value: function handleCancelBtn() {
      this.props.dispatch({
        type: 'app/hidePwModal'
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var visible = this.props.visible;
      var getFieldDecorator = this.props.form.getFieldDecorator;
      var formLayout = {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 14
        }
      };
      var modalProps = {
        visible: visible,
        maskClosable: false,
        title: '修改密码',
        onOk: function onOk() {
          return _this2.handleOkBtn();
        },
        onCancel: function onCancel() {
          return _this2.handleCancelBtn();
        }
      };
      return _react.default.createElement(_antd.Modal, modalProps, _react.default.createElement(_antd.Form, null, _react.default.createElement(_antd.Form.Item, _extends({}, formLayout, {
        label: "\u65B0\u5BC6\u7801"
      }), getFieldDecorator('newPw', {
        rules: [{
          message: '新密码不能为空',
          required: true,
          max: 30
        }]
      })(_react.default.createElement(_antd.Input, {
        placeholder: "\u8BF7\u8F93\u5165\u65B0\u7684\u5BC6\u7801"
      }))), _react.default.createElement(_antd.Form.Item, _extends({}, formLayout, {
        label: "\u786E\u8BA4\u65B0\u5BC6\u7801"
      }), getFieldDecorator('againPw', {
        rules: [{
          message: '确认密码不能为空',
          required: true,
          max: 30
        }]
      })(_react.default.createElement(_antd.Input, {
        placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u65B0\u7684\u5BC6\u7801"
      })))));
    }
  }]);

  return HeaderUpdatePwModalComp;
}(_react.default.Component)) || _class);

var _default = _antd.Form.create({})(HeaderUpdatePwModalComp);

exports.default = _default;