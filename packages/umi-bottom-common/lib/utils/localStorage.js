"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItem = getItem;
exports.setItem = setItem;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * note: 封装 localstorage 的 setItem() 与 getItem() 方法
 * 
 * setItem(key, value) 对 value 值进行加密
 * getItem(key)  对 value 值进行解密并返回
 * 
 * 对称加密算法：aes192
 * 加密文档详见：http://nodejs.cn/api/crypto.html
 */
var secretKey = 'octopus';
/**
 * 获取 localstorage，解密
 */

function getItem(key) {
  // 01 对键进行加密
  var cipher = _crypto.default.createCipher('aes192', secretKey);

  var encryptedKey = cipher.update(JSON.stringify(key), 'utf8', 'hex');
  encryptedKey += cipher.final('hex'); // 02 根据加密的键获取值，此时值处于加密状态

  var value = localStorage.getItem(encryptedKey);
  if (!value) return ''; // 03 对值进行解密

  var decipher = _crypto.default.createDecipher('aes192', secretKey);

  var decrypted = decipher.update(value, 'hex', 'utf8');
  decrypted += decipher.final('utf8'); // 04 此时值是字符串类型，处理字符串转数组类型

  try {
    return JSON.parse(decrypted);
  } catch (error) {// 字符串不能进行 JSON.parse() 处理，下一行直接返回
  }

  return decrypted;
}
/**
 * 设置 localstorage，加密
 */


function setItem(key, value) {
  // 对键进行加密
  var cipher = _crypto.default.createCipher('aes192', secretKey);

  var encryptedKey = cipher.update(JSON.stringify(key), 'utf8', 'hex');
  encryptedKey += cipher.final('hex'); // 对值进行加密
  // attention：每次加密都要重新创建一个 cipher 对象，对键和值加密的加密对象不能共用一个

  var cipher2 = _crypto.default.createCipher('aes192', secretKey);

  var encryptedValue = cipher2.update(JSON.stringify(value), 'utf8', 'hex');
  encryptedValue += cipher2.final('hex');
  localStorage.setItem(encryptedKey, encryptedValue);
}