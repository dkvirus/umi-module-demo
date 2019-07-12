"use strict";

var routes = [{
  path: '/',
  component: './layout/index',
  routes: [{
    path: '/',
    component: './dashboard/index'
  }, {
    path: '/dashboard',
    component: './dashboard/index'
  }, {
    path: '/exception/403',
    component: './exception/403'
  }, {
    path: '/exception/404',
    component: './exception/404'
  }, {
    path: '/exception/500',
    component: './exception/500'
  }, {
    component: './exception/404'
  }]
}];
module.exports = routes;