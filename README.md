umi 实现模块化 demo。

# 说明

### 最下层工程：umi-bottom-common

写布局、登录、公共方法。

打成 npm 包供中间业务层使用

### 中间业务层：umi-middle-goods、umi-middle-order

依赖 umi-bottom-common（`$ npm install umi-bottom-common`），使用 umi-bottom-common 提供的布局和登录认证相关的东东

中间层：只负责写业务模块功能。

可以单独部署到 nginx 使用

也可以打成 npm 包供最上层集成项目使用

### 最上层：umi-top-integration

最上层：负责组装中间业务层。需要用到什么业务功能，就引用对应的中间业务层。

甲公司只要订单业务：`$ npm install umi-middle-order`

乙公司只要商品业务：`$ npm install umi-middle-goods`

丙公司要订单业务和商品业务：`$ npm install umi-middle-order umi-middle-goods`

# 启动

```
$ npm run bootstrap
```

安装依赖包，漫长的等待......

# 为什么这么做？

对于最下层：如果通用布局有修改，或者公共方法修复 bug。发一个新的 npm 包，中间层升级下依赖即可修复。

对于中间层：业务功能更新，发一个新的 npm 包，用到该业务的所有集成项目只需升级下依赖即可。

# 适用场景？

同时维护很多个后管系统。每个后管系统都有些公共的模块，比如：用户管理页面。

现在用户管理页面需要新增个字段，传统做法是用到它的所有后管系统都需要手动改一波代码，想想就痛苦。

模块化解决该问题：只需将底层用户管理修改完成后发布 npm 包，用到它的项目敲一个 `npm install user@latest` 即可。


