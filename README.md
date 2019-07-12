umi 实现模块化 demo。

# 说明

### 最下层工程：umi-bottom-common

写布局、登录、公共方法。

打成 npm 包供中间业务层使用

![布局](https://cdn.nlark.com/yuque/0/2019/png/103389/1562929723260-53980930-ac7a-4a99-8400-1d1a61998796.png?x-oss-process=image/resize,w_640)

### 中间业务层：umi-middle-goods、umi-middle-order

依赖 umi-bottom-common（`$ npm install umi-bottom-common`），使用 umi-bottom-common 提供的布局和登录认证相关的东东

中间层：只负责写业务模块功能。

可以单独部署到 nginx 使用

也可以打成 npm 包供最上层集成项目使用

![goods](https://cdn.nlark.com/yuque/0/2019/png/103389/1562934207145-dee6c695-e2b3-43bc-91a6-0d48bc8c442f.png?x-oss-process=image/resize,w_637)

![order](https://cdn.nlark.com/yuque/0/2019/png/103389/1562935553265-189614ee-1026-4541-99d1-57d973b755fb.png?x-oss-process=image/resize,w_746)

### 最上层集成项目：umi-top-integration

最上层：负责组装中间业务层。需要用到什么业务功能，就引用对应的中间业务层。

甲公司只要订单业务：`$ npm install umi-middle-order`

乙公司只要商品业务：`$ npm install umi-middle-goods`

丙公司要订单业务和商品业务：`$ npm install umi-middle-order umi-middle-goods`

![integration](https://cdn.nlark.com/yuque/0/2019/png/103389/1562935440408-21c64d92-fcaf-4768-b5d6-0c62356da83a.png?x-oss-process=image/resize,w_746)

# 启动

```
$ npm run bootstrap
```

安装依赖包，漫长的等待......

# 适用场景

同时维护很多个后管系统。每个后管系统都有些公共的模块，比如：用户管理页面。

现在用户管理页面需要新增个字段，传统做法是用到它的所有后管系统都需要手动改一波代码，想想就痛苦。

模块化解决该问题：只需将中间业务层的用户管理页面修改完成后发布新的 npm 包，用到它的项目敲一个 `npm install user@latest` 即可。


