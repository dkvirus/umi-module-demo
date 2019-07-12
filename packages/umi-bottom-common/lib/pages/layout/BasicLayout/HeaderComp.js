"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _glamorous = _interopRequireDefault(require("glamorous"));

var _HeaderPopversComp = _interopRequireDefault(require("./HeaderPopversComp"));

var _HeaderSearchMenuComp = _interopRequireDefault(require("./HeaderSearchMenuComp"));

var _HeaderSelectMenuComp = _interopRequireDefault(require("./HeaderSelectMenuComp"));

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

var Header = _glamorous.default.div({
  boxShadow: '4px 4px 40px 0 rgba(0, 0, 0, 0.2)',
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  height: '47px',
  backgroundColor: '#fff'
});

var RigthWrapper = _glamorous.default.div({
  display: 'flex',
  paddingRight: '16px',
  alignItems: 'center'
});

var HeaderComp =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HeaderComp, _React$Component);

  function HeaderComp() {
    _classCallCheck(this, HeaderComp);

    return _possibleConstructorReturn(this, _getPrototypeOf(HeaderComp).apply(this, arguments));
  }

  _createClass(HeaderComp, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(Header, null, _react.default.createElement(_HeaderPopversComp.default, null), _react.default.createElement(RigthWrapper, null, _react.default.createElement(_HeaderSearchMenuComp.default, null), _react.default.createElement(_HeaderSelectMenuComp.default, null)));
    }
  }]);

  return HeaderComp;
}(_react.default.Component);

var _default = HeaderComp;
exports.default = _default;