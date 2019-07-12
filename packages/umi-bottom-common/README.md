
# 对外暴露的接口

对外暴露的接口写在 `src/export.js`。

- 对外暴露公共方法，没啥好说的，exports 导出方法；
- 对外暴露页面(带状态)，这是重头戏。

umi 支持配置式路由，其中 components 属性表示页面的相对路径(相对于 page 目录)。

```
{ path: '/goods', component: './goods/index.js' },
```

将底层的布局页面暴露给中间业务层，实际上对外暴露的是布局页面的相对路径，是个字符串。

`../../node_modules/umi-bottom-common/src/pages/layout/index.js`

在中间层的配置式路由里实际上是这么写的

```
const bottomPagePath = require('umi-bottom-common').getPagePath()

const routes = [
    // ...
    // 这里的 bottomPagePath.layoutPagePath === '../../node_modules/umi-bottom-common/src/pages/layout/index.js'
    { path: '/', component: bottomPagePath.layoutPagePath },
]
```

这样做，外部 umi 工程就可以实用到 node_modules 内部的 umi 工程了，并且会自动注册页面对应的 model.js。

# 发包

```
$ npm run build:cjs     <= 编译包
$ npm publish           <= 发布包
```