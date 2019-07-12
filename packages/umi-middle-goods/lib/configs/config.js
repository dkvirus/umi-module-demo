"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clientSecret = exports.clientId = exports.initRouter = exports.apiPrefixMock = exports.apiPrefix = exports.footerText = exports.logo = exports.name = void 0;
var name = 'umi-middle-goods'; // 名称，包含菜单导航条和浏览器菜单栏

exports.name = name;
var logo = '/logo.png'; // logo 头像，菜单导航条和登录时显示

exports.logo = logo;
var footerText = 'xxx © Krproject Team'; // 网站底部log

exports.footerText = footerText;
var apiPrefix = '/api/mock'; // 请求前缀。Mock：/api/mock，开发：/api/v1

exports.apiPrefix = apiPrefix;
var apiPrefixMock = '/api/mock'; // mock 请求前缀

exports.apiPrefixMock = apiPrefixMock;
var initRouter = '/dashboard'; // 初始路由

exports.initRouter = initRouter;
var clientId = 'web'; // OAuth2客户端认证编号

exports.clientId = clientId;
var clientSecret = 'web'; // OAuth2客户端认证密钥                       

exports.clientSecret = clientSecret;