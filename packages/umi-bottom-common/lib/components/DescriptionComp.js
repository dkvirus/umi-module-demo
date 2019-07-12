"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Description = exports.DescriptionList = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

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

var DescriptionList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DescriptionList, _React$Component);

  function DescriptionList() {
    _classCallCheck(this, DescriptionList);

    return _possibleConstructorReturn(this, _getPrototypeOf(DescriptionList).apply(this, arguments));
  }

  _createClass(DescriptionList, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          _this$props$column = _this$props.column,
          column = _this$props$column === void 0 ? 2 : _this$props$column;
      return _react.default.createElement(_antd.Row, {
        type: "flex"
      }, _react.default.Children.map(children, function (child) {
        return child ? _react.default.cloneElement(child, {
          column: column
        }) : child;
      }));
    }
  }]);

  return DescriptionList;
}(_react.default.Component);

exports.DescriptionList = DescriptionList;

var Description =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Description, _React$Component2);

  function Description() {
    _classCallCheck(this, Description);

    return _possibleConstructorReturn(this, _getPrototypeOf(Description).apply(this, arguments));
  }

  _createClass(Description, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          term = _this$props2.term,
          children = _this$props2.children,
          column = _this$props2.column,
          style = _this$props2.style;
      var responsive = {
        1: {
          xs: 24
        },
        2: {
          xs: 24,
          sm: 12
        },
        3: {
          xs: 24,
          sm: 12,
          md: 8
        },
        4: {
          xs: 24,
          sm: 12,
          md: 6
        }
      };

      var itemStyle = _objectSpread({
        boxSizing: 'border-box',
        wordBreak: 'break-all',
        display: 'flex',
        marginBottom: '16px'
      }, style);

      var termStyle = {
        paddingBottom: '16px',
        color: 'rgba(0, 0, 0, 0.85)',
        lineHeight: '20px',
        whiteSpace: 'wrap',
        width: '25%',
        textAlign: 'right',
        paddingRight: '10px'
      };
      var detailStyle = {
        paddingBottom: '16px',
        color: 'rgba(0, 0, 0, 0.65)',
        lineHeight: '20px',
        wordBreak: 'break-all',
        paddingRight: '30px',
        flex: '1'
      };
      var textareaStyle = {
        color: 'rgba(0, 0, 0, 0.65)',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        resize: 'none',
        background: 'transparent',
        cursor: 'text',
        padding: '0px'
      };
      return _react.default.createElement(_antd.Col, _extends({}, responsive[column], {
        style: itemStyle
      }), term && _react.default.createElement("div", {
        style: termStyle
      }, term, "\uFF1A"), _react.default.createElement("div", {
        style: detailStyle
      }, typeof children === 'string' ? _react.default.createElement(_antd.Input.TextArea, {
        style: textareaStyle,
        autosize: true,
        value: children,
        disabled: true
      }) : children));
    }
  }]);

  return Description;
}(_react.default.Component);

exports.Description = Description;