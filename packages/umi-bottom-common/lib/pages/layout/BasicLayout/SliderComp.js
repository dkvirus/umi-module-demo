"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _dva = require("dva");

var _glamorous = _interopRequireDefault(require("glamorous"));

var _config = require("configs/config");

var _menu = _interopRequireDefault(require("configs/menu"));

var _MenuComp = _interopRequireDefault(require("./MenuComp"));

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

var AsideWrap = _glamorous.default.aside({
  width: '224px',
  background: '#fff',
  position: 'absolute',
  overflow: 'visible',
  paddingBottom: '24px',
  height: '100vh',
  transition: 'all 0.3s ease-out',
  boxShadow: '4px 4px 20px 0 rgba(0, 0, 0, 0.01)',
  color: '#999'
}, function (_ref) {
  var sliderFold = _ref.sliderFold;

  if (sliderFold) {
    return {
      width: '42px',
      '& ant-menu-root': {
        width: '100%',
        overflow: 'visible'
      }
    };
  }
});

var LogoWrap = _glamorous.default.div({
  textAlign: 'center',
  height: '40px',
  lineHeight: '40px',
  cursor: 'pointer',
  margin: '28px 0',
  transition: 'all 0.3s ease-out',
  overflow: 'hidden',
  '& img': {
    width: '28px',
    margin: '6px 7px'
  }
});

var SliderComp = (_dec = (0, _dva.connect)(function (_ref2) {
  var app = _ref2.app;
  return {
    app: app
  };
}), _dec(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SliderComp, _React$Component);

  function SliderComp() {
    _classCallCheck(this, SliderComp);

    return _possibleConstructorReturn(this, _getPrototypeOf(SliderComp).apply(this, arguments));
  }

  _createClass(SliderComp, [{
    key: "render",
    value: function render() {
      var _this$props$app = this.props.app,
          sliderFold = _this$props$app.sliderFold,
          isNavbar = _this$props$app.isNavbar;
      return _react.default.createElement(_react.default.Fragment, null, !isNavbar ? _react.default.createElement(AsideWrap, {
        sliderFold: sliderFold
      }, _menu.default.length === 0 ? null : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(LogoWrap, null, _react.default.createElement("img", {
        alt: 'logo',
        src: "".concat(_config.logo)
      }), sliderFold ? null : _react.default.createElement("span", null, _config.name)), _react.default.createElement(_MenuComp.default, null))) : null);
    }
  }]);

  return SliderComp;
}(_react.default.Component)) || _class);
var _default = SliderComp;
exports.default = _default;