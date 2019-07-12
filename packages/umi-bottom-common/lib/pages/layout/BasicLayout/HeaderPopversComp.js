"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _dva = require("dva");

var _antd = require("antd");

var _glamorous = _interopRequireDefault(require("glamorous"));

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

var IconDiv = _glamorous.default.div({
  width: '47px',
  height: '47px',
  lineHeight: '47px',
  textAlign: 'center',
  fontSize: '18px',
  cursor: 'pointer',
  transition: '@transition-ease-in',
  '&:hover': {
    color: '#1DA57A',
    backgroundColor: 'rgba(29, 165, 122, 0.15)'
  }
});
/**
 * 菜单悬浮框
 */


var HeaderPopoverComp = (_dec = (0, _dva.connect)(function (_ref) {
  var app = _ref.app;
  return {
    app: app
  };
}), _dec(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HeaderPopoverComp, _React$Component);

  function HeaderPopoverComp() {
    _classCallCheck(this, HeaderPopoverComp);

    return _possibleConstructorReturn(this, _getPrototypeOf(HeaderPopoverComp).apply(this, arguments));
  }

  _createClass(HeaderPopoverComp, [{
    key: "handleSwitchSlider",

    /**
     * 切换 sliderFold：值为 true 表示左边菜单树被折叠，为 false 表示被打开
     */
    value: function handleSwitchSlider() {
      this.props.dispatch({
        type: 'app/updateSliderFold',
        payload: {
          sliderFold: !this.props.app.sliderFold
        }
      });
    }
  }, {
    key: "handleSwitchMenuPopover",
    value: function handleSwitchMenuPopover() {
      this.props.dispatch({
        type: 'app/updateMenuProver',
        payload: {
          menuProver: !this.props.app.menuProver
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props$app = this.props.app,
          isNavbar = _this$props$app.isNavbar,
          sliderFold = _this$props$app.sliderFold,
          menuProver = _this$props$app.menuProver; // isNavbar = false。浏览器宽度大于 769

      if (!isNavbar) {
        return _react.default.createElement(IconDiv, {
          onClick: function onClick() {
            return _this.handleSwitchSlider();
          }
        }, _react.default.createElement(_antd.Icon, {
          type: sliderFold ? 'menu-unfold' : 'menu-fold'
        }));
      } // isNavbar = true。浏览器宽度小于 769


      return _react.default.createElement(_antd.Popover, {
        placement: "bottomLeft",
        onVisibleChange: function onVisibleChange() {
          return _this.handleSwitchMenuPopover();
        },
        visible: menuProver,
        overlayClassName: "layout-popover",
        trigger: "click",
        content: _react.default.createElement(_MenuComp.default, null)
      }, _react.default.createElement(IconDiv, null, _react.default.createElement(_antd.Icon, {
        type: "bars"
      })));
    }
  }]);

  return HeaderPopoverComp;
}(_react.default.Component)) || _class);
var _default = HeaderPopoverComp;
exports.default = _default;