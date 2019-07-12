"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _glamorous = _interopRequireDefault(require("glamorous"));

var _ = _interopRequireDefault(require("./svgs/403.svg"));

var _2 = _interopRequireDefault(require("./svgs/404.svg"));

var _3 = _interopRequireDefault(require("./svgs/500.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var config = {
  403: {
    img: _.default,
    title: '403',
    desc: '抱歉，你无权访问该页面'
  },
  404: {
    img: _2.default,
    title: '404',
    desc: '抱歉，你访问的页面不存在'
  },
  500: {
    img: _3.default,
    title: '500',
    desc: '抱歉，服务器出错了'
  }
};

var ExceptionWrap = _glamorous.default.div({
  display: 'flex',
  alignItems: 'center',
  height: '100%'
});

var ImgWrap = _glamorous.default.div({
  flex: '0 0 62.5%',
  width: '62.5%',
  paddingRight: '152px',
  zoom: 1,
  '&:before': {
    content: ' ',
    display: 'table'
  },
  '&:after': {
    clear: 'both',
    visibility: 'hidden',
    fontSize: 0,
    height: 0
  }
});

var ImgDiv = _glamorous.default.div({
  height: '360px',
  width: '100%',
  maxWidth: '430px',
  float: 'right',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '50% 50%',
  backgroundSize: 'contain'
}, function (_ref) {
  var pageType = _ref.pageType;
  return {
    backgroundImage: "url(".concat(config[pageType].img, ")")
  };
});

var ContentDiv = _glamorous.default.div({
  flex: 'auto',
  '& h1': {
    color: '#434e59',
    fontSize: '72px',
    fontWeight: '600',
    lineHeight: '72px',
    marginBottom: '24px'
  },
  '& .desc': {
    color: '@text-color - secondary',
    fontSize: '20px',
    lineHeight: '28px',
    marginBottom: '16px'
  },
  '& .actions': {
    button: {
      marginRight: '8px'
    }
  }
});

var Exception =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Exception, _React$Component);

  function Exception() {
    _classCallCheck(this, Exception);

    return _possibleConstructorReturn(this, _getPrototypeOf(Exception).apply(this, arguments));
  }

  _createClass(Exception, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          type = _this$props.type,
          title = _this$props.title,
          desc = _this$props.desc,
          img = _this$props.img,
          actions = _this$props.actions,
          rest = _objectWithoutProperties(_this$props, ["className", "type", "title", "desc", "img", "actions"]);

      var pageType = type in config ? type : '404';
      return _react.default.createElement(ExceptionWrap, rest, _react.default.createElement(ImgWrap, null, _react.default.createElement(ImgDiv, {
        pageType: pageType
      })), _react.default.createElement(ContentDiv, null, _react.default.createElement("h1", null, title || config[pageType].title), _react.default.createElement("div", {
        className: "desc"
      }, desc || config[pageType].desc), actions && _react.default.createElement("div", {
        className: "actions"
      }, actions)));
    }
  }]);

  return Exception;
}(_react.default.Component);

var _default = Exception;
exports.default = _default;