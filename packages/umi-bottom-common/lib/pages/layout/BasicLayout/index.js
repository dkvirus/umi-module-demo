"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dva = require("dva");

var _react = _interopRequireDefault(require("react"));

var _reactHelmet = require("react-helmet");

var _glamorous = _interopRequireDefault(require("glamorous"));

var _config = require("configs/config");

var _HeaderComp = _interopRequireDefault(require("./HeaderComp"));

var _SliderComp = _interopRequireDefault(require("./SliderComp"));

var _FooterComp = _interopRequireDefault(require("./FooterComp"));

var _BreadComp = _interopRequireDefault(require("./BreadComp"));

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

var LayoutDiv = _glamorous.default.div({
  position: 'relative',
  height: '100vh'
});

var MainDiv = _glamorous.default.div({
  marginLeft: '224px',
  overflow: 'auto',
  height: '100vh',
  transition: 'all 0.3s ease-out',
  background: '#F7F7F7'
}, function (_ref) {
  var sliderFold = _ref.sliderFold,
      isNavbar = _ref.isNavbar;

  if (isNavbar) {
    return {
      marginLeft: 0
    };
  }

  if (sliderFold) {
    return {
      marginLeft: '42px',
      transition: 'all 0.3s ease-out'
    };
  }
});

var ContentDiv = _glamorous.default.div({
  margin: '24px',
  minHeight: 'calc(100vh - 160px)'
});

var BasicLayout = (_dec = (0, _dva.connect)(function (_ref2) {
  var app = _ref2.app;
  return {
    app: app
  };
}), _dec(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(BasicLayout, _React$Component);

  function BasicLayout() {
    _classCallCheck(this, BasicLayout);

    return _possibleConstructorReturn(this, _getPrototypeOf(BasicLayout).apply(this, arguments));
  }

  _createClass(BasicLayout, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      var _this$props$app = this.props.app,
          isNavbar = _this$props$app.isNavbar,
          sliderFold = _this$props$app.sliderFold;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, _config.name), _react.default.createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }), _react.default.createElement("link", {
        rel: "icon",
        href: "/favicon.ico",
        type: "image/x-icon"
      })), _react.default.createElement(LayoutDiv, null, _react.default.createElement(_SliderComp.default, null), _react.default.createElement(MainDiv, {
        sliderFold: sliderFold,
        isNavbar: isNavbar
      }, _react.default.createElement(_HeaderComp.default, null), _react.default.createElement(_BreadComp.default, null), _react.default.createElement(ContentDiv, null, children), _react.default.createElement(_FooterComp.default, null))));
    }
  }]);

  return BasicLayout;
}(_react.default.Component)) || _class);
var _default = BasicLayout;
exports.default = _default;