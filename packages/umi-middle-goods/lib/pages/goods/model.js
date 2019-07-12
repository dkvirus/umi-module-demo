"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var service = _interopRequireWildcard(require("./service"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  namespace: 'goods',
  state: {
    list: []
  },
  effects: {
    /**
     * 更新一条数据
     */
    query:
    /*#__PURE__*/
    regeneratorRuntime.mark(function query(_ref, _ref2) {
      var payload, call, put, result;
      return regeneratorRuntime.wrap(function query$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              payload = _ref.payload;
              call = _ref2.call, put = _ref2.put;
              _context.next = 4;
              return call(service.query);

            case 4:
              result = _context.sent;

              if (!(result.code !== '0000')) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return");

            case 7:
              _context.next = 9;
              return put({
                type: 'updateState',
                payload: {
                  list: result.data.content
                }
              });

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, query);
    })
  },
  reducers: {
    /**
     * 更新数据
     */
    updateState: function updateState(state, _ref3) {
      var payload = _ref3.payload;
      return _objectSpread({}, state, {}, payload);
    }
  }
};
exports.default = _default;