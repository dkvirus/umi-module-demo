'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

var _react = _interopRequireDefault(require('react'))

var _dva = require('dva')

var _antd = require('antd')

var _dec, _class

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

function _typeof(obj) { if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof(obj) { return typeof obj } } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj } } return _typeof(obj) }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === 'object' || typeof call === 'function')) { return call } return _assertThisInitialized(self) }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called') } return self }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o) }; return _getPrototypeOf(o) }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function') } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass) }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o }; return _setPrototypeOf(o, p) }

var GoodsPage = (_dec = (0, _dva.connect)(function (_ref) {
  var goods = _ref.goods,
      loading = _ref.loading
  return {
    goods: goods,
    loading: loading,
  }
}), _dec(_class =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GoodsPage, _React$Component)

  function GoodsPage() {
    _classCallCheck(this, GoodsPage)

    return _possibleConstructorReturn(this, _getPrototypeOf(GoodsPage).apply(this, arguments))
  }

  _createClass(GoodsPage, [{
    key: 'componentDidMount',

    /**
     * 页面加载完成后请求数据
     */
    value: function componentDidMount() {
      this.props.dispatch({
        type: 'goods/query',
      })
    },
  }, {
    key: 'render',
    value: function render() {
      var list = this.props.goods.list
      var columns = [{
        title: '主键',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      }]
      var tableProps = {
        dataSource: list,
        columns: columns,
        loading: this.props.loading.effects['goods/query'],
        rowKey: function rowKey(record) {
          return record.id
        },
      }
      return _react.default.createElement(_antd.Card, null, _react.default.createElement(_antd.Table, tableProps))
    },
  }])

  return GoodsPage
}(_react.default.Component)) || _class)
var _default = GoodsPage
exports.default = _default